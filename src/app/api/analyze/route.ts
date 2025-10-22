import { NextRequest, NextResponse } from "next/server";

type StatementRow = {
  service: string;
  numberOfUnits: number;
  unitPrice: number;
  serviceCharge: number;
  balanceRequired: number | null;
  calcOk: boolean;
};

type StatementParse = {
  rows: StatementRow[];
  totalServiceCharges: number | null;
  sumMatchesTotal: boolean | null;
  errors: { kind: "CALCULATION_MISMATCH" | "TOTAL_MISMATCH" | "PARSE_ERROR"; message: string; rowIndex?: number }[];
};

type PricingRow = {
  serviceName: string;
  unitPrice: number;
  afpCode: string | null;
};

type ComparisonRow = {
  key: string; // name or afp
  serviceName: string;
  afpCode: string | null;
  statementUnitPrice: number | null;
  pricingUnitPrice: number | null;
  numberOfUnits: number;
  serviceCharge: number;
  overchargePerUnit: number;
  overchargeTotal: number;
};

function parseCsv(text: string): string[][] {
  const lines = text.replace(/\r\n?/g, "\n").split("\n");
  const rows: string[][] = [];
  for (const line of lines) {
    if (!line.trim()) continue;
    // Simple CSV: split by comma, handle basic quoted fields
    const fields: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === "," && !inQuotes) {
        fields.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    fields.push(current.trim());
    rows.push(fields.map((f) => f.replace(/^"|"$/g, "")));
  }
  return rows;
}

function toNumberSafe(value: string): number | null {
  if (value == null) return null;
  const cleaned = value.replace(/[^0-9+\-.,]/g, "").replace(/\s+/g, "");
  if (!cleaned) return null;
  // Handle comma as decimal or thousand separator: prefer period as decimal
  let normalized = cleaned;
  const hasComma = cleaned.includes(",");
  const hasDot = cleaned.includes(".");
  if (hasComma && !hasDot) {
    // assume comma decimal
    normalized = cleaned.replace(/\./g, "").replace(",", ".");
  } else {
    // remove thousands commas
    normalized = cleaned.replace(/,(?=\d{3}(\D|$))/g, "");
  }
  const num = Number(normalized);
  return Number.isFinite(num) ? num : null;
}

function nearlyEqual(a: number, b: number, epsilon = 1e-6): boolean {
  return Math.abs(a - b) <= epsilon;
}

function parseStatementCsv(rows: string[][]): StatementParse {
  // Expect header with 5 columns: Service, Number of Units, Unit Price, Service Charge, Balance Required
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const idxService = header.findIndex((h) => h.includes("service"));
  const idxUnits = header.findIndex((h) => h.includes("number") && h.includes("unit"));
  const idxUnitPrice = header.findIndex((h) => h.includes("unit") && h.includes("price"));
  const idxCharge = header.findIndex((h) => h.includes("service") && h.includes("charge"));
  const idxBalance = header.findIndex((h) => h.includes("balance") && h.includes("required"));

  const indices = [idxService, idxUnits, idxUnitPrice, idxCharge, idxBalance];
  if (indices.slice(0, 4).some((i) => i === -1)) {
    return { rows: [], totalServiceCharges: null, sumMatchesTotal: null, errors: [{ kind: "PARSE_ERROR", message: "Missing required columns in statement CSV" }] };
  }

  const resultRows: StatementRow[] = [];
  const errors: StatementParse["errors"] = [];
  let totalServiceChargesLine: number | null = null;

  for (let r = 1; r < rows.length; r++) {
    const record = rows[r];
    const service = (record[idxService] || "").trim();
    if (!service) continue;
    const maybeTotal = service.toLowerCase();
    if (maybeTotal.startsWith("total service charges")) {
      const val = toNumberSafe(record[idxCharge] || record[idxUnitPrice] || record[idxUnits] || "");
      if (val != null) totalServiceChargesLine = val;
      continue;
    }
    const numberOfUnits = toNumberSafe(record[idxUnits] || "");
    const unitPrice = toNumberSafe(record[idxUnitPrice] || "");
    const serviceCharge = toNumberSafe(record[idxCharge] || "");
    const balanceRequired = idxBalance !== -1 ? toNumberSafe(record[idxBalance] || "") : null;

    if (numberOfUnits == null || unitPrice == null || serviceCharge == null) {
      errors.push({ kind: "PARSE_ERROR", message: "Invalid numeric value in statement row", rowIndex: r - 1 });
      continue;
    }

    const computed = numberOfUnits * unitPrice;
    const calcOk = nearlyEqual(computed, serviceCharge, 1e-4);
    if (!calcOk) {
      errors.push({ kind: "CALCULATION_MISMATCH", message: "Units × Unit Price ≠ Service Charge", rowIndex: r - 1 });
    }

    resultRows.push({
      service,
      numberOfUnits,
      unitPrice,
      serviceCharge,
      balanceRequired,
      calcOk,
    });
  }

  const sumCharges = resultRows.reduce((acc, row) => acc + row.serviceCharge, 0);
  let sumMatchesTotal: boolean | null = null;
  if (totalServiceChargesLine != null) {
    sumMatchesTotal = nearlyEqual(sumCharges, totalServiceChargesLine, 1e-2);
    if (!sumMatchesTotal) {
      errors.push({ kind: "TOTAL_MISMATCH", message: "Sum of Service Charges does not match Total Service Charges" });
    }
  }

  return {
    rows: resultRows,
    totalServiceCharges: totalServiceChargesLine,
    sumMatchesTotal,
    errors,
  };
}

function parsePricingCsv(rows: string[][]): PricingRow[] {
  // Header: Service Name, Unit Price, AFP Code (optional)
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const idxName = header.findIndex((h) => h.includes("service") && (h.includes("name") || !h.includes("charge")));
  const idxUnitPrice = header.findIndex((h) => h.includes("unit") && h.includes("price"));
  let idxAfp = header.findIndex((h) => h.includes("afp") && h.includes("code"));
  if (idxAfp === -1) idxAfp = header.findIndex((h) => h.includes("code") || h === "afp");

  if (idxName === -1 || idxUnitPrice === -1) return [];

  const out: PricingRow[] = [];
  for (let r = 1; r < rows.length; r++) {
    const record = rows[r];
    const serviceName = (record[idxName] || "").trim();
    if (!serviceName) continue;
    const unitPrice = toNumberSafe(record[idxUnitPrice] || "");
    const afpCode = idxAfp !== -1 ? (record[idxAfp] || "").trim() || null : null;
    if (unitPrice == null) continue;
    out.push({ serviceName, unitPrice, afpCode });
  }
  return out;
}

function buildIndex<T extends { serviceName: string; afpCode?: string | null }>(rows: T[]) {
  const byName = new Map<string, T>();
  const byAfp = new Map<string, T>();
  for (const r of rows) {
    byName.set(r.serviceName.toLowerCase(), r);
    const code = r.afpCode;
    if (code) byAfp.set(code.toLowerCase(), r);
  }
  return { byName, byAfp };
}

function compare(statement: StatementParse, pricingRows: PricingRow[]): ComparisonRow[] {
  const pricingIndex = buildIndex(pricingRows);
  const comparisons: ComparisonRow[] = [];

  for (const row of statement.rows) {
    const nameKey = row.service.toLowerCase();
    const pricingMatchByName = pricingIndex.byName.get(nameKey) || null;
    let selected: PricingRow | null = pricingMatchByName;
    let matchKey = row.service;
    let afp: string | null = null;

    // If AFP appears in service name like "... [AFP: XYZ]", try to extract and match
    const afpMatch = row.service.match(/\bAFP\s*[:#-]?\s*([A-Za-z0-9._-]+)/i);
    if (afpMatch) {
      const code = afpMatch[1].toLowerCase();
      const byCode = pricingIndex.byAfp.get(code) || null;
      if (byCode) {
        selected = byCode;
        matchKey = code;
        afp = byCode.afpCode || code;
      }
    }

    const statementUnitPrice = row.unitPrice;
    const pricingUnitPrice = selected ? selected.unitPrice : null;
    const overchargePerUnit = pricingUnitPrice != null ? Math.max(0, statementUnitPrice - pricingUnitPrice) : 0;
    const overchargeTotal = overchargePerUnit * row.numberOfUnits;

    comparisons.push({
      key: matchKey,
      serviceName: selected ? selected.serviceName : row.service,
      afpCode: afp || (selected ? selected.afpCode : null),
      statementUnitPrice,
      pricingUnitPrice,
      numberOfUnits: row.numberOfUnits,
      serviceCharge: row.serviceCharge,
      overchargePerUnit,
      overchargeTotal,
    });
  }

  return comparisons;
}

function summarizeOvercharges(rows: ComparisonRow[]) {
  const totalOvercharge = rows.reduce((acc, r) => acc + r.overchargeTotal, 0);
  return { totalOvercharge };
}

async function extractTextFromPdfLike(buffer: ArrayBuffer): Promise<string> {
  // Fallback text extraction for simple PDFs where text is embedded; this is not full PDF parsing.
  const raw = Buffer.from(buffer).toString("latin1");
  const cleaned = raw.replace(/[^\x09\x0A\x0D\x20-\x7E]/g, " ").replace(/\s+/g, " ").trim();
  return cleaned;
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const statement = form.get("statement");
    const pricing = form.get("pricing");

    if (!(statement instanceof File) || !(pricing instanceof File)) {
      return NextResponse.json({ error: "Both files are required" }, { status: 400 });
    }

    const maxBytes = 10 * 1024 * 1024;
    if (statement.size > maxBytes || pricing.size > maxBytes) {
      return NextResponse.json({ error: "File exceeds 10MB limit" }, { status: 413 });
    }

    const [statementBuf, pricingBuf] = await Promise.all([statement.arrayBuffer(), pricing.arrayBuffer()]);

    const sIsPdf = statement.name.toLowerCase().endsWith(".pdf") || statement.type === "application/pdf";
    const pIsPdf = pricing.name.toLowerCase().endsWith(".pdf") || pricing.type === "application/pdf";

    // For now, support CSV fully; PDFs will attempt naive extraction and then CSV parse if they contain CSV-like lines
    const sRaw = Buffer.from(statementBuf).toString("utf8");
    const pRaw = Buffer.from(pricingBuf).toString("utf8");
    const sText = sIsPdf ? await extractTextFromPdfLike(statementBuf) : sRaw;
    const pText = pIsPdf ? await extractTextFromPdfLike(pricingBuf) : pRaw;

    // Attempt CSV parsing first
    const sRows = parseCsv(sText);
    const pRows = parseCsv(pText);

    const statementParsed = parseStatementCsv(sRows);
    const pricingParsed = parsePricingCsv(pRows);

    if (statementParsed.rows.length === 0 || pricingParsed.length === 0) {
      return NextResponse.json(
        { error: "Unable to parse required data. Ensure CSVs with proper headers are uploaded." },
        { status: 422 }
      );
    }

    const comparisons = compare(statementParsed, pricingParsed);
    const summary = summarizeOvercharges(comparisons);

    const response = {
      ok: true,
      audit: {
        statement: {
          name: statement.name,
          totalServiceChargesReported: statementParsed.totalServiceCharges,
          sumMatchesTotal: statementParsed.sumMatchesTotal,
          calculationErrors: statementParsed.errors.filter((e) => e.kind === "CALCULATION_MISMATCH"),
          totalMismatch: statementParsed.errors.find((e) => e.kind === "TOTAL_MISMATCH") || null,
        },
        pricing: {
          name: pricing.name,
          rows: pricingParsed.length,
        },
        comparisons,
        totals: summary,
      },
    } as const;

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.error("[analyze] Error handling file upload:", err);
    return NextResponse.json({ error: "Failed to analyze files" }, { status: 500 });
  }
}






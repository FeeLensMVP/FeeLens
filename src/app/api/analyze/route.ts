import { NextRequest, NextResponse } from "next/server";

const KEYWORDS = ["fee", "fees", "charge", "charges", "commission", "commissions"];

function findKeywordHits(text: string) {
  const lc = text.toLowerCase();
  const hits: { keyword: string; count: number }[] = [];
  let total = 0;
  for (const k of KEYWORDS) {
    const re = new RegExp(`\\b${k}\\b`, "g");
    const matches = lc.match(re);
    const count = matches ? matches.length : 0;
    if (count > 0) hits.push({ keyword: k, count });
    total += count;
  }
  return { total, hits };
}

async function extractTextFromPdfLike(buffer: ArrayBuffer): Promise<string> {
  // Minimal, naive extraction: interpret bytes as latin1 text and strip binary sections.
  // This is not production-grade PDF parsing, but works for simple text-based PDFs.
  const raw = Buffer.from(buffer).toString("latin1");
  // Try to keep readable sequences and discard long binary chunks
  const cleaned = raw
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned;
}

async function extractTextFromCsv(buffer: ArrayBuffer): Promise<string> {
  const text = Buffer.from(buffer).toString("utf8");
  return text;
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

    const statementBuf = await statement.arrayBuffer();
    const pricingBuf = await pricing.arrayBuffer();

    const sName = statement.name.toLowerCase();
    const pName = pricing.name.toLowerCase();
    const statementIsPdf = sName.endsWith(".pdf") || statement.type === "application/pdf";
    const pricingIsPdf = pName.endsWith(".pdf") || pricing.type === "application/pdf";

    const statementText = statementIsPdf
      ? await extractTextFromPdfLike(statementBuf)
      : await extractTextFromCsv(statementBuf);
    const pricingText = pricingIsPdf ? await extractTextFromPdfLike(pricingBuf) : await extractTextFromCsv(pricingBuf);

    const sHits = findKeywordHits(statementText);
    const pHits = findKeywordHits(pricingText);

    // Mock heuristics: more bytes and more keyword hits suggest more complex fee structures
    const complexityScore = Math.min(
      100,
      Math.round(
        (statement.size + pricing.size) / (1024 * 50) + // size factor
          (sHits.total + pHits.total) * 5 // keyword factor
      )
    );

    const response = {
      ok: true,
      summary: {
        statement: {
          name: statement.name,
          bytes: statement.size,
          kind: statementIsPdf ? "pdf" : "csv",
          keywordHits: sHits,
        },
        pricing: {
          name: pricing.name,
          bytes: pricing.size,
          kind: pricingIsPdf ? "pdf" : "csv",
          keywordHits: pHits,
        },
        complexityScore,
        notes:
          complexityScore > 60
            ? "Multiple fee-related terms detected. Expect varied fee types and thresholds."
            : complexityScore > 30
            ? "Some fee-related terms detected. Likely a moderate fee schedule."
            : "Few fee terms detected. Pricing may be simple or embedded in tables.",
      },
      examples: {
        statementSnippet: statementText.slice(0, 400),
        pricingSnippet: pricingText.slice(0, 400),
      },
    } as const;

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.error("[analyze] Error handling file upload:", err);
    return NextResponse.json({ error: "Failed to analyze files" }, { status: 500 });
  }
}



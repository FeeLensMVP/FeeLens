"use client";

import React from "react";

type AllowedFile = File & { __kind?: "pdf" | "csv" };

const MAX_BYTES = 10 * 1024 * 1024; // 10MB
const ACCEPTED_MIME = ["application/pdf", "text/csv", "application/vnd.ms-excel"]; // some browsers use csv as excel legacy

function getFileKind(file: File): "pdf" | "csv" | "unknown" {
  const name = file.name.toLowerCase();
  if (name.endsWith(".pdf") || file.type === "application/pdf") return "pdf";
  if (name.endsWith(".csv") || file.type === "text/csv" || file.type === "application/vnd.ms-excel") return "csv";
  return "unknown";
}

function formatBytes(bytes: number): string {
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size = size / 1024;
    unitIndex++;
  }
  return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

type DropzoneProps = {
  label: string;
  description: string;
  onValidFile: (file: AllowedFile) => void;
  currentFile?: AllowedFile | null;
  progress?: number;
  error?: string | null;
  setError: (e: string | null) => void;
};

function PdfIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 text-red-600">
      <path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <path fill="currentColor" d="M14 2v6h6"></path>
      <text x="7" y="17" fontSize="7" fill="white" fontFamily="Arial" fontWeight="700">PDF</text>
    </svg>
  );
}

function CsvIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 text-emerald-600">
      <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor"></rect>
      <text x="6" y="16" fontSize="7" fill="white" fontFamily="Arial" fontWeight="700">CSV</text>
    </svg>
  );
}

function FileBadge({ file }: { file: AllowedFile }) {
  const kind = getFileKind(file);
  return (
    <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 shadow-sm">
      {kind === "pdf" ? <PdfIcon /> : kind === "csv" ? <CsvIcon /> : null}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-900">{file.name}</span>
        <span className="text-xs text-gray-500">{formatBytes(file.size)}</span>
      </div>
    </div>
  );
}

function Dropzone(props: DropzoneProps) {
  const { label, description, onValidFile, currentFile, progress = 0, error, setError } = props;
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const validate = React.useCallback(
    (file: File): string | null => {
      const kind = getFileKind(file);
      if (kind === "unknown") return "Unsupported file type. Only PDF or CSV allowed.";
      if (file.size > MAX_BYTES) return "File exceeds 10MB limit.";
      return null;
    },
    []
  );

  const handleFiles = React.useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const file = files[0] as AllowedFile;
      const err = validate(file);
      if (err) {
        setError(err);
        return;
      }
      setError(null);
      file.__kind = getFileKind(file) as "pdf" | "csv";
      onValidFile(file);
    },
    [onValidFile, setError, validate]
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer?.files ?? null);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  return (
    <div className="flex w-full flex-col">
      <label className="mb-2 text-sm font-semibold text-gray-900">{label}</label>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
        }}
        onDrop={onDrop}
        className={[
          "group relative flex min-h-[170px] w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 transition",
          isDragging ? "border-emerald-500 bg-emerald-50/50" : "border-gray-300 hover:border-gray-400",
        ].join(" ")}
        onClick={() => inputRef.current?.click()}
      >
        <div className="pointer-events-none flex flex-col items-center text-center">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-white shadow-sm ring-1 ring-black/5">
            {/* folder upload icon */}
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
              <path fill="currentColor" d="M10 4l2 2h6a2 2 0 012 2v2H4V6a2 2 0 012-2h4z"></path>
              <path fill="currentColor" d="M4 10h16v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6z"></path>
            </svg>
          </div>
          <p className="text-sm text-gray-700">
            <span className="font-medium text-gray-900">Drag & drop</span> or click to upload
          </p>
          <p className="mt-1 text-xs text-gray-500">{description}</p>
          <p className="mt-2 text-xs text-gray-500">Accepted: PDF, CSV • Max 10MB</p>
          {currentFile ? <FileBadge file={currentFile} /> : null}
          {typeof progress === "number" && progress > 0 ? (
            <div className="mt-4 w-full max-w-xs">
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-emerald-600 transition-all"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <div className="mt-1 text-right text-xs text-gray-500">{Math.min(progress, 100)}%</div>
            </div>
          ) : null}
          {error ? <div className="mt-3 text-xs font-medium text-red-600">{error}</div> : null}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_MIME.join(",") + ",.csv,.pdf"}
          className="hidden"
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default function UploadPage() {
  const [statementFile, setStatementFile] = React.useState<AllowedFile | null>(null);
  const [pricingFile, setPricingFile] = React.useState<AllowedFile | null>(null);
  const [statementProgress, setStatementProgress] = React.useState(0);
  const [pricingProgress, setPricingProgress] = React.useState(0);
  const [statementError, setStatementError] = React.useState<string | null>(null);
  const [pricingError, setPricingError] = React.useState<string | null>(null);
  const [analysisStarted, setAnalysisStarted] = React.useState(false);
  const [analysisComplete, setAnalysisComplete] = React.useState(false);
  const [analysisError, setAnalysisError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<
    | null
    | {
        ok: boolean;
        summary: {
          statement: { name: string; bytes: number; kind: "pdf" | "csv"; keywordHits: { total: number; hits: { keyword: string; count: number }[] } };
          pricing: { name: string; bytes: number; kind: "pdf" | "csv"; keywordHits: { total: number; hits: { keyword: string; count: number }[] } };
          complexityScore: number;
          notes: string;
        };
        examples: { statementSnippet: string; pricingSnippet: string };
      }
  >(null);

  const simulateProgress = React.useCallback((setter: (n: number) => void) => {
    setter(0);
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 18 + 7; // 7-25% increments
      if (current >= 100) {
        current = 100;
        setter(100);
        clearInterval(interval);
      } else {
        setter(Math.floor(current));
      }
    }, 250);
  }, []);

  const handleStatement = React.useCallback(
    (file: AllowedFile) => {
      setStatementFile(file);
      simulateProgress(setStatementProgress);
    },
    [simulateProgress]
  );

  const handlePricing = React.useCallback(
    (file: AllowedFile) => {
      setPricingFile(file);
      simulateProgress(setPricingProgress);
    },
    [simulateProgress]
  );

  const bothUploaded = Boolean(statementFile && pricingFile && statementProgress === 100 && pricingProgress === 100);

  const startAnalysis = async () => {
    if (!bothUploaded || !statementFile || !pricingFile) return;
    try {
      setAnalysisStarted(true);
      setAnalysisComplete(false);
      setAnalysisError(null);
      setResult(null);

      const form = new FormData();
      form.append("statement", statementFile);
      form.append("pricing", pricingFile);

      const res = await fetch("/api/analyze", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) {
        setAnalysisError(data?.error || "Failed to analyze files");
        setAnalysisStarted(false);
        return;
      }
      setResult(data);
      setAnalysisComplete(true);
    } catch (e) {
      setAnalysisError("Unexpected error during analysis");
    } finally {
      setAnalysisStarted(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] w-full bg-gray-50 py-10">
      <div className="mx-auto w-full max-w-5xl px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">FeeLens Upload</h1>
          <p className="mt-1 text-sm text-gray-600">
            Compare actual bank fees against pricing. Upload your bank statement and pricing sheet as PDF or CSV.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
            <Dropzone
              label="Upload Bank Statement"
              description="PDF or CSV export of your transactions"
              onValidFile={handleStatement}
              currentFile={statementFile ?? undefined}
              progress={statementProgress}
              error={statementError}
              setError={setStatementError}
            />
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
            <Dropzone
              label="Upload Bank Pricing Sheet"
              description="Pricing schedule from your bank (PDF/CSV)"
              onValidFile={handlePricing}
              currentFile={pricingFile ?? undefined}
              progress={pricingProgress}
              error={pricingError}
              setError={setPricingError}
            />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">Status:</span>{" "}
            {!statementFile && !pricingFile && "Waiting for files"}
            {statementFile && !pricingFile && "Statement uploaded, waiting for pricing sheet"}
            {!statementFile && pricingFile && "Pricing sheet uploaded, waiting for statement"}
            {statementFile && pricingFile && !(statementProgress === 100 && pricingProgress === 100) && "Uploading..."}
            {bothUploaded && "Ready to analyze"}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setStatementFile(null);
                setPricingFile(null);
                setStatementProgress(0);
                setPricingProgress(0);
                setStatementError(null);
                setPricingError(null);
                setAnalysisComplete(false);
                setAnalysisStarted(false);
                setAnalysisError(null);
                setResult(null);
              }}
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            >
              Reset
            </button>
            <button
              type="button"
              disabled={!bothUploaded || analysisStarted}
              onClick={() => void startAnalysis()}
              className={[
                "inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20",
                bothUploaded && !analysisStarted ? "bg-emerald-600 hover:bg-emerald-700" : "bg-emerald-300",
              ].join(" ")}
            >
              {analysisStarted ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" opacity="0.3" />
                    <path d="M22 12a10 10 0 00-10-10" stroke="white" strokeWidth="4" fill="none" />
                  </svg>
                  Analyzing...
                </span>
              ) : (
                "Start Analysis"
              )}
            </button>
          </div>
        </div>

        {analysisError ? (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-900">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-red-700" aria-hidden="true">
                <path fill="currentColor" d="M11 7h2v6h-2zM11 15h2v2h-2z" />
              </svg>
              <p className="text-sm font-medium">{analysisError}</p>
            </div>
          </div>
        ) : null}

        {analysisComplete && result ? (
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 md:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Analysis Summary</h2>
                <span
                  className={[
                    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                    result.summary.complexityScore > 60
                      ? "bg-amber-100 text-amber-800"
                      : result.summary.complexityScore > 30
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-100 text-gray-800",
                  ].join(" ")}
                >
                  Complexity {result.summary.complexityScore}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{result.summary.notes}</p>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-gray-200 p-4">
                  <div className="text-sm font-medium text-gray-900">Statement</div>
                  <div className="mt-1 text-xs text-gray-500">{result.summary.statement.name} • {formatBytes(result.summary.statement.bytes)} • {result.summary.statement.kind.toUpperCase()}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800">Keywords: {result.summary.statement.keywordHits.total}</span>
                    {result.summary.statement.keywordHits.hits.slice(0, 4).map((h) => (
                      <span key={`s-${h.keyword}`} className="rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-700">
                        {h.keyword}: {h.count}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 rounded-lg bg-gray-50 p-3 text-xs text-gray-700">
                    {result.examples.statementSnippet || "(no preview)"}
                  </div>
                </div>
                <div className="rounded-xl border border-gray-200 p-4">
                  <div className="text-sm font-medium text-gray-900">Pricing Sheet</div>
                  <div className="mt-1 text-xs text-gray-500">{result.summary.pricing.name} • {formatBytes(result.summary.pricing.bytes)} • {result.summary.pricing.kind.toUpperCase()}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800">Keywords: {result.summary.pricing.keywordHits.total}</span>
                    {result.summary.pricing.keywordHits.hits.slice(0, 4).map((h) => (
                      <span key={`p-${h.keyword}`} className="rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-700">
                        {h.keyword}: {h.count}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 rounded-lg bg-gray-50 p-3 text-xs text-gray-700">
                    {result.examples.pricingSnippet || "(no preview)"}
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
              <h3 className="text-sm font-semibold text-gray-900">Next steps</h3>
              <p className="mt-2 text-sm text-gray-600">This mock shows how FeeLens detects fee-related terms from statements and pricing.</p>
              <button
                type="button"
                onClick={() => {
                  setStatementFile(null);
                  setPricingFile(null);
                  setStatementProgress(0);
                  setPricingProgress(0);
                  setStatementError(null);
                  setPricingError(null);
                  setAnalysisComplete(false);
                  setAnalysisStarted(false);
                  setAnalysisError(null);
                  setResult(null);
                }}
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-900/10"
              >
                Try Another Statement
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}



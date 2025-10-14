interface AuditSectionProps {
  subscribed: boolean;
}

export default function AuditSection({ subscribed }: AuditSectionProps) {
  return (
    <section id="audit" className="relative z-10 mt-24 scroll-mt-32">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[44px] border border-emerald-200/60 bg-gradient-to-br from-emerald-500/10 via-white to-sky-500/10 px-8 py-16 text-center shadow-[0_60px_120px_-50px_rgba(16,185,129,0.45)] backdrop-blur">
        <h3 className="text-3xl font-bold tracking-tight text-slate-900">Request Your Free Audit</h3>
        <p className="mt-2 text-base text-slate-600">Bank fee analysis should not be such a headache.</p>

        <div className="mt-10">
          <form
            action="/api/audit-request"
            method="POST"
            className="mx-auto grid max-w-2xl gap-4 md:grid-cols-[1fr_1fr_auto]"
          >
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              className="w-full rounded-2xl border border-white/60 bg-white/90 px-4 py-3 text-base text-slate-700 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Work Email"
              className="w-full rounded-2xl border border-white/60 bg-white/90 px-4 py-3 text-base text-slate-700 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Submit Request
            </button>
          </form>
          {subscribed && (
            <p className="mt-6 rounded-2xl border border-emerald-200/70 bg-emerald-50/80 px-4 py-3 text-sm text-emerald-800 shadow-sm">
              {"Thanks! You're on the list. We'll be in touch shortly."}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
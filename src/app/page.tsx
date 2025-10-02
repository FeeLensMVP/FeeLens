export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const subscribed = params?.subscribed === "1";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_#0A1F44_0%,_#071635_45%,_#0D2B6C_70%,_#0F2250_85%,_white_100%)] text-gray-900">
      {/* Ambient gradient shapes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 right-[-10%] h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute -left-20 top-40 h-96 w-96 rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[10%] h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      {/* Background Logo Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20 mix-blend-soft-light">
        <img src="/logo.png" alt="FeeLens logo" className="w-[640px] max-w-full" />
      </div>

      {/* Header */}
      <header className="relative z-20 border-b border-white/10 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="text-xl font-semibold tracking-tight text-slate-900">FeeLens</div>
          <nav className="hidden items-center gap-3 rounded-full border border-white/40 bg-white/70 px-6 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur lg:flex">
            <a href="#problem" className="rounded-full px-3 py-1 transition hover:bg-slate-100">
              Problem
            </a>
            <a href="#solution" className="rounded-full px-3 py-1 transition hover:bg-slate-100">
              Solution
            </a>
            <a href="#audit" className="rounded-full px-3 py-1 transition hover:bg-slate-100">
              Free Audit
            </a>
            <a href="#faq" className="rounded-full px-3 py-1 transition hover:bg-slate-100">
              FAQ
            </a>
          </nav>
          <a
            href="#audit"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2"
          >
            Get started for free
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="relative">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 sm:py-32 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Left Text */}
            <div className="max-w-2xl">
              <h1 className="mt-6 space-y-2 text-5xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-6xl">
                <div>Stop Fees.</div>
                <div>Save More.</div>
                <div>Bank Smarter.</div>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-blue-100">
                Your money should work for you, not your bank.
              </p>

              <p className="mt-2 max-w-xl text-blue-100">
                We audit all your bank charges for the past 24 months.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#audit"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2"
                >
                  Get started for free
                </a>
                <div className="hidden h-12 w-32 rounded-full border border-white/20 bg-white/10 backdrop-blur sm:block" aria-hidden="true" />
              </div>
              {subscribed && (
                <div className="mt-6 rounded-2xl border border-emerald-200/70 bg-emerald-50/80 px-4 py-3 text-sm text-emerald-800 shadow-sm">
                  {"Thanks! You're on the list. We'll be in touch shortly."}
                </div>
              )}
            </div>

            {/* Right Side Placeholder Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-xl rounded-[36px] border border-white/10 bg-white/10 p-4 shadow-[0_40px_120px_-40px_rgba(45,212,191,0.45)] backdrop-blur">
                <div className="absolute -top-6 left-1/2 h-12 w-12 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 opacity-60 blur-lg" />
                <img src="/images/mac-mockup.png" alt="FeeLens dashboard on Mac monitor" className="relative w-full rounded-3xl shadow-2xl" />
                <div className="pointer-events-none absolute inset-0 rounded-[36px] ring-1 ring-white/30" />
              </div>
            </div>
          </div>
        </section>

        {/*Problem section */}
        <section id="problem" className="relative z-10 mt-12 border-t border-white/10">
          <div className="absolute inset-x-0 -top-24 -z-10 h-64 bg-gradient-to-b from-white/20 via-white/0 to-transparent" />
          <div className="mx-auto grid max-w-6xl gap-12 rounded-[40px] border border-white/20 bg-white/80 px-8 py-16 shadow-xl backdrop-blur">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-5">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">A complex environment</h2>
                <div className="space-y-3 text-base text-slate-600">
                  <p>Different banks = different file formats = different service descriptions</p>
                  <p>Bank fee statements are messy, lengthy and full of errors.</p>
                  <p>Bank charges get auto-debited, nobody has time to review them.</p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-sm overflow-hidden rounded-[32px] border border-slate-200/70 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-6 shadow-lg">
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-200/60 blur-2xl" />
                  <img src="/images/analysis.png" alt="Hidden fees analysis" className="relative w-full rounded-2xl shadow-2xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Section */}
        <section id="solution" className="relative z-10 mt-20">
          <div className="absolute inset-x-0 -top-32 -z-10 h-[520px] bg-gradient-to-b from-transparent via-emerald-500/10 to-white" />
          <div className="mx-auto max-w-6xl rounded-[44px] border border-emerald-200/50 bg-white/80 px-8 py-16 shadow-[0_60px_120px_-50px_rgba(14,116,144,0.35)] backdrop-blur">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">What we bring to the table</h2>
              <p className="mt-4 text-base text-slate-600">
                FeeLens is an AI tool allowing you to scan your fee statements in seconds.
                <br />
                According to EY, clients reconciling bank fees achieve savings from 20–30% on a year on year basis.
              </p>
              <ul className="mt-8 grid gap-4 text-lg font-medium text-slate-700 md:grid-cols-3">
                <li className="rounded-3xl border border-slate-200/70 bg-white/90 px-6 py-8 shadow-lg shadow-emerald-500/10">✅ We analyze your fee statements</li>
                <li className="rounded-3xl border border-slate-200/70 bg-white/90 px-6 py-8 shadow-lg shadow-emerald-500/10">✅ We spot any billing errors</li>
                <li className="rounded-3xl border border-slate-200/70 bg-white/90 px-6 py-8 shadow-lg shadow-emerald-500/10">✅ You improve your bottom line</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Free Audit Section */}
        <section id="audit" className="relative z-10 mt-24">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[44px] border border-emerald-200/60 bg-gradient-to-br from-emerald-500/10 via-white to-sky-500/10 px-8 py-16 text-center shadow-[0_60px_120px_-50px_rgba(16,185,129,0.45)] backdrop-blur">
            <h3 className="text-3xl font-bold tracking-tight text-slate-900">Request Your Free Audit</h3>
            <p className="mt-2 text-base text-slate-600">Bank fee analysis should not be such a headache.</p>

            <div className="mt-10">
              {/* Replace this form with embedded Tally/Typeform or Next.js API */}
              <form action="/api/audit-request" method="POST" className="mx-auto grid max-w-2xl gap-4 md:grid-cols-[1fr_1fr_auto]">
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
            </div>
          </div>
        </section>

        {/* Signup / Waitlist Section */}
        <section id="signup" className="relative z-10 mt-24">
          <div className="mx-auto max-w-5xl rounded-[44px] border border-white/40 bg-white/80 px-8 py-16 text-center shadow-xl backdrop-blur">
            <h3 className="text-3xl font-bold tracking-tight text-slate-900">Be First in Line</h3>
            <p className="mt-2 text-base text-slate-600">Join the waitlist for the fully automated SaaS platform.</p>
            <div className="mt-8 flex justify-center">
              <a
                href="https://forms.gle/oXLSdoCEQv98aSCb9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                Join Waitlist
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="relative z-10 mt-24">
          <div className="mx-auto max-w-6xl rounded-[44px] border border-white/30 bg-white/80 px-8 py-16 shadow-xl backdrop-blur">
            <h2 className="text-3xl font-bold text-center text-slate-900">FAQ</h2>
            <dl className="mx-auto mt-10 grid max-w-3xl gap-6">
              <div className="rounded-3xl border border-slate-200/70 bg-white/90 px-6 py-5 shadow-md">
                <dt className="font-semibold text-slate-900">How does the audit work?</dt>
                <dd className="mt-2 text-sm text-slate-600">
                  You securely share your past 24 months of fee statements. We analyze them and send a PDF savings report within 7 business days.
                </dd>
              </div>
              <div className="rounded-3xl border border-slate-200/70 bg-white/90 px-6 py-5 shadow-md">
                <dt className="font-semibold text-slate-900">Is my data safe?</dt>
                <dd className="mt-2 text-sm text-slate-600">
                  Yes. Your bank fee data is safe with us. It only contains treasury service charges from your banking partners— no vendor or customer details. We use it solely for the audit, then delete it after completion.
                </dd>
              </div>
              <div className="rounded-3xl border border-slate-200/70 bg-white/90 px-6 py-5 shadow-md">
                <dt className="font-semibold text-slate-900">When will the SaaS be ready?</dt>
                <dd className="mt-2 text-sm text-slate-600">
                  Early adopters will get priority access. The AI platform is in active development.
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-24 border-t border-white/20 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row">
          <span className="font-medium text-slate-700">© {new Date().getFullYear()} FeeLens</span>
          <p>Founder: [Clement Gonzalez], 8+ years in corporate treasury & banking audits.</p>
          <p>
            Contact:{" "}
            <a href="mailto:contact@feelens.com" className="font-medium text-emerald-600 transition hover:text-emerald-500">
              contact@feelens.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

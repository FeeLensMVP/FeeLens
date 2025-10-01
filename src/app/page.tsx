export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const subscribed = params?.subscribed === "1";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1F44] via-[#0D2B6C] to-white text-gray-900 relative overflow-hidden">
      {/* Background Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src="/logo.png"
          alt="FeeLens logo"
          className="w-[600px] opacity-10"
        />
      </div>

      {/* Header */}
      <header className="relative border-b border-gray-100 bg-white/80 backdrop-blur-md z-10">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <div className="text-xl font-semibold tracking-tight">FeeLens</div>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#problem" className="hover:text-gray-700">Problem</a>
            <a href="#solution" className="hover:text-gray-700">Solution</a>
            <a href="#audit" className="hover:text-gray-700">Free Audit</a>
            <a href="#faq" className="hover:text-gray-700">FAQ</a>
          </nav>
          <a
            href="#audit"
            className="inline-flex items-center px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg rounded-2xl"
          >
            Get started for free 
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="relative">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Text */}
            <div className="max-w-2xl">
              <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-md space-y-2">
                <div>Stop Fees.</div>
                <div>Save More.</div>
                <div>Bank Smarter.</div>
              </h1>
              <p className="mt-6 text-lg text-blue-100 max-w-xl">
                Your money should work for you, not your bank.
              </p>

<p className="mt-2 text-blue-100 max-w-xl">
We audit all your bank charges for the past 24 months.  
</p>

              <div className="mt-8">
                <a
                  href="#audit"
                  className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg rounded-2xl px-6 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
                >
                  Get started for free
                </a>
              </div>
              {subscribed && (
                <div className="mt-6 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                  {"Thanks! You're on the list. We'll be in touch shortly."}
                </div>
              )}
            </div>

            {/* Right Side Placeholder Image */}
            <div className="flex justify-center">
              <img
                src="/images/mac-mockup.png"
                alt="FeeLens dashboard on Mac monitor"
                className="w-full max-w-xl drop-shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/*Problem section */}
        <section id="problem" className="border-t border-gray-100 bg-gray-50 relative z-10">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">A complex environment</h2>
              <p className="mt-4 text-gray-600">
                Different banks = different file formats = different service descriptions  
              </p>
              <p className="mt-2 text-gray-600">
                Bank fee statements are messy, lengthy and full of errors.
                </p>
                <p className="mt-2 text-gray-600">
                  Bank charges get auto-debited, nobody has time to review them.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="/images/analysis.png"
                alt="Hidden fees analysis"
                className="w-full max-w-sm rounded-lg shadow-md border border-gray-200"
              />
            </div>
          </div>
        </section>

        {/* Value Section */}
        <section id="solution" className="border-t border-gray-100 bg-white relative z-10">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight">What we bring to the table</h2>
              <p className="mt-4 text-gray-600">
                FeeLens is an AI tool allowing you to scan your fee statements in seconds.

                <br />
                According to EY, clients reconciling bank fees achieve savings from 20–30% on a year on year basis.
              </p>
              <ul className="mt-6 space-y-2 text-gray-700 text-lg font-medium">
                <li>✅ We analyze your fee statements </li>
                <li>✅ We spot any billing errors </li>
                <li>✅ You improve your bottom line</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Free Audit Section */}
        <section id="audit" className="border-t border-gray-100 bg-gray-50 relative z-10">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 text-center">
            <h3 className="text-3xl font-bold tracking-tight">Request Your Free Audit</h3>
            <p className="mt-2 text-gray-600">
              Bank fee analysis should not be such a headache.
            </p>

            <div className="mt-6">
              {/* Replace this form with embedded Tally/Typeform or Next.js API */}
              <form action="/api/audit-request" method="POST" className="max-w-md mx-auto space-y-4">
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  className="w-full rounded-md border px-4 py-2"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Work Email"
                  className="w-full rounded-md border px-4 py-2"
                  required
                />
                <button
                  type="submit"
                  className="w-full rounded-md bg-indigo-600 px-6 py-3 font-semibold text-white shadow hover:bg-indigo-500"
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Signup / Waitlist Section */}
        <section id="signup" className="border-t border-gray-100 relative z-10">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 text-center">
            <h3 className="text-3xl font-bold tracking-tight">Be First in Line</h3>
            <p className="mt-2 text-gray-600">
              Join the waitlist for the fully automated SaaS platform.
            </p>
            <div className="mt-6">
              <a
                href="https://forms.gle/oXLSdoCEQv98aSCb9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg rounded-2xl"
              >
                Join Waitlist
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="border-t border-gray-100 bg-white relative z-10">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
            <h2 className="text-3xl font-bold text-center">FAQ</h2>
            <dl className="mt-10 max-w-3xl mx-auto space-y-8">
              <div>
                <dt className="font-medium text-gray-900">How does the audit work?</dt>
                <dd className="mt-2 text-gray-700">
                  You securely share your past 24 months of fee statements. We analyze them and send a PDF savings report within 7 business days.
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Is my data safe?</dt>
                <dd className="mt-2 text-gray-700">
                  Yes. Your bank fee data is safe with us. It only contains treasury service charges from your banking partners — no vendor or customer details. We use it solely for the audit, then delete it after completion.
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">When will the SaaS be ready?</dt>
                <dd className="mt-2 text-gray-700">
                  Early adopters will get priority access. The AI platform is in active development.
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 relative z-10 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} FeeLens</span>
          <p>Founder: [Clement Gonzalez], 8+ years in corporate treasury & banking audits.</p>
          <p>
            Contact:{" "}
            <a href="mailto:contact@feelens.com" className="text-indigo-600 hover:text-indigo-500">
              contact@feelens.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

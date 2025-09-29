export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const params = await searchParams;
  const subscribed = params?.subscribed === "1";
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <div className="text-xl font-semibold tracking-tight">FeeLens</div>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#problem" className="hover:text-gray-700">Problem</a>
            <a href="#solution" className="hover:text-gray-700">Solution</a>
            <a href="#signup" className="hover:text-gray-700">Get Started</a>
          </nav>
          <a href="/upload" className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Upload Statements</a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">Stop Overpaying Bank Fees</h1>
              <p className="mt-5 text-lg text-gray-600">FeeLens audits your company bank statements to uncover hidden charges, benchmark pricing, and negotiate savings—automatically.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="#signup" className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-5 py-3 text-white font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Get started free</a>
                <a href="/upload" className="inline-flex items-center justify-center rounded-md border border-gray-300 px-5 py-3 text-gray-900 hover:bg-gray-50">Upload bank statements</a>
              </div>
              {subscribed && (
                <div className="mt-6 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{"Thanks! You're on the list. We'll be in touch shortly."}</div>
              )}
            </div>
          </div>
        </section>

        <section id="problem" className="border-t border-gray-100 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">The problem</h2>
              <p className="mt-4 text-gray-600">Banks bury fees across accounts, payments, FX, and cash management. Pricing drifts upward and negotiated discounts expire silently. Most finance teams lack the time and benchmarks to challenge statements every month.</p>
            </div>
            <div>
              <h2 id="solution" className="text-2xl font-semibold tracking-tight">Our solution</h2>
              <p className="mt-4 text-gray-600">FeeLens ingests your statements, detects charge patterns and anomalies, compares them to market rates, and surfaces precise savings opportunities. Get a prioritized list of actions and optional support to renegotiate with your bank.</p>
              <ul className="mt-4 space-y-2 text-gray-700 list-disc list-inside">
                <li>Automated statement parsing</li>
                <li>Benchmarking against market pricing</li>
                <li>Clear savings recommendations</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="signup" className="border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
            <div className="max-w-xl">
              <h3 className="text-2xl font-semibold tracking-tight">Start saving in minutes</h3>
              <p className="mt-2 text-gray-600">Join the waitlist and get early access. No credit card required.</p>
              <form action="/api/subscribe" method="post" className="mt-6 flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@company.com"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button type="submit" className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-5 py-3 text-white font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Join waitlist</button>
              </form>
              <p className="mt-3 text-sm text-gray-500">Or <a className="text-indigo-600 hover:text-indigo-500" href="/upload">upload your bank statements</a> to see potential savings now.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-gray-500 flex items-center justify-between">
          <span>© {new Date().getFullYear()} FeeLens</span>
          <a href="#signup" className="text-indigo-600 hover:text-indigo-500">Get started</a>
        </div>
      </footer>
    </div>
  );
}

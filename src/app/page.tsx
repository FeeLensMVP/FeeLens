export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const subscribed = params?.subscribed === "1";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-white text-gray-900 relative overflow-hidden">
      {/* Background Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src="/logo.png" // replace with your FeeLens eye logo
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
            <a href="#signup" className="hover:text-gray-700">Get Started</a>
          </nav>
          <a
            href="/upload"
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Free 24-month audit
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
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#signup"
                  className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Get started free
                </a>
                <a
                  href="/upload"
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 px-6 py-3 text-gray-900 bg-white hover:bg-gray-50"
                >
                  Free 24-month audit
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
                src="/images/dashboard.png" // replace with real FeeLens screenshot
                alt="FeeLens dashboard preview"
                className="w-full max-w-md rounded-lg shadow-lg border border-gray-200"
              />
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section id="problem" className="border-t border-gray-100 bg-gray-50 relative z-10">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">The problem</h2>
              <p className="mt-4 text-gray-600">
                Banks overcharge their customers by 8-15% in average. 
              </p>
              <p className="mt-2 text-gray-600">
                Treasurers don’t have hours to comb through every fee statement.  
              
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="/images/analysis.png" // replace with a graphic/illustration
                alt="Hidden fees analysis"
                className="w-full max-w-sm rounded-lg shadow-md border border-gray-200"
              />
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section id="solution" className="border-t border-gray-100 bg-white relative z-10">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight">Our solution</h2>
              <p className="mt-4 text-gray-600">
                FeeLens scans your statements in seconds.  
                Find hidden charges. 
                Spot savings instantly.
              </p>
              <ul className="mt-6 space-y-2 text-gray-700 text-lg font-medium">
                <li>✅ Automated statement parsing</li>
                <li>✅ Pricing benchmarking</li>
                <li>✅ Clear savings actions</li>
              </ul>
            </div>
          </div>
        </section>

              {/* Signup Section */}
              <section id="signup" className="border-t border-gray-100 relative z-10">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 text-center">
            <h3 className="text-3xl font-bold tracking-tight">Ready to save?</h3>
            <p className="mt-2 text-gray-600">
              Join FeeLens early. Free, fast, no card required.
            </p>

            <div className="mt-6">
              <a
                href="https://forms.gle/oXLSdoCEQv98aSCb9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-8 py-4 text-lg font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Join Waitlist
              </a>
            </div>
          </div>  {/* ✅ close div before section */}
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 relative z-10 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-gray-500 flex items-center justify-between">
          <span>© {new Date().getFullYear()} FeeLens</span>
          <a href="#signup" className="text-indigo-600 hover:text-indigo-500">
            Get started
          </a>
        </div>
      </footer>
    </div>
  );
}

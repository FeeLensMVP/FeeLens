import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,_#0A1F44_0%,_#071635_45%,_#0D2B6C_70%,_#0F2250_85%,_white_100%)] text-white">
      <PageBackground />
      
      <Header />
      <main className="flex flex-grow flex-col items-center px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl w-full">
          {/* Header Section */}
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
              Start for free. Start the savings.
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-blue-100/90 leading-relaxed">
              Whether you&apos;re a mid-size company or a global enterprise, FeeLens is designed to save you time and money.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {/* Free Plan */}
            <div className="group relative flex flex-col rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-white/10 p-8 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:scale-105 hover:border-emerald-500/30 hover:shadow-emerald-500/20">
              <div className="mb-6 min-h-[140px]">
                <h3 className="mb-2 text-3xl font-bold text-white">Free</h3>
                <p className="mb-4 text-lg font-semibold text-emerald-400">20% success fee*</p>
                <p className="text-sm font-semibold text-blue-200/80">One-time Audit</p>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-sm font-bold text-white uppercase tracking-wide">Key Features</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-200/90 text-sm">1 connected US bank</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-200/90 text-sm">Upload up to 24 months of historical data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-200/90 text-sm">Automatic AFP code mapping</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-200/90 text-sm">Fee overbilling detection</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-sm font-bold text-white uppercase tracking-wide">Treasury Dashboard</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-200/90 text-sm">Savings summary report within 7 days</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-200/90 text-sm">Treasury services inventory</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-200/90 text-sm">Prices increases, billing errors, useless services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-200/90 text-sm">ECR mismatch analysis</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-bold text-white uppercase tracking-wide">Integrations</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-200/90 text-sm">Import PDF/CSV files</span>
                  </li>
                </ul>
              </div>

              <div className="mt-auto pt-6">
                <Link href="/upload" className="block w-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 px-6 py-4 text-lg font-bold text-white shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/40 text-center">
                  Get started for free
                </Link>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="group relative flex flex-col rounded-3xl border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-500/10 via-white/10 to-sky-500/10 p-8 backdrop-blur-xl shadow-2xl shadow-emerald-500/20 transition-all duration-300 hover:scale-105 hover:border-emerald-500/70 hover:shadow-emerald-500/30">
              <div className="mb-6 min-h-[140px]">
                <h3 className="mb-2 text-3xl font-bold text-white">Pro</h3>
                <p className="mb-4 text-lg font-semibold text-emerald-400">$995/mo for 1-5 banking partners</p>
                <p className="mb-2 text-sm font-semibold text-emerald-400">+20% success fee</p>
                <p className="text-sm font-semibold text-blue-200/80">Monthly Saas Subscription</p>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-sm font-bold text-white uppercase tracking-wide">Key Features</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-200/90 text-sm">1-5 connected US banks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-200/90 text-sm">Upload monthly bank fee statements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-200/90 text-sm">Automatic AFP code mapping</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-200/90 text-sm">Fee overbilling detection</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-sm font-bold text-white uppercase tracking-wide">Treasury Dashboard</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-200/90 text-sm">Monthly savings summary report</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-200/90 text-sm">Treasury services inventory</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-200/90 text-sm">Prices increases, billing errors, useless services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-200/90 text-sm">ECR mismatch analysis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-200/90 text-sm">Hands-off banking negotiation</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-bold text-white uppercase tracking-wide">Integrations</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-200/90 text-sm">Import PDF/CSV files</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-200/90 text-sm">Import EDI 822 / camt.086 files</span>
                  </li>
                </ul>
              </div>

              <div className="mt-auto pt-6">
                <button className="w-full rounded-full bg-slate-600/50 px-6 py-4 text-lg font-bold text-white/70 shadow-xl cursor-not-allowed" disabled>
                  Coming Soon
                </button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="group relative flex flex-col rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-white/10 p-8 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:scale-105 hover:border-sky-500/30 hover:shadow-sky-500/20">
              <div className="mb-6 min-h-[140px]">
                <h3 className="mb-2 text-3xl font-bold text-white">Enterprise</h3>
                <p className="mb-4 text-lg font-semibold text-sky-400">Custom</p>
                <p className="text-sm text-blue-200/70 italic">All the features of Pro, and:</p>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-sm font-bold text-white uppercase tracking-wide">Key Features</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-sky-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-200/90 text-sm">6+ connected US banks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-sky-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-200/90 text-sm">SFTP, API bank access & custom connectors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-sky-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-200/90 text-sm">Custom development (ad-hoc reports, RFP)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-sky-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-200/90 text-sm">Monthly benchmark report</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-sky-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-200/90 text-sm">Dedicated implementation manager</span>
                  </li>
                </ul>
              </div>

              <div className="mt-auto pt-6">
                <button className="w-full rounded-full bg-slate-600/50 px-6 py-4 text-lg font-bold text-white/70 shadow-xl cursor-not-allowed" disabled>
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}


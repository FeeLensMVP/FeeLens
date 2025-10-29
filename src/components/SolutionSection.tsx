"use client";

import { motion } from "framer-motion";

const solutionSteps = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: "We lens through",
    description: "Your fee statements get analyzed line by line"
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: "We reveal errors",
    description: "Hidden overcharges and billing mistakes exposed"
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "You save money",
    description: "Improve your bottom line immediately"
  },
];

export default function SolutionSection() {
  return (
    <section id="solution" className="relative z-10 mt-32 scroll-mt-32">
      {/* Large gradient background */}
      <div className="absolute inset-x-0 -top-40 -z-10 h-[600px] bg-gradient-to-b from-transparent via-emerald-500/5 to-white/50" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[32px] border border-emerald-200/40 bg-gradient-to-br from-white/95 via-white/90 to-emerald-50/50 p-12 shadow-[0_20px_80px_-20px_rgba(16,185,129,0.3)] backdrop-blur-xl md:p-16">
          {/* Decorative elements */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />
          
          <div className="relative mx-auto max-w-5xl">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Be the CFO&apos;s hero.
              </h2>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                EY reports that companies reconciling bank fees save <strong className="text-emerald-600">20-30% annually</strong>. 
                We make it effortless.
              </p>
            </div>

            {/* Steps */}
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {solutionSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="relative h-full overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 p-8 shadow-lg shadow-slate-900/5 backdrop-blur-sm transition-all duration-300 hover:border-emerald-300/50 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1">
                    {/* Number badge */}
                    <div className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 text-lg font-bold text-white shadow-lg">
                      {index + 1}
                    </div>
                    
                    {/* Icon */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/10 to-sky-500/10 text-emerald-600 ring-1 ring-emerald-500/20 transition-transform group-hover:scale-110">
                      {step.icon}
                    </div>
                    
                    {/* Content */}
                    <h3 className="mt-6 text-xl font-bold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {step.description}
                    </p>

                    {/* Hover indicator */}
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-500 to-sky-500 transition-all duration-300 group-hover:w-full" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div 
              className="mt-12 grid gap-6 rounded-2xl border border-emerald-200/50 bg-gradient-to-r from-emerald-50/50 to-sky-50/50 p-8 md:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">$24K+</div>
                <div className="mt-1 text-sm text-slate-600">Average savings per client</div>
              </div>
              <div className="text-center border-l border-r border-slate-200/50">
                <div className="text-3xl font-bold text-emerald-600">7 business days</div>
                <div className="mt-1 text-sm text-slate-600">Typical audit turnaround</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">100%</div>
                <div className="mt-1 text-sm text-slate-600">Confidential & secure</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
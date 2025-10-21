"use client";

import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

interface ContextSectionProps {
  image: StaticImageData;
}

const problems = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    title: "Different banks, different formats",
    description: "Each bank uses unique service descriptions and fee structures"
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Cluttered statements",
    description: "Bank fee statements are lengthy, confusing, and full of errors"
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Auto-debited charges",
    description: "Fees get charged automatically — nobody has time to review them"
  }
];

export default function ContextSection({ image }: ContextSectionProps) {
  return (
    <section id="context" className="relative z-10 mt-24 scroll-mt-32">
      {/* Divider with gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute inset-x-0 -top-24 -z-10 h-96 bg-gradient-to-b from-white/5 via-transparent to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Left: Problem Statement */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 backdrop-blur-sm border border-red-500/20">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                The Problem
              </div>
              <h2 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                A complex environment
              </h2>
              <p className="mt-4 text-lg text-blue-100/80">
                Bank fee management is unnecessarily complicated, creating opportunities for overcharges that go unnoticed.
              </p>
            </div>

            <div className="space-y-4">
              {problems.map((problem, index) => (
                <motion.div
                  key={problem.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
                >
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 text-red-300 ring-1 ring-white/10">
                      {problem.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{problem.title}</h3>
                      <p className="mt-1 text-sm text-blue-200/70">{problem.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div 
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Glow effects */}
            <div className="absolute -top-10 -right-10 h-80 w-80 rounded-full bg-gradient-to-br from-red-400/10 via-orange-400/5 to-transparent blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-gradient-to-tl from-sky-400/10 to-transparent blur-3xl" />
            
            <div className="relative">
              <Image
                src={image}
                alt="Bank fees complexity visualization"
                className="relative w-full max-w-lg rounded-[24px] shadow-2xl shadow-red-500/20 ring-1 ring-white/10"
              />
              
              {/* Warning badge */}
              <div className="absolute -top-4 -right-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="text-xs font-semibold text-red-200">High Risk</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
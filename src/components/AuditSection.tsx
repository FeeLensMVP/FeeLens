"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface AuditSectionProps {
  subscribed: boolean;
}

export default function AuditSection({ subscribed }: AuditSectionProps) {
  return (
    <section id="audit" className="relative z-10 mt-32 scroll-mt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[32px] border border-emerald-300/50 bg-gradient-to-br from-emerald-50 via-white to-sky-50 shadow-[0_20px_100px_-20px_rgba(16,185,129,0.5)] backdrop-blur-xl">
          {/* Decorative blurs */}
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
          
          <div className="relative px-8 py-16 text-center md:px-16 md:py-20">
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-5 py-2 text-sm font-semibold text-emerald-700 border border-emerald-500/30 shadow-sm"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Free • No Credit Card Required
            </motion.div>

            {/* Title */}
            <motion.h2 
              className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Request Your Free Audit
            </motion.h2>
            
            <motion.p 
              className="mx-auto mt-4 max-w-2xl text-lg text-slate-700 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Bank fee analysis shouldn&apos;t be such a headache. Let us handle it for you. 
              Upload your statements and get your savings report in 7 business days.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/upload"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-emerald-500/30 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
              >
                <span className="relative z-10">Start Your Free Audit</span>
                <svg className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-600 to-sky-600 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>

              <a
                href="mailto:support@feelens.us?subject=Questions about FeeLens Audit&body=Hi, I have some questions about your bank fee audit service and data security."
                className="group inline-flex items-center gap-2 rounded-full border-2 border-slate-300 bg-white px-10 py-5 text-lg font-semibold text-slate-700 shadow-lg transition-all hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
              >
                <svg className="h-5 w-5 transition-transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Talk to an Expert
              </a>
            </motion.div>

            {/* Reassurance message */}
            <motion.p 
              className="mt-6 text-center text-sm text-slate-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <svg className="inline h-4 w-4 text-emerald-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Questions about data security? Our team is happy to explain our process and safeguards.
            </motion.p>

            {/* Success message */}
            {subscribed && (
              <motion.div
                className="mx-auto mt-8 max-w-md rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-4 shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500">
                    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-emerald-900">
                    Thanks! You&apos;re on the list. We&apos;ll be in touch shortly.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Trust indicators */}
            <motion.div 
              className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-slate-700"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>100% Secure</span>
              </div>
              <div className="h-4 w-px bg-slate-400" />
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <span>Confidential</span>
              </div>
              <div className="h-4 w-px bg-slate-400" />
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span>7-day delivery</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
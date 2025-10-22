"use client";

import { FAQ_DATA } from "@/lib/constants";
import { Card } from "./ui/Card";
import { motion } from "framer-motion";

export default function FaqSection() {
  return (
    <section id="faq" className="relative z-10 w-full scroll-mt-32">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-[32px] border border-white/20 bg-gradient-to-br from-white/95 via-white/90 to-white/85 px-8 py-16 shadow-2xl backdrop-blur-xl md:px-16 md:py-20">
          {/* Decorative blur */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />
          
          <div className="relative">
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-700 border border-emerald-500/20">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                Frequently Asked Questions
              </div>
              <h2 className="mt-6 text-4xl font-bold text-slate-900 sm:text-5xl">FAQ</h2>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                Everything you need to know about FeeLens and our bank fee audit service.
              </p>
            </div>

            {/* FAQ Items */}
            <dl className="mt-12 grid gap-6">
              {FAQ_DATA.map((item, index) => (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="group transition-all hover:shadow-2xl">
                    <dt className="flex items-start gap-3 text-lg font-bold text-slate-900">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 text-xs font-bold text-white">
                        {index + 1}
                      </span>
                      <span>{item.question}</span>
                    </dt>
                    <dd className="mt-4 ml-9 text-base leading-relaxed text-slate-600 whitespace-pre-line">
                      {item.answer}
                    </dd>
                  </Card>
                </motion.div>
              ))}
            </dl>

            {/* CTA */}
            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <p className="text-slate-600 mb-6">Still have questions?</p>
              <a
                href="mailto:support@feelens.us"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/40"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Us
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
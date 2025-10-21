"use client";

import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

interface HeroSectionProps {
  image: StaticImageData;
}

export default function HeroSection({ image }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 sm:py-32 lg:grid-cols-2 lg:gap-20">
        {/* Left Content */}
        <motion.div 
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 backdrop-blur-sm border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Free audit — no payment required
          </div>

          <h1 className="mt-8 text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Stop Fees.
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
              Save More.
            </span>
            <br />
            Bank Smarter.
          </h1>
          
          <p className="mt-6 text-xl leading-relaxed text-blue-100/90">
            Your money should work for you, not your bank.
          </p>
          <p className="mt-3 text-lg leading-relaxed text-blue-200/80">
            We audit all your bank charges from the past 24 months and uncover hidden fees, overcharges, and billing errors.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="#audit"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-emerald-500/25 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <span className="relative z-10">Get started for free</span>
              <svg className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-600 to-sky-600 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
            
            <Link
              href="/upload"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/30 focus:outline-none"
            >
              Upload now
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-10 flex items-center gap-8 text-sm text-blue-200/70">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>Trusted by CFOs</span>
            </div>
            <div className="h-4 w-px bg-white/20" />
            <div>20-30% avg. savings</div>
            <div className="h-4 w-px bg-white/20" />
            <div>7-day turnaround</div>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div 
          className="relative flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Glow effects */}
          <div className="absolute -top-10 -right-10 h-96 w-96 rounded-full bg-gradient-to-tr from-emerald-400/20 via-sky-400/10 to-transparent blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-72 w-72 rounded-full bg-gradient-to-br from-sky-400/15 to-transparent blur-3xl" />
          
          {/* Image container */}
          <div className="relative">
            <Image
              src={image}
              alt="FeeLens dashboard interface"
              priority
              className="relative w-full max-w-2xl rounded-[28px] shadow-2xl shadow-emerald-500/30 ring-1 ring-white/10 transition-transform duration-500 hover:scale-[1.02]"
            />
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-emerald-500 p-2">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">$24K+</div>
                  <div className="text-xs text-blue-200">Avg. saved per client</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
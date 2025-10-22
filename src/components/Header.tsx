"use client";

import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-900/5">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 transition-all hover:scale-105"
          onMouseEnter={() => setHoveredLink(null)}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-sky-500 shadow-lg shadow-emerald-500/25 transition-transform group-hover:rotate-12">
            <span className="text-lg font-bold text-white">F</span>
          </div>
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            FeeLens
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="
            hidden lg:flex items-center gap-2 rounded-full bg-white/90 border border-slate-200/80 p-1.5 shadow-lg shadow-slate-900/5
            absolute left-1/2 -translate-x-1/2
          "
          onMouseLeave={() => setHoveredLink(null)}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative rounded-full px-6 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:text-slate-900"
              onMouseEnter={() => setHoveredLink(link.href)}
            >
              {hoveredLink === link.href && (
                <motion.div
                  className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-emerald-500/10 to-sky-500/10 shadow-sm"
                  layoutId="hover-indicator"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {link.label}
                {hoveredLink === link.href && (
                  <motion.span
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-emerald-500"
                  >
                    →
                  </motion.span>
                )}
              </span>
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/#audit"
          className="
            hidden lg:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 
            px-6 py-3 text-sm font-bold text-white shadow-xl shadow-emerald-500/25
            transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/40
            focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2
          "
          onMouseEnter={() => setHoveredLink(null)}
        >
          Get started for free
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden flex items-center justify-center h-10 w-10 rounded-xl bg-white/90 border border-slate-200 shadow-md transition-all hover:scale-105 active:scale-95"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.svg
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                className="h-5 w-5 text-slate-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.svg
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                className="h-5 w-5 text-slate-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-white/10 bg-white/95 backdrop-blur-xl"
          >
            <nav className="mx-auto max-w-7xl px-6 py-6 space-y-2">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-slate-900 font-semibold transition-all hover:bg-gradient-to-r hover:from-emerald-50 hover:to-sky-50 hover:pl-6"
                  >
                    {link.label}
                    <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/#audit"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-6 py-4 text-white font-bold shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02]"
                >
                  Get started for free
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
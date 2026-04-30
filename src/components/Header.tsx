"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logoImage from "@/assets/images/Ligne Logo Modified.png";

export default function Header() {
  const pathname = usePathname();
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-white/80 backdrop-blur-xl">
      <div className="relative mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" aria-label="FeeLens — Home" className="flex items-center">
          <Image
            src={logoImage}
            alt="FeeLens"
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        <nav
          className="
            hidden lg:flex items-center gap-1 rounded-full border border-slate-200/70
            bg-white/90 p-1 shadow-sm shadow-slate-900/5 backdrop-blur-md
            absolute left-1/2 -translate-x-1/2
          "
          onMouseLeave={() => setHoveredHref(null)}
        >
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            const showHover = hoveredHref === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onMouseEnter={() => setHoveredHref(link.href)}
                className="relative rounded-full px-5 py-2 text-[13.5px] font-medium tracking-tight text-slate-700 transition-colors duration-150 hover:text-slate-900"
              >
                {showHover && (
                  <motion.span
                    layoutId="nav-hover"
                    className="absolute inset-0 -z-0 rounded-full bg-slate-100"
                    transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    active ? "text-slate-900" : ""
                  }`}
                >
                  {link.label}
                </span>
                {active && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 -bottom-[3px] h-[3px] w-1 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/#audit"
          className="
            hidden lg:inline-flex items-center gap-2 rounded-full
            bg-gradient-to-r from-emerald-500 to-sky-500
            px-5 py-2.5 text-[13.5px] font-semibold text-white
            shadow-md shadow-emerald-500/20
            transition-shadow duration-200 hover:shadow-lg hover:shadow-emerald-500/30
            focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2
          "
        >
          Get started for free
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.25}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 transition-colors hover:bg-white"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M4 7h16M4 12h16M4 17h16"
              />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="lg:hidden overflow-hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-xl"
          >
            <nav className="mx-auto max-w-7xl px-6 py-4">
              <ul className="flex flex-col">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between border-b border-slate-100 py-3 text-[15px] font-medium transition-colors ${
                          active
                            ? "text-slate-900"
                            : "text-slate-700 hover:text-slate-900"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {active && (
                            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500" />
                          )}
                          {link.label}
                        </span>
                        <svg
                          className="h-4 w-4 text-slate-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4">
                <Link
                  href="/#audit"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 text-[14px] font-semibold text-white shadow-md shadow-emerald-500/20 transition-shadow hover:shadow-lg hover:shadow-emerald-500/30"
                >
                  Get started for free
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.25}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

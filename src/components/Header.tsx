// Fichier : src/components/Header.tsx

"use client";

import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-white/60 backdrop-blur-lg">
      
      {/* CORRECTION : Le conteneur parent est 'relative' pour que la nav 'absolute' se positionne par rapport à lui. */}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter text-slate-900 transition-opacity hover:opacity-80"
          onMouseEnter={() => setHoveredLink(null)}
        >
          FeeLens
        </Link>

        {/* CORRECTION : On réintroduit le centrage absolu et on agrandit la barre. */}
        <nav
          className="
            hidden lg:flex items-center gap-4 rounded-full bg-slate-200/50 border border-white/50 p-2
            absolute left-1/2 -translate-x-1/2
          "
          onMouseLeave={() => setHoveredLink(null)}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              // MODIFIÉ : Padding et taille de police augmentés pour un look plus "grand".
              className="relative rounded-full px-6 py-2 text-base font-semibold text-slate-700 transition-colors hover:text-slate-900"
              onMouseEnter={() => setHoveredLink(link.href)}
            >
              {hoveredLink === link.href && (
                <motion.div
                  className="absolute inset-0 z-0 rounded-full bg-white shadow-md"
                  layoutId="hover-indicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </Link>
          ))}
        </nav>

        <Link
          href="/upload"
          className="
            hidden lg:inline-flex items-center rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 
            px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20
            transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/30
            focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400
          "
          onMouseEnter={() => setHoveredLink(null)}
        >
          Get started for free
        </Link>
      </div>
    </header>
  );
}
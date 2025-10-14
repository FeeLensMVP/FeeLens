// On importe Link pour une navigation optimisée côté client
import Link from "next/link";
// On importe notre "liste d'ingrédients"
import { NAV_LINKS } from "@/lib/constants";

export default function Header() {
  return (
    <header className="relative z-20 border-b border-white/10 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-xl font-semibold tracking-tight text-slate-900">
          FeeLens
        </Link>
        
        {/* C'EST ICI QUE LA NAVIGATION EST CONSTRUITE */}
        <nav className="hidden items-center gap-3 rounded-full border border-white/40 bg-white/70 px-6 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur lg:flex">
          {/* On boucle sur chaque lien de notre constante NAV_LINKS */}
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1 transition hover:bg-slate-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#audit"
          className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2"
        >
          Get started for free
        </Link>
      </div>
    </header>
  );
}
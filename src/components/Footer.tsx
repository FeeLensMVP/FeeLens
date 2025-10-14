export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-24 border-t border-white/20 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row">
        <span className="font-medium text-slate-700">© {currentYear} FeeLens</span>
        <p>Founder: Background with 8+ years of experience in corporate treasury & banking audits.</p>
        <p>
          Contact:{" "}
          <a href="mailto:support@feelens.us" className="font-medium text-emerald-600 transition hover:text-emerald-500">
            support@feelens.us
          </a>
        </p>
      </div>
    </footer>
  );
}
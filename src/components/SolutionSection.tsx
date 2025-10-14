import { Card } from "./ui/Card";

// On peut même sortir le contenu dans une constante pour plus de clarté
const solutionPoints = [
  "✅ We lens through your fee statements",
  "✅ We reveal any billing errors",
  "✅ You improve your bottom line",
];

export default function SolutionSection() {
  return (
    <section id="solution" className="relative z-10 mt-20 scroll-mt-32">
      {/* Background gradient */}
      <div className="absolute inset-x-0 -top-32 -z-10 h-[520px] bg-gradient-to-b from-transparent via-emerald-500/10 to-white" />

      <div className="mx-auto max-w-6xl rounded-[44px] border border-emerald-200/50 bg-white/80 px-8 py-16 shadow-[0_60px_120px_-50px_rgba(14,116,144,0.35)] backdrop-blur">
        <div className="mx-auto max-w-3xl text-center">
        <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">Be the CFO&apos;s hero.</h2>
          <p className="mt-4 text-base text-slate-600">
            EY reports that companies reconciling bank fees save 20-30% annually.
          </p>

          <ul className="mt-8 grid gap-4 text-lg font-medium text-slate-700 md:grid-cols-3">
            {solutionPoints.map((point) => (
              <li key={point}>
                <Card className="px-6 py-8 shadow-lg shadow-emerald-500/10">{point}</Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
import { FAQ_DATA } from "@/lib/constants";
import { Card } from "./ui/Card";

export default function FaqSection() {
  return (
    <section id="faq" className="relative z-10 mt-24 scroll-mt-32">
      <div className="mx-auto max-w-6xl rounded-[44px] border border-white/30 bg-white/80 px-8 py-16 shadow-xl backdrop-blur">
        <h2 className="text-3xl font-bold text-center text-slate-900">FAQ</h2>
        <dl className="mx-auto mt-10 grid max-w-3xl gap-6">
          {FAQ_DATA.map((item) => (
            <Card key={item.question}>
              <dt className="font-semibold text-slate-900">{item.question}</dt>
              <dd className="mt-2 text-sm text-slate-600 whitespace-pre-line">{item.answer}</dd>
            </Card>
          ))}
        </dl>
      </div>
    </section>
  );
}
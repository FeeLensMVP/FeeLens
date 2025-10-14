import Image, { StaticImageData } from "next/image";

interface ContextSectionProps {
  image: StaticImageData;
}

export default function ContextSection({ image }: ContextSectionProps) {
  return (
    <section id="context" className="relative z-10 mt-12 scroll-mt-32 border-t border-white/10">
      {/* Background gradient */}
      <div className="absolute inset-x-0 -top-24 -z-10 h-64 bg-gradient-to-b from-white/20 via-white/0 to-transparent" />

      <div className="mx-auto grid max-w-6xl gap-12 px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold tracking-tight text-white">A complex environment</h2>
            <div className="space-y-3 text-base text-white">
              <p>Different banks &gt; different formats &gt; different service descriptions</p>
              <p>Bank fee statements are cluttered, lengthy, and full of errors.</p>
              <p>Bank charges get auto-debited, nobody takes time to review them.</p>
            </div>
          </div>

          {/* Complex environment image with subtle glow */}
          <div className="relative flex justify-center">
            <div className="absolute -top-10 right-0 h-40 w-40 rounded-full bg-gradient-to-br from-sky-400/10 via-emerald-400/10 to-transparent blur-2xl" />
            <Image
              src={image}
              alt="Bank fees complexity visualization"
              className="relative w-full max-w-sm rounded-[32px] shadow-[0_30px_90px_-30px_rgba(56,189,248,0.45)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
import Image, { StaticImageData } from "next/image";

interface HeroSectionProps {
  image: StaticImageData;
}

export default function HeroSection({ image }: HeroSectionProps) {
  return (
    <section className="relative">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 sm:py-32 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-2xl">
          <h1 className="mt-6 space-y-2 text-5xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-6xl">
            <div>Stop Fees.</div>
            <div>Save More.</div>
            <div>Bank Smarter.</div>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-blue-100">
            Your money should work for you, not your bank.
          </p>
          <p className="mt-2 max-w-xl text-blue-100">
            We audit all your bank charges from the past 24 months.
          </p>
          <div className="mt-8">
            <a
              href="#audit"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2"
            >
              Get started for free
            </a>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="absolute -top-10 right-0 h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-400/20 via-sky-400/10 to-transparent blur-3xl" />
          <Image
            src={image}
            alt="FeeLens dashboard"
            priority // 'priority' dit à Next.js de charger cette image en premier car elle est importante
            className="relative w-full max-w-xl rounded-[36px] filter drop-shadow-[0_20px_50px_rgba(45,212,191,0.45)]"
          />
        </div>
      </div>
    </section>
  );
}
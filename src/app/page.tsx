import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ContextSection from "@/components/ContextSection";
import SolutionSection from "@/components/SolutionSection";
import AuditSection from "@/components/AuditSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

import logoWatermark from "@/assets/logo.png";
import dashboardImage from "@/assets/images/FeeLens-dashboard.png";
import complexEnvImage from "@/assets/images/FeeLens-complex-env.png";


export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const subscribed = searchParams?.subscribed === "1";

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,_#0A1F44_0%,_#071635_45%,_#0D2B6C_70%,_#0F2250_85%,_white_100%)] text-gray-900">
      {/* Les éléments de fond restent ici car ils couvrent toute la page */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 right-[-10%] h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute -left-20 top-40 h-96 w-96 rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[10%] h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <Header />
      <main className="relative z-10">
        <HeroSection image={dashboardImage} />
        <ContextSection image={complexEnvImage} />
        <SolutionSection />
        <AuditSection subscribed={subscribed} />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
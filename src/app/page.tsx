import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ContextSection from "@/components/ContextSection";
import SolutionSection from "@/components/SolutionSection";
import AuditSection from "@/components/AuditSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground"; // On importe le nouveau composant
import dashboardImage from "@/assets/images/FeeLens-dashboard.png";
import complexEnvImage from "@/assets/images/FeeLens-complex-env.png";

export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const subscribed = searchParams?.subscribed === "1";

  return (
    <div className="relative overflow-x-hidden bg-[radial-gradient(circle_at_top,_#0A1F44_0%,_#071635_45%,_#0D2B6C_70%,_#0F2250_85%,_white_100%)] text-gray-900">
      {/* On utilise le composant de fond ici */}
      <PageBackground />

      <Header />
      <main className="flex-grow">
        <HeroSection image={dashboardImage} />
        <ContextSection image={complexEnvImage} />
        <SolutionSection />
        <AuditSection subscribed={subscribed} />
      </main>
      <Footer />
    </div>
  );
}
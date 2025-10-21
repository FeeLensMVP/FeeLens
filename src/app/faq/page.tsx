import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";
import PageBackground from "@/components/PageBackground";

export default function FaqPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,_#0A1F44_0%,_#071635_45%,_#0D2B6C_70%,_#0F2250_85%,_white_100%)] text-gray-900">
      <PageBackground />
      
      <Header />
      <main className="flex flex-grow items-center justify-center px-4 py-16 sm:py-24">
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
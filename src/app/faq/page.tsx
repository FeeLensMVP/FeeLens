import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";
import PageBackground from "@/components/PageBackground"; // On importe le nouveau composant

export default function FaqPage() {
  return (
    // On applique le même fond que la page d'accueil
    <div className="relative overflow-x-hidden bg-[radial-gradient(circle_at_top,_#0A1F44_0%,_#071635_45%,_#0D2B6C_70%,_#0F2250_85%,_white_100%)] text-gray-900">
      {/* On utilise le composant de fond ici */}
      <PageBackground />
      
      <Header />
      <main className="flex flex-grow items-center justify-center px-4 py-24 sm:py-32">
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";

export default function FaqPage() {
  return (
    // On utilise un fragment (<>...</>) car on n'a pas besoin d'une div globale ici
    <>
      <Header />
      <main className="flex min-h-screen items-start justify-center bg-slate-50 px-4 py-24 sm:py-32">
        {/* On réutilise le composant FaqSection, c'est la beauté de React ! */}
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
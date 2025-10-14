"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";
// import { UploadDropzone } from "@/utils/uploadthing";

export default function UploadPage() {
  return (
    // MODIFIÉ : Changement de la couleur de texte par défaut
    <div className="relative overflow-x-hidden bg-[radial-gradient(circle_at_top,_#0A1F44_0%,_#071635_45%,_#0D2B6C_70%,_#0F2250_85%,_white_100%)] text-white">
      <PageBackground />
      
      <Header />
      <main className="flex flex-grow flex-col items-center px-4 py-24 sm:py-32">
        <div className="w-full max-w-3xl text-center">
          {/* MODIFIÉ : Texte en anglais et couleur en blanc */}
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Start Your Free Audit
          </h1>
          {/* MODIFIÉ : Texte en anglais et couleur en bleu clair */}
          <p className="mt-4 text-lg text-blue-100">
            Securely upload your bank fee statements for the past 24 months. Accepted formats: PDF, CSV, Excel.
          </p>
        </div>
        <div className="mt-12 w-full max-w-2xl rounded-xl border-2 border-dashed border-slate-300 bg-white/5 p-8 backdrop-blur-sm">
          {/* MODIFIÉ : Texte en anglais et couleur en gris clair */}
          <div className="text-center text-slate-300">
            The upload component will appear here.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";
import { useState } from "react";
import Link from "next/link";
// On importe depuis notre nouveau fichier utilitaire, comme le recommande la nouvelle doc
import { UploadDropzone } from "@/utils/uploadthing";
import { File, Loader2 } from "lucide-react";

// On définit un type plus précis pour les fichiers uploadés
type UploadedFile = {
  key: string;
  name: string;
  url: string;
  size: number;
};

export default function UploadPage() {
  const [formData, setFormData] = useState({ name: "", company: "", email: "" });
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/audit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, files: uploadedFiles }),
      });

      if (!response.ok) throw new Error("Submission failed. Please try again.");
      
      setIsComplete(true); // Affiche le message de succès
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Le formulaire n'est valide que si tous les champs sont remplis ET au moins un fichier est uploadé.
  const isFormValid = formData.name && formData.company && formData.email && uploadedFiles.length > 0;

  // Si le formulaire est soumis avec succès, on affiche un message de remerciement.
  if (isComplete) {
    return (
      <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_#0A1F44_0%,_#071635_45%,_#0D2B6C_70%,_#0F2250_85%,_white_100%)] text-white">
        <PageBackground />
        <Header />
        <main className="flex flex-grow flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl font-bold">Thank You!</h1>
          <p className="mt-4 text-lg text-blue-100">Your audit request has been submitted successfully.<br/>We will be in touch shortly.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_#0A1F44_0%,_#071635_45%,_#0D2B6C_70%,_#0F2250_85%,_white_100%)] text-white">
      <PageBackground />
      <Header />
      <main className="flex flex-grow flex-col items-center px-4 py-16 sm:py-24">
        <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-8">
          {/* Étape 1: Informations */}
          <div>
            <h2 className="text-2xl font-semibold">Step 1: Your Information</h2>
            <div className="mt-4 space-y-4">
              <input type="text" name="name" placeholder="Full Name" onChange={handleInputChange} required className="w-full rounded-md border-white/20 bg-white/10 p-3 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300" />
              <input type="text" name="company" placeholder="Company Name" onChange={handleInputChange} required className="w-full rounded-md border-white/20 bg-white/10 p-3 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300" />
              <input type="email" name="email" placeholder="Work Email" onChange={handleInputChange} required className="w-full rounded-md border-white/20 bg-white/10 p-3 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300" />
            </div>
          </div>
          
          {/* Étape 2: Upload des Fichiers */}
          <div>
            <h2 className="text-2xl font-semibold">Step 2: Upload Statements</h2>
            <div className="mt-4 rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <UploadDropzone
                endpoint="statementUploader"
                onClientUploadComplete={(res) => {
                  if (res) {
                    setUploadedFiles((prevFiles) => [...prevFiles, ...res]);
                  }
                }}
                onUploadError={(error: Error) => alert(`Upload Failed: ${error.message}`)}
                appearance={{ container: { padding: "1rem", border: "none" }, uploadIcon: { width: "48px" }, label: { color: "#a7bde8" } }}
              />
              {uploadedFiles.length > 0 && (
                <div className="mt-4 text-left">
                  <h3 className="font-semibold">Uploaded files:</h3>
                  <ul className="mt-2 space-y-1">
                    {uploadedFiles.map(file => (
                      <li key={file.key} className="flex items-center gap-2 text-sm text-slate-300">
                        <File className="h-4 w-4 shrink-0" />
                        <span>{file.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Étape 3: Soumission */}
          <div>
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="w-full rounded-md bg-gradient-to-r from-emerald-500 to-sky-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-50 hover:enabled:scale-[1.02]"
            >
              {isSubmitting ? <Loader2 className="mx-auto animate-spin" /> : "Submit Audit Request"}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
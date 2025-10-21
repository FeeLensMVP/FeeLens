// Fichier : src/app/upload/page.tsx

"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";
import { useState } from "react";
import Link from "next/link";
import { UploadDropzone } from "@/utils/uploadthing";
import { File, Loader2, CheckCircle } from "lucide-react";

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
      
      setIsComplete(true);
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const isFormValid = formData.name && formData.company && formData.email && uploadedFiles.length > 0;

  if (isComplete) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_#0A1F44_0%,_#071635_45%,_#0D2B6C_70%,_#0F2250_85%,_white_100%)] text-white">
        <PageBackground />
        <Header />
        <main className="flex flex-grow flex-col items-center justify-center px-4 py-32 text-center">
          <div className="w-full max-w-lg rounded-3xl border border-emerald-200/40 bg-gradient-to-br from-white/10 to-white/5 p-12 text-center backdrop-blur-xl shadow-2xl">
            {/* Success icon with animation */}
            <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">
              <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/20"></div>
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-lg shadow-emerald-500/50">
                <CheckCircle className="h-12 w-12 text-white" strokeWidth={2.5} />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold">Thank You!</h1>
            <p className="mt-4 text-xl text-blue-100">
              Your audit request has been submitted successfully.
            </p>
            <p className="mt-3 text-base text-blue-200/80">
              We will analyze your files and send you a detailed savings report within 7 business days.
            </p>

            {/* Info boxes */}
            <div className="mt-8 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-3 text-left">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                  <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Check your email</p>
                  <p className="text-xs text-blue-200/70">Confirmation sent to your inbox</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-left">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500/20">
                  <svg className="h-5 w-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">We&apos;re on it</p>
                  <p className="text-xs text-blue-200/70">Our team is reviewing your documents</p>
                </div>
              </div>
            </div>
            
            <Link 
              href="/"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-emerald-500/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/50"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_#0A1F44_0%,_#071635_45%,_#0D2B6C_70%,_#0F2250_85%,_white_100%)] text-white">
      <PageBackground />
      <Header />
      <main className="flex flex-grow flex-col items-center px-4 py-16 sm:py-24">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 backdrop-blur-sm border border-emerald-500/20">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Free Audit • 7-Day Turnaround
          </div>
          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">Upload Your Documents</h1>
          <p className="mt-4 text-lg text-blue-200/80 max-w-2xl mx-auto">
            Submit your bank fee statements and pricing agreements. Our AI will analyze them and identify potential savings.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-8">
          {/* Step 1: Your Information */}
          <div className="rounded-3xl border border-white/20 bg-white/5 p-8 backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 text-lg font-bold text-white">
                1
              </div>
              <h2 className="text-2xl font-bold">Your Information</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-blue-100">Full Name</label>
                <input 
                  value={formData.name} 
                  type="text" 
                  name="name" 
                  placeholder="John Doe" 
                  onChange={handleInputChange} 
                  required 
                  className="w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white placeholder:text-slate-400 backdrop-blur-sm transition-all focus:border-emerald-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-emerald-300/50" 
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-blue-100">Company Name</label>
                <input 
                  value={formData.company} 
                  type="text" 
                  name="company" 
                  placeholder="Acme Corporation" 
                  onChange={handleInputChange} 
                  required 
                  className="w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white placeholder:text-slate-400 backdrop-blur-sm transition-all focus:border-emerald-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-emerald-300/50" 
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-blue-100">Work Email</label>
                <input 
                  value={formData.email} 
                  type="email" 
                  name="email" 
                  placeholder="john@acme.com" 
                  onChange={handleInputChange} 
                  required 
                  className="w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white placeholder:text-slate-400 backdrop-blur-sm transition-all focus:border-emerald-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-emerald-300/50" 
                />
              </div>
            </div>
          </div>
          
          {/* Step 2: Upload Statements */}
          <div className="rounded-3xl border border-white/20 bg-white/5 p-8 backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 text-lg font-bold text-white">
                2
              </div>
              <h2 className="text-2xl font-bold">Upload Statements</h2>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              {formData.company ? (
                <UploadDropzone
                  endpoint="statementUploader"
                  input={{ companyName: formData.company }}
                  onClientUploadComplete={(res) => {
                    if (res) {
                      setUploadedFiles((prevFiles) => [...prevFiles, ...res]);
                    }
                  }}
                  onUploadError={(error: Error) => alert(`Upload Failed: ${error.message}`)}
                  appearance={{
                    container: { padding: "1.5rem", border: "none" },
                    uploadIcon: { width: "56px" },
                    label: { color: "#bfdbfe", fontSize: "16px" },
                    button: `
                      w-full mt-6 rounded-xl px-6 py-4 text-base font-semibold text-white
                      bg-gradient-to-r from-emerald-500 to-sky-500
                      hover:from-emerald-600 hover:to-sky-600
                      shadow-lg shadow-emerald-500/25
                      transition-all duration-300
                      ut-uploading:cursor-not-allowed
                      ut-uploading:opacity-50
                    `,
                  }}
                />
              ) : (
                <div className="flex h-48 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/20 text-center">
                  <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="mt-4 text-slate-300">Please enter a company name first</p>
                  <p className="mt-1 text-sm text-slate-400">Then you can upload your documents</p>
                </div>
              )}
              {uploadedFiles.length > 0 && (
                <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold text-emerald-300">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Uploaded files ({uploadedFiles.length})
                  </h3>
                  <ul className="space-y-2">
                    {uploadedFiles.map(file => (
                      <li key={file.key} className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
                        <File className="h-5 w-5 shrink-0 text-emerald-400" />
                        <span className="flex-1 truncate text-sm text-slate-200">{file.name}</span>
                        <span className="text-xs text-slate-400">{(file.size / 1024).toFixed(1)} KB</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Step 3: Submission */}
          <div className="rounded-3xl border border-white/20 bg-white/5 p-8 backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 text-lg font-bold text-white">
                3
              </div>
              <h2 className="text-2xl font-bold">Submit Request</h2>
            </div>
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-sky-500 px-8 py-5 text-xl font-bold text-white shadow-2xl shadow-emerald-500/30 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 hover:enabled:scale-[1.02] hover:enabled:shadow-emerald-500/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Submit Audit Request
                  <svg className="h-6 w-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              )}
            </button>
            <p className="mt-4 text-center text-sm text-blue-200/60">
              By submitting, you agree to our terms and privacy policy
            </p>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
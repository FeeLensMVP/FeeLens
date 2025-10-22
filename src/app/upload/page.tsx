// Fichier : src/app/upload/page.tsx

"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";
import { useState } from "react";
import Link from "next/link";
import { UploadDropzone } from "@/utils/uploadthing";
import { File, Loader2, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";

type UploadedFile = {
  key: string;
  name: string;
  url: string;
  size: number;
  type: 'statement' | 'pricing';
};

type UploadInput = {
  companyName: string;
  documentType: 'statement' | 'pricing';
};

export default function UploadPage() {
  const [formData, setFormData] = useState({ name: "", company: "", email: "" });
  const [uploadedStatements, setUploadedStatements] = useState<UploadedFile[]>([]);
  const [uploadedPricing, setUploadedPricing] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

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
        body: JSON.stringify({ 
          ...formData, 
          statements: uploadedStatements,
          pricing: uploadedPricing 
        }),
      });

      if (!response.ok) throw new Error("Submission failed. Please try again.");
      
      setIsComplete(true);
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const isFormValid = formData.name && formData.company && formData.email && 
                     (uploadedStatements.length > 0 || uploadedPricing.length > 0);

  const canProceedToStep2 = formData.name && formData.company && formData.email;
  const canProceedToStep3 = uploadedStatements.length > 0;
  const canProceedToStep4 = uploadedPricing.length > 0;
  const canSubmit = isFormValid;

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (isComplete) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_#0A1F44_0%,_#071635_45%,_#0D2B6C_70%,_#0F2250_85%,_white_100%)] text-white">
        <PageBackground />
        <Header />
        <main className="flex flex-grow flex-col items-center justify-center px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            {/* Animation de succès */}
            <div className="relative mb-12">
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 shadow-2xl shadow-emerald-500/30">
                <CheckCircle className="h-16 w-16 text-white" />
              </div>
              {/* Particules animées */}
              <div className="absolute -top-4 -right-4 h-8 w-8 rounded-full bg-emerald-400 animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 h-6 w-6 rounded-full bg-sky-400 animate-pulse"></div>
            </div>
            
            <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                Thank You!
              </span>
            </h1>
            
            <p className="mb-12 text-xl text-blue-200/90 leading-relaxed max-w-2xl mx-auto">
              Your documents have been submitted successfully. We&apos;ll analyze your bank fee statements and pricing agreement, 
              and send you a detailed savings report within 7 business days.
            </p>

            {/* Carte d'information élégante */}
            <div className="mx-auto mb-12 max-w-lg rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-white/10 p-8 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30">
                  <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">What happens next?</h3>
              </div>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
                    <span className="text-xs font-bold text-emerald-400">1</span>
                  </div>
                  <span className="text-blue-200/80">AI analysis of your documents</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/20">
                    <span className="text-xs font-bold text-sky-400">2</span>
                  </div>
                  <span className="text-blue-200/80">Identification of potential savings</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
                    <span className="text-xs font-bold text-emerald-400">3</span>
                  </div>
                  <span className="text-blue-200/80">Results delivered via email</span>
                </div>
              </div>
            </div>
            
            <Link 
              href="/"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/40"
            >
              <svg className="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-sky-500/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm border border-white/20 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </div>
              <span>🔒 Secure Upload Portal</span>
            </div>
          </div>
          <h1 className="mt-8 text-5xl font-bold text-white sm:text-6xl">
            Submit Your
            <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent"> Documents</span>
          </h1>
          <p className="mt-6 text-xl text-blue-100/90 max-w-3xl mx-auto leading-relaxed">
            Submit your bank fee statements and pricing agreements. Our AI will analyze them and identify potential savings.
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-blue-200/70">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>100% Secure</span>
            </div>
            <div className="h-4 w-px bg-blue-300/30"></div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              <span>Confidential</span>
            </div>
            <div className="h-4 w-px bg-blue-300/30"></div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>7-day delivery</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mx-auto max-w-2xl mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                  step <= currentStep 
                    ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg' 
                    : 'bg-white/10 text-blue-200/50 border border-white/20'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`h-1 w-16 mx-2 rounded-full ${
                    step < currentStep ? 'bg-gradient-to-r from-emerald-500 to-sky-500' : 'bg-white/10'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm text-blue-200/70">
              Step {currentStep} of 4: {
                currentStep === 1 ? 'Contact Information' :
                currentStep === 2 ? 'Bank Statements' :
                currentStep === 3 ? 'Pricing Agreement' :
                'Review & Submit'
              }
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-3xl">
          {/* Step 1: Contact Information */}
          {currentStep === 1 && (
            <div className="rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-white/10 p-8 backdrop-blur-xl shadow-2xl">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 text-xl font-bold text-white shadow-lg">
                  1
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Contact Information</h2>
                  <p className="text-blue-200/70">Tell us about yourself and your company</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-4 text-white placeholder-blue-200/50 backdrop-blur-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 group-hover:bg-white/15"
                    placeholder="John Smith"
                  />
                </div>
                <div className="group">
                  <label htmlFor="company" className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <svg className="h-4 w-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-4 text-white placeholder-blue-200/50 backdrop-blur-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 group-hover:bg-white/15"
                    placeholder="Acme Corporation"
                  />
                </div>
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-4 text-white placeholder-blue-200/50 backdrop-blur-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 group-hover:bg-white/15"
                    placeholder="john@acme.com"
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceedToStep2}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-emerald-500/30 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 hover:enabled:scale-105 hover:enabled:shadow-emerald-500/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
                >
                  <span>Next: Bank Statements</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Bank Statements */}
          {currentStep === 2 && (
            <div className="rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-white/10 p-8 backdrop-blur-xl shadow-2xl">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 text-xl font-bold text-white shadow-lg">
                  2
                </div>
          <div>
                  <h2 className="text-2xl font-bold text-white">Bank Fee Statements</h2>
                  <p className="text-blue-200/70">Upload your monthly bank fee statements</p>
                </div>
              </div>
              
              <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 p-6 backdrop-blur-sm shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30">
                    <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">Bank Fee Statements</h3>
                    <p className="text-sm text-emerald-200/80">Monthly fee statements from your bank</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">Required</span>
                </div>
                <p className="mb-4 text-sm text-slate-300">Upload your monthly bank fee statements</p>
                <p className="mb-2 text-xs text-slate-400">Accepted files: PDF & CSV</p>
                
              {formData.company ? (
                <UploadDropzone
                  endpoint="statementUploader"
                    input={{ companyName: formData.company, documentType: 'statement' } as UploadInput}
                  onClientUploadComplete={(res) => {
                    if (res) {
                        const filesWithType = res.map(file => ({ ...file, type: 'statement' as const }));
                        setUploadedStatements((prevFiles) => [...prevFiles, ...filesWithType]);
                    }
                  }}
                  onUploadError={(error: Error) => alert(`Upload Failed: ${error.message}`)}
                  appearance={{
                      container: { padding: "1.5rem", border: "none" },
                    uploadIcon: { width: "48px" },
                      label: { color: "#bfdbfe", fontSize: "14px" },
                    button: `
                        w-full mt-4 rounded-xl px-6 py-3 text-sm font-semibold text-white
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
                  <div className="flex h-32 flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 text-center">
                    <svg className="mx-auto h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="mt-2 text-sm text-slate-400">Enter company name first</p>
                  </div>
                )}
                
                {uploadedStatements.length > 0 && (
                  <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-300">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Statements ({uploadedStatements.length})
                    </h4>
                    <ul className="space-y-1">
                      {uploadedStatements.map(file => (
                        <li key={file.key} className="flex items-center gap-2 rounded-lg bg-white/5 p-2">
                          <File className="h-4 w-4 shrink-0 text-emerald-400" />
                          <span className="flex-1 truncate text-xs text-slate-200">{file.name}</span>
                          <span className="text-xs text-slate-400">{(file.size / 1024).toFixed(1)} KB</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceedToStep3}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-emerald-500/30 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 hover:enabled:scale-105 hover:enabled:shadow-emerald-500/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
                >
                  <span>Next: Pricing Agreement</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Pricing Agreement */}
          {currentStep === 3 && (
            <div className="rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-white/10 p-8 backdrop-blur-xl shadow-2xl">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 text-xl font-bold text-white shadow-lg">
                  3
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Pricing Agreement</h2>
                  <p className="text-blue-200/70">Upload your bank pricing agreement</p>
                </div>
              </div>
              
              <div className="rounded-2xl border border-sky-500/20 bg-gradient-to-br from-sky-500/5 to-sky-500/10 p-6 backdrop-blur-sm shadow-lg hover:shadow-sky-500/10 transition-all duration-300">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/20 border border-sky-500/30">
                    <svg className="h-5 w-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">Pricing Agreement</h3>
                    <p className="text-sm text-sky-200/80">Your bank&apos;s pricing schedule</p>
                  </div>
                  <span className="rounded-full bg-sky-500/20 px-3 py-1 text-xs font-semibold text-sky-300 border border-sky-500/30">Required</span>
                </div>
                <p className="mb-4 text-sm text-slate-300">Upload your bank pricing agreement</p>
                <p className="mb-2 text-xs text-slate-400">Accepted files: PDF & CSV</p>
                
                {formData.company ? (
                  <UploadDropzone
                    endpoint="statementUploader"
                    input={{ companyName: formData.company, documentType: 'pricing' } as UploadInput}
                    onClientUploadComplete={(res) => {
                      if (res) {
                        const filesWithType = res.map(file => ({ ...file, type: 'pricing' as const }));
                        setUploadedPricing((prevFiles) => [...prevFiles, ...filesWithType]);
                      }
                    }}
                    onUploadError={(error: Error) => alert(`Upload Failed: ${error.message}`)}
                    appearance={{
                      container: { padding: "1.5rem", border: "none" },
                      uploadIcon: { width: "48px" },
                      label: { color: "#bfdbfe", fontSize: "14px" },
                      button: `
                        w-full mt-4 rounded-xl px-6 py-3 text-sm font-semibold text-white
                        bg-gradient-to-r from-sky-500 to-emerald-500
                        hover:from-sky-600 hover:to-emerald-600
                        shadow-lg shadow-sky-500/25
                        transition-all duration-300
                        ut-uploading:cursor-not-allowed
                        ut-uploading:opacity-50
                      `,
                    }}
                  />
                ) : (
                  <div className="flex h-32 flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 text-center">
                    <svg className="mx-auto h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2 text-sm text-slate-400">Enter company name first</p>
                </div>
              )}
                
                {uploadedPricing.length > 0 && (
                  <div className="mt-4 rounded-xl border border-sky-500/20 bg-sky-500/5 p-3">
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-sky-300">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Pricing Agreement ({uploadedPricing.length})
                    </h4>
                    <ul className="space-y-1">
                      {uploadedPricing.map(file => (
                        <li key={file.key} className="flex items-center gap-2 rounded-lg bg-white/5 p-2">
                          <File className="h-4 w-4 shrink-0 text-sky-400" />
                          <span className="flex-1 truncate text-xs text-slate-200">{file.name}</span>
                          <span className="text-xs text-slate-400">{(file.size / 1024).toFixed(1)} KB</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceedToStep4}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-emerald-500/30 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 hover:enabled:scale-105 hover:enabled:shadow-emerald-500/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
                >
                  <span>Next: Review & Submit</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-white/10 p-8 backdrop-blur-xl shadow-2xl">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 text-xl font-bold text-white shadow-lg">
                  4
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Review & Submit</h2>
                  <p className="text-blue-200/70">Review your information before submitting</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Contact Information Review */}
                <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 p-8 backdrop-blur-sm shadow-lg">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30">
                      <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Contact Information</h3>
                      <p className="text-sm text-emerald-200/80">Your personal and company details</p>
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between rounded-lg bg-white/5 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
                          <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <span className="text-blue-200/70 font-medium">Full Name</span>
                      </div>
                      <span className="text-white font-semibold">{formData.name}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-white/5 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/20">
                          <svg className="h-4 w-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <span className="text-blue-200/70 font-medium">Company</span>
                      </div>
                      <span className="text-white font-semibold">{formData.company}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-white/5 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
                          <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-blue-200/70 font-medium">Email Address</span>
                      </div>
                      <span className="text-white font-semibold">{formData.email}</span>
                    </div>
                  </div>
                </div>

                {/* Documents Review */}
                <div className="rounded-2xl border border-sky-500/20 bg-gradient-to-br from-sky-500/5 to-sky-500/10 p-8 backdrop-blur-sm shadow-lg">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/20 border border-sky-500/30">
                      <svg className="h-6 w-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Documents</h3>
                      <p className="text-sm text-sky-200/80">Files ready for analysis</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg bg-white/5 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
                          <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <span className="text-blue-200/70 font-medium">Bank Statements</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400 font-semibold">{uploadedStatements.length} file{uploadedStatements.length !== 1 ? 's' : ''}</span>
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
                          <svg className="h-3 w-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-white/5 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/20">
                          <svg className="h-4 w-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-blue-200/70 font-medium">Pricing Agreement</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sky-400 font-semibold">{uploadedPricing.length} file{uploadedPricing.length !== 1 ? 's' : ''}</span>
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/20">
                          <svg className="h-3 w-3 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
            </div>
          </div>

                {/* Summary */}
                <div className="rounded-2xl border border-gradient-to-r from-emerald-500/20 to-sky-500/20 bg-gradient-to-br from-emerald-500/5 via-sky-500/5 to-emerald-500/5 p-8 backdrop-blur-sm shadow-lg">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500/20 to-sky-500/20 border border-emerald-500/30">
                      <svg className="h-6 w-6 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
          <div>
                      <h3 className="text-xl font-bold text-white">Ready to Submit</h3>
                      <p className="text-sm text-emerald-200/80">Your audit request is complete</p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/5 p-6">
                    <p className="text-emerald-200/90 leading-relaxed">
                      We will analyze your files and send you a detailed savings report within 7 business days. 
                      You&apos;ll receive the results via email at <strong className="text-white">{formData.email}</strong>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>
            <button
              type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-emerald-500/30 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 hover:enabled:scale-105 hover:enabled:shadow-emerald-500/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Audit Request</span>
                      <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
            </button>
          </div>
            </div>
          )}
        </form>
      </main>
      <Footer />
    </div>
  );
}
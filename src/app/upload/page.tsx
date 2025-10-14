"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";
import { useState } from "react";
import Link from "next/link";
import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { CheckCircle, File, XCircle } from "lucide-react"; // Pour de jolies icônes

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<{
    key: string;
    name: string;
    url: string;
  }[]>([]);

  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_#0A1F44_0%,_#071635_45%,_#0D2B6C_70%,_#0F2250_85%,_white_100%)] text-white">
      <PageBackground />
      <Header />
      <main className="flex flex-grow flex-col items-center px-4 py-16 sm:py-24">
        <div className="w-full max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Start Your Free Audit
          </h1>
          <p className="mt-4 text-lg text-blue-100">
            Securely upload your bank fee statements for the past 24 months. Accepted formats: PDF, CSV, Excel.
          </p>
        </div>
        
        {/* CORRECTION : On ajoute un conteneur stylisé pour mieux délimiter la zone */}
        <div className="mt-10 w-full max-w-xl rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
          <UploadDropzone<OurFileRouter>
            endpoint="statementUploader"
            onClientUploadComplete={(res) => {
              if (res) {
                setUploadedFiles(res);
                alert("Upload successfully completed!");
              }
            }}
            onUploadError={(error: Error) => {
              alert(`Error! ${error.message}`);
            }}
            // CORRECTION : On utilise la prop 'appearance' pour styliser et réduire la taille
            appearance={{
              container: {
                padding: "1rem",
              },
              uploadIcon: {
                width: "48px",
                height: "48px",
              },
              label: {
                fontSize: "1rem",
                color: "#a7bde8",
              },
              allowedContent: {
                color: "#a7bde8",
              },
            }}
          />
        </div>
        
        {uploadedFiles.length > 0 && (
          <div className="mt-8 w-full max-w-xl text-left">
            <h3 className="text-lg font-semibold text-white">Upload successful:</h3>
            <ul className="mt-4 space-y-2">
              {uploadedFiles.map(file => (
                <li key={file.key} className="flex items-center justify-between rounded-lg bg-white/10 p-3">
                  <div className="flex items-center gap-3">
                    <File className="h-5 w-5 text-white" />
                    <span className="text-slate-200">{file.name}</span>
                  </div>
                  <Link href={file.url} target="_blank" className="text-sm font-medium text-emerald-400 hover:underline">
                    View
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
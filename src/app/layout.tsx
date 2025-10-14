import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FeeLens",
  description: "Stop Fees. Save More. Bank Smarter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* CORRECTION : On applique la structure Flexbox directement sur le <body>.
        Il devient le conteneur principal qui fait au moins la taille de l'écran.
      */}
      <body className="flex min-h-screen flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
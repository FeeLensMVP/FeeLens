// src/components/PageBackground.tsx

import Image from "next/image";
import logoWatermark from "@/assets/logo.png";

export default function PageBackground() {
  return (
    // CORRECTION : On ajoute un conteneur parent.
    // Il se positionne pour remplir toute la page, se met en arrière-plan (z-0),
    // et surtout, il cache tout ce qui déborde de lui (overflow-hidden).
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Les bulles décoratives sont à l'intérieur de ce conteneur et ne peuvent plus faire déborder la page */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 right-[-10%] h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute -left-20 top-40 h-96 w-96 rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[10%] h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>
    </div>
  );
}
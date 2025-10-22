import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`
        rounded-2xl border border-slate-200/60 bg-white/95 px-6 py-5 shadow-lg shadow-slate-900/5 backdrop-blur-sm
        ${hover ? "transition-all duration-300 hover:border-emerald-300/50 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-0.5" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
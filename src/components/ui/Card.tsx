import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-3xl border border-slate-200/70 bg-white/90 px-6 py-5 shadow-md ${className}`}
    >
      {children}
    </div>
  );
}
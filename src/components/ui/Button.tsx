import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function Button({ 
  children, 
  variant = "primary", 
  size = "md", 
  fullWidth = false,
  className = "",
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 disabled:cursor-not-allowed disabled:opacity-50";
  
  const variants = {
    primary: "bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-xl shadow-emerald-500/25 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/40",
    secondary: "border border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/30",
    outline: "border-2 border-slate-300 bg-white text-slate-700 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50/50"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}


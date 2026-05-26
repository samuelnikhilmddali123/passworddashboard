import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({ children, variant = 'primary', className, ...props }) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primaryHover focus:ring-primary shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]",
    secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/10 focus:ring-gray-400",
    danger: "bg-red-500/20 text-red-500 hover:bg-red-500/40 border border-red-500/30 focus:ring-red-500",
    ghost: "bg-transparent text-textMuted hover:text-text hover:bg-white/5"
  };

  return (
    <button 
      className={twMerge(clsx(baseClasses, variants[variant], className))}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

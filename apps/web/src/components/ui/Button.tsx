'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: any;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  disabled = false,
  type = 'button',
  fullWidth = false,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-black uppercase tracking-[0.3em] transition-all rounded-full whitespace-nowrap active:scale-95 disabled:opacity-50 disabled:pointer-events-none group relative overflow-hidden';

  const variants = {
    primary: 'bg-white text-black hover:bg-neutral-100 border-2 border-transparent',
    secondary: 'bg-[#E81414] text-white hover:bg-white hover:text-black border-2 border-transparent',
    outline: 'border-2 border-white/10 text-white hover:border-white hover:bg-white/5',
    danger: 'bg-transparent border-2 border-[#E81414]/40 text-[#E81414] hover:bg-[#E81414]/10 transition-colors',
    ghost: 'text-white/40 hover:text-white transition-colors',
  };

  const sizes = {
    sm: 'px-4 py-2 text-[9px] min-h-[36px]',
    md: 'px-6 py-3 text-[10px] min-h-[44px]',
    lg: 'px-8 py-4 text-[11px] md:text-[12px] min-h-[52px]',
    xl: 'px-10 py-5 text-[12px] md:text-[14px] min-h-[64px]',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      <div className="flex items-center gap-3 relative z-10">
        {Icon && (
          React.isValidElement(Icon) 
            ? React.cloneElement(Icon as React.ReactElement<any>, {
                variant: variant === 'primary' ? 'black' : 'white'
              })
            : typeof Icon === 'function' || typeof Icon === 'object' 
                ? React.createElement(Icon as any, { 
                    className: "w-4 h-4 transition-transform group-hover:scale-110",
                    variant: variant === 'primary' ? 'black' : 'white'
                  })
                : null
        )}
        {children}
      </div>
    </button>
  );
}

'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { GoogleIcon } from '@/components/ui/GoogleIcon';

interface EnterButtonsProps {
  onEnter: () => void;
  className?: string;
  variant?: 'mobile' | 'desktop' | 'hero';
}

export default function EnterButtons({ onEnter, className = '', variant = 'mobile' }: EnterButtonsProps) {
  if (variant === 'mobile') {
    return (
      <div className={`flex flex-col gap-3 w-full ${className}`}>
        <button
          onClick={onEnter}
          className="w-full justify-center px-5 py-3.5 bg-white !text-black text-[10px] font-black uppercase tracking-[0.35em] flex items-center gap-3 rounded-full shadow-lg transition-transform active:scale-95"
        >
          <span className="!text-black">ENTER THE DOJO</span>
          <ArrowRight className="w-3.5 h-3.5 !text-black" strokeWidth={4} />
        </button>
        <Link
          href="/auth/login"
          className="w-full justify-center px-5 py-3.5 bg-white !text-black text-[10px] font-black uppercase tracking-[0.35em] flex items-center gap-3 rounded-full shadow-md border-none transition-transform active:scale-95"
        >
          <GoogleIcon />
          <span className="!text-black">SIGN IN WITH GOOGLE</span>
        </Link>
      </div>
    );
  }

  if (variant === 'desktop') {
    return (
      <div className={`flex flex-col gap-3 items-end shrink-0 ${className}`}>
        <button
          onClick={onEnter}
          className="group px-6 py-3.5 bg-white !text-black text-[11px] font-black uppercase tracking-[0.35em] hover:bg-[#E81414] hover:text-white transition-all flex items-center gap-4 rounded-full shadow-2xl active:scale-95"
        >
          <span className="!text-black group-hover:text-white transition-colors">ENTER THE DOJO</span>
          <ArrowRight className="w-5 h-5 !text-black group-hover:text-white transition-all stroke-[4px]" />
        </button>
        <Link
          href="/auth/login"
          className="group px-6 py-3.5 bg-white/90 !text-black text-[11px] font-black uppercase tracking-[0.35em] hover:bg-white transition-all flex items-center gap-4 rounded-full border border-black/10 shadow-lg active:scale-95"
        >
          <GoogleIcon />
          <span className="!text-black">SIGN IN WITH GOOGLE</span>
        </Link>
      </div>
    );
  }

  // Hero variant (used in main hero section)
  return (
    <div className={`flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto ${className}`}>
      <Link 
        href="/dashboard" 
        className="group relative flex-1 lg:flex-none px-7 py-3.5 bg-white text-black text-[10px] font-black uppercase tracking-[0.35em] hover:bg-[#E81414] hover:text-white transition-all flex items-center justify-center gap-4 overflow-hidden rounded-full shadow-2xl active:scale-95"
      >
        <span className="relative z-10 transition-colors">INITIALIZE SESSION</span>
        <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
      </Link>
      <Link 
        href="/auth/login" 
        className="group relative flex-1 lg:flex-none px-7 py-3.5 bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.35em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 rounded-full active:scale-95"
      >
        <GoogleIcon />
        <span className="transition-colors">SIGN IN WITH GOOGLE</span>
      </Link>
    </div>
  );
}

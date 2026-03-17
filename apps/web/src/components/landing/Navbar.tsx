'use client';

import Link from 'next/link';
import { GoogleIcon } from '@/components/ui/GoogleIcon';
import { Button } from '@/components/ui/Button';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 md:gap-4 group shrink-0">
          <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-transform">
            <img
              src="/logo.png"
              alt="Zapsters Logo"
              className="w-full h-full object-contain"
              style={{ transform: "scale(2.2) translate(7px, 1px)" }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-base md:text-xl tracking-tighter uppercase text-white leading-none">ZAPSTERS</span>
            <span className="text-white/20 text-[7px] tracking-[0.3em] font-black leading-none mt-0.5">闘技場</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
          <Link href="#sectors" className="hover:text-white transition-colors">SECTORS</Link>
          <Link href="#protocols" className="hover:text-white transition-colors">PROTOCOLS</Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/auth/login" className="hidden sm:block">
            <Button variant="outline" size="sm" icon={() => <GoogleIcon />}>
              <span className="hidden md:inline">SIGN IN</span>
              <span className="md:hidden">LOGIN</span>
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="primary" size="sm">
              <span className="hidden sm:inline">ENTER OPERATIONS</span>
              <span className="sm:hidden">ENTER</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

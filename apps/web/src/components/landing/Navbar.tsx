'use client';

import Link from 'next/link';
import { Music } from 'lucide-react';
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { Button } from '@/components/ui/Button';
import { useMusicStore } from '@/lib/store/useMusicStore';

export default function Navbar() {
  const { isPlaying, isOpen, toggleOpen } = useMusicStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 h-16 md:h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1 md:gap-4 group shrink-0 -ml-1 md:ml-0">
          <div className="w-10 h-10 md:w-16 md:h-16 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Zapsters Logo"
              className="w-full h-full object-contain"
              style={{ transform: 'scale(1.5)' }}
            />
          </div>
          <span className="text-[26px] md:text-3xl font-black uppercase tracking-tighter text-white">ZAPSTERS</span>
        </Link>

        <div className="hidden lg:flex items-center gap-12 text-[11px] font-black uppercase tracking-[0.4em]">
          <Link href="#sectors" className="text-white/60 hover:text-black hover:bg-white px-4 py-2 rounded-full transition-all">THE REALMS</Link>
          <Link href="#protocols" className="text-white/60 hover:text-black hover:bg-white px-4 py-2 rounded-full transition-all">THE EDICTS</Link>
        </div>

        <div className="flex items-center gap-2 md:gap-6">
          {/* Music Toggle Button (Clean - No Hover Effect) */}
          <button
            onClick={toggleOpen}
            className={`flex items-center justify-center gap-2 md:gap-3 px-3 md:px-6 h-[40px] md:h-auto md:py-3 border rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-none group shrink-0 ${isOpen ? 'bg-[#E81414] border-[#E81414] text-white' : 'border-white/10 text-white/60'}`}
          >
            <div className={`w-3.5 h-3.5 md:w-4 md:h-4 flex items-center justify-center shrink-0`}>
              <img
                src="/logo.png"
                alt=""
                className="w-full h-full object-contain brightness-0 invert"
                style={{
                  transform: 'scale(3) translateX(0px) translateY(0px)' // CUSTOM SCALE AND POS FOR NAVBAR
                }}
              />
            </div>
            <span className="hidden lg:inline">SONIC</span>
            {isPlaying && (
              <div className="flex gap-0.5 items-end h-3 mb-0.5">
                <div className="w-0.5 bg-current animate-[music-bar_0.8s_ease-in-out_infinite]" />
                <div className="w-0.5 bg-current animate-[music-bar_1.2s_ease-in-out_infinite]" />
                <div className="w-0.5 bg-current animate-[music-bar_1.0s_ease-in-out_infinite]" />
              </div>
            )}
          </button>

          <Link href="/auth/login" className="hidden lg:block">
            <Button
              variant="outline"
              size="md"
              className=""
              icon={() => <GoogleIcon size={18} />}
            >
              <span>SIGN IN</span>
            </Button>
          </Link>

          <Link href="/dashboard" className="shrink-0">
            <Button
              variant="primary"
              size="sm"
              className="md:px-6 md:py-3 md:text-[10px] hover:bg-white/90 hover:text-black"
            >
              <span className="hidden sm:inline">CLAIM THE THRONE</span>
              <span className="sm:hidden">ENTER</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

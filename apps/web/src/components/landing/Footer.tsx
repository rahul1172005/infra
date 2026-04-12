'use client';

import Link from 'next/link';
import { GOTIcon } from '@/components/icons/GOTIcon';

export default function Footer() {
  return (
    <footer className="bg-black py-24 md:py-48 px-5 md:px-8 border-t border-white/5 relative overflow-hidden flex flex-col items-center">
      <div className="max-w-[1440px] w-full mx-auto flex flex-col md:flex-row justify-between items-start gap-16 md:gap-32 mb-32">
        <div className="space-y-8 max-w-lg">
          <div className="text-3xl font-black uppercase tracking-tighter flex items-center gap-6 group">
            <div className="w-16 h-16 flex items-center justify-center transition-transform duration-500">
              <img src="/logo.png" alt="Zapsters Logo" className="w-full h-full object-contain" style={{ transform: 'scale(3.0) translate(0px, 0px)' }} />
            </div>
            ZAPSTERS
          </div>
          <p className="text-[12px] text-white/30 tracking-[0.2em] leading-loose max-w-sm">
            The dragon's blood flows in the veins of the true heir.<br />
            The Iron Throne awaits. No mercy.<br />
            Fire and Blood.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-16 md:gap-32 w-full md:w-auto text-center md:text-left">
          <div className="space-y-8">
            <span className="text-[14px] tracking-[0.5em] font-black uppercase text-white/100 mb-4 block">
              THE COUNCIL
            </span>

            <div className="flex flex-col gap-5 text-[11px] font-black uppercase tracking-widest text-white/20">
              <Link href="/teams" className="hover:text-red-500 transition-colors">Groups Setup</Link>
              <Link href="/domains" className="hover:text-red-500 transition-colors">Domain Selection</Link>
              <Link href="/challenges" className="hover:text-red-500 transition-colors">Lab Access</Link>
            </div>
          </div>
          <div className="space-y-8">
            <span className="text-[14px] tracking-[0.5em] font-black uppercase text-white/100 mb-4 block">THE CITADEL</span>
            <div className="flex flex-col gap-5 text-[11px] font-black uppercase tracking-widest text-white/20">
              <Link href="/leaderboard" className="hover:text-red-500 transition-colors">THRONE RANKINGS</Link>
              <Link href="/analytics" className="hover:text-red-500 transition-colors">WAR MAPS</Link>
              <Link href="/legal" className="hover:text-red-500 transition-colors">ROYAL EDICTS</Link>
            </div>
          </div>
        </div>
      </div>

      {/* BIG CENTERED BRANDING */}
      <div className="flex flex-col items-center gap-10 w-full py-24 mb-16">
        <h2 className="text-[15vw] md:text-[clamp(10rem,15vw,18rem)] font-black uppercase tracking-tight leading-none text-white opacity-100 select-none pointer-events-none text-center px-4">
          ZAPSTERS
        </h2>

        <div className="w-24 h-[1px] bg-white/10" />

        <Link href="/" className="flex items-center gap-6 group/footer transition-all">
          <div className="flex items-center gap-5 text-[13px] md:text-[14px] font-black uppercase tracking-[0.6em] text-white/100 group-hover/footer:text-white transition-colors">
            <span>MADE BY</span>
            <div className="w-14 h-14 opacity-100 group-hover/footer:opacity-100 transition-all duration-500">
              <img
                src="/logo.png"
                alt="Zapsters Logo"
                className="w-full h-full object-contain"
                style={{
                  transform:
                    typeof window !== "undefined" && window.innerWidth < 768
                      ? "translate(-5px, -5px) scale(2.2)"   // 📱 mobile
                      : "translate(-5px, 0px) scale(2.0)"      // 💻 desktop
                }}
              />
            </div>
            <span>ZAPSTERS</span>
          </div>
        </Link>
      </div>

      <div className="max-w-[1440px] w-full mx-auto mt-16 text-[10px] tracking-[0.6em] font-black uppercase text-white/5 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-0 border-t border-white/5 pt-12">
        <span>© 2026 ZAPSTERS — THE IRON THRONE</span>
      </div>
    </footer>
  );
}

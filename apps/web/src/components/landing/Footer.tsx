'use client';

import Link from 'next/link';
import { GOTIcon } from '@/components/icons/GOTIcon';

export default function Footer() {
  return (
    <footer className="bg-black py-16 md:py-32 px-5 md:px-8 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start gap-10 md:gap-16">
        <div className="space-y-8 max-w-lg">
          <div className="text-3xl font-black uppercase tracking-tighter flex items-center gap-6 group">
            <div className="w-16 h-16 flex items-center justify-center transition-transform opacity-100 group-hover:opacity-100 duration-500">
              <img src="/logo.png" alt="Zapsters Logo" className="w-full h-full object-contain" style={{ transform: 'scale(3.0) translate(0px, 0px)' }} />
            </div>
            ZAPSTERS
          </div>
          <p className="text-[12px] text-white/30 font-black uppercase tracking-[0.2em] leading-loose">
            THE DRAGON'S BLOOD FLOWS IN THE VEINS OF THE TRUE HEIR. THE IRON THRONE AWAITS. NO MERCY. FIRE AND BLOOD.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-16 md:gap-32">
          <div className="space-y-8">
            <span className="text-[14px] tracking-[0.5em] font-black uppercase text-white">THE COUNCIL</span>
            <div className="flex flex-col gap-5 text-[11px] font-black uppercase tracking-widest text-white/20">
              <Link href="/teams" className="hover:text-[#E81414] transition-colors">Groups Setup</Link>
              <Link href="/domains" className="hover:text-[#E81414] transition-colors">Domain Selection</Link>
              <Link href="/challenges" className="hover:text-[#E81414] transition-colors">Lab Access</Link>
            </div>
          </div>
          <div className="space-y-8">
            <span className="text-[14px] tracking-[0.5em] font-black uppercase text-white">THE CITADEL</span>
            <div className="flex flex-col gap-5 text-[11px] font-black uppercase tracking-widest text-white/20">
              <Link href="/leaderboard" className="hover:text-[#E81414] transition-colors">THRONE RANKINGS</Link>
              <Link href="/analytics" className="hover:text-[#E81414] transition-colors">WAR MAPS</Link>
              <Link href="/legal" className="hover:text-[#E81414] transition-colors">ROYAL EDICTS</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto mt-32 text-[10px] tracking-[0.6em] font-black uppercase text-white/5 flex justify-between items-center border-t border-white/5 pt-12">
        <span>© 2026 ZAPSTERS — THE IRON THRONE</span>
        <div className="flex gap-10 text-white/10 uppercase font-black">
          {/* Socials / Links could go here */}
        </div>
      </div>
    </footer>
  );
}

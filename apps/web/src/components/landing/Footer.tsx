'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black py-16 md:py-32 px-5 md:px-8 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start gap-10 md:gap-16">
        <div className="space-y-8 max-w-lg">
          <div className="text-3xl font-black uppercase tracking-tighter flex items-center gap-6">
            <div className="w-16 h-16 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Zapsters Logo"
                className="w-full h-full object-contain"
                style={{ transform: "scale(2.2) translate(10px, 0px)" }}
              />
            </div>
            ZAPSTERS CORE
          </div>
          <p className="text-[12px] text-white/30 font-black uppercase tracking-[0.2em] leading-loose">
            REDEFINING THE BOUNDARIES OF COMPETITIVE ENGINEERING. GROUP YOUR TEAMS. CONQUER THE CODE. NO GLOWS. NO MERCY.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-16 md:gap-32">
          <div className="space-y-8">
            <span className="text-[14px] tracking-[0.5em] font-black uppercase text-white">Management</span>
            <div className="flex flex-col gap-5 text-[11px] font-black uppercase tracking-widest text-white/20">
              <Link href="/teams" className="hover:text-[#E81414] transition-colors">Groups Setup</Link>
              <Link href="/domains" className="hover:text-[#E81414] transition-colors">Domain Selection</Link>
              <Link href="/challenges" className="hover:text-[#E81414] transition-colors">Lab Access</Link>
            </div>
          </div>
          <div className="space-y-8">
            <span className="text-[14px] tracking-[0.5em] font-black uppercase text-white">Technical</span>
            <div className="flex flex-col gap-5 text-[11px] font-black uppercase tracking-widest text-white/20">
              <Link href="/leaderboard" className="hover:text-[#E81414] transition-colors">Leaderboard</Link>
              <Link href="/analytics" className="hover:text-[#E81414] transition-colors">Analytics</Link>
              <Link href="/legal" className="hover:text-[#E81414] transition-colors">Protocols</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto mt-32 text-[10px] tracking-[0.6em] font-black uppercase text-white/5 flex justify-between items-center border-t border-white/5 pt-12">
        <span>© 2026 ZAPSTERS CORE MANAGEMENT</span>
        <div className="flex gap-10 text-white/10 uppercase font-black">
          {/* Socials / Links could go here */}
        </div>
      </div>
    </footer>
  );
}

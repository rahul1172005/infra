'use client';

import { motion } from 'framer-motion';


/* ── Decorative Elements ─────────────────────────────────────────────── */
const DotGrid = ({ className = "" }: { className?: string }) => (
    <div className={`absolute inset-0 dot-grid opacity-[0.05] pointer-events-none ${className}`} />
);

export default function ContestsPage() {
    return (
        <div className="w-full pb-16 space-y-8 md:space-y-14 lg:space-y-20 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#E81414]/5 blur-[200px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/[0.02] blur-[150px] pointer-events-none" />

            {/* ══ HEADER ═════════════════════════════════════════════════════ */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end border-b-2 border-white/10 pb-8 md:pb-16 gap-6 md:gap-12 relative z-10">
                <div className="space-y-8">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-[#E81414] flex items-center justify-center transition-transform duration-500 overflow-hidden relative group/header">
                            <img src="/suriken.png" alt="icon" className="w-6 h-6 white relative z-10 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                            <div className="absolute inset-0 bg-white translate-y-full group-hover/header:translate-y-0 transition-transform duration-300" />
                        </div>
                        <span className="text-[11px] tracking-[0.8em] font-black uppercase text-white/30">MISSION BRIEFINGS</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-white">
                        ACTIVE<br /><span className="text-[#E81414]">CONTESTS.</span>
                    </h1>
                </div>

                <div className="w-full xl:w-auto flex items-center gap-6 md:gap-12 bg-white/[0.02] border-2 border-white/10 p-5 md:p-10 group hover:border-[#E81414]/30 transition-all rounded-2xl md:rounded-[2rem]">
                    <div className="flex flex-col items-start gap-4">
                        <span className="text-[10px] tracking-[0.6em] font-black uppercase text-white/20">CURRENT OPERATIONS</span>
                        <div className="flex items-center gap-6 transition-transform group-hover:scale-105 duration-500">
                            
                            <span className="text-4xl font-black uppercase tracking-tighter text-white">04 <span className="text-white/20 text-2xl">UNITS ACTIVE</span></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══ CONTEST GRID ═══════════════════════════════════════════════ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 relative z-10">
                <ContestCard
                    title="CYBER STORM // 01"
                    desc="Execute optimal code sequences under sustained network pressure. Global visibility enabled."
                    gains="2,400 ELO"
                    window="48 Hours Remain"
                    status="Live"
                    variant="accent"
                />
                <ContestCard
                    title="SEC FAULT // ALPHA"
                    desc="Identify and neutralize logical vulnerabilities within established kernel protocols."
                    gains="1,800 ELO"
                    window="12 Hours Remain"
                    status="Urgent"
                    variant="black"
                />
                <ContestCard
                    title="NEURAL SYNC // L2"
                    desc="Analyze and optimize neural network logic for maximum throughput and accuracy."
                    gains="4,200 ELO"
                    window="Starts in 4h"
                    status="Upcoming"
                    variant="black"
                />
                <ContestCard
                    title="QUANTUM LINK // IX"
                    desc="Distributed computing race. Synchronize nodes across multi-region deployment zones."
                    gains="3,000 ELO"
                    window="Starts in 1d"
                    status="Upcoming"
                    variant="black"
                />
            </div>

            {/* ══ ARCHIVE STATE ═══════════════════════════════════════════════ */}
            <div className="p-10 md:p-20 border-2 border-white/10 bg-[#050505] flex flex-col items-center justify-center text-center space-y-8 md:space-y-12 relative group/archive overflow-hidden hover:border-white/20 transition-all rounded-2xl md:rounded-[2rem]">
                <div className="absolute inset-0 scanlines opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.01] uppercase select-none pointer-events-none whitespace-nowrap">MISSION ARCHIVE</div>

                <div className="w-24 h-24 border-2 border-white/10 bg-white/5 flex items-center justify-center relative hover:bg-black group/icon transition-all duration-500 z-10">
                    <img src="/suriken.png" alt="icon" className="w-10 h-10 white/20 group-hover:text-white transition-colors object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                    <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-white/10 group-hover:border-[#E81414] transition-colors" />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-white/10 group-hover:border-[#E81414] transition-colors" />
                </div>
                <div className="space-y-4 md:space-y-6 relative z-10 transition-transform group-hover:translate-y-[-10px] duration-500">
                    <h3 className="text-3xl md:text-4xl lg:text-6xl font-black uppercase tracking-tighter text-white">MISSION ARCHIVE</h3>
                    <p className="text-[12px] tracking-[0.4em] font-black uppercase text-white/20 max-w-lg mx-auto leading-relaxed">
                        Review historical operational data and previous contest outcomes.
                        Each mission record contains encrypted architectural kernels.
                    </p>
                </div>
                <button className="px-10 md:px-20 py-5 md:py-8 bg-transparent border-4 border-white text-white text-[11px] md:text-[13px] font-black uppercase tracking-[0.6em] md:tracking-[0.8em] hover:bg-white hover:text-black transition-all relative z-10 flex items-center gap-4 md:gap-6 group/btn rounded-full md:rounded-none">
                    LOAD ARCHIVES <img src="/suriken.png" alt="icon" className="w-5 h-5 md:w-6 md:h-6 transition-transform object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                </button>
            </div>
        </div>
    );
}

function ContestCard({ title, desc, gains, window, status, variant }: any) {
    const isAccent = variant === 'accent';
    return (
        <div className={`p-5 md:p-16 border-2 border-white/10 flex flex-col justify-between min-h-[380px] md:min-h-[550px] transition-all group/card cursor-pointer relative overflow-hidden h-full rounded-2xl md:rounded-none ${isAccent ? 'bg-[#E81414]' : 'bg-black hover:border-white/30'}`}>
            {isAccent && <div className="absolute inset-0 scanlines opacity-10 pointer-events-none" />}
            <DotGrid />

            <div className="space-y-6 md:space-y-12 relative z-10">
                <div className="flex justify-between items-start">
                    <span className={`text-[11px] tracking-[0.8em] font-black uppercase ${isAccent ? 'text-black/30' : 'text-white/20'}`}>CONTEST AUTH</span>
                    <div className={`px-6 py-2 text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 ${isAccent ? 'bg-white text-black group-hover/card:scale-110' : 'bg-[#E81414] text-white shadow-[0_0_20px_#E81414]'}`}>
                        {status}
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className={`text-3xl md:text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9] ${isAccent ? 'text-white' : 'text-white group-hover/card:text-[#E81414]'}`}>{title}</h3>
                    <div className={`h-1.5 w-16 transition-all duration-700 group-hover/card:w-48 ${isAccent ? 'bg-black/20' : 'bg-[#E81414]'}`} />
                </div>
                <p className={`text-[14px] tracking-[0.2em] font-black uppercase leading-relaxed max-w-md ${isAccent ? 'text-white/80' : 'text-white/40 group-hover:text-white/60 transition-colors'}`}>
                    {desc}
                </p>
            </div>

            <div className="space-y-6 md:space-y-12 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 border-t-2 border-white/5 pt-6 md:pt-12 gap-6 md:gap-12">
                    <div className="space-y-4">
                        <span className={`text-[9px] md:text-[10px] tracking-[0.6em] font-black uppercase ${isAccent ? 'text-black/30' : 'text-white/20'}`}>GAINS</span>
                        <div className="flex items-center gap-3 md:gap-4">
                            <img src="/suriken.png" alt="icon" className={`w-5 h-5 md:w-6 md:h-6 ${isAccent ? 'text-white' : 'text-[#E81414]'} object-contain`} style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                            <p className={`text-xl md:text-2xl font-black uppercase tracking-tighter ${isAccent ? 'text-white' : 'text-white'}`}>{gains}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <span className={`text-[9px] md:text-[10px] tracking-[0.6em] font-black uppercase ${isAccent ? 'text-black/30' : 'text-white/20'}`}>TIME WINDOW CLEAR</span>
                        <div className="flex items-center gap-3 md:gap-4">
                            <img src="/suriken.png" alt="icon" className={`w-5 h-5 md:w-6 md:h-6 ${isAccent ? 'text-white' : 'text-[#E81414]'} object-contain`} style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                            <p className={`text-xl md:text-2xl font-black uppercase tracking-tighter ${isAccent ? 'text-white' : 'text-white'}`}>{window}</p>
                        </div>
                    </div>
                </div>
                <button className={`w-full py-5 md:py-8 text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] md:tracking-[1em] transition-all flex items-center justify-center gap-5 md:gap-8 group/btn h-16 md:h-24 rounded-xl md:rounded-none ${isAccent ? 'bg-black text-white hover:bg-white hover:text-black' : 'bg-white text-black hover:bg-[#E81414] hover:text-white shadow-[0_0_40px_rgba(255,255,255,0.05)]'}`}>
                    ENLIST NOW <img src="/suriken.png" alt="icon" className="w-5 h-5 md:w-6 md:h-6 transition-transform object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                </button>
            </div>
        </div>
    );
}

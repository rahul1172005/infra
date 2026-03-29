'use client';

import { motion } from 'framer-motion';


/* ── Decorative Elements ─────────────────────────────────────────────── */
const DotGrid = ({ className = "" }: { className?: string }) => (
    <div className={`absolute inset-0 dot-grid opacity-[0.05] pointer-events-none ${className}`} />
);

export default function LeaguesPage() {
    const leagues = [
        { name: 'FLEA BOTTOM', minElo: 0, maxElo: 1200, color: 'bg-white', unlocked: true },
        { name: 'SQUIRE', minElo: 1200, maxElo: 1500, color: 'bg-white', unlocked: true },
        { name: 'KNIGHT', minElo: 1500, maxElo: 2000, color: 'bg-[#F9F9F9]', unlocked: true },
        { name: 'WARDEN', minElo: 2000, maxElo: 2500, color: 'bg-white', unlocked: false },
        { name: 'LORD', minElo: 2500, maxElo: 3000, color: 'bg-white', unlocked: false },
        { name: 'KING', minElo: 3000, maxElo: 4000, color: 'bg-white', unlocked: false },
        { name: 'AZOR AHAI', minElo: 4000, maxElo: 9999, color: 'bg-white', unlocked: false }
    ];

    const currentElo = 1850; // User is in KNIGHT

    return (
        <div className="w-full pb-24 space-y-16 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-1/2 translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(232,20,20,0.03)_0%,transparent_60%)] pointer-events-none" />

            {/* Header Module */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center border-b border-white/10 pb-12 gap-10 relative z-10">
                <div className="space-y-6">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 flex items-center justify-center transition-transform duration-500 relative group/header">
                            <img style={{ transform: "scale(1.6)" }}
                                src="/logo.png"
                                alt="Realm Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className="text-[11px] tracking-[0.6em] font-black uppercase text-white/30">HIERARCHY // GLOBAL LADDER</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] text-white">
                        REALM<br /><span className="text-[#E81414]">LEAGUES</span>
                    </h1>
                </div>

                <div className="flex flex-col gap-3 group/elo">
                    <span className="text-[10px] tracking-[0.4em] font-black uppercase text-white/20">BATTLE POWER</span>
                    <div className="bg-white text-black px-10 py-5 rounded-2xl group-hover:bg-[#E81414] group-hover:text-white transition-all duration-500">
                        <span className="text-4xl font-bold uppercase tracking-widest">{currentElo}</span>
                    </div>
                </div>
            </div>

            {/* Current Tier Status Module */}
            <div className="bg-black border border-white/10 relative min-h-[400px] flex flex-col md:flex-row items-stretch overflow-hidden group/stage transition-all z-10 rounded-[2.5rem]">
                <DotGrid />
                <div className="absolute inset-0 scanlines opacity-5 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black text-white/[0.01] uppercase select-none pointer-events-none whitespace-nowrap group-hover:tracking-[0.1em] transition-all duration-1000">RANKING</div>

                <div className="flex-1 p-12 space-y-10 relative z-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            
                            <span className="text-[11px] tracking-[0.6em] font-black uppercase text-white/20">CURRENT PLACEMENT</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white border-b-4 border-[#E81414] pb-6 inline-block">KNIGHT</h2>
                    </div>

                    <div className="space-y-8 max-w-xl">
                        <div className="flex justify-between items-end text-[11px] tracking-[0.4em] font-black uppercase">
                            <span className="text-white/40">REALM PROGRESS</span>
                            <span className="text-[#E81414] transition-transform">+150 TO WARDEN</span>
                        </div>
                        <div className="h-4 w-full bg-white/5 border border-white/10 p-1 rounded-full relative overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '70%' }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                className="h-full bg-white rounded-full relative"
                            >
                                <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
                            </motion.div>
                        </div>
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.4em] text-white/10">
                            <span>1500 MIN</span>
                            <span>2000 MAX</span>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/3 bg-white/[0.03] p-12 flex flex-col justify-between relative overflow-hidden group/sidebar border-l border-white/10">
                    <div className="space-y-8 relative z-10">
                        <img style={{ transform: "scale(1.6)" }} src="/logo.png" alt="icon" className="w-20 h-20 group-hover:scale-110 transition-transform duration-500 object-contain" />
                        <p className="text-[14px] tracking-wide font-black uppercase leading-relaxed text-white/60">
                            Your battle power determines your standing in the Seven Kingdoms. Win battles to earn exclusive house badges and royal clearances.
                        </p>
                    </div>
                    <div className="space-y-5 relative z-10 pt-8 border-t border-white/10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-5">
                                <span className="text-[10px] tracking-[0.4em] font-black uppercase text-white/40 group-hover:text-white transition-colors">REALM SYNC</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* League Tier Hierarchy */}
            <div className="space-y-12 pt-16 relative z-10">
                <div className="flex items-center justify-between border-b border-white/5 pb-8">
                    <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-6 text-white">
                        TIER HIERARCHY
                    </h3>
                    <div className="px-6 py-2 border border-white/10 bg-white/5 text-[10px] tracking-[0.4em] font-black uppercase text-white/30 rounded-full">LADDER DEPTH 12.4K</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {leagues.map((league, i) => {
                        const isCurrent = currentElo >= league.minElo && currentElo < league.maxElo;

                        return (
                            <div
                                key={i}
                                className={`p-10 bg-black border transition-all duration-500 group/tier relative h-[420px] flex flex-col justify-between cursor-pointer overflow-hidden rounded-[2rem]
 ${isCurrent
                                        ? 'border-[#E81414] shadow-[0_0_40px_rgba(232,20,20,0.05)] bg-[#E81414]/[0.02]'
                                        : 'border-white/10 hover:border-white/30'
                                    } ${!league.unlocked ? 'opacity-20 grayscale' : ''}`}
                            >
                                <DotGrid />
                                {isCurrent && <div className="absolute top-0 left-0 w-full h-2 bg-[#E81414] shadow-[0_0_20px_#E81414]" />}

                                <div className="space-y-8 relative z-10">
                                    <div className="flex justify-between items-start">
                                        <div className={`w-16 h-16 border flex items-center justify-center transition-all duration-700 rounded-2xl
 ${isCurrent ? 'border-[#E81414] bg-[#E81414]/10' : 'border-white/10 bg-white/5 group-hover/tier:bg-white group-hover/tier:border-white'}`}>
                                            <img style={{ transform: "scale(1.6)" }} src="/logo.png" alt="icon" className={`w-10 h-10 transition-colors object-contain`} />
                                        </div>
                                        {!league.unlocked && (
                                            <span className="text-[9px] tracking-[0.4em] font-black uppercase text-white/10 border border-white/5 px-3 py-1.5 rounded-full">LOCKED</span>
                                        )}
                                        {isCurrent && (
                                            <span className="text-[9px] tracking-[0.4em] font-black uppercase bg-[#E81414] text-white px-4 py-2 rounded-full shadow-[0_0_20px_#E81414]">ACTIVE</span>
                                        )}
                                    </div>

                                    <div className="space-y-4 pt-6">
                                        <h4 className={`text-3xl font-black uppercase tracking-tighter transition-all duration-500
 ${!league.unlocked ? 'text-white/10' : 'text-white'} ${isCurrent ? 'text-[#E81414]' : ''}`}>
                                            {league.name}
                                        </h4>
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[10px] tracking-[0.6em] font-black text-white/10 uppercase group-hover/tier:text-white/30 transition-colors duration-500">ELO RANGE</span>
                                            <p className={`text-[16px] font-bold tracking-widest transition-all duration-500
 ${!league.unlocked ? 'text-white/5' : 'text-white/40 group-hover/tier:text-white'}`}>
                                                {league.minElo} — {league.maxElo}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-12 flex justify-between items-center relative z-10 border-t border-white/5">
                                    <div className="flex gap-4">
                                        {/* Redundant logos removed */}
                                    </div>
                                    {league.unlocked && (
                                        <div className="w-12 h-12 flex items-center justify-center opacity-10 group-hover/tier:opacity-100 transition-all duration-500">
                                            {/* Final logo removed per request for single logo per card */}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

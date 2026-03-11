'use client';

import { motion } from 'framer-motion';


/* ── Decorative Components ─────────────────────────────────────────── */
const DotGrid = () => (
    <div className="absolute inset-0 dot-grid pointer-events-none opacity-[0.05]" />
);

export default function LeaderboardPage() {
    return (
        <div className="w-full space-y-8 md:space-y-14 lg:space-y-20 pb-16 md:pb-24 relative overflow-hidden">
            <DotGrid />

            {/* ══ HEADER ═════════════════════════════════════════════════════ */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center border-b border-white/10 pb-8 md:pb-12 gap-6 relative z-10">
                <div className="space-y-6">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 flex items-center justify-center transition-transform duration-500 relative group/header">
                            <img
                                src="/logo.png"
                                alt="Zapsters Logo"
                                className="w-full h-full object-contain"
                                style={{ transform: "scale(2.2) translate(0px, 0px)" }}
                            />
                        </div>
                        <span className="text-[11px] tracking-[0.6em] font-black uppercase text-white/30">System_Hierarchy // V1.0.4</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-white">
                        GLOBAL<br /><span className="text-white">RANKS.</span>
                    </h1>
                </div>

                <div className="w-full xl:w-auto flex items-center gap-6 bg-[#0A0A0A] border border-white/10 p-5 md:p-10 rounded-2xl md:rounded-[2.5rem] group hover:border-[#E81414]/30 transition-all">
                    <div className="flex flex-col items-start gap-2">
                        <span className="text-[9px] md:text-[10px] tracking-[0.4em] font-black uppercase text-white/30">RANK_ID_0x24</span>
                        <div className="flex items-center gap-3 md:gap-5">
                            <span className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white">#8,241</span>
                            <div className="px-3 md:px-4 py-1 md:py-1.5 border border-white/10 text-[8px] md:text-[9px] tracking-[0.3em] font-black uppercase text-white/40 rounded-full bg-white/5">LOCKED</div>
                        </div>
                    </div>
                    <div className="h-10 md:h-16 w-[1px] bg-white/10 ml-auto" />
                    <img src="/suriken.png" alt="icon" className="w-7 h-7 md:w-10 md:h-10 [#E81414] animate-pulse object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                </div>
            </div>

            {/* ══ SEARCH & FILTERS ════════════════════════════════════════════ */}
            <div className="flex flex-col xl:flex-row gap-4 md:gap-6 relative z-10">
                <div className="flex-1 bg-[#0A0A0A] border border-white/10 px-5 md:px-8 py-4 md:py-5 flex items-center gap-4 md:gap-6 group/search cursor-text rounded-full transition-all hover:border-white/20">
                    <img src="/suriken.png" alt="icon" className="w-5 h-5 md:w-6 md:h-6 white/20 object-contain shrink-0" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                    <input
                        type="text"
                        placeholder="SEARCH OPERATIVE..."
                        className="bg-transparent border-none text-[10px] md:text-[12px] tracking-[0.3em] font-black uppercase text-white placeholder-white/20 focus:outline-none w-full min-w-0"
                    />
                </div>
                <div className="flex gap-3 md:gap-4 shrink-0">
                    <button className="flex-1 md:flex-none px-6 md:px-12 py-4 md:py-5 bg-white text-black text-[9px] md:text-[11px] tracking-[0.4em] md:tracking-[0.6em] font-black uppercase hover:bg-[#E81414] hover:text-white transition-all rounded-full">
                        SYNDICATE VIEW
                    </button>
                    <button className="flex-1 md:flex-none px-6 md:px-10 py-4 md:py-5 border border-white/10 text-white text-[9px] md:text-[11px] tracking-[0.3em] font-black uppercase hover:border-white transition-all flex items-center justify-center gap-3 md:gap-5 rounded-full">
                        <img src="/suriken.png" alt="icon" className="w-4 h-4 md:w-5 md:h-5 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} /> FILTERS
                    </button>
                </div>
            </div>

            {/* ══ LEADERBOARD TABLE ══════════════════════════════════════════ */}
            <div className="border border-white/10 bg-[#0A0A0A] overflow-hidden relative z-10 rounded-2xl md:rounded-[2.5rem]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.03] text-white/40 text-[7px] md:text-[10px] tracking-[0.2em] md:tracking-[0.8em] font-black uppercase border-b border-white/10">
                                <th className="py-4 px-3 md:py-8 md:px-12">POS</th>
                                <th className="py-4 px-3 md:py-8 md:px-12">SYNDICATE ID</th>
                                <th className="py-4 px-3 md:py-8 md:px-12">XP RATING</th>
                                <th className="py-4 px-3 md:py-8 md:px-12 hidden sm:table-cell">MISSION STATS</th>
                                <th className="py-4 px-3 md:py-8 md:px-12 text-right">GROWTH</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[
                                { pos: '01', name: 'ALPHA SYNDICATE', points: '45,820', trend: '+14%', status: 'ELITE', missions: '342 COMPLETED' },
                                { pos: '02', name: 'SIGMA OPS', points: '38,905', trend: '+8%', status: 'ACTIVE', missions: '281 COMPLETED' },
                                { pos: '03', name: 'VOID SQUAD', points: '33,440', trend: '-2%', status: 'ACTIVE', missions: '245 COMPLETED' },
                                { pos: '04', name: 'DELTA UNITS', points: '31,980', trend: '+22%', status: 'ELITE', missions: '210 COMPLETED' },
                                { pos: '05', name: 'ZETA CORE', points: '29,100', trend: '+5%', status: 'ACTIVE', missions: '189 COMPLETED' },
                                { pos: '06', name: 'OMEGA RUN', points: '27,850', trend: '+12%', status: 'ACTIVE', missions: '162 COMPLETED' },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-white/[0.02] transition-all group/row cursor-pointer relative">
                                    <td className="py-4 px-3 md:py-10 md:px-12 text-sm md:text-2xl font-black tracking-tighter text-white/10 group-hover/row:text-white transition-colors">{row.pos}</td>
                                    <td className="py-4 px-3 md:py-10 md:px-12">
                                        <div className="flex items-center gap-3 md:gap-8">
                                            <div className={`w-8 h-8 md:w-14 md:h-14 ${i === 0 ? 'bg-[#E81414]' : 'bg-white/5'} border border-white/10 flex items-center justify-center shrink-0 transition-transform rounded-lg md:rounded-2xl`}>
                                                <span className={`${i === 0 ? 'text-white' : 'text-white/20'} text-[10px] md:text-[16px] font-black`}>{row.name[0]}</span>
                                            </div>
                                            <div className="flex flex-col gap-0.5 md:gap-1">
                                                <span className={`text-[10px] md:text-[16px] font-black tracking-tight md:tracking-widest uppercase ${i === 0 ? 'text-[#E81414]' : 'text-white'} truncate max-w-[80px] sm:max-w-none`}>{row.name}</span>
                                                <span className="text-[7px] md:text-[9px] tracking-[0.2em] md:tracking-[0.4em] font-black uppercase text-white/20">{row.status}_TAG</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-3 md:py-10 md:px-12">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs md:text-3xl font-bold tracking-tight md:tracking-widest text-white">{row.points}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-3 md:py-10 md:px-12 hidden sm:table-cell">
                                        <div className="flex items-center gap-2 md:gap-5">
                                            <img src="/suriken.png" alt="icon" className="w-3 h-3 md:w-4 md:h-4 [#E81414] object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                            <span className="text-[9px] md:text-[11px] font-black tracking-[0.2em] uppercase text-white/30 truncate">{row.missions}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-3 md:py-10 md:px-12 text-right">
                                        <div className="flex flex-col items-end gap-1 md:gap-1.5">
                                            <span className={`text-[9px] md:text-[12px] font-black tracking-[0.1em] md:tracking-[0.2em] uppercase ${row.trend.startsWith('+') ? 'text-green-500' : 'text-[#E81414]'}`}>{row.trend}</span>
                                            <div className="flex items-center gap-1 md:gap-2">
                                                <img src="/suriken.png" alt="icon" className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 white/10 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                                <span className="text-[7px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] font-black uppercase text-white/10 hidden md:inline">30D VELOCITY</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ══ FOOTER INFO ════════════════════════════════════════════════ */}
            <div className="p-5 md:p-12 border border-white/10 bg-[#0A0A0A] text-white flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 md:gap-10 relative z-10 group/footer overflow-hidden rounded-2xl md:rounded-[2.5rem]">
                <div className="absolute inset-0 scanlines opacity-5 pointer-events-none" />
                <div className="flex items-center gap-5 md:gap-10 relative z-10">
                    <div className="w-12 h-12 md:w-16 md:h-16 border border-white/10 flex items-center justify-center bg-white/5 transition-transform duration-700 rounded-xl md:rounded-2xl">
                        <img src="/suriken.png" alt="icon" className="w-6 h-6 md:w-8 md:h-8 [#E81414] object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                    </div>
                    <div className="space-y-1.5 md:space-y-3 text-left">
                        <h4 className="text-[10px] md:text-[14px] tracking-[0.3em] md:tracking-[0.6em] font-black uppercase text-white/40">SYNC PROTOCOL LOCKED</h4>
                        <p className="text-[8px] md:text-[11px] tracking-[0.05em] font-black uppercase text-white/20 max-w-xl leading-relaxed">
                            RANKS ARE CALCULATED EVERY 60 CYCLES BASED ON CHALLENGE VELOCITY, DOMAIN STABILITY, AND COLLECTIVE SYNDICATE XP.
                        </p>
                    </div>
                </div>
                <button className="w-full xl:w-auto px-10 md:px-16 py-4 md:py-6 bg-white text-black text-[9px] md:text-[11px] tracking-[0.3em] md:tracking-[0.6em] font-black uppercase hover:bg-[#E81414] hover:text-white transition-all relative z-10 flex items-center justify-center gap-3 md:gap-5 rounded-full">
                    EXPORT LOGS <img src="/suriken.png" alt="icon" className="w-4 h-4 md:w-5 md:h-5 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                </button>
            </div>
        </div>
    );
}

'use client';

import { motion } from 'framer-motion';

import { useState } from 'react';

/* ── Decorative Components ─────────────────────────────────────────── */
const DotGrid = () => (
    <div className="absolute inset-0 dot-grid pointer-events-none opacity-[0.05]" />
);

export default function ChallengesPage() {
    const [challenges, setChallenges] = useState([
        { id: 'DOJ-001', name: 'KATANA SHARP ALPHA', domain: 'BUSHIDO', points: 1200, status: 'OPEN' },
        { id: 'DOJ-002', name: 'CASTLE RECON VECTOR', domain: 'FORTRESS', points: 450, status: 'OPEN' },
        { id: 'DOJ-003', name: 'NINJA BYPASS V3', domain: 'SHADOW', points: 2800, status: 'OPEN' },
    ]);

    return (
        <div className="w-full pb-16 space-y-8 md:space-y-14 lg:space-y-20 relative overflow-hidden">
            {/* ══ HEADER ═════════════════════════════════════════════════════ */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center border-b border-white/10 pb-8 md:pb-12 gap-6 md:gap-10 relative z-10">
                <div className="space-y-3 md:space-y-6">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-white">
                        侍の<br /><span className="text-white">DOJO</span>
                    </h1>
                </div>

                <div className="w-full xl:w-auto flex items-center gap-6 md:gap-10 bg-[#0A0A0A] border border-white/10 p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] group hover:border-[#E81414]/30 transition-all">
                    <div className="flex flex-col items-start gap-2 md:gap-3">
                        <span className="text-[9px] md:text-[10px] tracking-[0.6em] font-black uppercase text-white/20">TOTAL ACTIVE SPIRIT OPS</span>
                        <div className="flex items-center gap-6">
                            <span className="text-4xl md:text-5xl font-black uppercase tracking-widest text-white leading-none">0{challenges.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══ MAIN CHALLENGE GRID ════════════════════════════════════════ */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-10 lg:gap-12 relative z-10">

                {/* Left: Challenge Creation Interface */}
                <div className="xl:col-span-4 space-y-12">
                    <div className="bg-[#0A0A0A] p-6 md:p-10 space-y-6 md:space-y-10 border border-white/10 relative overflow-hidden group/create transition-all rounded-2xl md:rounded-[2.5rem] h-full">
                        <div className="absolute inset-0 scanlines opacity-5 pointer-events-none" />
                        <div className="flex items-center gap-6 border-b border-white/10 pb-6 relative z-10">
                            <img src="/suriken.png" alt="icon" className="w-6 h-6 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                            <span className="text-[12px] tracking-[0.6em] font-black uppercase text-white/60">NEW TRAINING</span>
                        </div>

                        <div className="space-y-8 relative z-10">
                            <div className="space-y-3">
                                <label className="text-[9px] tracking-[0.4em] font-black uppercase text-white/30">DOJO IDENTIFIER</label>
                                <input
                                    type="text"
                                    placeholder="IDENTIFIER"
                                    className="w-full bg-white/5 border border-white/10 px-8 py-5 text-[11px] font-black tracking-[0.2em] outline-none focus:border-[#E81414]/50 transition-all text-white uppercase rounded-full"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[9px] tracking-[0.4em] font-black uppercase text-white/30">PROVINCE CLASSIFICATION</label>
                                <div className="relative">
                                    <select className="w-full bg-white/5 border border-white/10 px-8 py-5 text-[11px] font-black tracking-[0.2em] outline-none focus:border-[#E81414]/50 transition-all text-white uppercase appearance-none rounded-full">
                                        <option>BUSHIDO</option>
                                        <option>FORTRESS</option>
                                        <option>SHADOW</option>
                                        <option>FORGE</option>
                                    </select>
                                    <img src="/suriken.png" alt="icon" className="absolute right-8 top-1/2 -translate-y-1/2 w-4 h-4 white/20 pointer-events-none object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[9px] tracking-[0.4em] font-black uppercase text-white/30">POINT ATTRIBUTION</label>
                                <div className="flex items-center gap-4 w-full overflow-hidden">
                                    <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center rounded-full shrink-0">
                                        <img src="/suriken.png" alt="icon" className="w-6 h-6 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                    </div>
                                    <input
                                        type="number"
                                        defaultValue="500"
                                        className="min-w-0 flex-1 bg-white/5 border border-white/10 px-4 md:px-8 py-4 md:py-5 text-sm md:text-[16px] font-black tracking-[0.1em] md:tracking-[0.2em] outline-none focus:border-[#E81414]/50 transition-all text-white uppercase rounded-full"
                                    />
                                </div>
                            </div>

                            <button className="w-full py-6 bg-white text-black text-[11px] font-black tracking-[0.6em] uppercase hover:bg-[#E81414] hover:text-white transition-all relative overflow-hidden group/submit rounded-full mt-4">
                                <span className="relative z-10">INITIALIZE TRAINING</span>
                                <div className="absolute inset-0 scanlines opacity-10 pointer-events-none" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right: Active Challenges & Completion */}
                <div className="xl:col-span-8 space-y-12 h-full">
                    <div className="bg-[#0A0A0A] border border-white/10 overflow-hidden relative rounded-[2.5rem] h-full flex flex-col">
                        <DotGrid />
                        <div className="p-5 md:p-10 border-b border-white/10 flex justify-between items-center bg-white/[0.03] text-white">
                            <div className="flex items-center gap-6">
                                <img src="/suriken.png" alt="icon" className="w-6 h-6 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                <h3 className="text-[18px] tracking-[0.4em] font-black uppercase">ACTIVE TRAINING</h3>
                            </div>
                            <div className="flex items-center gap-8">
                                <img src="/suriken.png" alt="icon" className="w-5 h-5 white/20 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                <div className="px-5 py-2 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] rounded-full bg-white/5">LIVE STATUS</div>
                            </div>
                        </div>

                        <div className="divide-y divide-white/5 flex-1">
                            {challenges.map((ch) => (
                                <div key={ch.id} className="p-3 md:p-8 flex items-center justify-between hover:bg-[#E81414] transition-all duration-300 group cursor-pointer text-white hover:text-black gap-3">
                                    <div className="flex items-center gap-4 md:gap-10 min-w-0">
                                        <div className="w-10 h-10 md:w-14 md:h-14 border border-white/10 flex items-center justify-center transition-all group-hover:bg-black group-hover:border-black rounded-full shrink-0">
                                            <img src="/suriken.png" alt="icon" className={`w-5 h-5 md:w-6 md:h-6 ${ch.id === 'DOJ-003' ? '' : 'text-white/20'} group-hover:text-white transition-colors object-contain`} style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                        </div>
                                        <div className="space-y-0.5 md:space-y-1 min-w-0">
                                            <div className="flex items-center gap-2 md:gap-4">
                                                <span className="text-[7px] md:text-[8px] tracking-[0.3em] font-black uppercase text-white/30 group-hover:text-black/60 transition-colors truncate">{ch.id} // {ch.domain}</span>
                                            </div>
                                            <h4 className="text-base md:text-2xl font-black tracking-tighter uppercase truncate">{ch.name}</h4>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2 shrink-0">
                                        <div className="flex items-baseline gap-1 md:gap-2">
                                            <span className="text-xl md:text-3xl font-black tabular-nums group-hover:text-black">{ch.points}</span>
                                            <span className="text-[7px] md:text-[8px] tracking-[0.4em] font-black uppercase text-white/30 group-hover:text-black/50">XP</span>
                                        </div>
                                        <button className="hidden sm:block px-4 md:px-6 py-1.5 md:py-2 border border-white/10 text-[7px] md:text-[8px] tracking-[0.3em] font-black uppercase transition-all rounded-full group-hover:bg-black group-hover:text-white group-hover:border-black text-white/40">
                                            VERIFY
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-10 bg-white/[0.01] border-t border-white/5 flex items-center justify-between group/footer">
                            <div className="flex items-center gap-6 text-white/20 group-hover/footer:text-white/40 transition-colors">
                                <img src="/suriken.png" alt="icon" className="w-5 h-5 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em]">SYNCING WITH GLOBAL LEDGER</span>
                            </div>
                            <button className="flex items-center gap-5 text-[10px] font-black tracking-[0.6em] uppercase text-white/30 hover:text-white transition-all">
                                ACCESS FULL LIST <img src="/suriken.png" alt="icon" className="w-5 h-5 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══ POINT ATTRIBUTION LOG ═══════════════════════════════════════ */}
            <div className="p-5 md:p-10 border border-white/10 bg-[#0A0A0A] flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-10 relative overflow-hidden group/logs rounded-2xl md:rounded-[2.5rem]">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.01] to-transparent opacity-0 group-hover/logs:opacity-100 transition-opacity duration-1000" />
                <div className="flex items-center gap-10 relative z-10">
                    <img src="/suriken.png" alt="icon" className="w-8 h-8 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                    <div className="space-y-2">
                        <span className="text-[10px] tracking-[0.6em] font-black uppercase text-white/20">COMPLETION TRAFFIC</span>
                        <p className="text-lg font-black tracking-widest uppercase text-white">ALPHA CLAN: +500XP [DOJ-002]</p>
                    </div>
                </div>
                <div className="flex items-center gap-10 relative z-10">
                    <span className="text-[10px] tracking-[0.4em] font-black uppercase text-white/10">OS BUILD: 0x24 CH LAB</span>
                    
                </div>
            </div>
        </div>
    );
}

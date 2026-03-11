'use client';

import { motion } from 'framer-motion';

import { useState } from 'react';

/* ── Decorative Components ─────────────────────────────────────────── */
const DotGrid = () => (
    <div className="absolute inset-0 dot-grid pointer-events-none opacity-[0.05]" />
);

export default function TeamsPage() {
    const [mockGroups, setMockGroups] = useState([
        { id: 1, name: 'ALPHA CLAN', teams: 12, lead: 'SHOGUN', points: 45000 },
        { id: 2, name: 'SIGMA SHADOW', teams: 8, lead: 'DAIMYO', points: 38200 },
        { id: 3, name: 'RONIN SQUAD', teams: 15, lead: 'SENSEI', points: 31000 },
    ]);

    return (
        <div className="w-full space-y-8 md:space-y-14 lg:space-y-20 pb-16 relative overflow-hidden">
            {/* ══ HEADER ═════════════════════════════════════════════════════ */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center border-b border-white/10 pb-8 md:pb-12 gap-6 relative z-10">
                <div className="space-y-6">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-white">
                        幕府<br /><span className="text-white">CLANS.</span>
                    </h1>
                </div>

                <div className="w-full xl:w-auto flex items-center gap-6 bg-[#0A0A0A] border border-white/10 p-5 md:p-10 rounded-2xl md:rounded-[2.5rem] group hover:border-[#E81414]/30 transition-all">
                    <div className="flex flex-col items-start gap-3">
                        <span className="text-[10px] tracking-[0.6em] font-black uppercase text-white/20">ACTIVE CLANS</span>
                        <div className="flex items-center gap-6">
                            <span className="text-5xl font-black uppercase tracking-widest text-white leading-none">0{mockGroups.length}</span>
                        </div>
                    </div>
                    <div className="h-14 w-[1px] bg-white/10" />
                    <button className="flex flex-col gap-3 group/btn items-end">
                        <span className="text-[9px] tracking-[0.4em] font-black uppercase text-white/20 group-hover/btn:text-[#E81414] transition-colors">INITIATE NEW CLAN</span>
                        <div className="w-10 h-10 bg-[#E81414] rounded-xl flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                            <img src="/suriken.png" alt="icon" className="w-5 h-5 white object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        </div>
                    </button>
                </div>
            </div>

            {/* ══ MAIN MANAGEMENT GRID ═══════════════════════════════════════ */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-10 lg:gap-12 relative z-10">

                {/* Left: Active Groups List */}
                <div className="xl:col-span-8 space-y-12">
                    <div className="bg-[#0A0A0A] border border-white/10 overflow-hidden rounded-[2.5rem]">
                        <div className="p-4 md:p-10 border-b border-white/10 flex flex-col sm:flex-row justify-between sm:items-center bg-white/[0.03] text-white gap-4">
                            <div className="flex items-center gap-4 md:gap-6">
                                <img src="/suriken.png" alt="icon" className="w-5 h-5 md:w-6 md:h-6 [#E81414] object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                <h3 className="text-base md:text-[18px] tracking-[0.2em] md:tracking-[0.4em] font-black uppercase">CURRENT ACTIVE CLANS</h3>
                            </div>
                            <div className="hidden md:flex items-center gap-6 px-6 py-2 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] rounded-full bg-white/5">
                                SYNC STABLE
                            </div>
                        </div>

                        <div className="divide-y divide-white/5">
                            {mockGroups.map((group) => (
                                <div key={group.id} className="p-3 md:p-8 flex items-center justify-between hover:bg-[#E81414] transition-all duration-300 group cursor-pointer text-white hover:text-black gap-3">
                                    <div className="flex items-center gap-4 md:gap-10 min-w-0">
                                        <div className="w-10 h-10 md:w-12 md:h-12 border border-white/10 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all rounded-xl md:rounded-2xl group-hover:text-white shrink-0">
                                            <span className="text-base md:text-lg font-black">{group.id}</span>
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-base md:text-2xl font-black tracking-tighter uppercase">{group.name}</h4>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <img src="/suriken.png" alt="icon" className="w-4 h-4 [#E81414] group-hover:text-black transition-colors object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                                    <span className="text-[8px] tracking-[0.3em] font-black uppercase text-white/40 group-hover:text-black/60 transition-colors">{group.teams} FAMILIES ASSIGNED</span>
                                                </div>
                                                <div className="w-1 h-1 bg-white/10 group-hover:bg-black/20 rounded-full transition-colors" />
                                                <span className="text-[8px] tracking-[0.3em] font-black uppercase text-white/40 group-hover:text-black/60 transition-colors">LEAD: {group.lead}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="text-base md:text-2xl font-black">{group.points.toLocaleString()}</span>
                                        <div className="hidden sm:block px-3 md:px-4 py-1 md:py-1.5 border border-white/10 text-[7px] md:text-[8px] font-black tracking-widest text-white/40 group-hover:text-white group-hover:bg-black group-hover:border-black transition-all uppercase rounded-full">VIEW DETAILS</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Group Configuration Sidebar */}
                <div className="xl:col-span-4 space-y-12">
                    <div className="bg-[#0A0A0A] p-6 md:p-10 space-y-6 md:space-y-10 border border-white/10 relative overflow-hidden group/config transition-all rounded-2xl md:rounded-[2.5rem]">
                        <div className="absolute inset-0 scanlines opacity-5 pointer-events-none" />
                        <div className="flex items-center gap-6 border-b border-white/10 pb-6 relative z-10">
                            <img src="/suriken.png" alt="icon" className="w-6 h-6 [#E81414] object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                            <span className="text-[12px] tracking-[0.6em] font-black uppercase text-white/60">QUICK_SETUP_v1</span>
                        </div>

                        <div className="space-y-8 relative z-10">
                            <div className="space-y-3">
                                <label className="text-[9px] tracking-[0.4em] font-black uppercase text-white/30">CLAN IDENTIFIER</label>
                                <input
                                    type="text"
                                    placeholder="ENTER NAME..."
                                    className="w-full bg-white/5 border border-white/10 p-5 text-[11px] font-black tracking-[0.2em] outline-none focus:border-[#E81414]/50 transition-all text-white uppercase rounded-xl"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[9px] tracking-[0.4em] font-black uppercase text-white/30">FAMILY ASSIGNMENT BATCH</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="border border-white/5 bg-white/[0.02] p-4 flex items-center justify-between text-white/40 hover:bg-white/5 hover:text-white transition-all group/item rounded-xl">
                                            <span className="text-[10px] font-black">FAMILY_0{i}</span>
                                            <div className="w-2.5 h-2.5 bg-white/5 border border-white/10 rounded-sm" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button className="w-full py-6 bg-white text-black text-[11px] font-black tracking-[0.6em] uppercase hover:bg-[#E81414] hover:text-white transition-all relative overflow-hidden group/submit rounded-full mt-4">
                                <span className="relative z-10">DEPLOY CLAN</span>
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-[#E81414] translate-y-full group-hover/submit:translate-y-0 transition-transform duration-300" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-[#0A0A0A] border border-white/10 p-10 space-y-8 group/info rounded-[2.5rem]">
                        <div className="flex items-center gap-6 mb-6">
                            <img src="/suriken.png" alt="icon" className="w-6 h-6 [#E81414] object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                            <span className="text-[11px] tracking-[0.4em] font-black uppercase text-white/30">OVERSIGHT PROTOCOL</span>
                        </div>
                        <p className="text-[11px] tracking-[0.05em] font-black uppercase leading-relaxed text-white/40">
                            Clans are restricted to a maximum of 20 families per shogunate.
                            Province selection must be synchronized across all assigned units
                            before global deployment. Honor is aggregated based on collective
                            mission performance metrics.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

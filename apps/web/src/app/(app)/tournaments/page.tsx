'use client';

import { motion } from 'framer-motion';

const Shield = (props: any) => <span {...props}>[S]</span>;
const Swords = (props: any) => <span {...props}>[W]</span>;
const Activity = (props: any) => <span {...props}>[A]</span>;
/* ── Decorative Elements ─────────────────────────────────────────────── */
const DotGrid = () => (
    <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />
);

export default function TournamentsPage() {
    return (
        <div className="w-full pb-16 space-y-8 md:space-y-14 lg:space-y-20 relative overflow-hidden">
            <DotGrid />

            {/* ══ HEADER MODULE ═══════════════════════════════════════════════ */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center border-b border-white/10 pb-8 md:pb-12 gap-6 md:gap-10 relative z-10">
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
                        <span className="text-[11px] tracking-[0.6em] font-black uppercase text-white/30">SHOGUNATE CMD</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-white">
                        THE<br /><span className="text-white">ARENA.</span>
                    </h1>
                </div>

                <div className="w-full xl:w-auto p-5 md:p-10 bg-[#0A0A0A] border border-white/10 rounded-2xl md:rounded-3xl flex flex-col gap-3 md:gap-4 group hover:border-[#E81414]/30 transition-all">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase font-black">ERA SENGO KU</span>
                        
                    </div>
                    <span className="text-3xl font-black uppercase tracking-widest text-white group-hover:text-[#E81414] transition-colors">SHOGUN SYNC</span>
                </div>
            </div>

            {/* ══ MAIN CONTENT GRID ═══════════════════════════════════════════ */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">

                {/* Left: Active Brackets / Passive State */}
                <div className="lg:col-span-8 space-y-12">
                    <div className="bg-[#050505] border border-white/10 p-6 md:p-12 lg:p-24 min-h-[360px] md:min-h-[500px] lg:min-h-[600px] flex flex-col items-center justify-center text-center relative overflow-hidden group/stage rounded-2xl md:rounded-[3.5rem] transition-all">
                        <DotGrid />
                        <div className="absolute inset-0 scanlines opacity-5 pointer-events-none" />

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.01] uppercase select-none pointer-events-none whitespace-nowrap group-hover:tracking-[0.05em] transition-all duration-1000">
                            INACTIVE
                        </div>

                        <div className="relative z-10 mb-10 p-10 border border-white/10 bg-white/5 group-hover:bg-[#E81414] transition-all duration-500 overflow-hidden group/icon rounded-[2.5rem]">
                            <img src="/suriken.png" alt="icon" className="w-16 h-16 white group-hover:scale-110 transition-all z-10 relative object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                            <div className="absolute inset-0 scanlines opacity-5 pointer-events-none" />
                        </div>

                        <h2 className="text-4xl md:text-6xl lg:text-[8rem] font-black tracking-tighter uppercase text-white mb-6 md:mb-8 border-b-4 border-white/10 pb-5 md:pb-6 inline-block leading-none">
                            MEDITATION.
                        </h2>

                        <div className="bg-[#0A0A0A] p-6 md:p-12 lg:p-16 border border-white/10 flex flex-col items-center gap-6 md:gap-10 max-w-3xl mx-auto rounded-2xl md:rounded-[3rem] relative overflow-hidden">
                            <p className="text-xl md:text-2xl tracking-wide font-black text-white/40 uppercase leading-snug relative z-10">
                                SEASON 03 HAS BEEN TERMINATED. FINAL RANKINGS VERIFIED. NEXT CYCLE INITIATES T-MINUS 14 DAYS.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full relative z-10">
                                <button className="w-full py-5 bg-white text-black text-[11px] tracking-[0.4em] font-black uppercase hover:bg-[#E81414] hover:text-white transition-all flex items-center justify-center gap-6 rounded-full">
                                    CHAMPION LOGS <img src="/suriken.png" alt="icon" className="w-5 h-5 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                </button>
                                <button className="w-full py-5 border border-white/10 text-white text-[11px] tracking-[0.4em] font-black uppercase hover:border-white transition-all flex items-center justify-center gap-6 rounded-full">
                                    SYNC VECTORS <img src="/suriken.png" alt="icon" className="w-5 h-5 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats strip */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative group/stats">
                        {[
                            { label: 'TREASURY', value: '$120,402', icon: Shield, accent: true },
                            { label: 'CLANS', value: '4,204', icon: Swords, accent: false },
                            { label: 'DUELS', value: '18.4K', icon: Activity, accent: false },
                        ].map((stat, i) => (
                            <div key={i} className="p-6 md:p-10 space-y-4 md:space-y-6 group/stat bg-[#0A0A0A] border border-white/10 hover:border-[#E81414]/30 transition-all rounded-2xl md:rounded-[2rem] relative overflow-hidden cursor-pointer">
                                <stat.icon className={`w-10 h-10 transition-all duration-700
 ${stat.accent ? 'text-[#E81414]' : 'text-white/20 group-hover/stat:text-white'}`} />
                                <div className="space-y-1 relative z-10 text-left">
                                    <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 font-black group-hover:text-white/50 transition-colors">{stat.label}</p>
                                    <p className={`text-4xl font-black tracking-tighter uppercase
 ${stat.accent ? 'text-[#E81414]' : 'text-white'}`}>{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Operational Sidebar */}
                <div className="lg:col-span-4 space-y-12">
                    <div className="bg-[#0A0A0A] border border-white/10 flex flex-col group/sidebar rounded-[2.5rem] overflow-hidden">
                        <div className="p-10 border-b border-white/10 bg-white/[0.03] flex items-center justify-between">
                            <h3 className="text-[12px] tracking-[0.6em] uppercase font-black text-white/40">SHOGUNATE RECORDS</h3>
                            <img src="/suriken.png" alt="icon" className="w-6 h-6 [#E81414] object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        </div>
                        <div className="p-10 space-y-10">
                            {[
                                { season: 'ERA 03', winner: 'TEAM NEON', prize: '$40K' },
                                { season: 'ERA 02', winner: '0xPROTO', prize: '$35K' },
                                { season: 'ERA 01', winner: 'VOID SQUAD', prize: '$25K' },
                            ].map((hist, i) => (
                                <div key={i} className="flex justify-between items-center border-b border-white/5 pb-8 last:border-0 last:pb-0 group/item cursor-pointer">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-4">
                                            
                                            <p className="text-[10px] tracking-[0.4em] font-black uppercase text-[#E81414]">{hist.season}</p>
                                        </div>
                                        <p className="text-xl font-black tracking-tighter uppercase text-white">{hist.winner}</p>
                                    </div>
                                    <div className="text-2xl font-black tracking-widest uppercase text-white/10 group-hover/item:text-white transition-colors">{hist.prize}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#0A0A0A] border border-white/10 p-10 relative overflow-hidden group/req rounded-[2.5rem]">
                        <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/10">
                            <h3 className="text-2xl font-black tracking-widest uppercase text-white/40">ENTRY VECTORS</h3>
                            <img src="/suriken.png" alt="icon" className="w-6 h-6 [#E81414] animate-pulse object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        </div>

                        <div className="space-y-8 relative z-10">
                            {[
                                { label: 'BUSHIDO VERIFIED', active: true },
                                { label: 'HONOR LEVEL 10', active: false },
                                { label: 'CLAN DEPLOYED', active: true },
                            ].map((req, i) => (
                                <div key={i} className="flex items-center gap-6 group/req-item cursor-pointer">
                                    <div className={`w-3 h-3 rounded-full border-2 transition-all duration-500
 ${req.active ? 'bg-[#E81414] border-[#E81414]' : 'bg-transparent border-white/10'}`} />
                                    <span className={`text-[12px] tracking-[0.4em] uppercase font-black transition-colors duration-500
 ${req.active ? 'text-white' : 'text-white/20 group-hover/req-item:text-white/40'}`}>
                                        {req.label}
                                    </span>
                                    {req.active && <img src="/suriken.png" alt="icon" className="w-5 h-5 [#E81414] ml-auto object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />}
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-10 py-5 bg-white text-black text-[12px] tracking-[0.6em] font-black uppercase hover:bg-[#E81414] hover:text-white transition-all flex items-center justify-center gap-8 rounded-full">
                            VERIFY CLEARANCE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

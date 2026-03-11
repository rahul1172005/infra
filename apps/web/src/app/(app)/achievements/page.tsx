'use client';

import { motion } from 'framer-motion';

const Zap = (props: any) => <span {...props}>[Z]</span>;
const Code2 = (props: any) => <span {...props}>[C]</span>;
const Database = (props: any) => <span {...props}>[D]</span>;
const Cpu = (props: any) => <span {...props}>[P]</span>;

/* ── Decorative Elements ─────────────────────────────────────────────── */
const DotGrid = ({ className = "" }: { className?: string }) => (
    <div className={`absolute inset-0 dot-grid opacity-[0.05] pointer-events-none ${className}`} />
);

export default function AchievementsPage() {
    return (
        <div className="w-full pb-24 space-y-16 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#E81414]/5 blur-[200px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/[0.02] blur-[150px] pointer-events-none" />

            {/* Header Module */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end border-b-2 border-white/10 pb-16 gap-12 relative z-10">
                <div className="space-y-8">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 flex items-center justify-center transition-transform duration-500 relative group/header">
                            <img
                                src="/logo.png"
                                alt="Zapsters Logo"
                                className="w-full h-full object-contain"
                                style={{ transform: "scale(2.5) translate(0px, 0px)" }}
                            />
                        </div>
                        <span className="text-[11px] tracking-[0.8em] font-black uppercase text-white/30">Operational_Commendations_v4 // Clear_Record</span>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-white">
                        TROPHY<br /><span className="text-[#E81414]">CABINET.</span>
                    </h1>
                </div>

                <div className="flex items-center gap-12 bg-white/[0.02] border-2 border-white/10 p-10 group hover:border-[#E81414]/30 transition-all">
                    <div className="flex flex-col items-start gap-3">
                        <span className="text-[10px] tracking-[0.6em] font-black uppercase text-white/20">TOTAL COMMENDATIONS UNLOCKED</span>
                        <div className="flex items-center gap-8">
                            <img src="/suriken.png" alt="icon" className="w-10 h-10 white group-hover: transition-colors object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                            <span className="text-5xl font-bold uppercase tracking-tighter text-white">04 <span className="text-white/10">/ 142</span></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Showcase Section */}
            <div className="bg-black border-2 border-white/10 relative min-h-[750px] p-16 overflow-hidden hover:border-white/20 transition-all group/showcase">
                <DotGrid />
                <div className="absolute inset-0 scanlines opacity-5 pointer-events-none group-hover/showcase:opacity-10 transition-opacity" />

                <div className="relative z-10 space-y-24">
                    <div className="flex items-center justify-between border-b-2 border-white/5 pb-12">
                        <div className="flex items-center gap-8 group/title cursor-pointer">
                            <div className="w-12 h-12 border-2 border-[#E81414] flex items-center justify-center group-hover/title:bg-[#E81414] transition-all">
                                <img src="/suriken.png" alt="icon" className="w-6 h-6 white transition-transform object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                            </div>
                            <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Acquired_Badges_v9</h2>
                        </div>
                        <div className="px-6 py-2 border-2 border-white/10 bg-white/5 text-[11px] tracking-[0.6em] font-black uppercase text-white/30">Tier: Operative_L1 // Beta_Clear</div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-16">
                        {/* Unlocked Badges */}
                        {[
                            { title: 'FIRST BLOOD', desc: 'Solved CTF < 10min', icon: Zap, color: 'border-[#E81414]', glow: 'shadow-[0_0_30px_rgba(232,20,20,0.3)]' },
                            { title: 'CORE BREACH', desc: '5 Arena Wins', icon: Code2, color: 'border-white', glow: 'shadow-[0_0_30px_rgba(255,255,255,0.1)]' },
                            { title: 'DATA MINER', desc: 'Optimal Complexity', icon: Database, color: 'border-[#E81414]', glow: 'shadow-[0_0_30px_rgba(232,20,20,0.3)]' },
                            { title: 'SILICON MIND', desc: '30 Day Streak', icon: Cpu, color: 'border-white', glow: 'shadow-[0_0_30px_rgba(255,255,255,0.1)]' },
                        ].map((badge, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center group/badge cursor-pointer relative"
                            >
                                <div className={`w-32 h-32 border-2 ${badge.color} bg-black flex items-center justify-center mb-10 relative group-hover/badge:bg-white transition-all duration-700 rotate-45 ${badge.glow}`}>
                                    <div className="-rotate-45 transition-all duration-700">
                                        <badge.icon className="w-10 h-10 text-white group-hover/badge:text-black transition-colors" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#E81414] group-hover/badge:scale-150 transition-transform" />
                                </div>
                                <div className="text-center space-y-4 group-hover/badge:translate-y-2 transition-transform duration-500">
                                    <h4 className="text-[14px] font-black tracking-[0.4em] uppercase text-white group-hover/badge:text-[#E81414] transition-colors">{badge.title}</h4>
                                    <div className="h-px w-8 bg-white/10 mx-auto" />
                                    <p className="text-[10px] tracking-[0.3em] uppercase text-white/20 font-black leading-tight max-w-[140px] mx-auto group-hover/badge:text-white/40 transition-colors">
                                        {badge.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}

                        {/* Locked Badges */}
                        {[1, 2, 3, 4, 5, 6].map((_, i) => (
                            <div
                                key={`locked-${i}`}
                                className="flex flex-col items-center opacity-10 grayscale cursor-not-allowed group/locked"
                            >
                                <div className="w-32 h-32 border-2 border-dashed border-white/20 bg-black flex items-center justify-center mb-10 rotate-45 group-hover/locked:border-white/40 transition-colors duration-500">
                                    <div className="-rotate-45">
                                        <img src="/suriken.png" alt="icon" className="w-10 h-10 white/20 group-hover/locked:scale-90 transition-transform object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                    </div>
                                </div>
                                <div className="text-center space-y-4">
                                    <h4 className="text-[14px] font-black tracking-[0.4em] uppercase text-white/10">ENCRYPTED</h4>
                                    <div className="h-px w-8 bg-white/5 mx-auto" />
                                    <p className="text-[10px] tracking-[0.3em] uppercase text-white/5 font-black">UNIDENTIFIED_SIGNAL_v9</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Insight Bar */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-2 border-white/10 relative z-10 overflow-hidden divide-x-2 divide-white/10">
                <div className="p-16 bg-[#050505] space-y-10 relative group/insight overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#E81414]/5 blur-3xl opacity-0 group-hover/insight:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-8 border-b border-white/5 pb-8 relative z-10">
                        <img src="/suriken.png" alt="icon" className="w-10 h-10 [#E81414] object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        <h3 className="text-4xl font-black uppercase tracking-tighter text-white">Global_Rank: #4,204</h3>
                    </div>
                    <div className="space-y-6 relative z-10">
                        <p className="text-[15px] tracking-[0.3em] uppercase text-white/30 font-black leading-loose group-hover:text-white/60 transition-colors">
                            Your performance metrics are being synchronized with the global operational ledger.
                            Each commendation increases your architectural clearance level and grants access
                            to experimental system protocols in the workspace.
                        </p>
                        <div className="flex items-center gap-6 text-[10px] tracking-[0.6em] text-white/10 font-black uppercase">
                            <img src="/suriken.png" alt="icon" className="w-4 h-4 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} /> LEDGER STATED: IMMUTABLE
                        </div>
                    </div>
                </div>
                <div className="p-16 bg-white flex flex-col justify-center items-center text-center space-y-12 relative overflow-hidden group/progress">
                    <div className="absolute inset-0 scanlines opacity-5 invert pointer-events-none group-hover:opacity-10 transition-opacity" />
                    <div className="space-y-4 relative z-10">
                        <span className="text-[12px] tracking-[0.8em] font-black uppercase text-black/30 group-hover:text-black transition-colors">COLLECTION_PROGRESS_v9</span>
                        <div className="w-full h-1 bg-black/5" />
                    </div>
                    <div className="w-full max-w-md h-12 bg-black/5 border-4 border-black p-1.5 shadow-inner relative z-10 group-hover:bg-white transition-colors duration-500 overflow-hidden">
                        <div className="h-full bg-black w-[5%] relative">
                            <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
                        </div>
                    </div>
                    <div className="space-y-2 relative z-10">
                        <span className="text-6xl font-bold tracking-tighter uppercase text-black">04.82%</span>
                        <div className="text-[11px] font-black tracking-[0.6em] text-black/20 uppercase group-hover:text-[#E81414] transition-colors">SYNC COMPLETION RATE // NOMINAL</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

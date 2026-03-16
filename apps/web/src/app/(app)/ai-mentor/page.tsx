'use client';

import { motion, AnimatePresence } from 'framer-motion';

import { useState, useEffect } from 'react';

/* ── Decorative Components ─────────────────────────────────────────── */

const BarcodeDecoration = ({ className = "" }: { className?: string }) => (
    <div className={`flex gap-[2px] ${className}`}>
        {[2, 4, 1, 3, 2, 5, 2, 1, 4, 2].map((w, i) => (
            <div key={i} className="bg-white/20 group-hover:bg-white/60 transition-colors" style={{ width: `${w}px`, height: '100%' }} />
        ))}
    </div>
);

const TechDossierHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div className="flex flex-col gap-4 border-l-4 border-[#E81414] pl-10 mb-12">
        <span className="text-[11px] tracking-[0.8em] uppercase font-black text-white/30">{subtitle}</span>
        <h2 className="text-6xl font-black tracking-tighter uppercase leading-none text-white">{title}</h2>
    </div>
);

export default function AiMentorPage() {
    const [query, setQuery] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    return (
        <div className="w-full min-h-[calc(100vh-12rem)] flex flex-col space-y-16 pb-24 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#E81414]/5 blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-white/[0.02] blur-[150px] pointer-events-none" />

            {/* ══ PAGE HEADER ═══════════════════════════════════════════════ */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b-2 border-white/10 pb-16 gap-12 relative z-10">
                <TechDossierHeader title="NEURAL LOGIC" subtitle="TACTICAL INTERFACE V3.0 OMEGA" />
                <div className="flex items-center gap-10 bg-white/[0.02] border-2 border-white/10 p-10 hover:border-white/20 transition-all group">
                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] tracking-[0.6em] uppercase font-black text-white/20 group-hover:text-white/40 transition-colors">NODE INSTANCE</span>
                        <div className="flex items-center gap-6">
                            <span className="text-4xl font-black tracking-widest text-white">NM-901</span>
                            
                        </div>
                    </div>
                    <div className="h-16 w-[2px] bg-white/5" />
                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] tracking-[0.6em] uppercase font-black text-white/20 group-hover:text-white/40 transition-colors">Authorization</span>
                        <div className="px-6 py-2 border-2 border-[#E81414] text-[11px] tracking-[0.6em] uppercase font-black bg-[#E81414]/10 text-[#E81414]">ALPHA 01 CLEARANCE</div>
                    </div>
                </div>
            </div>

            {/* ══ MAIN INTERFACE ══════════════════════════════════════════════ */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 flex-1 relative z-10">

                {/* Chat Terminal Module */}
                <div className="xl:col-span-8 flex flex-col bg-black border-2 border-white/10 relative overflow-hidden group/terminal">
                    <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none group-hover/terminal:opacity-[0.08] transition-opacity" />

                    {/* Chat Header */}
                    <div className="p-10 border-b-2 border-white/10 bg-black/80 backdrop-blur-md flex justify-between items-center z-20">
                        <div className="flex items-center gap-8">
                            <div className="w-12 h-12 bg-white flex items-center justify-center transition-transform duration-500">
                                <img src="/suriken.png" alt="icon" className="w-6 h-6 black object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                            </div>
                            <div className="space-y-1">
                                <span className="text-[12px] tracking-[0.8em] uppercase font-black text-white">NEURAL FEED</span>
                                <div className="flex items-center gap-3">
                                    
                                    <span className="text-[9px] tracking-[0.4em] text-green-500/60 uppercase font-black">LINK STABLE</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="hidden md:flex flex-col items-end gap-1">
                                <span className="text-[9px] tracking-[0.4em] font-black uppercase text-white/20">DATA SECTORS 24 24</span>
                                <div className="w-32 h-1 bg-white/5 overflow-hidden">
                                    <div className="w-full h-full bg-white opacity-20" />
                                </div>
                            </div>
                            <BarcodeDecoration className="h-10 group/barcode" />
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 min-h-[700px] p-12 space-y-24 overflow-y-auto z-10 scrollbar-hide selection:bg-[#E81414] selection:text-white">

                        {/* System Message */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex gap-10 items-start max-w-4xl"
                        >
                            <div className="w-16 h-16 border-2 border-[#E81414] flex items-center justify-center shrink-0 mt-2 bg-[#E81414]/10 group cursor-pointer hover:bg-[#E81414] transition-all">
                                <img src="/suriken.png" alt="icon" className="w-8 h-8 [#E81414] group-hover:text-white transition-colors fill-current object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                            </div>
                            <div className="space-y-10">
                                <div className="bg-white/[0.02] border-2 border-white/10 p-12 relative group/msg hover:border-[#E81414]/30 transition-all">
                                    <div className="absolute -top-1 -right-1 p-4 bg-white text-black text-[10px] tracking-widest font-black uppercase flex items-center gap-4">
                                        <img src="/suriken.png" alt="icon" className="w-4 h-4 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} /> V COSMOS 9.0
                                    </div>
                                    <p className="text-[16px] tracking-widest uppercase font-black leading-loose text-white/80">
                                        Tactical Neural Core Online. Logic kernels synchronized at 99.8%.
                                        Architectural anomalies detected in sector-07. Ready to facilitate deep-level system optimization.
                                        Provide mission parameters or directive codes.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-6">
                                    {['System Hardening', 'Decryption Logic', 'Architecture Audit', 'Sector Intel'].map(tag => (
                                        <button key={tag} className="px-6 py-3 border-2 border-white/10 text-[10px] tracking-[0.6em] uppercase font-black text-white/40 bg-black hover:border-[#E81414] hover:text-[#E81414] hover:bg-[#E81414]/5 transition-all">
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* User Message */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex justify-end gap-10 items-start"
                        >
                            <div className="bg-white border-2 border-white p-12 max-w-2xl group hover:bg-[#E81414] hover:border-[#E81414] transition-all relative">
                                <div className="absolute -bottom-1 -left-1 p-3 bg-black border border-white/10 text-white text-[9px] tracking-[0.4em] font-black uppercase">
                                    AUTHENTICATED INPUT
                                </div>
                                <p className="text-[16px] tracking-widest uppercase font-black text-black group-hover:text-white transition-colors leading-relaxed">
                                    Analyze the structural instability of the neural buffer in cluster-14.
                                </p>
                            </div>
                            <div className="w-16 h-16 border-2 border-white flex items-center justify-center shrink-0 mt-2 bg-black text-white hover:bg-white hover:text-black transition-all cursor-pointer">
                                <img src="/suriken.png" alt="icon" className="w-8 h-8 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                            </div>
                        </motion.div>
                    </div>

                    {/* Input Module */}
                    <div className="p-12 border-t-2 border-white/10 bg-[#050505] z-20">
                        <div className="relative border-4 border-white/10 bg-black focus-within:border-[#E81414] transition-all group/input px-4">
                            <textarea
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="INPUT DIRECTIVE OR COMMAND CODE..."
                                className="w-full bg-transparent p-12 text-[16px] tracking-[0.5em] font-black uppercase text-white placeholder-white/5 focus:outline-none resize-none h-48 scrollbar-hide"
                            />
                            <div className="absolute bottom-10 right-10 flex items-center gap-12">
                                <div className="hidden lg:flex flex-col items-end gap-2 text-white/10 group-focus-within/input:text-[#E81414]/60 transition-colors">
                                    <span className="text-[9px] tracking-[0.6em] uppercase font-black flex items-center gap-3">
                                        <img src="/suriken.png" alt="icon" className="w-4 h-4 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} /> SHIFT ENTER TO EXECUTE
                                    </span>
                                </div>
                                <button className="w-20 h-20 bg-white text-black flex items-center justify-center hover:bg-[#E81414] hover:text-white transition-all transform hover:-translate-y-2">
                                    <img src="/suriken.png" alt="icon" className="w-8 h-8 group-hover/input:translate-x-2 group-hover/input:-translate-y-2 transition-transform object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status & Analytics Sidebar */}
                <div className="xl:col-span-4 space-y-12 h-fit">
                    <div className="bg-black border-2 border-white/10 p-12 flex flex-col gap-16 relative overflow-hidden group/stats">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#E81414]/5 blur-3xl opacity-0 group-hover/stats:opacity-100 transition-opacity" />

                        <div className="flex items-center justify-between border-b border-white/10 pb-10">
                            <div className="flex items-center gap-6">
                                <img src="/suriken.png" alt="icon" className="w-6 h-6 [#E81414] object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                <span className="text-[12px] tracking-[0.8em] uppercase font-black text-white">NEURAL STATUS</span>
                            </div>
                            <img src="/suriken.png" alt="icon" className="w-5 h-5 white/10 hover:text-white cursor-pointer transition-colors object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        </div>

                        <div className="space-y-12">
                            {[
                                { label: 'CPU CORE UTILITY', value: '14%', p: 14 },
                                { label: 'COGNITIVE SYNC', value: 'OPTIMAL', p: 100 },
                                { label: 'TRUST COEFFICIENT', value: '0.98X', p: 98 },
                                { label: 'LATENCY DELTA', value: '0.01MS', p: 10 },
                            ].map((stat, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] tracking-[0.6em] text-white/20 uppercase font-black">{stat.label}</span>
                                        <span className="text-[14px] font-black uppercase tracking-widest text-white group-hover/stats:text-[#E81414] transition-colors">{stat.value}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 relative overflow-hidden">
                                        <div className="h-full bg-white relative transition-all duration-1000" style={{ width: `${stat.p}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-12 border-t border-white/10 grid grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <span className="text-[9px] tracking-[0.6em] uppercase text-white/20 font-black">Architecture</span>
                                <div className="flex items-center gap-4">
                                    <img src="/suriken.png" alt="icon" className="w-5 h-5 white/40 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                    <span className="text-[11px] font-black tracking-[0.2em] uppercase text-white">X86 CORE</span>
                                </div>
                            </div>
                            <div className="space-y-4 text-right">
                                <span className="text-[9px] tracking-[0.6em] uppercase text-white/20 font-black">Region</span>
                                <div className="flex items-center gap-4 justify-end">
                                    <span className="text-[11px] font-black tracking-[0.2em] uppercase text-white">GLB NODES</span>
                                    <img src="/suriken.png" alt="icon" className="w-5 h-5 [#E81414] object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-12 text-black border-2 border-white relative overflow-hidden group/alert hover:-translate-y-2 transition-all cursor-default min-h-[220px] flex flex-col justify-between">
                        <div className="absolute inset-0 scanlines opacity-5 invert group-hover:opacity-10 transition-opacity" />
                        <div className="relative z-10 space-y-8">
                            <div className="flex items-center gap-6 border-b-2 border-black/5 pb-6">
                                <img src="/suriken.png" alt="icon" className="w-6 h-6 [#E81414] animate-pulse object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                <span className="text-[12px] tracking-[0.8em] uppercase font-black">SYSTEM DIRECTIVE 001</span>
                            </div>
                            <p className="text-[11px] tracking-[0.3em] uppercase leading-loose text-black/40 font-black group-hover:text-black transition-colors">
                                All neural transmissions are strictly encrypted and stored in local deep-archives.
                                Unauthorized buffer access triggers mandatory sector lockdown.
                            </p>
                        </div>
                        <div className="flex justify-between items-center pt-8 border-t-2 border-black/5 text-[9px] font-black uppercase tracking-[0.5em] text-black/20">
                            <span>VERIFIED ALPHA</span>
                            <div className="flex gap-2">
                                <div className="w-1.5 h-1.5 bg-black" />
                                <div className="w-1.5 h-1.5 bg-black" />
                                <div className="w-1.5 h-1.5 bg-black" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

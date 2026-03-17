'use client';

import { motion } from 'framer-motion';


/* ── Decorative Elements ─────────────────────────────────────────────── */
const DotGrid = ({ className = "" }: { className?: string }) => (
    <div className={`absolute inset-0 dot-grid opacity-[0.05] pointer-events-none ${className}`} />
);

export default function LearningPage() {
    return (
        <div className="w-full pb-24 space-y-16 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#E81414]/5 blur-[200px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/[0.02] blur-[150px] pointer-events-none" />

            {/* Header Module */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end border-b-2 border-white/10 pb-16 gap-12 relative z-10">
                <div className="space-y-8">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 flex items-center justify-center transition-transform duration-500 relative group/header">
                            <img
                                src="/logo.png"
                                alt="Zapsters Logo"
                                className="w-full h-full object-contain"
                                style={{ transform: "scale(2.2) translate(0px, 0px)" }}
                            />
                        </div>
                        <span className="text-[11px] tracking-[0.8em] font-black uppercase text-white/30">KNOWLEDGE BASE ACCESS</span>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-white">
                        NEURAL<br /><span className="text-[#E81414]">DECODING</span>
                    </h1>
                </div>

                <div className="p-10 border-2 border-white/10 bg-white/[0.02] flex flex-col gap-4 min-w-[300px] group hover:border-[#E81414]/30 transition-all">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <span className="text-[10px] tracking-[0.6em] text-white/20 uppercase font-black">INTELLIGENCE TIER</span>
                        
                    </div>
                    <span className="text-4xl font-black uppercase tracking-tighter text-white group-hover:text-[#E81414] transition-colors">LEVEL 04</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
                {/* Main Content Area */}
                <div className="lg:col-span-8 space-y-12">
                    <div className="bg-black border-2 border-white/10 p-16 min-h-[550px] flex flex-col items-center justify-center text-center relative overflow-hidden group/stage hover:border-white/20 transition-all">
                        <DotGrid />
                        <div className="absolute inset-0 scanlines opacity-5 pointer-events-none group-hover/stage:opacity-10 transition-opacity" />

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.01] uppercase select-none pointer-events-none whitespace-nowrap group-hover:tracking-[0.1em] transition-all duration-1000">
                            INDEXING MODULES
                        </div>

                        <div className="relative z-10 mb-12 p-10 border-2 border-white/10 bg-white/5 group-hover:bg-black transition-all duration-500 overflow-hidden group/icon relative shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                            <img src="/suriken.png" alt="icon" className="w-20 h-20 white group-hover: group-hover:scale-110 transition-all z-10 relative object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                            <div className="absolute inset-0 bg-[#E81414]/10 translate-y-full group-hover/icon:translate-y-0 transition-transform duration-500" />

                            {/* Corner markers */}
                            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-[#E81414]" />
                            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-white" />
                        </div>

                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white mb-8 border-b-8 border-[#E81414] pb-6 inline-block group-hover:scale-105 transition-transform duration-700">LIBRARIES COMPILING</h2>

                        <div className="bg-white p-12 border-2 border-white flex flex-col items-center gap-6 max-w-3xl mx-auto shadow-[0_0_50px_rgba(255,255,255,0.05)] relative overflow-hidden">
                            <div className="absolute inset-0 scanlines opacity-5 invert pointer-events-none" />
                            <p className="text-[15px] tracking-[0.3em] font-black text-black uppercase leading-relaxed relative z-10">
                                The global knowledge graph is currently indexing new experimental
                                logic modules. Primary availability expected in T-minus 12 hours.
                            </p>
                        </div>

                        {/* Technical details footer */}
                        <div className="absolute bottom-10 left-10 flex gap-10">
                            <div className="flex items-center gap-4 group/tech">
                                <div className="w-2 h-2 bg-white/20 group-hover:bg-[#E81414] transition-colors" />
                                <span className="text-[10px] tracking-[0.4em] uppercase text-white/20 group-hover:text-white transition-colors font-black">Index: 0x442</span>
                            </div>
                            <div className="flex items-center gap-4 group/tech">
                                
                                <span className="text-[10px] tracking-[0.4em] uppercase text-white/20 group-hover:text-white transition-colors font-black">STATUS: INDEXING CLEAR</span>
                            </div>
                        </div>
                    </div>

                    {/* Module Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-white/10 divide-x-2 divide-white/10 bg-black">
                        {[
                            { title: 'CORE FOUNDATIONS', status: 'LOCKED KERN', progress: '00%' },
                            { title: 'EXPLOIT THEORY', status: 'ENCRYPTED', progress: '00%' },
                        ].map((mod, i) => (
                            <div key={i} className="bg-[#050505] p-12 flex justify-between items-center group/mod cursor-wait hover:bg-[#E81414]/5 transition-all">
                                <div className="space-y-4">
                                    <h3 className="text-[14px] tracking-[0.6em] font-black uppercase text-white/20 group-hover/mod:text-white transition-all">{mod.title}</h3>
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-2 bg-[#E81414]" />
                                        <span className="text-[11px] tracking-[0.4em] uppercase text-[#E81414] font-black">{mod.status}</span>
                                    </div>
                                </div>
                                <div className="text-6xl font-black tracking-tighter text-white/5 transition-all group-hover/mod:text-white/10">{mod.progress}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar details */}
                <div className="lg:col-span-4 space-y-12 h-full flex flex-col">
                    <div className="bg-white p-12 space-y-12 border-2 border-white relative overflow-hidden group/sidebar flex-1 flex flex-col justify-between">
                        <div className="absolute inset-0 scanlines opacity-5 invert pointer-events-none" />
                        <div className="space-y-8 relative z-10">
                            <div className="flex items-center justify-between border-b-4 border-black pb-6">
                                <p className="text-[13px] tracking-[0.6em] uppercase text-black font-black">LATEST SYNC</p>
                                
                            </div>
                            <div className="space-y-8">
                                {[
                                    'React 19 Patterns [ALFA SYNC]',
                                    'Advanced Rust Safety [BETA]',
                                    'Neural Network Kernels'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-6 group/item cursor-pointer">
                                        <div className="w-10 h-10 border-2 border-black/10 flex items-center justify-center text-black/10 group-hover/item:bg-black group-hover/item:text-white transition-all">
                                            <img src="/suriken.png" alt="icon" className="w-4 h-4 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                        </div>
                                        <span className="text-[12px] tracking-[0.2em] uppercase text-black/40 group-hover/item:text-black transition-colors font-black">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className="w-full py-8 bg-black text-white text-[12px] tracking-[0.8em] font-black uppercase hover:bg-[#E81414] transition-all flex items-center justify-center gap-6 group/req relative z-10">
                            REQUEST MODULE <img src="/suriken.png" alt="icon" className="w-5 h-5 transition-transform object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        </button>
                    </div>

                    {/* Decorative Call to Action */}
                    <div className="bg-black border-2 border-white/10 p-12 min-h-[300px] relative overflow-hidden flex flex-col justify-between group cursor-pointer hover:border-[#E81414] transition-all h-[300px]">
                        <div className="absolute inset-0 bg-[#E81414]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <img src="/suriken.png" alt="icon" className="relative z-10 w-12 h-12 group-hover:scale-125 transition-all duration-500 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        <div className="space-y-4 relative z-10">
                            <h3 className="text-4xl font-black tracking-tighter uppercase text-white group-hover:text-[#E81414] leading-none transition-colors">
                                FAST TRACK<br />LEARNING
                            </h3>
                            <p className="text-[11px] tracking-[0.4em] uppercase text-white/20 group-hover:text-white transition-colors font-black">Accelerate knowledge acquisition</p>
                        </div>
                        <img src="/suriken.png" alt="icon" className="absolute top-12 right-12 w-10 h-10 white/5 group-hover:text-white transition-all transform group-hover:translate-x-2 group-hover:-translate-y-2 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                    </div>
                </div>
            </div>

            {/* Tactical Bottom Bar */}
            <div className="p-16 border-2 border-white/10 bg-[#050505] flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group/footer">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E81414]/5 to-transparent opacity-0 group-hover/footer:opacity-100 transition-opacity duration-1000" />
                <div className="flex items-center gap-8 relative z-10">
                    <div className="p-4 border-2 border-[#E81414]">
                        <img src="/suriken.png" alt="icon" className="w-8 h-8 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                    </div>
                    <span className="text-[14px] tracking-[0.8em] uppercase text-white font-black group-hover:text-[#E81414] transition-colors">ENCRYPTED SIGNAL STREAM</span>
                </div>
                <div className="flex gap-8 relative z-10">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-4 h-4 bg-white/10 hover:bg-[#E81414] transition-colors cursor-pointer rotate-45 first:bg-[#E81414] first:shadow-[0_0_10px_#E81414]" />
                    ))}
                </div>
            </div>
        </div>
    );
}

'use client';

import { motion } from 'framer-motion';


/* ── Decorative Elements ─────────────────────────────────────────────── */
const DotGrid = () => (
    <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />
);

export default function InternshipsPage() {
    return (
        <div className="w-full pb-24 space-y-20 relative overflow-hidden">
            <DotGrid />

            {/* ══ HEADER MODULE ═══════════════════════════════════════════════ */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end border-b-8 border-white pb-16 gap-12 relative z-10">
                <div className="space-y-10">
                    <div className="flex items-center gap-8">
                        <div className="w-14 h-14 flex items-center justify-center transition-transform duration-500 relative group/header">
                            <img
                                src="/logo.png"
                                alt="Zapsters Logo"
                                className="w-full h-full object-contain"
                                style={{ transform: "scale(2.5) translate(0px, 0px)" }}
                            />
                        </div>
                        <span className="text-[12px] tracking-[1em] font-black uppercase text-white/30">RECRUITMENT_PORTAL // v1.0.4</span>
                    </div>
                    <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.75] text-white">
                        CAREER<br /><span className="text-white">DYNAMICS.</span>
                    </h1>
                </div>

                <div className="p-12 border-4 border-white bg-black flex flex-col gap-6 min-w-[320px] group hover:bg-[#E81414] transition-all shadow-[12px_12px_0px_rgba(255,255,255,0.05)]">
                    <div className="flex items-center justify-between border-b-2 border-white/20 pb-4">
                        <span className="text-[11px] tracking-[0.8em] text-white/40 uppercase font-black group-hover:text-black">RECRUITER SYNC</span>
                        <div className="w-3 h-3 bg-[#E81414] group-hover:bg-black transition-colors" />
                    </div>
                    <span className="text-4xl font-black uppercase tracking-widest text-white group-hover:text-black transition-colors">OFFLINE</span>
                </div>
            </div>

            {/* ══ BOARD STATUS ════════════════════════════════════════════════ */}
            <div className="bg-black border-4 border-white relative min-h-[800px] flex flex-col items-center justify-center p-16 overflow-hidden text-center group/stage shadow-[16px_16px_0px_rgba(255,255,255,0.05)]">
                <DotGrid />
                <div className="absolute inset-0 scanlines opacity-5 pointer-events-none" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-white/[0.01] uppercase select-none pointer-events-none whitespace-nowrap group-hover:tracking-[0.1em] transition-all duration-1000">
                    TERMINATED
                </div>

                <div className="relative z-10 space-y-24 max-w-6xl w-full flex flex-col items-center">
                    <div className="w-48 h-48 border-8 border-white bg-black flex items-center justify-center relative hover:scale-110 transition-transform duration-700 shadow-[12px_12px_0px_#E81414]">
                        <img src="/suriken.png" alt="icon" className="w-24 h-24 white group-hover: group-hover:scale-110 transition-all z-10 relative object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        <div className="absolute inset-0 scanlines opacity-10 pointer-events-none" />

                        <div className="absolute -top-1 -right-1 w-10 h-10 border-t-8 border-r-8 border-[#E81414]" />
                        <div className="absolute -bottom-1 -left-1 w-10 h-10 border-b-8 border-l-8 border-white" />
                    </div>

                    <div className="space-y-12 w-full">
                        <h2 className="text-7xl md:text-[9rem] font-black uppercase text-white tracking-tighter leading-none border-b-[20px] border-white pb-10 inline-block">
                            BOARD LOCK.
                        </h2>

                        <div className="bg-white p-20 border-8 border-black flex flex-col items-center gap-12 max-w-4xl mx-auto shadow-[20px_20px_0px_#E81414] relative overflow-hidden group/notice">
                            <div className="absolute inset-0 scanlines opacity-5 invert pointer-events-none" />
                            <p className="text-2xl md:text-3xl tracking-[0.05em] font-black text-black uppercase leading-[1.1] relative z-10">
                                CORPORATE BOUNTY BOARD IS CURRENTLY ENCRYPTED.
                                SYNDICATES REQUIRE VALIDATED ARENA DOSSIERS AND L3 CLEARANCE.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full relative z-10">
                                <button className="w-full py-10 bg-black text-white text-[16px] tracking-[1em] font-black uppercase hover:bg-[#E81414] transition-all flex items-center justify-center gap-10 group/btn shadow-[12px_12px_0px_rgba(0,0,0,0.1)]">
                                    APPLY NOW <img src="/suriken.png" alt="icon" className="w-8 h-8 group-hover/btn:translate-x-4 transition-transform object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                </button>
                                <button className="w-full py-10 border-4 border-black text-black text-[16px] tracking-[1em] font-black uppercase hover:bg-black hover:text-white transition-all flex items-center justify-center gap-10 group/btn-alt">
                                    SYNC PROFILE <img src="/suriken.png" alt="icon" className="w-10 h-10 transition-transform object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══ LOGISTICS FOOTER ════════════════════════════════════════════ */}
            <div className="grid grid-cols-1 md:grid-cols-2 border-4 border-white bg-black z-10 relative overflow-hidden divide-y-4 md:divide-y-0 md:divide-x-4 divide-white shadow-[12px_12px_0px_rgba(255,255,255,0.05)]">
                <div className="p-12 space-y-8 group/item hover:bg-white/[0.04] transition-all cursor-crosshair text-left">
                    <div className="flex items-center gap-8">
                        <img src="/suriken.png" alt="icon" className="w-10 h-10 [#E81414] group-hover:scale-110 transition-transform object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        <span className="text-[12px] tracking-[1em] font-black uppercase text-white/30">ELIGIBILITY STATUS</span>
                    </div>
                    <div className="space-y-2">
                        <p className="text-4xl font-black tracking-tighter uppercase text-white">REDACTED CLEARANCE</p>
                        <p className="text-[11px] tracking-[0.4em] font-black text-white/10">REQUIRES L3 SYNC</p>
                    </div>
                </div>
                <div className="p-12 space-y-8 group/item hover:bg-white/[0.04] transition-all cursor-crosshair text-left">
                    <div className="flex items-center gap-8">
                        <img src="/suriken.png" alt="icon" className="w-10 h-10 white/20 group-hover:text-white transition-colors object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        <span className="text-[12px] tracking-[1em] font-black uppercase text-white/30">SYNDICATE REACH</span>
                    </div>
                    <div className="space-y-2">
                        <p className="text-4xl font-black tracking-tighter uppercase text-white">ZERO ACTIVE CHANNELS</p>
                        <p className="text-[11px] tracking-[0.4em] font-black text-white/10">WAITING FOR BROADCAST</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

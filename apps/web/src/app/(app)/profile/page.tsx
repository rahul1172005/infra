'use client';

import { motion } from 'framer-motion';

/* ── Decorative Elements ─────────────────────────────────────────────── */
const DotGrid = () => (
    <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />
);

export default function ProfilePage() {
    return (
        <div className="w-full pb-16 space-y-8 md:space-y-14 lg:space-y-20 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#E81414]/5 blur-[200px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/[0.02] blur-[150px] pointer-events-none" />

            {/* ══ HEADER MODULE ═══════════════════════════════════════════════ */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end border-b border-white/10 pb-8 md:pb-16 gap-6 md:gap-12 relative z-10">
                <div className="space-y-10">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 flex items-center justify-center transition-transform duration-500 relative group/header bg-[#E81414] rounded-full">
                            <img
                                src="/suriken.png"
                                alt="Zapsters Logo"
                                className="w-6 h-6 object-contain white relative z-10"
                                style={{ transform: "scale(2.2) translate(0px, 0px)" }}
                            />
                        </div>
                        <span className="text-[11px] tracking-[0.8em] font-black uppercase text-white/30">OPERATIVE_ID // SECURE_CLEARANCE_v4</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-white">
                        IDENTITY<br /><span className="text-[#E81414]">REGISTRY.</span>
                    </h1>
                </div>

                <div className="w-full xl:w-auto p-6 md:p-10 border border-white/10 bg-[#0A0A0A] rounded-2xl md:rounded-[2.5rem] flex flex-col gap-4 md:gap-6 group hover:border-[#E81414]/30 transition-all">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <span className="text-[9px] tracking-[0.8em] text-white/40 uppercase font-black">AUTH STATUS</span>
                    </div>
                    <span className="text-3xl font-black uppercase tracking-widest text-[#E81414] transition-colors">PENDING SYNC</span>
                </div>
            </div>

            {/* ══ AUTH REQUIRED STATE ═════════════════════════════════════════ */}
            <div className="bg-[#050505] border border-white/10 rounded-2xl md:rounded-[3rem] relative min-h-[480px] md:min-h-[650px] flex flex-col items-center justify-center p-6 md:p-16 overflow-hidden text-center group/stage hover:border-[#E81414]/20 transition-all duration-500">
                <DotGrid />
                <div className="absolute inset-0 scanlines opacity-5 pointer-events-none group-hover/stage:opacity-10 transition-opacity" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.01] uppercase select-none pointer-events-none whitespace-nowrap group-hover:tracking-[0.1em] transition-all duration-1000">
                    LOCKED FILE
                </div>

                <div className="relative z-10 flex flex-col items-center gap-16 max-w-5xl w-full">
                    {/* Biometric Guard */}
                    <div className="w-40 h-40 border border-white/10 rounded-[2.5rem] bg-black flex items-center justify-center relative hover:scale-110 transition-transform duration-700 overflow-hidden cursor-crosshair">
                        <div className="absolute inset-0 scanlines opacity-10" />
                        <img src="/suriken.png" alt="icon" className="w-16 h-16 [#E81414] relative z-10 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                    </div>

                    <div className="space-y-12 w-full group/text">
                        <h2 className="text-3xl md:text-5xl lg:text-8xl font-black uppercase text-white tracking-widest leading-none border-b border-white/10 pb-6 md:pb-10 inline-block transition-colors">
                            ENCRYPT BLOCK.
                        </h2>

                        <div className="bg-black p-12 border border-white/10 flex flex-col items-center gap-12 max-w-4xl mx-auto rounded-[2.5rem] overflow-hidden group/notice relative backdrop-blur-sm group-hover/stage:bg-white/5 transition-all">
                            <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />
                            <p className="text-[12px] tracking-[0.2em] font-black uppercase leading-loose text-white/40 group-hover/stage:text-white/60 transition-colors duration-500 max-w-2xl relative z-10">
                                DECENTRALIZED WALLET OR NEURAL-LINK ID REQUIRED TO DECRYPT
                                OPERATIONAL HISTORY AND SYNDICATE CLEARANCE.
                            </p>
                            <button className="px-14 py-6 bg-white text-black text-[11px] tracking-[0.6em] font-black uppercase hover:bg-[#E81414] hover:text-white transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-6 rounded-full relative z-10 shadow-xl">
                                INITIALIZE AUTH <img src="/suriken.png" alt="icon" className="w-5 h-5 transition-transform object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                            </button>
                        </div>
                    </div>

                    {/* Metadata Footer */}
                    <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-12 w-full pt-8 md:pt-20 border-t border-white/10">
                        <MetadataItem label="NODESTATION" val="NULL_ZONE_0x" icon={<img src="/suriken.png" alt="icon" className="w-full h-full object-contain" style={{ "transform": "scale(1.3) translate(0px, 1px)" }} />} />
                        <MetadataItem label="SECURITY LVL" val="REDACTED" icon={<img src="/suriken.png" alt="icon" className="w-full h-full object-contain" style={{ "transform": "scale(1.3) translate(0px, 1px)" }} />} color="text-[#E81414]" />
                        <MetadataItem label="LATENCY RT" val="0.00ms" icon={<img src="/suriken.png" alt="icon" className="w-full h-full object-contain" style={{ "transform": "scale(1.3) translate(0px, 1px)" }} />} />
                    </div>
                </div>
            </div>

            {/* ══ INDUSTRIAL CONTROL BAR ══════════════════════════════════════ */}
            <div className="flex border border-white/10 rounded-[2.5rem] bg-[#0A0A0A] p-10 justify-between items-center group/footer overflow-hidden relative">
                <DotGrid />
                <div className="flex items-center gap-10 relative z-10">
                    <div className="w-14 h-14 border border-white/10 rounded-[1.5rem] flex items-center justify-center bg-black group-hover/footer:border-[#E81414] transition-colors">
                        <img src="/suriken.png" alt="icon" className="w-6 h-6 white/30 group-hover:text-white transition-all duration-700 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                    </div>
                    <div className="space-y-1">
                        <span className="text-[12px] tracking-[0.6em] font-black uppercase text-white/40 group-hover/footer:text-white transition-colors">CONFIG SEC V4</span>
                        <p className="text-[9px] tracking-[0.2em] font-black uppercase text-white/20">SYSTEM STABLE HANDSHAKE</p>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-3 relative z-10">
                    <div className="flex items-center gap-6">
                        <span className="text-[10px] tracking-[0.4em] font-black uppercase text-white/20">OPERATIONAL BUILD:</span>
                        <span className="text-[10px] tracking-[0.6em] font-black uppercase text-[#E81414]">1.0.4 CLEAN</span>
                    </div>
                    <div className="h-[2px] w-48 bg-white/5 relative overflow-hidden rounded-full">
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 w-1/2 bg-[#E81414]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function MetadataItem({ label, val, icon, color = "text-white/20" }: { label: string, val: string, icon: React.ReactNode, color?: string }) {
    return (
        <div className="space-y-6 group/item cursor-pointer text-left">
            <div className={`w-14 h-14 p-4 rounded-[1.5rem] bg-black border border-white/10 inline-flex group-hover/item:border-[#E81414] transition-all ${color}`}>
                {icon}
            </div>
            <div className="space-y-2">
                <p className="text-[10px] tracking-[0.6em] text-white/30 uppercase font-black">{label}</p>
                <p className="text-2xl font-black uppercase tracking-tighter text-white group-hover/item:text-[#E81414] transition-colors">{val}</p>
            </div>
        </div>
    );
}

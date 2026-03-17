'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Power, Terminal, XCircle } from 'lucide-react';

import { useState } from 'react';

/* ── Decorative Components ─────────────────────────────────────────── */
const DotGrid = () => (
    <div className="absolute inset-0 dot-grid pointer-events-none opacity-[0.05]" />
);

export default function ArenaPage() {
    const [isMatching, setIsMatching] = useState(false);

    return (
        <div className="w-full space-y-12 pb-24 relative overflow-hidden">
            <DotGrid />

            {/* ══ HEADER ═════════════════════════════════════════════════════ */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end border-b border-white/10 pb-12 gap-12 relative z-10">
                <div className="space-y-6">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-white">
                        BATTLE<br /><span className="text-white">ARENA</span>
                    </h1>
                </div>

                <div className="flex items-center gap-8 bg-[#0A0A0A] border border-white/10 p-10 group hover:bg-[#E81414] hover:border-[#E81414] transition-all rounded-[2.5rem] cursor-pointer text-white hover:text-black">
                    <div className="flex flex-col items-start gap-4">
                        <span className="text-[9px] tracking-[0.6em] font-black uppercase text-white/30 group-hover:text-black/60 transition-colors">OPERATIVES REACHED</span>
                        <div className="flex items-center gap-6">
                            
                            <span className="text-4xl font-black uppercase tracking-tighter tabular-nums">1,402</span>
                        </div>
                    </div>
                    <div className="h-16 w-[1px] bg-white/10 group-hover:bg-black/20 transition-colors mx-2" />
                    <img src="/suriken.png" alt="icon" className="w-8 h-8 group-hover:text-black transition-colors object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                </div>
            </div>

            {/* ══ MAIN ACTION TILES ═══════════════════════════════════════════ */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">

                {/* Left: Deployment Tile */}
                <div className="md:col-span-12 xl:col-span-8 bg-[#0A0A0A] border border-white/10 p-10 md:p-14 space-y-12 flex flex-col justify-between relative overflow-hidden group/deploy transition-all rounded-[3rem]">
                    <div className="absolute top-0 right-0 w-80 h-80 border-l border-b border-white/5 opacity-40 pointer-events-none group-hover/deploy:opacity-100 group-hover/deploy:border-white/10 transition-all rounded-bl-[3rem]" />
                    <DotGrid />

                    <div className="space-y-10 relative z-10 flex-1">
                        <div className="px-6 py-2 border border-[#E81414] rounded-full inline-block text-[9px] tracking-[0.8em] font-black uppercase bg-[#E81414]/5 text-[#E81414]">
                            LIVE ZONE CMD
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85] text-white">
                            INITIATE<br />DEPLOYMENT.
                        </h2>
                        <p className="text-[12px] tracking-[0.2em] font-black uppercase text-white/40 max-w-xl leading-relaxed">
                            ENGAGE IN REAL-TIME ALGORITHMIC COMBAT THROUGH ENCRYPTED TUNNELS.
                            VICTORY YIELDS HIGH-TIER XP AND OPERATIONAL PRESTIGE.
                        </p>
                    </div>

                    <Button
                        variant="primary"
                        size="xl"
                        fullWidth
                        className="h-20 md:h-24"
                        onClick={() => setIsMatching(true)}
                        icon={() => <img src="/suriken.png" alt="icon" className="w-6 h-6 relative z-10 group-hover:translate-x-4 transition-transform object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />}
                    >
                        START SYNC
                    </Button>
                </div>

                {/* Right: Technical Sidebar */}
                <div className="md:col-span-12 xl:col-span-4 space-y-12">
                    <div className="bg-white/5 p-10 space-y-10 border border-white/10 rounded-[2.5rem] group/train hover:bg-[#E81414] hover:text-black transition-all relative overflow-hidden flex flex-col justify-between cursor-crosshair text-white">
                        <div className="absolute inset-0 scanlines opacity-5 mix-blend-overlay group-hover/train:opacity-10 transition-opacity" />
                        <div className="space-y-8 relative z-10">
                            <div className="flex justify-between items-start">
                                <div className="w-14 h-14 border border-white/10 rounded-2xl flex items-center justify-center bg-black group-hover/train:bg-black group-hover/train:border-black transition-all">
                                    <img src="/suriken.png" alt="icon" className="w-6 h-6 white object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                </div>
                                <span className="text-[9px] tracking-[0.6em] font-black uppercase text-white/30 group-hover/train:text-black/60 transition-colors">SIM UNIT v4.2</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9] text-inherit transition-colors">
                                TACTICAL<br />TRAINING
                            </h2>
                            <p className="text-[10px] tracking-[0.2em] font-black uppercase leading-relaxed text-inherit opacity-40">
                                REPLICA NODES FOR SAFE SCRIPT VALIDATION.
                            </p>
                        </div>

                        <Button
                            variant="outline"
                            size="lg"
                            fullWidth
                            className="mt-auto"
                            icon={Terminal}
                        >
                            LAUNCH SIM
                        </Button>
                    </div>

                    <div className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-10 space-y-8 group/stats hover:bg-[#E81414] hover:text-black transition-all text-white cursor-default">
                        <div className="flex items-center gap-6 border-b border-white/10 group-hover/stats:border-black/20 pb-6 transition-colors">
                            <img src="/suriken.png" alt="icon" className="w-6 h-6 group-hover/stats:text-black transition-colors object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                            <span className="text-[10px] tracking-[0.6em] font-black uppercase text-white/30 group-hover/stats:text-black/60 transition-colors">ARENA LOGISTICS</span>
                        </div>
                        <div className="grid grid-cols-2 gap-8 relative z-10">
                            <div>
                                <p className="text-[9px] tracking-[0.4em] font-black uppercase text-white/30 group-hover/stats:text-black/50 transition-colors mb-2">WIN RATE</p>
                                <p className="text-3xl font-black text-white group-hover/stats:text-black transition-colors">64.2%</p>
                            </div>
                            <div>
                                <p className="text-[9px] tracking-[0.4em] font-black uppercase text-white/30 group-hover/stats:text-black/50 transition-colors mb-2">SYS TIME</p>
                                <p className="text-3xl font-black text-white group-hover/stats:text-black transition-colors">142H</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══ MATCHMAKING OVERLAY ═════════════════════════════════════════ */}
            <AnimatePresence>
                {isMatching && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-12 overflow-hidden"
                    >
                        <div className="absolute inset-0 dot-grid opacity-[0.1]" />

                        <div className="relative z-10 w-full max-w-4xl space-y-16 flex flex-col items-center text-center">

                            <div className="space-y-12">
                                <div className="w-32 h-32 border border-white/10 rounded-full flex items-center justify-center mx-auto relative bg-[#0A0A0A]">
                                    <div className="w-20 h-20 border border-white/10 rounded-full absolute" />
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white">
                                    LOCATING<br /><span className="text-[#E81414]">SYNDICATE</span>
                                </h2>
                            </div>

                            <div className="text-[10px] tracking-[0.6em] font-black uppercase text-white/40 space-y-4">
                                <p>ESTABLISHING SECURE CONNECTION...</p>
                                <p className="text-[#E81414]">ROUTING PACKETS: 192.168.X.X</p>
                                <p>AWAITING OPPONENT CONFIRMATION</p>
                            </div>

                            <Button
                                variant="outline"
                                size="md"
                                onClick={() => setIsMatching(false)}
                                icon={XCircle}
                                className="border-white/20 text-white/50 hover:bg-white hover:text-black"
                            >
                                ABORT SEQUENCE
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

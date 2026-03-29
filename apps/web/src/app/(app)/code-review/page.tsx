'use client';

import { motion } from 'framer-motion';


/* ── Decorative Elements ─────────────────────────────────────────────── */
const DotGrid = ({ className = "" }: { className?: string }) => (
    <div className={`absolute inset-0 dot-grid opacity-[0.03] pointer-events-none ${className}`} />
);

export default function CodeReviewPage() {
    return (
        <div className="w-full pb-20 space-y-12">

            {/* Header Module */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end border-b-2 border-black pb-12 gap-10">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-black flex items-center justify-center">
                            <img style={{ transform: "scale(1.6)" }} src="/logo.png" alt="icon" className="w-10 h-10 white object-contain" />
                        </div>
                        <span className="text-[11px] tracking-[0.6em] font-black uppercase text-[#AAAAAA]">ROYAL SCROLL ANALYSIS</span>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]">
                        CODE<br /><span className="text-[#E81414]">REVIEW.</span>
                    </h1>
                </div>

                <div className="flex items-center gap-8 bg-[#F9F9F9] border-2 border-black p-8">
                    <div className="flex flex-col items-start gap-1">
                        <span className="text-[9px] tracking-[0.4em] font-black uppercase text-[#999999]">MAESTER LOAD</span>
                        <div className="flex items-center gap-4">
                            <img style={{ transform: "scale(1.6)" }} src="/logo.png" alt="icon" className="w-12 h-12 [#E81414] object-contain" />
                            <span className="text-3xl font-black uppercase tracking-widest text-black">0% IDLE</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Offline State */}
            <div className="bg-white border-2 border-black relative min-h-[600px] flex flex-col items-center justify-center p-12 overflow-hidden group">
                <DotGrid />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black text-black/[0.02] uppercase select-none pointer-events-none whitespace-nowrap">
                    CITADEL SYNC
                </div>

                <div className="relative z-10 flex flex-col items-center gap-10 max-w-2xl text-center">
                    <div className="w-24 h-24 border-2 border-black bg-white flex items-center justify-center relative shadow-none">
                        <img style={{ transform: "scale(1.6)" }} src="/logo.png" alt="icon" className="w-16 h-16 black group-hover: transition-colors object-contain" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-[#E81414]" />
                        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-black" />
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black ">
                            SCROLLS<br />UNAVAILABLE.
                        </h2>
                        <p className="text-[12px] tracking-[0.2em] font-black text-[#888888] uppercase leading-loose border-2 border-black/5 p-8 bg-[#F9F9F9]">
                            The Grand Maester's library is undergoing deep synchronization.
                            All royal review requests are held in the local buffer.
                            Lord Commander clearance required for emergency override.
                        </p>
                    </div>

                    <div className="w-full max-w-md space-y-4">
                        <div className="flex justify-between text-[9px] tracking-[0.5em] uppercase font-black text-[#AAAAAA]">
                            <span>SYNC PROGRESS</span>
                            <span>ETA: REMOTE SIGNAL LOST</span>
                        </div>
                        <div className="h-3 w-full bg-black/5 border-2 border-black p-[2px]">
                            <motion.div
                                initial={{ width: '0%' }}
                                animate={{ width: '15%' }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                className="h-full bg-[#E81414]"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="px-6 py-3 border-2 border-black bg-black text-white text-[9px] tracking-[0.4em] font-black uppercase">
                            SCROLL REF: GOT-CODE-305
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Industrial Strip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-black bg-black p-[1px]">
                <div className="p-10 bg-white flex flex-col gap-6 group">
                    <div className="flex items-center gap-4">
                        <img style={{ transform: "scale(1.6)" }} src="/logo.png" alt="icon" className="w-10 h-10 black group-hover: transition-colors object-contain" />
                        <span className="text-[11px] tracking-[0.4em] uppercase font-black text-black">DRAGONFIRE SHELL</span>
                    </div>
                    <p className="text-[12px] tracking-[0.2em] uppercase text-[#AAAAAA] font-black">LOCAL SANDBOX STABLE</p>
                </div>
                <div className="p-10 bg-white flex flex-col gap-6 items-end text-right group">
                    <div className="flex items-center gap-4">
                        <img style={{ transform: "scale(1.6)" }} src="/logo.png" alt="icon" className="w-10 h-10 [#AAAAAA] group-hover:text-black transition-colors object-contain" />
                    </div>
                    <p className="text-[12px] tracking-[0.2em] uppercase text-[#AAAAAA] font-black">HIGH COUNCIL REQ</p>
                </div>
            </div>
        </div>
    );
}

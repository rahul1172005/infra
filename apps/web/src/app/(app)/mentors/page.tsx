'use client';

import { motion } from 'framer-motion';
import { GOTIcon } from '@/components/icons/GOTIcon';


/* ── Decorative Elements ─────────────────────────────────────────────── */
const DotGrid = ({ className = "" }: { className?: string }) => (
    <div className={`absolute inset-0 dot-grid opacity-[0.05] pointer-events-none ${className}`} />
);

export default function MentorsPage() {
    return (
        <div className="w-full pb-24 space-y-16 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#E81414]/5 blur-[200px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/[0.02] blur-[150px] pointer-events-none" />

            {/* Header Module */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end border-b-2 border-white/10 pb-16 gap-12 relative z-10">
                <div className="space-y-8">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 flex items-center justify-center transition-transform duration-500 relative group/header">
                            <GOTIcon type="targaryen" size={80} scale={1.6} x={0} y={0} />
                        </div>
                        <span className="text-[11px] tracking-[0.8em] font-black uppercase text-white/30">ELITE MASTER ACQUISITION</span>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-white">
                        CORE<br /><span className="text-[#E81414]">MENTORS</span>
                    </h1>
                </div>

                <div className="p-10 border-2 border-white/10 bg-white/[0.02] flex flex-col gap-4 min-w-[300px] group hover:bg-[#E81414] hover:border-[#E81414] transition-all duration-500">
                    <div className="flex items-center justify-between border-b border-white/5 group-hover:border-black/10 pb-4">
                        <span className="text-[10px] tracking-[0.6em] text-white/20 group-hover:text-black/50 uppercase font-black transition-colors duration-500">AVAILABILITY STATE</span>
                        
                    </div>
                    <span className="text-3xl font-black uppercase tracking-widest text-[#E81414] group-hover:text-black transition-colors duration-500">MASTERS ENGAGED</span>
                </div>
            </div>

            {/* Empty State / Calendar Module */}
            <div className="bg-black border-2 border-white/10 relative min-h-[700px] flex flex-col items-center justify-center p-16 overflow-hidden text-center group/stage hover:border-white/20 transition-all z-10">
                <DotGrid />
                <div className="absolute inset-0 scanlines opacity-5 pointer-events-none group-hover/stage:opacity-10 transition-opacity" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.01] uppercase select-none pointer-events-none whitespace-nowrap group-hover:tracking-[0.1em] transition-all duration-1000">GATES CLOSED</div>

                <div className="relative z-10 space-y-16 max-w-4xl px-8 flex flex-col items-center">
                    <div className="w-40 h-40 border-2 border-white/10 bg-white/5 flex items-center justify-center relative hover:bg-black group/icon transition-all duration-700 overflow-hidden relative shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                        <GOTIcon type="targaryen" size={112} scale={1.6} x={0} y={0} className="group-hover:scale-[1.7] transition-all z-10 relative" />
                        <div className="absolute inset-0 bg-[#E81414]/10 translate-y-full group-hover/icon:translate-y-0 transition-transform duration-500" />

                        {/* Corner markers */}
                        <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-[#E81414]" />
                        <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-white" />
                    </div>

                    <div className="space-y-12">
                        <h2 className="text-6xl md:text-9xl font-black uppercase text-white tracking-tighter  border-b-8 border-[#E81414] pb-8 inline-block group-hover:scale-105 transition-transform duration-700">
                            COUNCIL BUSY
                        </h2>

                        <div className="bg-white p-12 border-2 border-white flex flex-col items-center gap-10 max-w-3xl mx-auto shadow-[0_0_50px_rgba(255,255,255,0.05)] relative overflow-hidden group/notice">
                            <div className="absolute inset-0 scanlines opacity-5 invert pointer-events-none" />
                            <p className="text-[18px] tracking-[0.4em] font-black text-black uppercase leading-relaxed relative z-10">
                                All Grand Masters are currently engaged in the Great Council.
                                New mentorship slots will be granted once the realm
                                stabilizes. Check back at the next sun rise.
                            </p>
                            <div className="flex flex-wrap justify-center gap-10 relative z-10">
                                <button className="px-12 py-6 bg-black text-white text-[12px] tracking-[0.8em] font-black uppercase hover:bg-[#E81414] transition-all flex items-center gap-6 group/btn shadow-[0_0_30px_rgba(0,0,0,0.2)]">
                                    JOIN WAITLIST
                                </button>
                                <button className="px-12 py-6 border-4 border-black text-black text-[12px] tracking-[0.8em] font-black uppercase hover:bg-black hover:text-white transition-all flex items-center gap-6 group/btn-alt">
                                    VERIFY ALLOCATION
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Industrial Bottom Info Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-2 border-white/10 bg-black divide-x-2 divide-white/10 z-10 relative">
                <div className="p-12 space-y-6 group hover:bg-[#E81414] transition-all duration-500 cursor-crosshair">
                    <div className="flex items-center gap-6">
                        <GOTIcon type="targaryen" size={56} scale={1.6} x={0} y={0} className="group-hover:opacity-100 opacity-30 transition-opacity duration-500" />
                        <span className="text-[11px] tracking-[0.6em] font-black uppercase text-white/20 group-hover:text-black transition-colors duration-500">NEXT COUNCIL WINDOW</span>
                    </div>
                    <p className="text-4xl font-black tracking-widest uppercase text-white group-hover:text-black transition-colors duration-500">72:00 HR</p>
                    <div className="h-1 w-12 bg-white/5 transition-all group-hover:w-full group-hover:bg-black/20 duration-700" />
                </div>
                <div className="p-12 space-y-6 group hover:bg-[#E81414] transition-all duration-500 cursor-crosshair">
                    <div className="flex items-center gap-6">
                        <GOTIcon type="targaryen" size={56} scale={1.6} x={0} y={0} className="group-hover:scale-[1.7] transition-transform" />
                        <span className="text-[11px] tracking-[0.6em] font-black uppercase text-white/20 group-hover:text-black transition-colors duration-500">ACTIVE MASTERS</span>
                    </div>
                    <p className="text-4xl font-black tracking-widest uppercase text-white group-hover:text-black transition-colors duration-500">42 NODES</p>
                    <div className="h-1 w-12 bg-[#E81414]/20 transition-all group-hover:w-full group-hover:bg-black/20 duration-700" />
                </div>
                <div className="p-12 space-y-6 group hover:bg-[#E81414] transition-all duration-500 cursor-crosshair">
                    <div className="flex items-center gap-6">
                        <GOTIcon type="targaryen" size={56} scale={1.6} x={0} y={0} className="group-hover:opacity-100 opacity-30 transition-opacity duration-500" />
                        <span className="text-[11px] tracking-[0.6em] font-black uppercase text-white/20 group-hover:text-black transition-colors duration-500">REALM STABILITY</span>
                    </div>
                    <p className="text-4xl font-black tracking-widest uppercase text-white group-hover:text-black transition-colors duration-500">99.2% CLEAR</p>
                    <div className="h-1 w-12 bg-white/5 transition-all group-hover:w-full group-hover:bg-black/20 duration-700" />
                </div>
            </div>
        </div>
    );
}

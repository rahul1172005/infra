'use client';

import { motion } from 'framer-motion';


/* ── Decorative Elements ─────────────────────────────────────────────── */
const DotGrid = () => (
    <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />
);

export default function AdminPage() {
    return (
        <div className="w-full pb-16 space-y-8 md:space-y-14 lg:space-y-20 relative overflow-hidden">
            <DotGrid />

            {/* ══ HEADER MODULE ═══════════════════════════════════════════════ */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end border-b-4 md:border-b-8 border-white pb-6 md:pb-16 gap-6 md:gap-12 relative z-10">
                <div className="space-y-10">
                    <div className="flex items-center gap-8">
                        <div className="w-14 h-14 bg-[#E81414] flex items-center justify-center shadow-[8px_8px_0px_#FFF]">
                            <img src="/suriken.png" alt="icon" className="w-8 h-8 white object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        </div>
                        <span className="text-[12px] tracking-[1em] font-black uppercase text-white/30">OVERSIGHT KERNEL</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.75] text-white">
                        SYSTEM<br /><span className="text-white">CONTROL.</span>
                    </h1>
                </div>

                <div className="w-full xl:w-auto p-6 md:p-12 border-4 border-white bg-black flex flex-col items-start md:items-end gap-4 md:gap-6 group hover:bg-[#E81414] transition-all shadow-[12px_12px_0px_rgba(255,255,255,0.05)]">
                    <span className="text-[11px] tracking-[0.8em] text-white/40 uppercase font-black group-hover:text-black">ACCESS LEVEL: L5</span>
                    <div className="flex items-center gap-4 md:gap-8 group/alert cursor-warning">
                        <img src="/suriken.png" alt="icon" className="w-6 h-6 md:w-8 md:h-8 group-hover:text-black transition-colors object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        <span className="text-xl md:text-3xl font-black tracking-widest uppercase text-white group-hover:text-black transition-colors">RESTRICTED AUTH</span>
                    </div>
                </div>
            </div>

            {/* ══ DASHBOARD GRID ══════════════════════════════════════════════ */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12 relative z-10">
                {[
                    { title: "NODES ACTIVE", val: "1,402", icon: <img src="/suriken.png" alt="icon" className="w-10 h-10 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />, color: "text-white" },
                    { title: "SYSTEM LOAD", val: "84%", icon: <img src="/suriken.png" alt="icon" className="w-10 h-10 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />, color: "text-white" },
                    { title: "SECURITY FAILS", val: "9,021", icon: <img src="/suriken.png" alt="icon" className="w-10 h-10 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />, color: "text-[#E81414]" },
                    { title: "SYNC VELOCITY", val: "42K", icon: <img src="/suriken.png" alt="icon" className="w-10 h-10 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />, color: "text-white" },
                ].map((stat, i) => (
                    <div
                        key={i}
                        className="bg-black p-5 md:p-12 border-2 md:border-4 border-white/10 flex flex-col justify-between min-h-[160px] md:min-h-[320px] group hover:border-white transition-all relative overflow-hidden cursor-crosshair h-full shadow-[10px_10px_0px_rgba(255,255,255,0.05)]"
                    >
                        <DotGrid />
                        <div className="flex justify-between items-start relative z-10">
                            <div className="space-y-3 md:space-y-6 flex-1 text-left">
                                <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.5em] md:tracking-[0.8em] text-white/30 group-hover:text-white transition-colors">{stat.title}</span>
                                <div className="w-full h-1 bg-white/5 transition-all group-hover:bg-[#E81414]" />
                            </div>
                            <div className={`p-3 md:p-6 border-4 border-white/10 bg-white/5 group-hover:bg-white group-hover:text-black transition-all duration-700 overflow-hidden relative ${stat.color}`}>
                                {stat.icon}
                            </div>
                        </div>
                        <h3 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mt-auto text-white relative z-10">{stat.val}</h3>
                    </div>
                ))}
            </div>

            {/* ══ TERMINAL MODULE ═════════════════════════════════════════════ */}
            <div className="bg-[#050505] border-4 border-white flex flex-col relative overflow-hidden group/stage shadow-[16px_16px_0px_rgba(255,255,255,0.05)] z-10">
                <DotGrid />
                <div className="absolute inset-0 scanlines opacity-5 pointer-events-none group-hover/stage:opacity-10 transition-opacity" />

                <div className="p-6 md:p-12 border-b-2 md:border-b-4 border-white bg-white text-black flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4 md:gap-10">
                        <img src="/suriken.png" alt="icon" className="w-6 h-6 md:w-8 md:h-8 transition-transform duration-500 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        <span className="text-[12px] md:text-[16px] font-black uppercase tracking-[0.4em] md:tracking-[1em]">SYSTEM LOGS</span>
                    </div>
                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-[12px] tracking-[0.2em] md:tracking-[0.6em] font-black uppercase group-hover/stage:text-[#E81414] transition-colors">
                        <img src="/suriken.png" alt="icon" className="w-4 h-4 md:w-6 md:h-6 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} /> LIVE SYNC
                        </div>
                        <img src="/suriken.png" alt="icon" className="w-5 h-5 md:w-8 md:h-8 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                    </div>
                </div>

                <div className="p-6 md:p-12 lg:p-16 min-h-[300px] md:min-h-[500px] lg:min-h-[650px] text-base md:text-lg font-bold uppercase tracking-widest leading-[2.5] space-y-6 md:space-y-8 bg-black relative z-10 overflow-x-auto text-left">
                    <div className="flex gap-5 md:gap-10 group/log cursor-pointer border-b border-white/5 pb-4 overflow-hidden">
                        <span className="text-white/20 group-hover:text-white transition-colors">09:21:42</span>
                        <span className="bg-white text-black px-6 py-1 leading-none h-fit">AUTH</span>
                        <span className="text-white/40 group-hover:text-white transition-colors">ROOT IDENTIFIER SYNCED FROM 192.168.1.1</span>
                    </div>
                    <div className="flex gap-5 md:gap-10 group/log cursor-pointer border-b border-white/5 pb-4 overflow-hidden">
                        <span className="text-white/20 group-hover:text-white transition-colors">09:22:15</span>
                        <span className="bg-[#E81414] text-white px-6 py-1 leading-none h-fit shadow-[8px_8px_0px_rgba(232,20,20,0.2)]">KERNEL</span>
                        <span className="text-white">DB SHARD SEQUENCE 04 INITIATED</span>
                    </div>
                    <div className="flex gap-5 md:gap-10 group/log cursor-pointer border-l-[8px] md:border-l-[12px] border-l-[#E81414] pl-5 md:pl-10 bg-[#E81414]/5 py-4 md:py-6 overflow-hidden">
                        <span className="text-[#E81414]">09:24:01</span>
                        <span className="border-4 border-[#E81414] px-6 py-1 leading-none h-fit text-[#E81414]">CRITICAL</span>
                        <span className="text-[#E81414] font-black">MEMORY SPIKE US EAST 01 AUTO SCALING TRIGGERED</span>
                    </div>
                    <div className="flex gap-5 md:gap-10 group/log cursor-pointer border-b border-white/5 pb-4 overflow-hidden">
                        <span className="text-white/20 group-hover:text-white transition-colors">09:28:30</span>
                        <span className="bg-white text-black px-6 py-1 leading-none h-fit">MISSION</span>
                        <span className="text-white/40 group-hover:text-white transition-colors">BRACKET MATRIX GENERATED FOR 4204 UNITS</span>
                    </div>

                    <div className="flex items-center gap-10 mt-20 text-white/10 group-hover/stage:text-white/40 transition-colors">
                        
                        <span className="text-2xl tracking-[1em] font-black">AWAITING INPUT...</span>
                    </div>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.01] uppercase select-none pointer-events-none whitespace-nowrap group-hover:tracking-[0.05em] transition-all duration-1000">
                    OVERSIGHT
                </div>
            </div>

            {/* ══ INDUSTRIAL CONTROL OVERLAY ══════════════════════════════════ */}
            <div className="p-6 md:p-16 border-2 md:border-4 border-white bg-white text-black flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12 relative overflow-hidden group/footer shadow-[20px_20px_0px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 scanlines opacity-5 pointer-events-none" />
                <div className="flex items-center gap-12 relative z-10">
                    <div className="flex items-center gap-8">
                        <div className="w-4 h-4 bg-[#E81414] group-hover:scale-150 transition-transform" />
                        <span className="text-2xl tracking-[1em] font-black uppercase">CORE LIVE</span>
                    </div>
                    <div className="text-[12px] tracking-[0.4em] font-black uppercase opacity-40">BUILD 0x9422 SYNERGY</div>
                </div>
                <button className="w-full md:w-auto px-10 md:px-16 py-6 md:py-8 bg-black text-white text-[12px] md:text-[16px] tracking-[0.6em] md:tracking-[1em] font-black uppercase hover:bg-[#E81414] transition-all flex items-center justify-center gap-8 group/btn-footer">
                    MANAGE SYSTEMS <img src="/suriken.png" alt="icon" className="w-6 h-6 md:w-8 md:h-8 transition-transform object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                </button>
            </div>
        </div>
    );
}

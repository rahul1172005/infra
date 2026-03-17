'use client';

import { motion } from 'framer-motion';

import { useState } from 'react';

const CHALLENGES = [
    {
        id: 'CHL-01',
        name: 'KERNEL EXPLOIT V2',
        domain: 'WEB EXPLOITATION',
        points: 1500,
        difficulty: 'RUTHLESS',
        rules: ["NO DDOS ATTACKS ALLOWED", "FLAG FORMAT MUST BE ZAP{...}", "TIME LIMIT: 2 HOURS", "MUST SUBMIT EXPLOIT PAYLOAD"]
    },
    {
        id: 'CHL-02',
        name: 'CRYPTO LOCK BYPASS',
        domain: 'CRYPTOGRAPHY',
        points: 2800,
        difficulty: 'NIGHTMARE',
        rules: ["KEY SPACE IS RESTRICTED TO 256 BITS", "ORACLE IS PROVIDED ON PORT 1337", "MAX 5000 REQUESTS ALLOWED", "NO COMMERCIAL AUTOMATED SCANNERS"]
    },
    {
        id: 'CHL-03',
        name: 'GHOST IN THE WIRE',
        domain: 'NETWORK FORENSICS',
        points: 3400,
        difficulty: 'INSANE',
        rules: ["PCAP FILE PROVIDED IN RESOURCES", "ANALYZE ALL TCP STREAMS", "IDENTIFY THE C2 SERVER IP", "EXTRACT THE SECOND STAGE BINARY"]
    },
    {
        id: 'CHL-04',
        name: 'HARDWARE TROJAN',
        domain: 'REVERSE ENGINEERING',
        points: 4200,
        difficulty: 'GODLIKE',
        rules: ["FIRMWARE BINARY GIVEN", "ARM ARCHITECTURE - AARCH64", "BYPASS JWT VALIDATION SEQUENCE", "WRITE EXPLOIT SCRIPT IN PYTHON3"]
    },
    {
        id: 'CHL-05',
        name: 'SMART CONTRACT RUG',
        domain: 'BLOCKCHAIN',
        points: 5000,
        difficulty: 'UNREAL',
        rules: ["DEFI PROTOCOL FORK ON TESTNET", "FIND THE REENTRANCY VULNERABILITY", "DRAIN THE LIQUIDITY POOL", "EXPLAIN THE VULN IN WRITEUP"]
    },
    {
        id: 'CHL-06',
        name: 'ZERO DAY HUNT',
        domain: 'SYSTEMS',
        points: 8000,
        difficulty: 'IMPOSSIBLE',
        rules: ["ISOLATED CONTAINER ENVIRONMENT", "ROOT ESCALATION REQUIRED", "REPORT FULL VULN TRACE", "NO SOCIAL ENGINEERING TACTICS"]
    }
];

const DotGrid = () => (
    <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />
);

function FlipCard({ challenge }: { challenge: typeof CHALLENGES[0] }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="w-full h-[380px] relative cursor-pointer group/card"
            style={{ perspective: '2000px' }}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="w-full h-full relative"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* ── FRONT FACE ─────────────────────────────────────────────── */}
                <div
                    className="absolute inset-0 w-full h-full bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between overflow-hidden hover:bg-[#E81414] hover:border-[#E81414] transition-colors duration-500 group-hover/card:text-black text-white"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />

                    <div className="relative z-10 flex justify-between items-start">
                        <div className="flex items-center gap-4">
                            <img src="/suriken.png" alt="icon" className="w-8 h-8 group-hover/card:text-black transition-colors object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                            <span className="text-[10px] tracking-[0.5em] font-black uppercase text-white/30 group-hover/card:text-black/50 transition-colors">
                                {challenge.id}
                            </span>
                        </div>
                        <span className="px-4 py-2 border border-white/10 rounded-full text-[9px] tracking-[0.4em] font-black group-hover/card:border-black/20 group-hover/card:bg-black group-hover/card:text-white transition-colors">
                            {challenge.difficulty}
                        </span>
                    </div>

                    <div className="relative z-10 space-y-4">
                        <h3 className="text-3xl font-black tracking-tighter uppercase leading-[0.9]">
                            {challenge.name}
                        </h3>
                        <p className="text-[11px] tracking-[0.3em] font-black uppercase text-[#E81414] group-hover/card:text-black/80 transition-colors">
                            {challenge.domain}
                        </p>
                    </div>

                    <div className="relative z-10 flex justify-between items-end border-t border-white/10 group-hover/card:border-black/20 pt-8 transition-colors">
                        <div className="flex flex-col">
                            <span className="text-[9px] tracking-[0.4em] font-black uppercase text-white/40 group-hover/card:text-black/50 transition-colors mb-2">REWARD POOL</span>
                            <span className="text-2xl font-bold tracking-widest">{challenge.points} XP</span>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover/card:bg-black group-hover/card:border-black group-hover/card:text-white transition-all transform">
                            <img src="/suriken.png" alt="icon" className="w-5 h-5 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        </div>
                    </div>
                </div>

                {/* ── BACK FACE (RULES) ──────────────────────────────────────── */}
                <div
                    className="absolute inset-0 w-full h-full bg-[#E81414] rounded-[2.5rem] text-black p-10 flex flex-col overflow-hidden shadow-2xl"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <div className="flex justify-between items-center border-b border-black/10 pb-6 mb-6 shrink-0">
                        <div className="flex items-center gap-4">
                            <img src="/suriken.png" alt="icon" className="w-6 h-6 black object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                            <h3 className="text-xl font-black tracking-widest uppercase">ENGAGEMENT RULES</h3>
                        </div>
                        <div className="p-2 border border-black/10 rounded-full hover:bg-black hover:text-[#E81414] transition-colors cursor-pointer">
                            <img src="/suriken.png" alt="icon" className="w-5 h-5 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-4 space-y-5 custom-scrollbar">
                        {challenge.rules.map((rule, idx) => (
                            <div key={idx} className="flex items-start gap-4">
                                <span className="text-[10px] font-black text-black/50 tracking-widest mt-1">0{idx + 1}</span>
                                <p className="text-[12px] font-black uppercase tracking-[0.1em] leading-relaxed opacity-90">{rule}</p>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-8 py-5 bg-black text-white text-[11px] font-black tracking-[0.6em] uppercase hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 shrink-0 rounded-[1.5rem]">
                        ACCEPT CHALLENGE <img src="/suriken.png" alt="icon" className="w-4 h-4 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default function WorkspacePage() {
    return (
        <div className="w-full pb-24 space-y-12 relative overflow-hidden">
            <DotGrid />

            {/* ══ HEADER ═══════════════════════════════════════════════ */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-12 gap-8 relative z-10">
                <div className="space-y-6">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-white">
                        ACTIVE<br /><span className="text-[#E81414]">MISSIONS</span>
                    </h1>
                </div>

                <div className="p-8 border border-white/10 rounded-[2rem] bg-[#0A0A0A] flex flex-col items-end gap-3 min-w-[280px]">
                    <span className="text-[9px] tracking-[0.6em] uppercase font-black text-white/30">SYSTEM STATUS</span>
                    <div className="flex items-center gap-4">
                        <img src="/suriken.png" alt="icon" className="w-6 h-6 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        <span className="text-2xl font-black uppercase tracking-widest">SECURE</span>
                    </div>
                </div>
            </div>

            {/* ══ GRID ══════════════════════════════════════════════════ */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                {CHALLENGES.map((challenge) => (
                    <FlipCard key={challenge.id} challenge={challenge} />
                ))}
            </div>
        </div>
    );
}

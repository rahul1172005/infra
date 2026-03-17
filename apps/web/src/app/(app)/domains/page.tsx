'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { MapPin } from 'lucide-react';

import { useState } from 'react';

/* ── Decorative Components ─────────────────────────────────────────── */
const DotGrid = () => (
    <div className="absolute inset-0 dot-grid pointer-events-none opacity-[0.05]" />
);

export default function DomainsPage() {
    const [domains, setDomains] = useState([
        { id: 'PRV-A1', name: 'BUSHIDO OPS', type: 'OFFENSIVE', activeChallenges: 12, status: 'STABLE' },
        { id: 'PRV-B2', name: 'CASTLE INFRA', type: 'DEFENSIVE', activeChallenges: 8, status: 'STABLE' },
        { id: 'PRV-C3', name: 'NINJA DYNAMICS', type: 'HYBRID', activeChallenges: 15, status: 'SYNCING' },
        { id: 'PRV-D4', name: 'KATANA FORGE', type: 'OFFENSIVE', activeChallenges: 6, status: 'STABLE' },
    ]);

    return (
        <div className="w-full pb-16 space-y-8 md:space-y-14 lg:space-y-20 relative overflow-hidden">
            {/* ══ HEADER ═════════════════════════════════════════════════════ */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end border-b-2 md:border-b-4 border-white pb-6 md:pb-16 gap-6 md:gap-12 relative z-10">
                <div className="space-y-4 md:space-y-8">
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-white">
                        幕府<br /><span className="text-white">PROVINCES.</span>
                    </h1>
                </div>

                <div className="w-full xl:w-auto flex items-center gap-6 bg-white/[0.02] border-2 border-white/10 p-5 md:p-10 group hover:border-[#E81414]/30 transition-all rounded-2xl md:rounded-[2.5rem]">
                    <div className="flex flex-col items-start gap-4">
                        <span className="text-[10px] tracking-[0.4em] font-black uppercase text-white/20">SHOGUNATE PROVINCES</span>
                        <div className="flex items-center gap-6">
                            <span className="text-6xl font-black uppercase tracking-widest text-white leading-none">0{domains.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══ DOMAIN GRID ════════════════════════════════════════════════ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 relative z-10">
                {domains.map((domain) => (
                    <div key={domain.id} className="bg-[#0A0A0A] border max-w-full border-white/10 p-5 md:p-10 lg:p-12 space-y-5 md:space-y-8 group hover:bg-[#E81414] hover:border-[#E81414] transition-all cursor-pointer relative overflow-hidden min-h-[280px] md:min-h-[380px] flex flex-col justify-between rounded-2xl md:rounded-[3rem] text-white hover:text-black">
                        <DotGrid />
                        <div className="flex justify-between items-start relative z-10">
                            <div className="space-y-2">
                                <p className="text-[9px] tracking-[0.4em] font-black uppercase text-[#E81414] group-hover:text-black/60 transition-colors">{domain.id} // {domain.type}</p>
                                <h3 className="text-3xl lg:text-4xl font-black tracking-tighter uppercase">{domain.name}</h3>
                            </div>
                            <div className="w-12 h-12 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all">
                                <img src="/suriken.png" alt="icon" className="w-6 h-6 white group-hover:text-white object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                            </div>
                        </div>

                        <div className="space-y-8 relative z-10">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <span className="text-[8px] tracking-[0.3em] font-black uppercase text-white/30 group-hover:text-black/50 transition-colors">Active Challenges</span>
                                    <p className="text-2xl font-black">{domain.activeChallenges}</p>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-[8px] tracking-[0.3em] font-black uppercase text-white/30 group-hover:text-black/50 transition-colors">Province Status</span>
                                    <p className={`text-2xl font-black ${domain.status === 'SYNCING' ? 'opacity-40' : ''}`}>{domain.status}</p>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                size="md"
                                className="w-full mt-4 group-hover:bg-black group-hover:text-white group-hover:border-black"
                                icon={() => <img src="/suriken.png" alt="icon" className="w-4 h-4 transition-transform object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />}
                            >
                                SELECT PROVINCE
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ══ DOMAIN ARCHITECTURE INFO ══════════════════════════════════════ */}
            <div className="grid grid-cols-1 lg:grid-cols-3 border border-white/10 bg-[#0A0A0A] divide-y lg:divide-y-0 lg:divide-x divide-white/10 relative z-10 rounded-[3rem] overflow-hidden">
                {[
                    { title: "OFFENSIVE", icon: <img src="/suriken.png" alt="icon" className="w-8 h-8 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />, desc: "Focuses on vulnerability research, kernel exploits, and breach protocols." },
                    { title: "DEFENSIVE", icon: <img src="/suriken.png" alt="icon" className="w-8 h-8 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />, desc: "Focuses on protocol hardening, incident response, and signal protection." },
                    { title: "HYBRID", icon: <img src="/suriken.png" alt="icon" className="w-8 h-8 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />, desc: "Focuses on complex network dynamic analysis and adaptive operational strategies." },
                ].map((item, i) => (
                    <div key={i} className="p-6 md:p-10 lg:p-16 space-y-5 md:space-y-10 group hover:bg-white/[0.02] transition-all">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#E81414] group-hover:bg-[#E81414] group-hover:text-white transition-all">
                                {item.icon}
                            </div>
                            <h4 className="text-2xl font-black tracking-widest uppercase text-white">{item.title}</h4>
                        </div>
                        <p className="text-[11px] tracking-[0.1em] font-black uppercase leading-loose text-white/40 group-hover:text-white/60 transition-colors">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* ══ STATUS FEET ═════════════════════════════════════════════════ */}
            <div className="p-6 md:p-10 lg:p-16 border border-white/10 rounded-2xl md:rounded-[2.5rem] bg-[#050505] flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center justify-between group/status">
                <div className="flex items-center gap-8">
                    
                    <span className="text-[10px] tracking-[0.4em] font-black uppercase text-white/20 group-hover:text-white transition-colors">OS DOMAIN SYNC ACTIVE CLEAR</span>
                </div>
                <div className="flex items-center gap-12">
                    <span className="text-[9px] tracking-[0.3em] font-black uppercase text-white/10">Build Hash: 0x8x SHOGUN RECH</span>
                    <img src="/suriken.png" alt="icon" className="w-6 h-6 white/10 group-hover:text-white/40 transition-colors object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                </div>
            </div>
        </div>
    );
}

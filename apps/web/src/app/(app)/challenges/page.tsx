'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Search, Plus } from 'lucide-react';
import { DotGrid, Scanlines } from '@/components/ui/Decorative';
import { Suriken } from '@/components/ui/Suriken';
import { PageHeader } from '@/components/ui/PageHeader';
import { HUDFrame } from '@/components/ui/HUDFrame';

export default function ChallengesPage() {
    const [challenges, setChallenges] = useState([
        { id: 'DOJ-001', name: 'KATANA SHARP ALPHA', domain: 'BUSHIDO', points: 1200, status: 'OPEN' },
        { id: 'DOJ-002', name: 'CASTLE RECON VECTOR', domain: 'FORTRESS', points: 450, status: 'OPEN' },
        { id: 'DOJ-003', name: 'NINJA BYPASS V3', domain: 'SHADOW', points: 2800, status: 'OPEN' },
    ]);

    return (
        <div className="w-full pb-16 space-y-8 md:space-y-14 lg:space-y-20 relative overflow-hidden">
            <DotGrid />
            
            {/* ══ HEADER ═════════════════════════════════════════════════════ */}
            <PageHeader
                title={<>侍の<br /><span className="text-white">DOJO</span></>}
                stats={{
                    label: "TOTAL ACTIVE SPIRIT OPS",
                    value: `0${challenges.length}`
                }}
            />

            {/* ══ MAIN CHALLENGE GRID ════════════════════════════════════════ */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-10 lg:gap-12 relative z-10">

                {/* Left: Challenge Creation Interface */}
                <div className="xl:col-span-4 space-y-12">
                    <HUDFrame title="NEW TRAINING" subtitle="INITIALIZE PROTOCOL" className="h-full">
                        <div className="space-y-8 relative z-10">
                            <div className="space-y-3">
                                <label className="text-[9px] tracking-[0.4em] font-black uppercase text-white/30">DOJO IDENTIFIER</label>
                                <input
                                    type="text"
                                    placeholder="IDENTIFIER"
                                    className="w-full bg-white/5 border border-white/10 px-8 py-5 text-[11px] font-black tracking-[0.2em] outline-none focus:border-[#E81414]/50 transition-all text-white uppercase rounded-full"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[9px] tracking-[0.4em] font-black uppercase text-white/30">PROVINCE CLASSIFICATION</label>
                                <div className="relative">
                                    <select className="w-full bg-white/5 border border-white/10 px-8 py-5 text-[11px] font-black tracking-[0.2em] outline-none focus:border-[#E81414]/50 transition-all text-white uppercase appearance-none rounded-full">
                                        <option>BUSHIDO</option>
                                        <option>FORTRESS</option>
                                        <option>SHADOW</option>
                                        <option>FORGE</option>
                                    </select>
                                    <Suriken size="sm" className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[9px] tracking-[0.4em] font-black uppercase text-white/30">POINT ATTRIBUTION</label>
                                <div className="flex items-center gap-4 w-full overflow-hidden">
                                    <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center rounded-full shrink-0">
                                        <Suriken size="md" />
                                    </div>
                                    <input
                                        type="number"
                                        defaultValue="500"
                                        className="min-w-0 flex-1 bg-white/5 border border-white/10 px-4 md:px-8 py-4 md:py-5 text-sm md:text-[16px] font-black tracking-[0.1em] md:tracking-[0.2em] outline-none focus:border-[#E81414]/50 transition-all text-white uppercase rounded-full"
                                    />
                                </div>
                            </div>

                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full mt-4 py-6"
                                icon={Plus}
                            >
                                INITIALIZE TRAINING
                            </Button>
                        </div>
                    </HUDFrame>
                </div>

                {/* Right: Active Challenges & Completion */}
                <div className="xl:col-span-8 space-y-12 h-full">
                    <div className="bg-[#0A0A0A] border border-white/10 overflow-hidden relative rounded-[2.5rem] h-full flex flex-col">
                        <DotGrid />
                        <div className="p-5 md:p-10 border-b border-white/10 flex justify-between items-center bg-white/[0.03] text-white">
                            <div className="flex items-center gap-6">
                                <Suriken size="md" />
                                <h3 className="text-[18px] tracking-[0.4em] font-black uppercase">ACTIVE TRAINING</h3>
                            </div>
                            <div className="flex items-center gap-8">
                                <Suriken size="sm" className="opacity-20" />
                                <div className="px-5 py-2 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] rounded-full bg-white/5">LIVE STATUS</div>
                            </div>
                        </div>

                        <div className="divide-y divide-white/5 flex-1">
                            {challenges.map((ch) => (
                                <div key={ch.id} className="p-3 md:p-8 flex items-center justify-between hover:bg-[#E81414] transition-all duration-300 group cursor-pointer text-white hover:text-black gap-3">
                                    <div className="flex items-center gap-4 md:gap-10 min-w-0">
                                        <div className="w-10 h-10 md:w-14 md:h-14 border border-white/10 flex items-center justify-center transition-all group-hover:bg-black group-hover:border-black rounded-full shrink-0">
                                            <Suriken size="sm" className={`${ch.id === 'DOJ-003' ? '' : 'opacity-20'} group-hover:opacity-100 transition-opacity`} />
                                        </div>
                                        <div className="space-y-0.5 md:space-y-1 min-w-0">
                                            <div className="flex items-center gap-2 md:gap-4">
                                                <span className="text-[7px] md:text-[8px] tracking-[0.3em] font-black uppercase text-white/30 group-hover:text-black/60 transition-colors truncate">{ch.id} // {ch.domain}</span>
                                            </div>
                                            <h4 className="text-base md:text-2xl font-black tracking-tighter uppercase truncate">{ch.name}</h4>
                                        </div>
                                    </div>
                                    <div className="flex flex-row md:flex-col items-center gap-2 md:gap-4">
                                        <div className="flex flex-col items-end gap-1 md:gap-2">
                                            <div className="flex items-baseline gap-1 md:gap-2">
                                                <span className="text-xl md:text-3xl font-black tabular-nums group-hover:text-black">{ch.points}</span>
                                                <span className="text-[7px] md:text-[8px] tracking-[0.4em] font-black uppercase text-white/30 group-hover:text-black/50">XP</span>
                                            </div>
                                        </div>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            fullWidth
                                            className="opacity-40 group-hover:opacity-100 group-hover:bg-black group-hover:text-white group-hover:border-black"
                                        >
                                            VERIFY
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-10 bg-white/[0.01] border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-5 group/footer">
                            <div className="flex items-center gap-6 text-white/20 group-hover/footer:text-white/40 transition-colors">
                                <Suriken size="sm" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em]">SYNCING WITH GLOBAL LEDGER</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                icon={Search}
                                className="text-white/30 hover:text-white"
                            >
                                ACCESS FULL LIST
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══ POINT ATTRIBUTION LOG ═══════════════════════════════════════ */}
            <HUDFrame className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-10">
                <div className="flex items-center gap-10 relative z-10">
                    <Suriken size="lg" />
                    <div className="space-y-2">
                        <span className="text-[10px] tracking-[0.6em] font-black uppercase text-white/20">COMPLETION TRAFFIC</span>
                        <p className="text-lg font-black tracking-widest uppercase text-white">ALPHA CLAN: +500XP [DOJ-002]</p>
                    </div>
                </div>
                <div className="flex items-center gap-10 relative z-10">
                    <span className="text-[10px] tracking-[0.4em] font-black uppercase text-white/10">OS BUILD: 0x24 CH LAB</span>
                </div>
            </HUDFrame>
        </div>
    );
}

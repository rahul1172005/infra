'use client';

import { useState } from 'react';

import { GOTIcon } from '@/components/icons/GOTIcon';
import { Button } from '@/components/ui/Button';

import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { HUDCard } from '@/components/ui/HUDCard';
import { MetaCard } from '@/components/ui/MetaCard';

export default function ChallengesPage() {
    const [challenges] = useState([
        { id: 'GOT-001', name: 'DRAGON FIRE ALPHA', domain: 'DRAGON', points: 1200, status: 'OPEN' },
        { id: 'GOT-002', name: 'WINTERFELL RECON VECTOR', domain: 'FORTRESS', points: 450, status: 'OPEN' },
        { id: 'GOT-003', name: 'VALYRIA BYPASS V3', domain: 'VALYRIA', points: 2800, status: 'OPEN' },
    ]);

    return (
        <div className="w-full pb-20 space-y-12 relative overflow-hidden text-white">
            <DotGrid />

            {/* Header Module */}
            <PageHeader
                tag="ROYAL TOURNAMENT GROUNDS"
                title={<>KINGDOM<br /><span className="text-[#E81414]">QUESTS</span></>}
                icon={<GOTIcon type="zap" size={56} className="text-[#E81414]" scale={1.6} x={0} y={0} />}
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 relative z-10">
                {/* Left: Challenge Creation Interface */}
                <div className="xl:col-span-4 space-y-8">
                    <HUDCard
                        title="NEW QUEST"
                        tag="ANNOUNCEMENT"
                        icon={<GOTIcon type="zap" size={56} className="text-[#E81414]" scale={1.6} x={0} y={0} />}
                        className="h-full"
                    >
                        <div className="space-y-6 sm:space-y-10 p-4 sm:p-6 md:p-8">
                            <div className="space-y-3">
                                <label className="text-[8px] sm:text-[9px] tracking-widest sm:tracking-[0.4em] font-black uppercase text-white/30">QUEST IDENTIFIER</label>
                                <input
                                    type="text"
                                    placeholder="IDENTIFIER"
                                    className="w-full bg-white/5 border border-white/10 px-6 sm:px-8 py-4 sm:py-5 text-[10px] sm:text-[11px] font-black tracking-widest sm:tracking-[0.2em] outline-none focus:border-[#E81414]/50 transition-all text-white uppercase rounded-full"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[8px] sm:text-[9px] tracking-widest sm:tracking-[0.4em] font-black uppercase text-white/30">KINGDOM CLASSIFICATION</label>
                                <div className="relative">
                                    <select className="w-full bg-white/5 border border-white/10 px-6 sm:px-8 py-4 sm:py-5 text-[10px] sm:text-[11px] font-black tracking-widest sm:tracking-[0.2em] outline-none focus:border-[#E81414]/50 transition-all text-white uppercase appearance-none rounded-full">
                                        <option>DRAGON</option>
                                        <option>FORTRESS</option>
                                        <option>VALYRIA</option>
                                        <option>FORGE</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[8px] sm:text-[9px] tracking-widest sm:tracking-[0.4em] font-black uppercase text-white/30">REWARD COINS</label>
                                <div className="flex items-center gap-4 w-full overflow-hidden">
                                    <input
                                        type="number"
                                        defaultValue="500"
                                        className="min-w-0 flex-1 bg-white/5 border border-white/10 px-4 sm:px-8 py-4 sm:py-5 text-sm sm:text-[16px] font-black tracking-[0.1em] sm:tracking-[0.2em] outline-none focus:border-[#E81414]/50 transition-all text-white uppercase rounded-full"
                                    />
                                </div>
                            </div>

                            <Button
                                variant="primary"
                                size="lg"
                                fullWidth
                                className="mt-4 py-4 sm:py-6"
                            >
                                ANNOUNCE QUEST
                            </Button>
                        </div>
                    </HUDCard>
                </div>

                {/* Right: Active Challenges Ledger */}
                <div className="xl:col-span-8">
                    <HUDCard
                        padding="none"
                        title="ACTIVE QUESTS"
                        tag="REALM STATUS"
                        icon={<GOTIcon type="globe" size={56} className="text-white" scale={1.6} x={0} y={0} />}
                        className="h-full flex flex-col"
                    >
                        <div className="divide-y divide-white/5">
                             {challenges.map((ch) => (
                                <div key={ch.id} className="p-4 sm:p-8 md:p-14 lg:p-16 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-[#E81414] transition-all duration-300 group cursor-pointer text-white hover:text-white gap-6">
                                    <div className="flex items-center gap-4 sm:gap-10 min-w-0 w-full sm:w-auto">
                                        <div className="flex items-center justify-center transition-all shrink-0">
                                            <GOTIcon size="sm" className={`${ch.id === 'GOT-003' ? 'opacity-100' : 'opacity-20'} transition-opacity group-hover:opacity-100`} scale={1.6} x={0} y={0} />
                                        </div>
                                        <div className="space-y-1 min-w-0 flex-1">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[8px] md:text-[9px] tracking-widest sm:tracking-[0.3em] font-black uppercase text-white/30 group-hover:text-white/60 transition-colors">
                                                    {ch.id} <span className="mx-1 opacity-50">//</span> {ch.domain}
                                                </span>
                                            </div>
                                            <h4 className="text-[12px] sm:text-sm md:text-xl font-black tracking-tighter uppercase whitespace-normal leading-tight">{ch.name}</h4>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 w-full sm:w-auto pt-4 sm:pt-0 border-t border-white/5 sm:border-none">
                                        <div className="flex flex-col items-end">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-xl sm:text-2xl font-black tabular-nums group-hover:text-white">{ch.points}</span>
                                                <span className="text-[8px] md:text-[10px] tracking-widest sm:tracking-[0.4em] font-black uppercase text-white/30 group-hover:text-white/50">COINS</span>
                                            </div>
                                        </div>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            className="opacity-40 group-hover:opacity-100 group-hover:bg-white group-hover:text-black text-[9px] sm:text-[10px] px-6 sm:px-8 py-2.5 sm:py-3 whitespace-nowrap"
                                        >
                                            VERIFY
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Ledger Footer */}
                        <div className="p-10 md:p-14 border-t border-white/10 bg-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-4 text-white/20 group-hover/footer:text-white/40 transition-colors">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em]">SYNCING WITH ROYAL LEDGER</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-white/30 hover:text-white text-[10px] tracking-widest"
                            >
                                VIEW ALL QUESTS
                            </Button>
                        </div>
                    </HUDCard>
                </div>
            </div>

            {/* Bottom Status Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                <HUDCard
                    title="QUEST TRAFFIC"
                    padding="p-8 md:p-16"
                    tag="REAL-TIME"
                    icon={<GOTIcon type="globe" size={56} className="text-white" scale={1.6} x={0} y={0} />}
                    className="lg:col-span-2"
                >
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-20 py-8">
                        <div className="space-y-6">
                            <p className="text-base md:text-xl font-black tracking-[0.3em] uppercase text-white">
                                ALPHA HOUSE: <span className="text-[#E81414]">+500 COINS</span> [GOT-002]
                            </p>
                            <span className="text-[10px] tracking-[0.4em] font-black uppercase text-white/20 block">REALM BUILD: 0x24 CH LAB</span>
                        </div>
                    </div>
                </HUDCard>

                <HUDCard
                    title="REALM DEFENSE"
                    padding="p-8 md:p-16"
                    tag="WALL"
                    icon={<GOTIcon type="shield" size={56} className="text-white" scale={1.6} x={0} y={0} />}
                >
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-10 py-8">
                        <div className="text-4xl md:text-5xl font-black text-[#E81414] tracking-tighter tabular-nums leading-none">99.9%</div>
                        <div className="text-[10px] tracking-[0.5em] font-black uppercase text-white/30 truncate">INTEGRITY VERIFIED</div>
                    </div>
                </HUDCard>
            </div>
        </div>
    );
}

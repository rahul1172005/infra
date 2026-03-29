'use client';

import { useState } from 'react';

import { GOTIcon } from '@/components/icons/GOTIcon';
import { Button } from '@/components/ui/Button';

import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { HUDCard } from '@/components/ui/HUDCard';
import { MetaCard } from '@/components/ui/MetaCard';

export default function DomainsPage() {
    const [domains] = useState([
        { id: 'PRV-A1', name: 'DRAGONSTONE', type: 'CONQUEST', activeChallenges: 12, status: 'LOYAL', iconType: 'zap' },
        { id: 'PRV-B2', name: 'WINTERFELL', type: 'DEFENSE', activeChallenges: 8, status: 'LOYAL', iconType: 'shield' },
        { id: 'PRV-C3', name: "KING'S LANDING", type: 'DIPLOMACY', activeChallenges: 15, status: 'SYNCING', iconType: 'globe' },
        { id: 'PRV-D4', name: 'THE WALL', type: 'CONQUEST', activeChallenges: 6, status: 'LOYAL', iconType: 'zap' },
    ]);

    return (
        <div className="w-full pb-24 space-y-8 md:space-y-12 relative overflow-hidden">
            <DotGrid />

            {/* ══ HEADER ═════════════════════════════════════════════════════ */}
            <PageHeader 
                title="WESTEROS"
                accentTitle="PROVINCES"
                topLabel="WESTEROS DOMAIN CONTROL"
            />

            {/* ══ DOMAIN GRID ════════════════════════════════════════════════ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10">
                {domains.map((domain) => (
                        <HUDCard 
                            key={domain.id} 
                            title={domain.name} 
                            subtitle={`${domain.id} // ${domain.type}`}
                            tag="WESTEROS SECURED"
                            icon={<GOTIcon type={domain.iconType as any} size={48} scale={1.6} x={0} y={0} className="text-[#E81414]" />}
                            className="group/domain cursor-pointer hover:border-[#E81414]/30 transition-all duration-500"
                        >
                            <div className="p-8 md:p-12 space-y-12">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-[2px] w-12 bg-[#E81414]" />
                                        <span className="text-[10px] tracking-[0.5em] font-black uppercase text-white/30 truncate">PROVINCE CLASSIFICATION</span>
                                    </div>
                                    <h3 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase text-white group-hover/domain:translate-x-4 transition-transform duration-700 leading-none">
                                        {domain.name}
                                    </h3>
                                </div>

                                <div className="grid grid-cols-2 gap-12 py-10 border-t border-white/10 relative">
                                    <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-white/5" />
                                    <div className="space-y-4">
                                        <span className="text-[9px] tracking-[0.4em] font-black uppercase text-white/20 truncate block">ACTIVE DECREES</span>
                                        <p className="text-4xl md:text-5xl font-black text-white tabular-nums tracking-tighter">{domain.activeChallenges.toString().padStart(2, '0')}</p>
                                    </div>
                                    <div className="space-y-4">
                                        <span className="text-[9px] tracking-[0.4em] font-black uppercase text-white/20 truncate block">SYNC STATUS</span>
                                        <p className={`text-2xl md:text-3xl font-black tabular-nums transition-colors tracking-widest ${domain.status === 'SYNCING' ? 'text-[#E81414] animate-pulse' : 'text-white'}`}>{domain.status}</p>
                                    </div>
                                </div>

                                <Button
                                    variant="primary"
                                    size="lg"
                                    fullWidth
                                    className="h-20 text-[12px] tracking-[0.8em] font-black group-hover:bg-white group-hover:text-black transition-all"
                                    icon={<GOTIcon type="zap" size={32} scale={1.6} x={0} y={0} />}
                                >
                                    CLAIM PROVINCE
                                </Button>
                            </div>
                        </HUDCard>
                ))}
            </div>

            {/* ══ DOMAIN ARCHITECTURE INFO ══════════════════════════════════════ */}
            <div className="bg-black border border-white/10 relative z-10 rounded-[3rem] overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
                    {[
                        { title: "CONQUEST", iconType: "zap", desc: "Focuses on expansion, sieges, and conquering new lands." },
                        { title: "DEFENSE", iconType: "shield", desc: "Focuses on castle defense, protecting borders, and royal security." },
                        { title: "DIPLOMACY", iconType: "globe", desc: "Focuses on alliances, trade, and intricate political maneuvers." },
                    ].map((item, i) => {

                        return (
                            <div key={i} className="p-10 md:p-14 lg:p-20 space-y-8 md:space-y-12 group hover:bg-white/[0.02] transition-all cursor-default relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-[#E81414]/5 -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl group-hover:bg-[#E81414]/10 transition-colors" />
                                <div className="flex items-center gap-8 relative z-10">
                                    <div className="flex items-center justify-center">
                                        <GOTIcon type={item.iconType as any} size={40} scale={1.6} x={0} y={0} className="text-[#E81414]" />
                                    </div>
                                    <h4 className="text-3xl font-black tracking-[0.3em] uppercase text-white leading-none">{item.title}</h4>
                                </div>
                                <p className="text-[12px] tracking-[0.2em] font-black uppercase leading-[2] text-white/30 group-hover:text-white/60 transition-colors relative z-10">
                                    {item.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ══ STATUS FOOTER ═════════════════════════════════════════════════ */}
            <HUDCard title="REALM PROTOCOL" subtitle="REALM SYNC STATUS" className="p-0">
                <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between group/status">
                    <div className="flex items-center gap-6">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                        <span className="text-[10px] tracking-[0.4em] font-black uppercase text-white/30 group-hover/status:text-white transition-colors">WESTEROS SYNC ACTIVE // CITADEL VERIFIED</span>
                    </div>
                    <div className="flex items-center gap-8 md:gap-12 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/5 pt-6 md:pt-0">
                        <div className="flex flex-col items-end">
                            <span className="text-[8px] tracking-[0.3em] font-black uppercase text-white/10">REALM HASH</span>
                            <span className="text-[10px] tracking-[0.1em] font-black uppercase text-white/30">IRON THRONE REACH</span>
                        </div>
                        <GOTIcon size="sm" scale={1.2} x={0} y={0} className="opacity-20" />
                    </div>
                </div>
            </HUDCard>
        </div>
    );
}

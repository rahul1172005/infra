'use client';

import React from 'react';
import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatGrid } from '@/components/ui/StatGrid';
import { GOTIcon } from '@/components/icons/GOTIcon';
import { Button } from '@/components/ui/Button';
import { ActionCard } from '@/components/ui/ActionCard';
import { tournamentsConfig } from '@/configs/tournaments';

export default function TournamentsPage() {
    return (
        <div className="w-full pb-16 space-y-8 md:space-y-14 lg:space-y-20 relative overflow-hidden">
            <DotGrid opacity="opacity-[0.05]" />

            <PageHeader 
                title={tournamentsConfig.header.title}
                accentTitle={tournamentsConfig.header.accentTitle}
                topLabel={tournamentsConfig.header.topLabel}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
                <div className="lg:col-span-8 space-y-12">
                    <ActionCard
                        title={tournamentsConfig.action.title}
                        backgroundText={tournamentsConfig.action.backgroundText}
                        description={tournamentsConfig.action.description}
                        icon={true}
                        variant="oversight"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full relative z-10">
                            <Button variant="primary" size="lg" icon={<GOTIcon type="zap" size={32} scale={1.6} x={0} y={0} />}>
                                CHAMPION SCROLLS
                            </Button>
                            <Button variant="outline" size="lg" icon={<GOTIcon type="zap" size={32} scale={1.6} x={0} y={0} />}>
                                REALM VECTORS
                            </Button>
                        </div>
                    </ActionCard>

                    <StatGrid stats={tournamentsConfig.stats} columns={3} />
                </div>

                <div className="lg:col-span-4 space-y-12">
                    <div className="bg-black border border-white/10 p-10 relative overflow-hidden group/victors rounded-[2.5rem]">
                        <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/10">
                            <h3 className="text-2xl font-black tracking-widest uppercase text-white/40">PREVIOUS VICTORS</h3>
                            <GOTIcon type="targaryen" size={48} scale={1.6} x={0} y={0} />
                        </div>
                        <div className="space-y-10 relative z-10">
                            {tournamentsConfig.history.map((hist, i) => (
                                <div key={i} className="flex items-center justify-between group/item cursor-pointer">
                                    <div className="space-y-3">
                                        <p className="text-[10px] tracking-[0.4em] font-black uppercase text-[#E81414]">{hist.season}</p>
                                        <p className="text-xl font-black tracking-tighter uppercase text-white">{hist.winner}</p>
                                    </div>
                                    <div className="text-2xl font-black tracking-widest uppercase text-white/10 group-hover/item:text-white transition-colors">{hist.prize}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-black border border-white/10 p-10 relative overflow-hidden group/req rounded-[2.5rem]">
                        <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/10">
                            <h3 className="text-2xl font-black tracking-widest uppercase text-white/40">ENTRY REQUIREMENTS</h3>
                            <GOTIcon type="targaryen" size={48} scale={1.6} x={0} y={0} />
                        </div>

                        <div className="space-y-8 relative z-10">
                            {tournamentsConfig.requirements.map((req, i) => (
                                <div key={i} className="flex items-center gap-6 group/req-item cursor-pointer">
                                    <div className={`w-3 h-3 rounded-full border-2 transition-all duration-500
                                        ${req.active ? 'bg-[#E81414] border-[#E81414]' : 'bg-transparent border-white/10'}`} />
                                    <span className={`text-[12px] tracking-[0.4em] uppercase font-black transition-colors duration-500
                                        ${req.active ? 'text-white' : 'text-white/20 group-hover/req-item:text-white/40'}`}>
                                        {req.label}
                                    </span>
                                    {req.active && <GOTIcon type="targaryen" size={32} scale={1.6} x={0} y={0} className="ml-auto" />}
                                </div>
                            ))}
                        </div>

                        <Button variant="primary" size="lg" fullWidth className="mt-10">
                            VERIFY ROYAL STATUS
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

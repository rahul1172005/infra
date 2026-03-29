'use client';

import { motion } from 'framer-motion';
import { GOTIcon } from '@/components/icons/GOTIcon';
import { Button } from '@/components/ui/Button';

import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { HUDCard } from '@/components/ui/HUDCard';
import { MetaCard } from '@/components/ui/MetaCard';

export default function ProjectsPage() {
    return (
        <div className="w-full pb-24 space-y-16 relative overflow-hidden">
            <DotGrid />

            {/* Header Module */}
            <PageHeader
                tag="REALM SUBMISSION HUB"
                title={<>CORE<br /><span className="text-[#E81414]">PROJECTS</span></>}
            />

            {/* Error State / Main Display Container */}
            <HUDCard
                padding="none"
                className="min-h-[600px] flex flex-col items-center justify-center p-16 overflow-hidden text-center group/stage relative z-10"
            >
                <div className="absolute inset-0 scanlines opacity-5 pointer-events-none group-hover/stage:opacity-10 transition-opacity" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.01] uppercase select-none pointer-events-none whitespace-nowrap group-hover:tracking-[0.1em] transition-all duration-1000">REMOTE THROTTLING</div>

                <div className="relative z-10 space-y-16 max-w-4xl px-8 flex flex-col items-center">
                    <div className="w-40 h-40 border-2 border-white/10 bg-white/5 flex items-center justify-center relative hover:bg-black group/icon transition-all duration-700 overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.02)] rounded-[2.5rem]">
                        <GOTIcon type="globe" size={64} scale={1.6} x={0} y={0} className="text-white group-hover:scale-[1.7] transition-all z-10 relative" />
                        <div className="absolute inset-0 bg-[#E81414]/10 translate-y-full group-hover/icon:translate-y-0 transition-transform duration-500" />

                        {/* Corner markers */}
                        <div className="absolute -top-1 -right-1 w-10 h-10 border-t-4 border-r-4 border-[#E81414]" />
                        <div className="absolute -bottom-1 -left-1 w-10 h-10 border-b-4 border-l-4 border-white" />
                    </div>

                    <div className="space-y-12">
                        <div className="flex flex-col items-center">
                            <span className="text-[12px] tracking-[0.8em] font-black uppercase text-[#E81414] mb-4">ERROR CODE: 429</span>
                            <h2 className="text-6xl md:text-8xl font-black uppercase text-white tracking-tighter  border-b-8 border-[#E81414] pb-8 inline-block group-hover:scale-105 transition-transform duration-700">
                                API RATELIMITED
                            </h2>
                        </div>

                        <div className="bg-white p-12 border-2 border-white flex flex-col items-center gap-10 max-w-3xl mx-auto shadow-[0_0_50px_rgba(255,255,255,0.05)] relative overflow-hidden group/notice rounded-[2rem]">
                            <div className="absolute inset-0 scanlines opacity-5 invert pointer-events-none" />
                            <p className="text-[18px] tracking-[0.4em] font-black text-black uppercase leading-relaxed relative z-10">
                                Failed to fetch repository metadata. Remote Royal syndicates
                                are currently throttling our IP cluster due to high
                                synchronization frequency. Retrying connection in 5 minutes.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6 relative z-10 w-full">
                                <Button
                                    variant="primary"
                                    icon={<GOTIcon type="zap" size={32} scale={1.6} x={0} y={0} />}
                                    className="px-12 py-6 bg-black text-white hover:bg-[#E81414] border-transparent w-full sm:w-auto"
                                >
                                    SUBMIT LOCAL REPO
                                </Button>
                                <Button
                                    variant="outline"
                                    icon={<GOTIcon type="hand" size={32} scale={1.6} x={0} y={0} />}
                                    className="px-12 py-6 border-black text-black hover:bg-black hover:text-white w-full sm:w-auto"
                                >
                                    MANUAL OVERRIDE
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </HUDCard>

            {/* Industrial Bottom Info Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 z-10 relative">
                {[
                    { label: 'ACTIVE BUILDS', value: '1,204 SDR', icon: <GOTIcon type="zap" size={20} scale={1.6} x={0} y={0} />, color: 'white' },
                    { label: 'BOUNTY POOL', value: '140,000 COINS', icon: <GOTIcon type="shield" size={20} scale={1.6} x={0} y={0} />, color: '[#E81414]' },
                    { label: 'GITHUB SYNC', value: 'OFFLINE', icon: <GOTIcon type="globe" size={20} scale={1.6} x={0} y={0} />, color: 'white/20' },
                    { label: 'SYSTEM LOAD', value: 'NORMAL 02', icon: <GOTIcon type="globe" size={20} scale={1.6} x={0} y={0} />, color: 'white' },
                ].map(({ label, value, icon, color }) => (
                    <HUDCard key={label} group>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 opacity-30 group-hover:opacity-100 transition-opacity">
                                <div className="text-white">{icon}</div>
                                <span className="text-[10px] tracking-[0.6em] font-black uppercase text-white">{label}</span>
                            </div>
                            <p className={`text-3xl font-black tracking-widest uppercase text-${color}`}>{value}</p>
                        </div>
                    </HUDCard>
                ))}
            </div>
        </div>
    );
}

'use client';

import React from 'react';
import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { SurikenIcon } from '@/components/icons/SurikenIcon';
import { Button } from '@/components/ui/Button';
import { Archive, Rocket } from 'lucide-react';

import { ActionCard } from '@/components/ui/ActionCard';
import { contestsConfig } from '@/configs/contests';

export default function ContestsPage() {
    return (
        <div className="w-full pb-16 space-y-8 md:space-y-14 lg:space-y-20 relative overflow-hidden">
            <DotGrid opacity="opacity-[0.05]" />
            
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#E81414]/5 blur-[200px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/[0.02] blur-[150px] pointer-events-none" />

            <PageHeader 
                title={contestsConfig.header.title}
                accentTitle={contestsConfig.header.accentTitle}
                topLabel={contestsConfig.header.topLabel}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 relative z-10">
                {contestsConfig.contests.map((contest, i) => (
                    <ContestCard key={i} {...contest} />
                ))}
            </div>

            <ActionCard
                title={contestsConfig.archive.title}
                backgroundText={contestsConfig.archive.backgroundText}
                description={contestsConfig.archive.description}
                icon={true}
                variant="oversight"
            >
                <Button
                    variant="outline"
                    size="xl"
                    className="border-2 border-white text-white hover:bg-white hover:text-black mx-auto"
                    icon={() => <SurikenIcon size="sm" />}
                >
                    LOAD SCROLLS
                </Button>
            </ActionCard>
        </div>
    );
}

function ContestCard({ title, desc, gains, window, status, variant }: any) {
    const isAccent = variant === 'accent';
    return (
        <div className={`p-5 md:p-16 border-2 border-white/10 flex flex-col justify-between min-h-[380px] md:min-h-[550px] transition-all group/card cursor-pointer relative overflow-hidden h-full rounded-2xl md:rounded-none ${isAccent ? 'bg-[#E81414]' : 'bg-black hover:border-white/30'}`}>
            {isAccent && <div className="absolute inset-0 scanlines opacity-10 pointer-events-none" />}
            <DotGrid />

            <div className="space-y-6 md:space-y-12 relative z-10">
                <div className="flex justify-between items-start">
                    <span className={`text-[11px] tracking-[0.8em] font-black uppercase ${isAccent ? 'text-black/30' : 'text-white/20'}`}>TRIAL AUTH</span>
                    <div className={`px-6 py-2 text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 ${isAccent ? 'bg-white text-black group-hover/card:scale-110' : 'bg-[#E81414] text-white shadow-[0_0_20px_#E81414]'}`}>
                        {status}
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className={`text-3xl md:text-4xl lg:text-4xl font-black tracking-tighter uppercase leading-[0.9] ${isAccent ? 'text-white' : 'text-white group-hover/card:text-[#E81414]'}`}>{title}</h3>
                    <div className={`h-1.5 w-16 transition-all duration-700 group-hover/card:w-48 ${isAccent ? 'bg-black/20' : 'bg-[#E81414]'}`} />
                </div>
                <p className={`text-[12px] tracking-[0.2em] font-black uppercase leading-relaxed max-w-md ${isAccent ? 'text-white/80' : 'text-white/40 group-hover:text-white/60 transition-colors'}`}>
                    {desc}
                </p>
            </div>

            <div className="space-y-6 md:space-y-12 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 border-t-2 border-white/5 pt-6 md:pt-12 gap-6 md:gap-12">
                    <div className="space-y-4">
                        <span className={`text-[9px] md:text-[10px] tracking-[0.6em] font-black uppercase ${isAccent ? 'text-black/30' : 'text-white/20'}`}>GOLD</span>
                        <div className="flex items-center gap-3 md:gap-4">
                            <SurikenIcon size="sm" className={isAccent ? 'text-white' : 'text-[#E81414]'} />
                            <p className={`text-lg md:text-xl font-black uppercase tracking-tighter ${isAccent ? 'text-white' : 'text-white'}`}>{gains}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <span className={`text-[9px] md:text-[10px] tracking-[0.6em] font-black uppercase ${isAccent ? 'text-black/30' : 'text-white/20'}`}>REMAINING SUNS</span>
                        <div className="flex items-center gap-3 md:gap-4">
                            <SurikenIcon size="sm" className={isAccent ? 'text-white' : 'text-[#E81414]'} />
                            <p className={`text-lg md:text-xl font-black uppercase tracking-tighter ${isAccent ? 'text-white' : 'text-white'}`}>{window}</p>
                        </div>
                    </div>
                </div>
                <Button
                    variant={isAccent ? "outline" : "primary"}
                    size="lg"
                    fullWidth
                    className={`h-16 md:h-20 ${isAccent ? 'bg-black text-white hover:bg-white hover:text-black border-2' : 'hover:bg-[#E81414] hover:text-white'}`}
                    icon={() => <SurikenIcon size="sm" />}
                >
                    JOIN THE TRIAL
                </Button>
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { GOTIcon } from '@/components/icons/GOTIcon';

import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatGrid } from '@/components/ui/StatGrid';

const DOMAINS = [
    {
        id: 'ui-ux-realm',
        label: 'UI/UX REALM',
        tagline: 'Design. Prototype. Conquer.',
        description: 'Master the art of human-centered design. Craft interfaces that blend aesthetics with function and push the boundaries of user experience.',
        href: '/challenges/ui-ux',
        challenges: 8,
        xp: '27,500',
        tag: 'DESIGN SYSTEM',
    },
    {
        id: 'ai-era',
        label: 'AI ERA',
        tagline: 'Build. Break. Rethink Intelligence.',
        description: 'Navigate the frontier where human and artificial intelligence collide. Outsmart models that know everything — except what matters.',
        href: '/challenges/ai-era',
        challenges: 8,
        xp: '27,500',
        tag: 'INTELLIGENCE',
    },
    {
        id: 'code-dungeon',
        label: 'CODE DUNGEON',
        tagline: 'Optimize. Refactor. Ascend.',
        description: 'Descend into the logic layers of the machine. Solve high-stakes algorithmic trials and architect systems that survive the heat of execution.',
        href: '/challenges/coding-challenge',
        challenges: 15,
        xp: '15,000',
        tag: 'ARCHITECTURE',
    },
    {
        id: 'cyber-doom',
        label: 'CYBER DOOM',
        tagline: 'Breach. Exploit. Secure.',
        description: 'Enter the battleground of digital warfare. Decode exploits, break firewalls, and outmaneuver adversaries where every byte is a weapon.',
        href: '/challenges/cybersecurity',
        challenges: 7,
        xp: '20,000',
        tag: 'CYBERSECURITY',
    },
];

export default function ChallengesPage() {
    return (
        <div className="w-full pb-20 space-y-10 md:space-y-14 relative overflow-hidden text-white">
            <DotGrid />

            <PageHeader
                tag="SELECT YOUR BATTLEFIELD — CHOOSE YOUR DOMAIN"
                title={<>CHALLENGE<br /><span className="text-[#E81414]">DOMAINS</span></>}
            />

            <StatGrid stats={[
                { title: 'TOTAL DOMAINS', value: '4', color: 'text-white' },
                { title: 'ACTIVE CHALLENGES', value: '38', color: 'text-white' },
                { title: 'TOTAL XP POOL', value: '90,000', color: 'text-white' },
                { title: 'GLOBAL PARTICIPANTS', value: '1,284', color: 'text-white' },
            ]} variant="oversight" />

            {/* Mobile Accessibility Warning */}
            <div className="md:hidden flex flex-col items-center justify-center py-20 px-6 text-center space-y-6 relative z-10">
                <div className="w-16 h-16 rounded-3xl bg-[#E81414]/10 border border-[#E81414]/30 flex items-center justify-center mb-4">
                    <GOTIcon variant="white" size="sm" scale={1.5} className="text-[#E81414]" />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight leading-tight">
                    ACCESS <span className="text-[#E81414]">DENIED</span>
                </h2>
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest leading-relaxed max-w-[280px]">
                    Mobile users are not able to view challenges. Please access the arena via desktop or laptop for the full deployment experience.
                </p>
                <div className="pt-4">
                    <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#E81414]/50 to-transparent mx-auto" />
                </div>
            </div>

            {/* Domain Cards Grid - Hidden on Mobile */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {DOMAINS.map((domain, i) => {
                    return (
                        <motion.div
                            key={domain.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
                            className="group relative flex flex-col rounded-[2rem] border border-white/10 overflow-hidden bg-black/40 hover:bg-[#E81414] transition-colors duration-500 min-h-[380px]"
                        >
                            <div className="relative z-10 flex flex-col flex-1 p-8 md:p-10">
                                {/* Header row */}
                                <div className="flex justify-between items-start mb-8">
                                    <div className="icon-wrap w-16 h-16 rounded-3xl flex items-center justify-center border bg-zinc-900 border-white/10 group-hover:bg-black group-hover:border-white/20 transition-all duration-500">
                                        <GOTIcon variant="white" size="sm" scale={1.35} x={0} y={0} />
                                    </div>
                                    <span className="text-[9px] tracking-[0.4em] font-black uppercase px-3 py-1.5 rounded-full border border-white/15 text-white/40 group-hover:border-black/30 group-hover:text-black/70 transition-colors duration-500">
                                        {domain.tag}
                                    </span>
                                </div>

                                {/* Title + tagline */}
                                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white group-hover:text-black mb-3 leading-[1.1] transition-colors duration-500">
                                    {domain.label}
                                </h3>
                                <p className="text-[11px] font-black uppercase tracking-[0.25em] text-white/35 group-hover:text-black/70 mb-6 transition-colors duration-500">
                                    {domain.tagline}
                                </p>
                                <p className="text-sm text-white/50 group-hover:text-black/75 leading-relaxed font-medium transition-colors duration-500">
                                    {domain.description}
                                </p>

                                {/* Footer */}
                                <div className="mt-auto pt-6 border-t border-white/10 group-hover:border-black/20 flex items-center justify-between gap-4 transition-colors duration-500">
                                    <div className="flex items-center gap-6">
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-black tabular-nums text-white group-hover:text-black leading-none transition-colors duration-500">
                                                {domain.challenges}
                                            </span>
                                            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-black/50 transition-colors duration-500">
                                                CHALLENGES
                                            </span>
                                        </div>
                                        <div className="w-px h-8 bg-white/10 group-hover:bg-black/15 transition-colors duration-500" />
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-black tabular-nums text-[#E81414] group-hover:text-black leading-none transition-colors duration-500">
                                                {domain.xp}
                                            </span>
                                            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-black/50 transition-colors duration-500">
                                                XP POOL
                                            </span>
                                        </div>
                                    </div>

                                    <Link
                                        href={domain.href}
                                        className="shrink-0 flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/15 text-white/60 font-black text-[10px] uppercase tracking-[0.3em] group-hover:border-black/30 group-hover:bg-black group-hover:text-white transition-all duration-500"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        ENTER
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

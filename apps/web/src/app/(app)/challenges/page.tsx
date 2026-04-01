'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';

import { GOTIcon, GOTIconType } from '@/components/icons/GOTIcon';
import { Button } from '@/components/ui/Button';
import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { HUDCard } from '@/components/ui/HUDCard';
import { StatGrid } from '@/components/ui/StatGrid';

type ChallengeCategory = {
    id: string;
    title: string;
    description: string;
    icon: GOTIconType;
    active: number;
    completed: number;
    difficulty: string;
    points: number;
    features: string[];
    special?: boolean;
};

export default function ChallengesPage() {
    const CHALLENGE_CATEGORIES: ChallengeCategory[] = [
        {
            id: 'ai-quiz',
            title: 'AI QUIZ',
            description: 'TEST YOUR KNOWLEDGE ON NEURAL NETWORKS AND ML ARCHITECTURES.',
            icon: 'wolf',
            active: 12,
            completed: 42,
            difficulty: 'HARD',
            points: 1000,
            features: ['LLM ARCHITECTURES', 'NEURAL NETWORKS', 'ETHICS SCENARIOS']
        },
        {
            id: 'coding-challenge',
            title: 'CODING CHALLENGE',
            description: 'ALGORITHMIC TRIALS, DEBUGGING ARENAS, AND SYSTEM DESIGN QUESTS.',
            icon: 'dragon',
            active: 24,
            completed: 18,
            difficulty: 'EXTREME',
            points: 2500,
            features: ['DATA STRUCTURES', 'HIGH-PERFORMANCE', 'SYSTEM DESIGN']
        },
        {
            id: 'ui-ux',
            title: 'UI/UX DESIGN',
            description: 'CRAFT HIGH-FIDELITY MOCKUPS AND OPTIMIZE USER EXPERIENCES.',
            icon: 'rose',
            active: 5,
            completed: 10,
            difficulty: 'MEDIUM',
            points: 800,
            features: ['WIREFRAMING', 'ACCESSIBILITY', 'INTERACTION DESIGN']
        },
        {
            id: 'tech-quiz',
            title: 'TECH QUIZ',
            description: 'GENERAL TECHNOLOGY LORE, INFRASTRUCTURE, AND CLOUD MECHANICS.',
            icon: 'lion',
            active: 30,
            completed: 120,
            difficulty: 'MEDIUM',
            points: 500,
            features: ['CLOUD (AWS/GCP)', 'CI/CD PIPELINES', 'DB OPTIMIZATIONS']
        },
        {
            id: 'cybersecurity',
            title: 'CYBERSECURITY',
            description: 'PENETRATION TESTING, CRYPTOGRAPHY, AND THREAT MITIGATION SCENARIOS.',
            icon: 'kraken',
            active: 8,
            completed: 6,
            difficulty: 'EXTREME',
            points: 3000,
            features: ['PEN TESTING', 'CRYPTOGRAPHY', 'EXPLOIT MITIGATION']
        },
        {
            id: 'custom',
            title: 'CUSTOM CHALLENGE',
            description: 'ESTABLISH NEW PARAMETERS. FORGE A UNIQUE TRIAL FOR YOUR HOUSE.',
            icon: 'sun',
            active: 0,
            completed: 0,
            difficulty: 'VARIABLE',
            points: 0,
            special: true,
            features: ['CUSTOM SCORING', 'HOUSE RESTRICTIONS', 'PRIVATE BOARDS']
        }
    ];

    const RECENT_CHALLENGES = [
        { id: 'C-882', title: 'OPTIMIZE REACTOR ALGORITHM', type: 'CODING', time: '2H AGO', status: 'COMPLETED', reward: '+2500 XP' },
        { id: 'C-883', title: 'BREACH FIREWALL PROXY', type: 'CYBER', time: 'OUTATIME', status: 'FAILED', reward: '-500 XP' },
        { id: 'C-884', title: 'IDENTIFY ML BIAS', type: 'AI QUIZ', time: '1D AGO', status: 'COMPLETED', reward: '+1000 XP' },
    ];

    return (
        <div className="w-full pb-20 space-y-8 md:space-y-12 relative overflow-hidden text-white font-mono">
            <DotGrid />

            {/* Header Module */}
            <PageHeader
                tag="ROYAL ARENA COMMAND"
                title={<>CHALLENGE<br /><span className="text-[#E81414]">COMMAND</span></>}
            />

            {/* Top Stats */}
            <StatGrid stats={[
                { 
                    title: "TRIALS COMPLETED", 
                    value: "196", 
                    color: "text-white" 
                },
                { 
                    title: "SUCCESS RATE", 
                    value: "82.4%", 
                    color: "text-white" 
                },
                { 
                    title: "GLOBAL RANK", 
                    value: "TOP 5%", 
                    color: "text-white" 
                },
                { 
                    title: "TOTAL XP GAIN", 
                    value: "48,200", 
                    color: "text-white" 
                }
            ]} variant="oversight" />

            {/* Active Challenge Hub Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 relative z-10 w-full">
                {CHALLENGE_CATEGORIES.map((cat, idx) => {
                    return (
                        <Link 
                            href={`/challenges/${cat.id}`}
                            key={cat.id} 
                            className={`group relative flex flex-col p-8 md:p-10 rounded-[2rem] border transition-colors duration-500 overflow-hidden shadow-2xl h-full
                            ${cat.special ? 'bg-[#E81414]/5 border-[#E81414]/30 hover:bg-[#E81414]' : 'bg-black/40 border-white/10 hover:bg-[#E81414]'}
                            `}
                        >

                            {/* Header Section */}
                            <div className="w-full flex justify-between items-start mb-8 relative z-10">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-500 border
                                    ${cat.special ? 'text-white bg-[#E81414] border-[#E81414] group-hover:bg-black group-hover:border-black' 
                                                  : 'bg-white/10 border-white/20 text-white group-hover:bg-black group-hover:border-black group-hover:text-white'}`
                                }>
                                    <GOTIcon variant="white" size="sm" scale={1.2} x={0} y={0} />
                                </div>
                                <span className={`text-[9px] tracking-[0.4em] font-black uppercase px-4 py-2 rounded-full border transition-colors duration-500 shadow-sm
                                    ${cat.difficulty === 'EXTREME' 
                                        ? 'border-[#E81414] text-[#E81414] group-hover:border-black group-hover:bg-black group-hover:text-white' 
                                        : 'border-white/20 text-white/60 group-hover:border-black/50 group-hover:text-black/80'}`
                                }>
                                    {cat.difficulty}
                                </span>
                            </div>

                            <div className="relative z-10">
                                <h3 className={`text-3xl font-black uppercase tracking-tighter transition-colors duration-500 mb-4
                                    ${cat.special ? 'text-[#E81414] group-hover:text-black' : 'text-white group-hover:text-black'}`
                                }>
                                    {cat.title}
                                </h3>

                                <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest leading-loose text-white/40 group-hover:text-black/80 transition-colors duration-500 mb-8 min-h-[60px]">
                                    {cat.description}
                                </p>

                                {/* Feature List */}
                                <div className="space-y-4 mb-10 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                                    {cat.features.map((feature, fIdx) => (
                                        <div key={fIdx} className="flex items-center gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-black/40 transition-colors duration-500 shrink-0"></div>
                                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white/60 group-hover:text-black/90 transition-colors duration-500">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-auto pt-8 border-t border-white/10 group-hover:border-black/20 flex flex-wrap items-center justify-between gap-6 relative z-10 transition-colors duration-500">
                                <div className="flex items-center gap-6">
                                    {!cat.special ? (
                                        <>
                                            <div className="flex flex-col">
                                                <span className="text-xl font-black text-white group-hover:text-black tabular-nums transition-colors duration-500 leading-none mb-1">{cat.active}</span>
                                                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-black/50 transition-colors duration-500">ACTIVE</span>
                                            </div>
                                            <div className="w-[1px] h-8 bg-white/10 group-hover:bg-black/10 transition-colors mx-2"></div>
                                            <div className="flex flex-col">
                                                <span className="text-xl font-black text-white group-hover:text-black tabular-nums transition-colors duration-500 leading-none mb-1">{cat.completed}</span>
                                                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-black/50 transition-colors duration-500">CLEARED</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col">
                                            <span className="text-xl font-black text-[#E81414] group-hover:text-black tabular-nums transition-colors duration-500 leading-none mb-1">∞</span>
                                            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-black/50 transition-colors duration-500">OPTIONS</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-6 ml-auto">
                                    <div className="text-right hidden sm:block">
                                        <span className={`text-xl font-black tabular-nums transition-colors duration-500 text-shadow-sm leading-none
                                            ${cat.special ? 'text-[#E81414] group-hover:text-white' : 'text-[#E81414] group-hover:text-black'}`
                                        }>
                                            {cat.points > 0 ? `+${cat.points}` : 'N/A'}
                                        </span>
                                        {!cat.special && <span className="block text-[8px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-black/50 transition-colors duration-500 mt-2">AVG YIELD</span>}
                                    </div>
                                    <Button 
                                        variant="outline" 
                                        className={`shrink-0 py-3.5 px-6 tracking-widest text-[10px] font-black h-auto border-white/20 text-white rounded-xl shadow-lg
                                            ${cat.special ? 'border-[#E81414]/50 hover:bg-black hover:text-white group-hover:bg-black group-hover:border-black group-hover:text-white' 
                                            : 'group-hover:border-black/30 group-hover:bg-black group-hover:text-white'}`}
                                    >
                                        {cat.special ? 'INITIALIZE' : 'ENTER ARENA'}
                                    </Button>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Bottom Row: Recent/Ledger & Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 relative z-10 pt-4">
                <HUDCard
                    title="RECENT EXECUTIONS"
                    tag="COMMAND LOG"
                    className="lg:col-span-2"
                    padding="none"
                >
                    <div className="w-full h-full divide-y divide-white/5 bg-black/20">
                        {RECENT_CHALLENGES.map((run, i) => (
                            <div key={run.id} className="p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group hover:bg-[#E81414] transition-colors duration-500 cursor-pointer">
                                <div className="flex items-center gap-6 min-w-0">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-colors duration-500 ${run.status === 'COMPLETED' ? 'bg-[#E81414]/10 border-[#E81414]/30 text-[#E81414] group-hover:bg-black/20 group-hover:border-black/10 group-hover:text-black' : 'bg-white/5 border-white/10 text-white/40 group-hover:bg-black/20 group-hover:border-black/10 group-hover:text-black/50'}`}>
                                        <span className="text-xs font-black">{(i + 1).toString().padStart(2, '0')}</span>
                                    </div>
                                    <div className="space-y-1.5 min-w-0">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30 group-hover:text-black/50 transition-colors duration-500">{run.id} {"//"} {run.type}</span>
                                        </div>
                                        <h4 className="text-base md:text-lg font-black uppercase tracking-tight text-white group-hover:text-black transition-colors duration-500 truncate">{run.title}</h4>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-10 w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t border-white/5 sm:border-t-0">
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-3.5 h-3.5 text-white/20 group-hover:text-black/40 transition-colors" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-black/60 transition-colors duration-500">{run.time}</span>
                                    </div>
                                    <div className="px-5 py-2.5 rounded-full border text-[9px] font-black uppercase tracking-[0.3em] transition-colors duration-500 tabular-nums bg-white/5 border-white/10 text-white/40 group-hover:bg-black/10 group-hover:border-black/20 group-hover:text-black">
                                        {run.reward}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </HUDCard>

                <HUDCard
                    title="ACTIVE BOUNTIES"
                    tag="PRIORITY"
                    padding="p-8 md:p-12"
                    icon={<GOTIcon variant="white" size="sm" scale={1.2} x={0} y={0} />}
                >
                    <div className="space-y-8 h-full flex flex-col justify-center">
                        <div>
                            <p className="text-5xl md:text-7xl font-black tracking-tighter text-[#E81414] tabular-nums leading-none">12</p>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mt-4 leading-relaxed">HIGH-YIELD TARGETS PENDING IN OVERSIGHT RADAR</p>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                            <div className="h-full bg-[#E81414] w-[45%] shadow-[0_0_10px_rgba(232,20,20,0.5)]"></div>
                        </div>
                        <Button variant="primary" fullWidth className="py-5 text-[10px] font-black tracking-[0.4em] group mt-2 hover:bg-[#E81414] hover:text-white border border-[#E81414]/30">
                           INITIATE NEXT
                        </Button>
                    </div>
                </HUDCard>
            </div>
        </div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ShieldAlert, Zap, Trophy, ShieldCheck } from 'lucide-react';

import { GOTIcon, GOTIconType } from '@/components/icons/GOTIcon';
import { Button } from '@/components/ui/Button';
import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { HUDCard } from '@/components/ui/HUDCard';
import { StatGrid } from '@/components/ui/StatGrid';

type Challenge = {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    icon: string;
    maxScore: number;
    isActive: boolean;
    _count?: {
        submissions: number;
    }
};

export default function ChallengesPage() {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [loading, setLoading] = useState(true);
    const [globalStats, setGlobalStats] = useState({ 
        trialsCompleted: 196, 
        successRate: "82.4%", 
        globalRank: "TOP 5%", 
        totalXp: "48,200" 
    });

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const challRes = await fetch('/api/challenges'); 
                if (challRes.ok) {
                    const data = await challRes.json();
                    setChallenges(data.challenges || []);
                    if (data.stats) setGlobalStats(data.stats);
                }
            } catch (err) {
                console.warn('Backend connection issue, showing local archive');
            } finally {
                setLoading(false);
            }
        };
        fetchChallenges();
    }, []);

    const RECENT_HISTORY = [
        { id: 'C-882', title: 'OPTIMIZE REACTOR ALGORITHM', type: 'CODING', time: '2H AGO', status: 'COMPLETED', reward: '+2500 XP' },
        { id: 'C-883', title: 'BREACH FIREWALL PROXY', type: 'CYBER', time: 'OUTATIME', status: 'FAILED', reward: '-500 XP' },
        { id: 'C-884', title: 'IDENTIFY ML BIAS', type: 'AI QUIZ', time: '1D AGO', status: 'COMPLETED', reward: '+1000 XP' },
    ];

    return (
        <div className="w-full pb-20 space-y-8 md:space-y-12 relative overflow-hidden text-white">
            <DotGrid />

            {/* Dynamic Header */}
            <PageHeader
                tag="ROYAL ARENA COMMAND — NEON REAL-TIME"
                title={<>CHALLENGE<br /><span className="text-[#E81414]">COMMAND</span></>}
            />

            {/* Dynamic Global Metrics */}
            <StatGrid stats={[
                { title: "TRIALS COMPLETED", value: String(globalStats.trialsCompleted), color: "text-white" },
                { title: "SUCCESS RATE", value: globalStats.successRate, color: "text-white" },
                { title: "GLOBAL RANK", value: globalStats.globalRank, color: "text-white" },
                { title: "TOTAL XP GAIN", value: globalStats.totalXp, color: "text-white" }
            ]} variant="oversight" />

            {/* Active Challenge Hub Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 relative z-10 w-full">
                {challenges.length > 0 ? challenges.map((cat) => (
                    <Link 
                        href={`/challenges/${cat.id}`}
                        key={cat.id} 
                        className={`group relative flex flex-col p-8 md:p-10 rounded-[2rem] border transition-colors duration-500 overflow-hidden shadow-2xl h-full bg-black/40 border-white/10 hover:bg-[#E81414]`}
                    >
                        <div className="w-full flex justify-between items-start mb-8 relative z-10">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-500 border bg-white/10 border-white/20 text-white group-hover:bg-black group-hover:border-black">
                                <GOTIcon variant="white" type={cat.icon as any || 'dragon'} size="sm" scale={1.2} x={0} y={0} />
                            </div>
                            <span className={`text-[9px] tracking-[0.4em] font-black uppercase px-4 py-2 rounded-full border transition-colors duration-500 shadow-sm border-white/20 text-white/60 group-hover:border-black/50 group-hover:text-black/80`}>
                                {cat.difficulty}
                            </span>
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-3xl font-black uppercase tracking-tighter transition-colors duration-500 mb-4 text-white group-hover:text-black">
                                {cat.title}
                            </h3>
                            <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest leading-loose text-white/40 group-hover:text-black/80 transition-colors duration-500 mb-8 min-h-[60px]">
                                {cat.description}
                            </p>
                        </div>

                        <div className="mt-auto pt-8 border-t border-white/10 group-hover:border-black/20 flex flex-wrap items-center justify-between gap-6 relative z-10 transition-colors duration-500">
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col">
                                    <span className="text-xl font-black text-white group-hover:text-black tabular-nums transition-colors duration-500 leading-none mb-1">{cat._count?.submissions || 0}</span>
                                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-black/50 transition-colors duration-500">INITIATED</span>
                                </div>
                                <div className="w-[1px] h-8 bg-white/10 group-hover:bg-black/10 transition-colors mx-2"></div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-black text-white group-hover:text-black tabular-nums transition-colors duration-500 leading-none mb-1">{cat.category}</span>
                                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-black/50 transition-colors duration-500">DOMAIN</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 ml-auto">
                                <div className="text-right hidden sm:block">
                                    <span className="text-xl font-black tabular-nums transition-colors duration-500 text-[#E81414] group-hover:text-black leading-none">
                                        +{cat.maxScore} XP
                                    </span>
                                </div>
                                <Button 
                                    variant="outline" 
                                    className="shrink-0 py-3.5 px-6 tracking-widest text-[10px] font-black h-auto border-white/20 text-white rounded-xl shadow-lg group-hover:border-black/30 group-hover:bg-black group-hover:text-white"
                                >
                                    ENTER ARENA
                                </Button>
                            </div>
                        </div>
                    </Link>
                )) : (
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-[350px] rounded-[2rem] bg-white/5 animate-pulse" />
                    ))
                )}
            </div>

            {/* Dynamic Logs & Bounties */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 relative z-10 pt-4">
                <HUDCard
                    title="RECENT EXECUTIONS"
                    tag="DYNAMIC SYNC"
                    className="lg:col-span-2"
                    padding="none"
                >
                    <div className="w-full h-full divide-y divide-white/5 bg-black/20">
                        {RECENT_HISTORY.map((run, i) => (
                            <div key={i} className="p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group hover:bg-[#E81414] transition-colors duration-500 cursor-pointer">
                                <div className="flex items-center gap-6 min-w-0">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-colors duration-500 ${run.status === 'COMPLETED' ? 'bg-[#E81414]/10 border-[#E81414]/30 text-[#E81414] group-hover:bg-black group-hover:border-black/10 group-hover:text-black' : 'bg-white/5 border-white/10 text-white/40 group-hover:bg-black group-hover:border-black/10 group-hover:text-black/50'}`}>
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1.5 min-w-0">
                                        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30 group-hover:text-black/50 transition-colors duration-500">{run.id} {"//"} {run.type}</span>
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
                    title="ACTIVE TARGETS"
                    tag="OPERATIONAL"
                    padding="p-8 md:p-12"
                    icon={<Zap className="w-10 h-10 text-[#E81414]" />}
                >
                    <div className="space-y-8 h-full flex flex-col justify-center">
                        <div>
                            <p className="text-5xl md:text-7xl font-black tracking-tighter text-[#E81414] tabular-nums leading-none">{challenges.length}</p>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mt-4 leading-relaxed">HIGH-YIELD TARGETS SYNCED FROM GLOBAL COMMAND</p>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                            <div className="h-full bg-[#E81414] w-[45%] shadow-[0_0_10px_rgba(232,20,20,0.5)]"></div>
                        </div>
                        <Button variant="primary" fullWidth className="py-5 text-[10px] font-black tracking-[0.4em] group mt-2 hover:bg-[#E81414] hover:text-white border border-[#E81414]/30">
                           SYNC ARENA
                        </Button>
                    </div>
                </HUDCard>
            </div>
        </div>
    );
}


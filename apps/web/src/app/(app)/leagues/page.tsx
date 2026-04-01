'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Swords, Shield, Crosshair, ChevronUp } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { HUDCard } from '@/components/ui/HUDCard';
import { GOTIcon } from '@/components/icons/GOTIcon';

/* ── Decorative Elements ─────────────────────────────────────────────── */
const DotGrid = ({ className = "" }: { className?: string }) => (
    <div className={`absolute inset-0 dot-grid opacity-[0.05] pointer-events-none ${className}`} />
);

export default function LeaguesArena() {
    const leagues = [
        { name: 'FLEA BOTTOM', minElo: 0, maxElo: 1200, color: 'bg-white', unlocked: true },
        { name: 'SQUIRE', minElo: 1200, maxElo: 1500, color: 'bg-white', unlocked: true },
        { name: 'KNIGHT', minElo: 1500, maxElo: 2000, color: 'bg-[#F9F9F9]', unlocked: true },
        { name: 'WARDEN', minElo: 2000, maxElo: 2500, color: 'bg-white', unlocked: false },
        { name: 'LORD', minElo: 2500, maxElo: 3000, color: 'bg-white', unlocked: false },
        { name: 'KING', minElo: 3000, maxElo: 4000, color: 'bg-white', unlocked: false },
        { name: 'AZOR AHAI', minElo: 4000, maxElo: 9999, color: 'bg-white', unlocked: false }
    ];

    const [status, setStatus] = useState<'view' | 'searching' | 'match' | 'result'>('view');
    const [currentElo, setCurrentElo] = useState(1850);
    const [eloChange, setEloChange] = useState(0);

    const findMatch = () => {
        setStatus('searching');
        setTimeout(() => {
            setStatus('match');
            setTimeout(() => {
                const gain = Math.floor(Math.random() * 20) + 15; // 15-35 elo
                setEloChange(gain);
                setCurrentElo(prev => prev + gain);
                setStatus('result');
            }, 3000);
        }, 2000);
    };

    return (
        <div className="w-full pb-24 space-y-16 relative overflow-hidden text-white font-mono min-h-screen">
            <div className="absolute top-0 right-1/2 translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(232,20,20,0.03)_0%,transparent_60%)] pointer-events-none" />

            <div className="flex items-center gap-4 relative z-10">
                <Link href="/">
                    <Button variant="outline" className="p-2 border-white/20 text-white hover:bg-white hover:text-black hover:border-white transition-colors rounded-xl">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div className="px-4 py-1.5 rounded-full border border-[#E81414]/30 bg-[#E81414]/10 text-[#E81414] text-[10px] font-black uppercase tracking-[0.3em]">
                    RANKED LADDER
                </div>
            </div>
            
            <AnimatePresence mode="wait">
                {status === 'view' && (
                    <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-16">
                        {/* Header Module */}
                        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center border-b border-white/10 pb-12 gap-10 relative z-10">
                            <div className="space-y-6">
                                <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] text-white">
                                    REALM<br /><span className="text-[#E81414]">LEAGUES</span>
                                </h1>
                            </div>

                            <div className="flex flex-col gap-3 group/elo">
                                <span className="text-[10px] tracking-[0.4em] font-black uppercase text-white/20">BATTLE POWER</span>
                                <div className="bg-white text-black px-10 py-5 rounded-2xl group-hover:bg-[#E81414] group-hover:text-white transition-all duration-500">
                                    <span className="text-4xl font-bold uppercase tracking-widest">{currentElo}</span>
                                </div>
                            </div>
                        </div>

                        {/* Current Tier Status Module */}
                        <div className="bg-black border border-white/10 relative min-h-[400px] flex flex-col md:flex-row items-stretch overflow-hidden group/stage transition-all z-10 rounded-[2.5rem]">
                            <DotGrid />
                            <div className="absolute inset-0 scanlines opacity-5 pointer-events-none" />

                            <div className="flex-1 p-12 space-y-10 relative z-10">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[11px] tracking-[0.6em] font-black uppercase text-white/20">CURRENT PLACEMENT</span>
                                    </div>
                                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white border-b-4 border-[#E81414] pb-6 inline-block">KNIGHT</h2>
                                </div>

                                <div className="space-y-8 max-w-xl">
                                    <div className="flex justify-between items-end text-[11px] tracking-[0.4em] font-black uppercase">
                                        <span className="text-white/40">REALM PROGRESS</span>
                                        <span className="text-[#E81414] transition-transform">{(2000 - currentElo)} TO WARDEN</span>
                                    </div>
                                    <div className="h-4 w-full bg-white/5 border border-white/10 p-1 rounded-full relative overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${((currentElo - 1500) / 500) * 100}%` }}
                                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                            className="h-full bg-white rounded-full relative"
                                        >
                                            <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
                                        </motion.div>
                                    </div>
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.4em] text-white/10">
                                        <span>1500 MIN</span>
                                        <span>2000 MAX</span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-1/3 bg-[#E81414]/5 p-12 flex flex-col justify-center relative overflow-hidden group/sidebar border-l border-[#E81414]/20 border-t border-t-[#E81414]/20 md:border-t-0 hover:bg-[#E81414]/10 transition-colors">
                                <div className="space-y-8 relative z-10 text-center flex flex-col items-center">
                                    <div className="group-hover:scale-110 transition-transform duration-500">
                                        <GOTIcon variant="white" size={48} />
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-[10px] tracking-[0.4em] font-black uppercase text-white/40">COMPETITIVE</p>
                                        <Button onClick={findMatch} variant="primary" fullWidth className="py-6 tracking-[0.3em] font-black border border-transparent bg-[#E81414] hover:bg-white hover:text-black">
                                            PLAY RANKED MATCH
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* League Tier Hierarchy */}
                        <div className="space-y-12 pt-16 relative z-10">
                            <div className="flex items-center justify-between border-b border-white/5 pb-8">
                                <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-6 text-white">
                                    TIER HIERARCHY
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {leagues.map((league, i) => {
                                    const isCurrent = currentElo >= league.minElo && currentElo < league.maxElo;
                                    return (
                                        <div
                                            key={i}
                                            className={`p-10 bg-black border transition-all duration-500 group/tier relative h-[420px] flex flex-col justify-between cursor-pointer overflow-hidden rounded-[2rem] ${isCurrent ? 'border-[#E81414] shadow-[0_0_40px_rgba(232,20,20,0.05)] bg-[#E81414]/[0.02]' : 'border-white/10 hover:border-white/30'} ${!league.unlocked ? 'opacity-20 grayscale' : ''}`}
                                        >
                                            <DotGrid />
                                            {isCurrent && <div className="absolute top-0 left-0 w-full h-2 bg-[#E81414] shadow-[0_0_20px_#E81414]" />}
                                            <div className="space-y-8 relative z-10">
                                                <div className="flex justify-between items-start">
                                                    <div className={`w-16 h-16 border flex items-center justify-center transition-all duration-700 rounded-2xl ${isCurrent ? 'border-[#E81414] bg-[#E81414]/10 text-[#E81414]' : 'border-white/10 bg-white/5 text-white/40 group-hover/tier:bg-white group-hover/tier:text-black hover:border-white'}`}>
                                                        <GOTIcon variant="white" size={32} />
                                                    </div>
                                                    {!league.unlocked && <span className="text-[9px] tracking-[0.4em] font-black uppercase text-white/10 border border-white/5 px-3 py-1.5 rounded-full">LOCKED</span>}
                                                    {isCurrent && <span className="text-[9px] tracking-[0.4em] font-black uppercase bg-[#E81414] text-white px-4 py-2 rounded-full shadow-[0_0_20px_#E81414]">ACTIVE</span>}
                                                </div>
                                                <div className="space-y-4 pt-6">
                                                    <h4 className={`text-3xl font-black uppercase tracking-tighter transition-all duration-500 ${!league.unlocked ? 'text-white/10' : 'text-white'} ${isCurrent ? 'text-[#E81414]' : ''}`}>{league.name}</h4>
                                                    <div className="flex flex-col gap-2">
                                                        <span className="text-[10px] tracking-[0.6em] font-black text-white/10 uppercase group-hover/tier:text-white/30 transition-colors duration-500">ELO RANGE</span>
                                                        <p className={`text-[16px] font-bold tracking-widest transition-all duration-500 ${!league.unlocked ? 'text-white/5' : 'text-white/40 group-hover/tier:text-white'}`}>{league.minElo} — {league.maxElo}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}

                {status === 'searching' && (
                    <motion.div key="searching" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 w-full min-h-[500px] flex items-center justify-center bg-black/40 rounded-[2.5rem] p-8 border border-white/10">
                        <div className="text-center space-y-8">
                            <div className="relative w-32 h-32 mx-auto">
                                <div className="absolute inset-0 rounded-full border-4 border-dashed border-[#E81414]/30 animate-[spin_4s_linear_infinite]"></div>
                                <div className="absolute inset-2 rounded-full border-2 border-[#E81414] animate-[spin_3s_linear_infinite_reverse]"></div>
                                <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                                    <GOTIcon variant="white" size={40} />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">SEARCHING</h3>
                                <p className="text-xs font-black tracking-[0.4em] text-[#E81414]">CALIBRATING ELO BRACKET [{currentElo}]</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {status === 'match' && (
                    <motion.div key="match" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 w-full mx-auto space-y-8">
                        <HUDCard title="RANKED MATCH" tag="ACTIVE" className="w-full text-center" padding="p-6 md:p-10">
                            <div className="py-16 flex flex-col items-center justify-center space-y-12 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-[#E81414]/10 to-transparent pointer-events-none" />
                                
                                <div className="flex items-center justify-center gap-8 md:gap-16 relative z-10 w-full">
                                    {/* Player */}
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="w-24 h-24 md:w-32 md:h-32 bg-white flex items-center justify-center rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                            <span className="text-4xl font-black text-black">YOU</span>
                                        </div>
                                        <p className="text-sm font-black tracking-widest text-[#E81414] uppercase">{currentElo} ELO</p>
                                    </div>

                                    {/* VS */}
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="animate-bounce">
                                            <GOTIcon variant="white" size={48} />
                                        </div>
                                        <span className="text-[10px] font-black tracking-[0.6em] text-white/50">VERSUS</span>
                                    </div>

                                    {/* Opponent */}
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="w-24 h-24 md:w-32 md:h-32 bg-black border border-[#E81414] flex items-center justify-center rounded-2xl">
                                            <span className="text-4xl font-black text-[#E81414]">?</span>
                                        </div>
                                        <p className="text-sm font-black tracking-widest text-[#E81414] uppercase text-center w-24 border border-[#E81414]/30 px-2 py-1 bg-[#E81414]/10">&nbsp;</p>
                                    </div>
                                </div>
                                <div className="space-y-2 mt-8 z-10">
                                    <h3 className="text-2xl font-black uppercase tracking-widest text-white animate-pulse">MATCH IN PROGRESS</h3>
                                    <p className="text-[10px] font-black tracking-[0.4em] text-white/30">DO NOT CLOSE SECURE CONNECTION</p>
                                </div>
                            </div>
                        </HUDCard>
                    </motion.div>
                )}

                {status === 'result' && (
                    <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full mx-auto">
                        <HUDCard title="POST-MATCH REPORT" tag="VICTORY" className="text-center border-white/20 relative overflow-hidden" padding="p-6 md:p-10">
                            <DotGrid className="opacity-10" />
                            <div className="py-16 flex flex-col items-center justify-center space-y-8 relative z-10">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#E81414]/10 blur-[100px] pointer-events-none" />
                                
                                <div className="w-28 h-28 rounded-full border border-[#E81414] bg-[#E81414]/20 flex items-center justify-center relative shadow-[0_0_40px_rgba(232,20,20,0.5)] transform scale-110">
                                    <ChevronUp className="w-16 h-16 text-[#E81414]" strokeWidth={3} />
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
                                        VICTORY
                                    </h3>
                                    <div className="flex items-center justify-center gap-3 bg-[#E81414]/10 border border-[#E81414]/30 px-6 py-3 rounded-full mx-auto w-fit">
                                        <span className="text-[#E81414] font-black text-xl tracking-widest">+{eloChange}</span>
                                        <span className="text-[10px] tracking-[0.4em] text-[#E81414]/70 font-black pt-1">ELO RATING</span>
                                    </div>
                                </div>

                                <div className="pt-8 w-full max-w-xs mx-auto space-y-4 relative z-10">
                                    <Button onClick={() => setStatus('view')} variant="primary" fullWidth className="tracking-widest font-black bg-[#E81414] hover:bg-white hover:text-black hover:border-transparent py-5">
                                        RETURN TO LADDER
                                    </Button>
                                </div>
                            </div>
                        </HUDCard>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}


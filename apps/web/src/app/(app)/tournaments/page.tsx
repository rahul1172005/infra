'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Swords, Shield, Crown } from 'lucide-react';

import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { HUDCard } from '@/components/ui/HUDCard';
import { GOTIcon } from '@/components/icons/GOTIcon';
import { tournamentsConfig } from '@/configs/tournaments';

export default function TournamentsArena() {
    const [status, setStatus] = useState<'brief' | 'loading' | 'bracket'>('brief');

    const viewBracket = () => {
        setStatus('loading');
        setTimeout(() => setStatus('bracket'), 2000);
    };

    return (
        <div className="w-full pb-20 space-y-8 md:space-y-12 relative overflow-hidden text-white font-mono min-h-screen">
            <DotGrid opacity="opacity-[0.05]" />

            <div className="flex items-center gap-4 relative z-10">
                <Link href="/">
                    <Button variant="outline" className="p-2 border-white/20 text-white hover:bg-white hover:text-black hover:border-white transition-colors rounded-xl">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div className="px-4 py-1.5 rounded-full border border-white/30 bg-white/5 text-white/50 text-[10px] font-black uppercase tracking-[0.3em]">
                    ELIMINATION ROUNDS
                </div>
            </div>

            <PageHeader 
                title={tournamentsConfig.header.title}
                accentTitle={tournamentsConfig.header.accentTitle}
                topLabel={tournamentsConfig.header.topLabel}
            />

            <AnimatePresence mode="wait">
                {status === 'brief' && (
                    <motion.div key="brief" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-start relative z-10">
                        <div className="lg:col-span-8 space-y-6">
                            <HUDCard title="TOURNAMENT COMMAND" tag="GLOBAL" className="flex-1" padding="p-6 md:p-10">
                                <div className="space-y-8">
                                    <p className="text-white/60 text-sm md:text-base leading-relaxed uppercase tracking-widest font-bold">
                                        FIGHT THROUGH THE BRACKET TO CLAIM THE IRON THRONE. ONLY THE MOST ELITE OPERATIVES QUALIFY FOR THE ROYAL TOURNAMENT.
                                    </p>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-6">
                                        <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center gap-2">
                                            <GOTIcon variant="white" size={24} />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/50">CHAMPION'S BOUNTY</span>
                                            <span className="text-xl font-black text-white">50,000 XP</span>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center gap-2">
                                            <GOTIcon variant="white" size={24} />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/50">MATCH FORMAT</span>
                                            <span className="text-xl font-black text-white">1 V 1</span>
                                        </div>
                                    </div>

                                    <div className="pt-6 relative z-10 flex flex-col sm:flex-row gap-4">
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            fullWidth
                                            className="h-16 tracking-[0.3em] font-black bg-[#E81414] text-white hover:bg-black hover:text-[#E81414] border-transparent hover:border-[#E81414]"
                                            onClick={viewBracket}
                                        >
                                            INSPECT BRACKET
                                        </Button>
                                    </div>
                                </div>
                            </HUDCard>
                        </div>

                        <div className="lg:col-span-4 space-y-6">
                            <HUDCard title="PREVIOUS VICTORS" tag="HISTORY" className="flex-1" padding="p-6">
                                <div className="space-y-6 relative z-10">
                                    {tournamentsConfig.history.map((hist: any, i: number) => (
                                        <div key={i} className="flex items-center justify-between group/item border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                            <div className="space-y-1">
                                                <p className="text-[9px] tracking-[0.4em] font-black uppercase text-[#E81414]">{hist.season}</p>
                                                <p className="text-sm font-black tracking-widest uppercase text-white">{hist.winner}</p>
                                            </div>
                                            <div className="text-xs font-black tracking-[0.3em] uppercase text-white/30">{hist.prize}</div>
                                        </div>
                                    ))}
                                </div>
                            </HUDCard>
                            
                            <HUDCard title="REQUIREMENTS" tag="ENTRY" padding="p-6">
                                <div className="space-y-6 relative z-10">
                                    {tournamentsConfig.requirements.map((req: any, i: number) => (
                                        <div key={i} className="flex items-center gap-4 group/req-item">
                                            <div className={`w-2 h-2 rounded-full border transition-all duration-500 shrink-0
                                                ${req.active ? 'bg-[#E81414] border-[#E81414]' : 'bg-transparent border-white/20'}`} />
                                            <span className={`text-[10px] tracking-[0.3em] uppercase font-black transition-colors duration-500
                                                ${req.active ? 'text-white' : 'text-white/30 truncate'}`}>
                                                {req.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </HUDCard>
                        </div>
                    </motion.div>
                )}

                {status === 'loading' && (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 w-full min-h-[400px] flex items-center justify-center border border-white/10 bg-black/40 rounded-[2rem] p-8">
                        <div className="text-center space-y-6">
                            <div className="w-16 h-16 mx-auto rounded-full border-4 border-t-[#E81414] border-white/10 animate-spin"></div>
                            <h3 className="text-2xl font-black uppercase tracking-widest text-white">DECRYPTING MATCH HISTORY...</h3>
                            <p className="text-xs font-black tracking-[0.3em] text-[#E81414] animate-pulse">GENERATING BRACKET VISUALIZATION</p>
                        </div>
                    </motion.div>
                )}

                {status === 'bracket' && (
                    <motion.div key="bracket" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full mx-auto space-y-6">
                        <HUDCard title="SEASON 04 BRACKET" tag="LIVE" className="w-full bg-[#050505]" padding="p-6 md:p-10">
                            <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 md:gap-12 min-h-[400px]">
                                {/* Quarter Finals */}
                                <div className="flex flex-col justify-around gap-6 py-4 flex-1">
                                    <div className="border border-white/10 bg-black p-4 rounded-xl flex flex-col gap-2 relative">
                                        <div className="flex justify-between items-center bg-white/5 p-2 rounded">
                                            <span className="text-xs font-bold uppercase tracking-widest text-white">SYS_ADMIN_01</span>
                                            <span className="text-xs font-black text-[#E81414]">2</span>
                                        </div>
                                        <div className="flex justify-between items-center p-2 rounded opacity-50">
                                            <span className="text-xs font-bold uppercase tracking-widest text-white">BYTE_CRUSHER</span>
                                            <span className="text-xs font-black text-white/50">0</span>
                                        </div>
                                    </div>
                                    <div className="border border-white/10 bg-black p-4 rounded-xl flex flex-col gap-2 relative">
                                        <div className="flex justify-between items-center p-2 rounded opacity-50">
                                            <span className="text-xs font-bold uppercase tracking-widest text-white">NULL_POINTER</span>
                                            <span className="text-xs font-black text-white/50">1</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-white/5 p-2 rounded">
                                            <span className="text-xs font-bold uppercase tracking-widest text-white">KALI_QUEEN</span>
                                            <span className="text-xs font-black text-[#E81414]">2</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Semi Finals */}
                                <div className="flex flex-col justify-around gap-12 py-12 flex-1 relative">
                                    <div className="hidden md:block absolute left-[-24px] top-1/4 w-[24px] border-b border-t-0 border-r-0 border-l border-white/20 h-1/4 rounded-bl-xl border-dashed"></div>
                                    <div className="hidden md:block absolute left-[-24px] bottom-1/4 w-[24px] border-t border-b-0 border-r-0 border-l border-white/20 h-1/4 rounded-tl-xl border-dashed"></div>
                                    
                                    <div className="border border-[#E81414]/30 bg-[#E81414]/10 p-4 rounded-xl flex flex-col gap-2 relative shadow-[0_0_20px_rgba(232,20,20,0.1)]">
                                        <div className="flex justify-between items-center bg-[#E81414]/20 p-2 rounded border border-[#E81414]/50">
                                            <span className="text-xs font-bold uppercase tracking-widest text-white">SYS_ADMIN_01</span>
                                            <span className="text-xs font-black text-[#E81414]">1</span>
                                        </div>
                                        <div className="flex justify-between items-center p-2 rounded border border-transparent">
                                            <span className="text-xs font-bold uppercase tracking-widest text-white/80">KALI_QUEEN</span>
                                            <span className="text-xs font-black text-white/50">0</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Finals */}
                                <div className="flex flex-col justify-center gap-6 py-4 flex-1 relative">
                                    <div className="hidden md:block absolute left-[-24px] top-1/2 w-[24px] border-b border-white/20 border-dashed"></div>
                                    
                                    <div className="border-2 border-[#E81414] bg-black p-6 rounded-xl flex flex-col items-center gap-4 relative shadow-[0_0_40px_rgba(232,20,20,0.3)] transform scale-110">
                                        <div className="absolute -top-4 -translate-y-1/2">
                                            <GOTIcon variant="white" size={32} />
                                        </div>
                                        <span className="text-[10px] tracking-[0.4em] font-black uppercase text-white/50 pt-2">GRAND FINAL PENDING</span>
                                        <div className="w-full bg-[#E81414]/20 p-3 rounded text-center border border-[#E81414]/50">
                                            <span className="text-sm font-black uppercase tracking-widest text-white">SYS_ADMIN_01</span>
                                        </div>
                                        <span className="text-[10px] tracking-widest font-black uppercase text-white/30">VS</span>
                                        <div className="w-full bg-white/5 p-3 rounded text-center border border-white/10 animate-pulse">
                                            <span className="text-sm font-black uppercase tracking-widest text-white/40">TBD</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 mt-8 border-t border-white/10 flex justify-center">
                                <Button onClick={() => setStatus('brief')} variant="outline" className="border-white/10 text-white/50 hover:text-white px-12 py-4 tracking-[0.4em] font-black text-xs">
                                    RETURN TO OVERVIEW
                                </Button>
                            </div>
                        </HUDCard>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}


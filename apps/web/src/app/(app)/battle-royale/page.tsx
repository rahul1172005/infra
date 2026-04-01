'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Rocket, Map, Target, Crosshair, Skull } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { DotGrid } from '@/components/ui/DotGrid';
import { Button } from '@/components/ui/Button';
import { HUDCard } from '@/components/ui/HUDCard';
import { GOTIcon } from '@/components/icons/GOTIcon';

export default function BattleRoyaleArena() {
    const [status, setStatus] = useState<'brief' | 'dropping' | 'active' | 'eliminated'>('brief');
    const [survivors, setSurvivors] = useState(100);

    const enterField = () => {
        setStatus('dropping');
        setTimeout(() => {
            setStatus('active');
            let count = 100;
            const interval = setInterval(() => {
                count -= Math.floor(Math.random() * 5);
                if (count <= 12) {
                    clearInterval(interval);
                    setSurvivors(12);
                    setTimeout(() => setStatus('eliminated'), 2000);
                } else {
                    setSurvivors(count);
                }
            }, 500);
        }, 3000);
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
                <div className="px-4 py-1.5 rounded-full border border-[#E81414]/30 bg-[#E81414]/10 text-[#E81414] text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
                    LIVE COMBAT ZONE
                </div>
            </div>

            <PageHeader
                tag={status === 'brief' ? "WARZONE: PRE-FLIGHT" : "SECTOR 7G BATTLEFIELD"}
                title={<>BATTLE <span className="text-[#E81414]">ROYALE</span></>}
            />

            <AnimatePresence mode="wait">
                {status === 'brief' && (
                    <motion.div key="brief" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                        <HUDCard title="MISSION BRIEF" tag="INTEL" className="lg:col-span-2" padding="p-6 md:p-10">
                            <div className="space-y-6">
                                <p className="text-white/60 text-sm md:text-base leading-relaxed uppercase tracking-widest font-bold">
                                    100 OPERATIVES. 1 WINNER. DROP INTO THE COMBAT GRID AND SURVIVE UNTIL YOU ARE THE LAST HACKER STANDING.
                                </p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-6">
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center gap-2">
                                        <GOTIcon variant="white" size={24} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">SECTOR MAP</span>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center gap-2">
                                        <GOTIcon variant="white" size={24} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">COMBAT OPTICS</span>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center gap-2">
                                        <GOTIcon variant="white" size={24} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">ELIMINATION ZONE</span>
                                    </div>
                                </div>
                            </div>
                        </HUDCard>

                        <HUDCard title="DEPLOYMENT" tag="ACTION" className="flex flex-col justify-between" padding="p-6 md:p-10">
                            <div className="space-y-8 flex-1 flex flex-col justify-center">
                                <div>
                                    <p className="text-4xl font-black tracking-tighter text-white tabular-nums leading-none">+5000 XP</p>
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mt-3 leading-relaxed">CHAMPION YIELD</p>
                                </div>
                                <Button variant="primary" onClick={enterField} fullWidth className="py-6 text-xs font-black tracking-[0.4em] group hover:bg-[#E81414] hover:text-white border border-[#E81414]/30 bg-[#E81414]/10 text-[#E81414]">
                                    <Rocket className="w-4 h-4 mr-2 inline-block"/> ENTER WARZONE
                                </Button>
                            </div>
                        </HUDCard>
                    </motion.div>
                )}

                {status === 'dropping' && (
                    <motion.div key="dropping" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 w-full min-h-[400px] flex items-center justify-center border border-white/10 bg-black/40 rounded-[2rem] p-8">
                        <div className="text-center space-y-6">
                            <div className="w-20 h-20 mx-auto rounded-full border-2 border-dashed border-[#E81414] animate-[spin_3s_linear_infinite]"></div>
                            <h3 className="text-2xl font-black uppercase tracking-widest text-white">ORBITAL DROP COMMENCING...</h3>
                            <p className="text-xs font-black tracking-[0.3em] text-[#E81414] animate-pulse">CALIBRATING LANDING COORDINATES</p>
                        </div>
                    </motion.div>
                )}

                {status === 'active' && (
                    <motion.div key="active" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full mx-auto space-y-6">
                        <HUDCard title="LIVE BATTLEFIELD" tag="TACTICAL" className="w-full bg-[#050505]" padding="p-6 md:p-10">
                            <div className="space-y-10">
                                <div className="flex justify-between items-center bg-black border border-[#E81414]/30 p-6 rounded-xl relative overflow-hidden">
                                     <div className="absolute inset-0 bg-[#E81414]/5 animate-pulse"></div>
                                     <div className="relative z-10">
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 mb-2">OPERATIVES REMAINING</p>
                                        <p className="text-5xl font-black text-[#E81414] tabular-nums">{survivors}</p>
                                     </div>
                                     <div className="relative z-10 text-right">
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 mb-2">DANGER LEVEL</p>
                                        <p className="text-2xl font-black text-white">EXTREME</p>
                                     </div>
                                </div>

                                <div className="h-[300px] border border-white/10 rounded-xl relative bg-[radial-gradient(ellipse_at_center,rgba(232,20,20,0.1)_0%,transparent_70%)] overflow-hidden">
                                    <div className="absolute inset-0 opacity-20 bg-[url('https://transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-[#E81414] rounded-full animate-ping opacity-20"></div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[#E81414]/50 rounded-full animate-[spin_4s_linear_infinite] border-t-transparent"></div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-black text-[#E81414] tracking-[0.5em] uppercase shadow-[0_0_10px_#E81414]">SECTOR ACTIVATED</div>
                                </div>
                            </div>
                        </HUDCard>
                    </motion.div>
                )}

                {status === 'eliminated' && (
                    <motion.div key="eliminated" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full mx-auto">
                        <HUDCard title="BATTLE REPORT" tag="KIA" className="text-center font-mono border-[#E81414]/30" padding="p-6 md:p-10">
                            <div className="py-12 flex flex-col items-center justify-center space-y-8 relative overflow-hidden">
                                <div className="absolute inset-0 bg-[#E81414]/5 blur-3xl rounded-full"></div>
                                <div className="w-24 h-24 rounded-full border border-[#E81414] bg-[#E81414]/10 flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(232,20,20,0.4)]">
                                    <Skull className="w-10 h-10 text-[#E81414]" />
                                </div>
                                <div className="space-y-4 relative z-10">
                                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-[#E81414]">
                                        ELIMINATED (#12)
                                    </h3>
                                    <p className="text-xs font-black tracking-[0.3em] text-white/50">
                                        COMBAT LOG RECORDED. YIELD: +250 XP.
                                    </p>
                                </div>
                                <div className="pt-8 relative z-10">
                                    <Link href="/">
                                        <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black font-black uppercase tracking-widest text-[10px] px-8 py-4">
                                            RETURN TO OVERSIGHT
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </HUDCard>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}


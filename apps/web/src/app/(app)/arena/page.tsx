'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, XCircle, Sword, Activity, Zap, Shield, Target } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SurikenIcon } from '@/components/icons/SurikenIcon';
import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { HUDCard } from '@/components/ui/HUDCard';
import { MetaCard } from '@/components/ui/MetaCard';

export default function ArenaPage() {
    const [isMatching, setIsMatching] = useState(false);

    return (
        <div className="w-full space-y-8 md:space-y-12 pb-24 relative overflow-hidden">
            <DotGrid />

            {/* ══ HEADER ═════════════════════════════════════════════════════ */}
            <PageHeader 
                title="THE"
                accentTitle="PIT"
                topLabel="THE FIGHTING PIT"
            />

            {/* ══ MAIN ACTION TILES ═══════════════════════════════════════════ */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 md:gap-12 relative z-10">

                {/* Left: Deployment Tile */}
                <div className="xl:col-span-8">
                    <HUDCard 
                        title="ENTER THE PIT" 
                        subtitle="START THE BATTLE"
                        variant="primary"
                        className="h-full flex flex-col justify-between"
                    >
                        <div className="space-y-8 md:space-y-10 mb-12">
                            <div className="flex items-center gap-4">
                                <div className="px-4 py-1.5 border border-[#E81414] rounded-full text-[8px] md:text-[9px] tracking-[0.4em] font-black uppercase bg-[#E81414]/5 text-[#E81414]">
                                    PIT COMMAND
                                </div>
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-6 h-6 rounded-full border border-black bg-white/10 flex items-center justify-center text-[10px] font-black text-white/40">
                                            {i}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85] text-white">
                                READY FOR<br />BATTLE.
                            </h2>
                            <p className="text-[11px] md:text-[13px] tracking-[0.1em] md:tracking-[0.2em] font-black uppercase text-white/40 max-w-xl leading-relaxed">
                                ENGAGE IN REAL-TIME HAND-TO-HAND COMBAT WITHIN THE PIT. 
                                VICTORY YIELDS GOLD COINS AND ROYAL PRESTIGE.
                            </p>
                        </div>

                        <Button
                            variant="primary"
                            size="xl"
                            fullWidth
                            className="h-20 md:h-28 text-sm md:text-lg tracking-[0.5em]"
                            onClick={() => setIsMatching(true)}
                            icon={() => <SurikenIcon size="md" className="transition-transform duration-700" />}
                        >
                            START BATTLE
                        </Button>
                    </HUDCard>
                </div>

                {/* Right: Technical Sidebar */}
                <div className="xl:col-span-4 space-y-8 md:gap-12 flex flex-col">
                    <HUDCard 
                        title="PIT TRAINING"
                        subtitle="COMBAT SIMULATION"
                        className="flex-1 group/train cursor-crosshair"
                    >
                        <div className="space-y-8 h-full flex flex-col">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center justify-center">
                                    <Target className="w-8 h-8 text-[#E81414]" />
                                </div>
                                <span className="text-[8px] tracking-[0.4em] font-black uppercase text-white/20">TRAIN v4.2</span>
                            </div>
                            
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase  text-white">
                                    TRAINING<br />DUMMIES
                                </h3>
                                <p className="text-[10px] tracking-[0.1em] font-black uppercase leading-relaxed text-white/30">
                                    PRACTICE YOUR STRIKES AND COMBAT MOVES SAFELY.
                                </p>
                            </div>

                            <Button
                                variant="outline"
                                size="lg"
                                fullWidth
                                className="mt-auto group-hover/train:bg-white group-hover/train:text-black transition-all"
                                icon={Terminal}
                            >
                                START PRACTICE
                            </Button>
                        </div>
                    </HUDCard>

                    <div className="bg-black border border-white/10 rounded-[2.5rem] p-8 md:p-10 space-y-8 group/stats hover:border-[#E81414]/30 transition-all text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover/stats:opacity-[0.1] transition-opacity">
                            <Zap size={80} strokeWidth={3} />
                        </div>
                        
                        <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                            <SurikenIcon size="sm" opacity="0.3" />
                            <span className="text-[10px] tracking-[0.4em] font-black uppercase text-white/30">PIT LOGISTICS</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-8 relative z-10">
                            <div className="space-y-2">
                                <p className="text-[9px] tracking-[0.4em] font-black uppercase text-white/30 truncate">WIN RATE</p>
                                <p className="text-3xl md:text-4xl font-black text-white tabular-nums">64.2%</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[9px] tracking-[0.4em] font-black uppercase text-white/30 truncate">SYS TIME</p>
                                <p className="text-3xl md:text-4xl font-black text-white tabular-nums">142H</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══ MATCHMAKING OVERLAY ═════════════════════════════════════════ */}
            <AnimatePresence>
                {isMatching && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[999] bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden"
                    >
                        <DotGrid />

                        <div className="relative z-10 w-full max-w-4xl space-y-16 flex flex-col items-center text-center">

                            <div className="space-y-12">
                                <motion.div 
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-24 h-24 md:w-40 md:h-40 border-2 border-dashed border-[#E81414]/30 rounded-full flex items-center justify-center mx-auto relative"
                                >
                                    <div className="w-16 h-16 md:w-28 md:h-28 border border-[#E81414] rounded-full flex items-center justify-center bg-[#E81414]/5">
                                        <SurikenIcon size="lg" className="text-[#E81414]" />
                                    </div>
                                    
                                    {/* Rotating signal dots */}
                                    <div className="absolute inset-0">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#E81414] rounded-full shadow-[0_0_15px_#E81414]" />
                                    </div>
                                </motion.div>
                                
                                <div className="space-y-4">
                                    <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase text-white ">
                                        LOCATING<br /><span className="text-[#E81414]">OPPONENT.</span>
                                    </h2>
                                    <div className="h-1 w-24 bg-[#E81414]/20 mx-auto rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ x: "-100%" }}
                                            animate={{ x: "100%" }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                            className="h-full w-full bg-[#E81414]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="text-[9px] md:text-[11px] tracking-[0.4em] md:tracking-[0.6em] font-black uppercase text-white/30 space-y-3 md:space-y-4 font-mono">
                                <p>PREPARING THE PIT...</p>
                                <p className="text-[#E81414] animate-pulse">ROUTING FIGHTERS...</p>
                                <p>AWAITING OPPONENT</p>
                            </div>

                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => setIsMatching(false)}
                                icon={XCircle}
                                className="border-white/10 text-white/40 hover:border-[#E81414] hover:text-[#E81414] transition-all px-12 rounded-full"
                            >
                                YIELD
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Terminal, XCircle, Sword, Zap, Target, Skull } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { GOTIcon } from '@/components/icons/GOTIcon';
import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { HUDCard } from '@/components/ui/HUDCard';

export default function ArenaPage() {
    const [status, setStatus] = useState<'lobby' | 'matching' | 'combat' | 'result'>('lobby');
    const [myHealth, setMyHealth] = useState(100);
    const [oppHealth, setOppHealth] = useState(100);
    const [battleLog, setBattleLog] = useState<string[]>([]);

    const startBattle = () => {
        setStatus('matching');
        setTimeout(() => {
            setStatus('combat');
            setMyHealth(100);
            setOppHealth(100);
            setBattleLog(['BATTLE COMMENCED.']);
        }, 3000);
    };

    const yieldBattle = () => {
        setStatus('lobby');
    };

    const executeStrike = () => {
        const dmg = Math.floor(Math.random() * 25) + 15;
        const newOppHealth = Math.max(0, oppHealth - dmg);
        setOppHealth(newOppHealth);
        setBattleLog(prev => [`YOU STRUCK FOR ${dmg} DMG.`, ...prev]);

        if (newOppHealth === 0) {
            setTimeout(() => setStatus('result'), 1000);
            return;
        }

        // Enemy counter-attack
        setTimeout(() => {
            if (status !== 'combat') return;
            const enemyDmg = Math.floor(Math.random() * 20) + 10;
            const newMyHealth = Math.max(0, myHealth - enemyDmg);
            setMyHealth(newMyHealth);
            setBattleLog(prev => [`ENEMY COUNTERED FOR ${enemyDmg} DMG.`, ...prev]);
            
            if (newMyHealth === 0) {
                setTimeout(() => setStatus('result'), 1000);
            }
        }, 800);
    };

    return (
        <div className="w-full space-y-8 md:space-y-12 pb-24 relative overflow-hidden font-mono text-white min-h-screen">
            <DotGrid opacity="opacity-[0.05]" />

            <div className="flex items-center gap-4 relative z-10 px-6 xl:px-0">
                <Link href="/">
                    <Button variant="outline" className="p-2 border-white/20 text-white hover:bg-white hover:text-black hover:border-white transition-colors rounded-xl">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div className="px-4 py-1.5 rounded-full border border-[#E81414]/30 bg-[#E81414]/10 text-[#E81414] text-[10px] font-black uppercase tracking-[0.3em]">
                    THE PIT
                </div>
            </div>

            <PageHeader 
                title="THE"
                accentTitle="PIT"
                topLabel="THE FIGHTING PIT"
            />

            <AnimatePresence mode="wait">
                {status === 'lobby' && (
                    <motion.div key="lobby" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 xl:grid-cols-12 gap-8 md:gap-12 relative z-10">
                        {/* Left: Deployment Tile */}
                        <div className="xl:col-span-8">
                            <HUDCard 
                                title="ENTER THE PIT" 
                                subtitle="START THE BATTLE"
                                variant="primary"
                                className="h-full flex flex-col justify-between"
                                padding="p-6 md:p-10"
                            >
                                <div className="space-y-8 md:space-y-10 mb-12">
                                    <div className="flex items-center gap-4">
                                        <div className="px-4 py-1.5 border border-[#E81414] rounded-full text-[8px] md:text-[9px] tracking-[0.4em] font-black uppercase bg-[#E81414]/5 text-[#E81414]">
                                            PIT COMMAND
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
                                    className="h-20 md:h-28 text-sm md:text-lg tracking-[0.5em] bg-[#E81414] hover:bg-white hover:text-black border-transparent"
                                    onClick={startBattle}
                                    icon={() => <GOTIcon variant="white" size={24} className="transition-transform duration-700" />}
                                >
                                    START COMBAT
                                </Button>
                            </HUDCard>
                        </div>

                        {/* Right: Technical Sidebar */}
                        <div className="xl:col-span-4 space-y-8 md:gap-12 flex flex-col">
                            <HUDCard 
                                title="PIT TRAINING"
                                subtitle="COMBAT SIMULATION"
                                className="flex-1 group/train cursor-crosshair"
                                padding="p-6 md:p-10"
                            >
                                <div className="space-y-8 h-full flex flex-col">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center justify-center">
                                            <GOTIcon variant="white" size={32} />
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
                                    <GOTIcon variant="white" size={16} />
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
                    </motion.div>
                )}

                {status === 'matching' && (
                    <motion.div key="matching" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 w-full min-h-[500px] flex items-center justify-center bg-black/40 rounded-[2.5rem] p-8 border border-white/10">
                        <div className="text-center space-y-12">
                            <motion.div 
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="w-24 h-24 md:w-40 md:h-40 border-2 border-dashed border-[#E81414]/30 rounded-full flex items-center justify-center mx-auto relative"
                            >
                                <div className="w-16 h-16 md:w-28 md:h-28 border border-[#E81414] rounded-full flex items-center justify-center bg-[#E81414]/5">
                                    <GOTIcon variant="white" size={48} className="text-[#E81414]" />
                                </div>
                                <div className="absolute inset-0">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#E81414] rounded-full shadow-[0_0_20px_#E81414]" />
                                </div>
                            </motion.div>
                            
                            <div className="space-y-4">
                                <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-white ">
                                    LOCATING<br /><span className="text-[#E81414]">OPPONENT...</span>
                                </h2>
                            </div>

                            <Button onClick={yieldBattle} variant="outline" className="border-white/10 text-white/40 hover:border-[#E81414] hover:text-[#E81414] px-12 rounded-full mt-4">
                                <XCircle className="w-4 h-4 mr-2" /> YIELD
                            </Button>
                        </div>
                    </motion.div>
                )}

                {status === 'combat' && (
                    <motion.div key="combat" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full max-w-5xl mx-auto space-y-6">
                        <HUDCard title="ACTIVE ENGAGEMENT" tag="COMBAT" className="w-full bg-[#050505]" padding="p-6 md:p-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[400px]">
                                
                                {/* Current Player */}
                                <div className="p-8 border-2 border-white/10 rounded-2xl flex flex-col justify-between bg-black relative overflow-hidden group/player">
                                    <div className="absolute inset-0 bg-[#E81414]/5 opacity-0 group-hover/player:opacity-100 transition-opacity"></div>
                                    <div className="relative z-10 space-y-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xl font-black uppercase tracking-widest text-[#E81414]">YOU</span>
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em] bg-white text-black px-2 py-1 rounded">PLAYER</span>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-end mb-2">
                                                <span className="text-[10px] font-black tracking-widest uppercase text-white/50">HP STRUCTURE</span>
                                                <span className="text-xl font-black text-white">{myHealth}/100</span>
                                            </div>
                                            <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden">
                                                <motion.div animate={{ width: `${myHealth}%` }} className="h-full bg-white transition-all"></motion.div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-12 relative z-10">
                                        <Button onClick={executeStrike} variant="primary" fullWidth className="py-6 text-sm font-black tracking-[0.3em] bg-[#E81414] hover:bg-white hover:text-black border-transparent">
                                            <Sword className="w-5 h-5 mr-3" /> EXECUTE STRIKE
                                        </Button>
                                    </div>
                                </div>

                                {/* Enemy */}
                                <div className="p-8 border-2 border-[#E81414]/30 rounded-2xl flex flex-col justify-between bg-[#E81414]/5 relative overflow-hidden">
                                    <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
                                    <div className="relative z-10 space-y-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xl font-black uppercase tracking-widest text-white">OPPONENT</span>
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em] bg-[#E81414] text-white px-2 py-1 rounded">HOSTILE</span>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-end mb-2">
                                                <span className="text-[10px] font-black tracking-widest uppercase text-white/50">HP STRUCTURE</span>
                                                <span className="text-xl font-black text-[#E81414]">{oppHealth}/100</span>
                                            </div>
                                            <div className="h-4 w-full bg-black border border-[#E81414]/30 rounded-full overflow-hidden">
                                                <motion.div animate={{ width: `${oppHealth}%` }} className="h-full bg-[#E81414] transition-all"></motion.div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-12 w-full h-24 border border-[#E81414]/20 bg-black/50 rounded-xl p-4 overflow-y-auto space-y-2 relative z-10 flex flex-col-reverse">
                                        {battleLog.map((log, i) => (
                                            <div key={i} className={`text-[10px] font-black tracking-widest uppercase ${i === 0 ? 'text-white' : 'text-white/30'}`}>
                                                &gt; {log}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </HUDCard>
                    </motion.div>
                )}

                {status === 'result' && (
                    <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full max-w-2xl mx-auto">
                        <HUDCard title="COMBAT RESOLVED" tag="END" className="text-center border-white/20" padding="p-6 md:p-10">
                            <div className="py-16 flex flex-col items-center justify-center space-y-8 relative overflow-hidden">
                                <div className={`w-28 h-28 rounded-full border flex items-center justify-center relative z-10 ${myHealth > 0 ? 'border-white bg-white/5 shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'border-[#E81414] bg-[#E81414]/10 shadow-[0_0_30px_rgba(232,20,20,0.4)]'}`}>
                                    {myHealth > 0 ? (
                                        <Trophy className="w-12 h-12 text-white" />
                                    ) : (
                                        <Skull className="w-12 h-12 text-[#E81414]" />
                                    )}
                                </div>
                                
                                <div className="space-y-4 relative z-10">
                                    <h3 className={`text-5xl font-black uppercase tracking-tighter ${myHealth > 0 ? 'text-white' : 'text-[#E81414]'}`}>
                                        {myHealth > 0 ? 'VICTORY' : 'DEFEAT'}
                                    </h3>
                                    <p className="text-xs font-black tracking-[0.3em] text-white/50">
                                        {myHealth > 0 ? '150 GOLD EARNED. PRESTIGE INCREASED.' : 'COMBAT LOG RECORDED. REVIVING IN PIT BASE.'}
                                    </p>
                                </div>
                                
                                <div className="pt-8 relative z-10">
                                    <Button onClick={() => setStatus('lobby')} variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black font-black uppercase tracking-widest text-[10px] px-8 py-4">
                                        RETURN TO PIT
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

export const Trophy = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
);


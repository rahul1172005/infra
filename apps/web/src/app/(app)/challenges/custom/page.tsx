'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Settings, Users, Lock, Hexagon, CheckCircle2 } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { DotGrid } from '@/components/ui/DotGrid';
import { Button } from '@/components/ui/Button';
import { HUDCard } from '@/components/ui/HUDCard';

export default function CustomChallengeArena() {
    const [submitting, setSubmitting] = useState(false);
    const [deployed, setDeployed] = useState(false);
    
    // Form State
    const [designation, setDesignation] = useState('');
    const [xpYield, setXpYield] = useState('500');
    const [clearance, setClearance] = useState('public');
    
    // Feature Flags State
    const [flags, setFlags] = useState({
        customScoring: true,
        houseLock: false,
        privateComms: false
    });

    const handleToggle = (key: keyof typeof flags) => {
        setFlags(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleDeploy = () => {
        if (!designation) return;
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setDeployed(true);
        }, 2000);
    };

    return (
        <div className="w-full pb-20 space-y-8 md:space-y-12 relative overflow-hidden text-white font-mono min-h-screen">
            <DotGrid />

            <div className="flex items-center gap-4 relative z-10">
                <Link href="/challenges">
                    <Button variant="outline" className="p-2 border-white/20 text-white hover:bg-white hover:text-black hover:border-white transition-colors rounded-xl">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div className="px-4 py-1.5 rounded-full border border-white/20 bg-black text-white/50 text-[10px] font-black uppercase tracking-[0.3em]">
                    VARIABLE DIFFICULTY
                </div>
            </div>

            <PageHeader
                tag={deployed ? "TRIAL ONLINE" : "ARENA COMMAND: CUSTOM CONFIGURATION"}
                title={<>FORGE <span className="text-[#E81414]">TRIAL</span></>}
            />

            <AnimatePresence mode="wait">
                {!deployed ? (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                        <HUDCard title="INITIALIZATION" tag="SETUP" className="lg:col-span-2" padding="p-6 md:p-10">
                            <div className="space-y-8">
                                <div>
                                    <p className="text-white/60 text-sm md:text-base leading-relaxed uppercase tracking-widest font-bold mb-6">
                                        ESTABLISH NEW PARAMETERS. FORGE A UNIQUE TRIAL AND RESTRICT IT TO YOUR CLAN OR LEAVE IT OPEN FOR GLOBAL DEPLOYMENT.
                                    </p>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 block mb-3">TRIAL DESIGNATION NAME</label>
                                            <input 
                                                type="text" 
                                                value={designation}
                                                onChange={(e) => setDesignation(e.target.value)}
                                                placeholder="EX: VULCAN PROTOCOL DECODE" 
                                                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-mono uppercase tracking-widest focus:outline-none focus:border-[#E81414] focus:ring-1 focus:ring-[#E81414] transition-all"
                                            />
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 block mb-3">XP YIELD POOL</label>
                                                <select 
                                                    value={xpYield}
                                                    onChange={(e) => setXpYield(e.target.value)}
                                                    className="w-full bg-black border border-white/10 rounded-xl p-4 text-white/80 font-mono uppercase tracking-widest focus:outline-none focus:border-[#E81414] focus:ring-1 focus:ring-[#E81414] cursor-pointer"
                                                >
                                                    <option value="500">500 XP (STANDARD)</option>
                                                    <option value="1500">1500 XP (ADVANCED)</option>
                                                    <option value="3000">3000 XP (EXTREME)</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 block mb-3">ACCESS CLEARANCE</label>
                                                <select 
                                                    value={clearance}
                                                    onChange={(e) => setClearance(e.target.value)}
                                                    className="w-full bg-black border border-white/10 rounded-xl p-4 text-white/80 font-mono uppercase tracking-widest focus:outline-none focus:border-[#E81414] focus:ring-1 focus:ring-[#E81414] cursor-pointer"
                                                >
                                                    <option value="public">PUBLIC OVERSIGHT</option>
                                                    <option value="private">CLAN ONLY</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </HUDCard>

                        <HUDCard title="FEATURE FLAGS" tag="SYS" className="flex flex-col" padding="p-6 md:p-10">
                            <div className="space-y-4 flex-1">
                                <div onClick={() => handleToggle('customScoring')} className={`flex items-center justify-between p-4 cursor-pointer transition-colors border rounded-xl ${flags.customScoring ? 'bg-[#E81414]/10 border-[#E81414]/30' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                                    <div className="flex items-center gap-3">
                                        <Settings className={`w-4 h-4 ${flags.customScoring ? 'text-[#E81414]' : 'text-white/40'}`} />
                                        <span className={`text-xs font-black uppercase tracking-widest ${flags.customScoring ? 'text-white' : 'text-white/60'}`}>CUSTOM SCORING</span>
                                    </div>
                                    <div className={`w-8 h-4 rounded-full relative transition-colors ${flags.customScoring ? 'bg-[#E81414]' : 'bg-white/10'}`}>
                                        <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all ${flags.customScoring ? 'right-0.5 bg-white' : 'left-0.5 bg-white/50'}`}></div>
                                    </div>
                                </div>

                                <div onClick={() => handleToggle('houseLock')} className={`flex items-center justify-between p-4 cursor-pointer transition-colors border rounded-xl ${flags.houseLock ? 'bg-[#E81414]/10 border-[#E81414]/30' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                                    <div className="flex items-center gap-3">
                                        <Users className={`w-4 h-4 ${flags.houseLock ? 'text-[#E81414]' : 'text-white/40'}`} />
                                        <span className={`text-xs font-black uppercase tracking-widest ${flags.houseLock ? 'text-white' : 'text-white/60'}`}>HOUSE LOCK</span>
                                    </div>
                                    <div className={`w-8 h-4 rounded-full relative transition-colors ${flags.houseLock ? 'bg-[#E81414]' : 'bg-white/10'}`}>
                                        <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all ${flags.houseLock ? 'right-0.5 bg-white' : 'left-0.5 bg-white/50'}`}></div>
                                    </div>
                                </div>

                                <div onClick={() => handleToggle('privateComms')} className={`flex items-center justify-between p-4 cursor-pointer transition-colors border rounded-xl ${flags.privateComms ? 'bg-[#E81414]/10 border-[#E81414]/30' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                                    <div className="flex items-center gap-3">
                                        <Lock className={`w-4 h-4 ${flags.privateComms ? 'text-[#E81414]' : 'text-white/40'}`} />
                                        <span className={`text-xs font-black uppercase tracking-widest ${flags.privateComms ? 'text-white' : 'text-white/60'}`}>PRIVATE COMMS</span>
                                    </div>
                                    <div className={`w-8 h-4 rounded-full relative transition-colors ${flags.privateComms ? 'bg-[#E81414]' : 'bg-white/10'}`}>
                                        <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all ${flags.privateComms ? 'right-0.5 bg-white' : 'left-0.5 bg-white/50'}`}></div>
                                    </div>
                                </div>
                            </div>

                            <Button onClick={handleDeploy} disabled={!designation || submitting} variant="primary" fullWidth className={`mt-8 py-5 text-xs font-black tracking-[0.4em] ${designation ? 'bg-[#E81414] hover:bg-white hover:text-black hover:border-white border-[#E81414]' : 'bg-white/5 text-white/20 cursor-not-allowed border-transparent'}`}>
                                {submitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white animate-spin rounded-full border-t-transparent"></span> WRITING MATRIX...
                                    </span>
                                ) : 'FORGE INITIATIVE'}
                            </Button>
                        </HUDCard>
                    </motion.div>
                ) : (
                    <motion.div key="deployed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full mx-auto space-y-6">
                        <HUDCard title="DEPLOYMENT LOG" tag="SUCCESS" className="border-[#E81414]/30 bg-black/60 shadow-[0_0_40px_rgba(232,20,20,0.1)]" padding="p-6 md:p-10">
                            <div className="py-12 flex flex-col items-center justify-center text-center">
                                <div className="mb-8 relative">
                                    <div className="absolute inset-0 bg-[#E81414]/20 blur-xl rounded-full animate-pulse"></div>
                                    <Hexagon className="w-32 h-32 text-[#E81414] opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow" />
                                    <CheckCircle2 className="w-20 h-20 text-[#E81414] relative z-10" />
                                </div>
                                
                                <h3 className="text-3xl font-black uppercase tracking-widest text-white mb-4">
                                    {designation}
                                </h3>
                                <div className="inline-flex gap-3 mb-8">
                                    <span className="px-3 py-1 bg-white/5 border border-white/10 text-white/50 text-[10px] font-black uppercase tracking-widest rounded-md">
                                        {xpYield} XP
                                    </span>
                                    <span className="px-3 py-1 bg-white/5 border border-white/10 text-white/50 text-[10px] font-black uppercase tracking-widest rounded-md">
                                        {clearance}
                                    </span>
                                    <span className="px-3 py-1 bg-[#E81414]/10 border border-[#E81414]/30 text-[#E81414] text-[10px] font-black uppercase tracking-widest rounded-md">
                                        STATUS: ACTIVE
                                    </span>
                                </div>
                                
                                <p className="max-w-md mx-auto text-xs font-bold leading-relaxed tracking-[0.2em] text-white/40 mb-10 uppercase">
                                    The trial parameters have been securely stored in the oversight matrix. Operatives can now interface with this challenge protocol.
                                </p>
                                
                                <div className="flex gap-4">
                                    <Button onClick={() => { setDeployed(false); setDesignation(''); }} variant="outline" className="border-white/20 text-white hover:bg-white/10 font-black uppercase tracking-widest text-[10px] px-8 py-3">
                                        FORGE ANOTHER
                                    </Button>
                                    <Link href="/challenges">
                                        <Button className="bg-[#E81414] text-white hover:bg-white hover:text-black font-black uppercase tracking-widest text-[10px] px-8 py-3">
                                            CMD CENTER
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

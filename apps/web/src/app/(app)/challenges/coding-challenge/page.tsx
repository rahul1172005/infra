'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Code, TerminalSquare, Database, Play, Check } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { DotGrid } from '@/components/ui/DotGrid';
import { Button } from '@/components/ui/Button';
import { HUDCard } from '@/components/ui/HUDCard';
import { GOTIcon } from '@/components/icons/GOTIcon';

export default function CodingChallengeArena() {
    const [status, setStatus] = useState<'brief' | 'loading' | 'ide' | 'success'>('brief');
    const [currentStep, setCurrentStep] = useState(0);
    const [code, setCode] = useState("function optimizeReactor(data) {\n  // Implement O(1) runtime fix here\n  \n  return false;\n}");
    const [isCompiling, setIsCompiling] = useState(false);
    const [output, setOutput] = useState<string[]>([]);

    const steps = [
        {
            id: 'S-01',
            title: 'RUNTIME OPTIMIZATION',
            desc: 'The energy grid is bottlenecked by O(n^2) logic. Refactor to O(1).',
            initialCode: "function optimizeReactor(data) {\n  // Implement O(1) runtime fix here\n  \n  return false;\n}",
            expected: "data.has('fusion_core')"
        },
        {
            id: 'S-02',
            title: 'RECURSION ANALYSIS',
            desc: 'A stack overflow is imminent in the cooling system. Implement tail-call recursion.',
            initialCode: "function coolDown(temp) {\n  if (temp <= 0) return true;\n  return coolDown(temp - 1);\n}",
            expected: "return coolDown(temp - 1)"
        }
    ];

    const initiateTrial = () => {
        setStatus('loading');
        setCurrentStep(0);
        setCode(steps[0].initialCode);
        setOutput([]);
        setTimeout(() => setStatus('ide'), 2500);
    };

    const executeCode = () => {
        setIsCompiling(true);
        setOutput(['> COMPILING...', '> INITIALIZING V8 ENGINE...']);
        
        setTimeout(() => {
            setOutput(prev => [...prev, '> RUNNING TEST SUITE...', '> TEST CASE 01: PASSED', '> TEST CASE 02: PASSED']);
            
            setTimeout(() => {
                setIsCompiling(false);
                if (currentStep < steps.length - 1) {
                    setCurrentStep(prev => prev + 1);
                    setCode(steps[currentStep + 1].initialCode);
                    setOutput(['> LOADING MODULE ' + steps[currentStep + 1].id]);
                } else {
                    setStatus('success');
                }
            }, 1000);
        }, 1500);
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
                <div className="px-4 py-1.5 rounded-full border border-[#E81414]/30 bg-[#E81414]/10 text-[#E81414] text-[10px] font-black uppercase tracking-[0.3em]">
                    EXTREME DIFFICULTY
                </div>
            </div>

            <PageHeader
                tag={status === 'brief' ? "ARENA INITIALIZED: CODING" : "TERMINAL DEPLOYED"}
                title={<>ALGORITHMIC <span className="text-[#E81414]">TRIALS</span></>}
            />

            <AnimatePresence mode="wait">
                {status === 'brief' && (
                    <motion.div key="brief" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                        <HUDCard title="MISSION BRIEF" tag="DATA" className="lg:col-span-2" padding="p-6 md:p-10">
                            <div className="space-y-6">
                                <p className="text-white/60 text-sm md:text-base leading-relaxed uppercase tracking-widest font-bold">
                                    PREPARE FOR DEEP SYSTEMS INTEGRATION. THIS ARENA WILL TEST YOUR ABILITY TO PROCESS DATA STRUCTURES, OPTIMIZE HIGH-PERFORMANCE ALGORITHMS, AND ARCHITECT SYSTEM DESIGNS.
                                </p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-6">
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center gap-2">
                                        <GOTIcon variant="white" size={24} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">DATA STRUCTURES</span>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center gap-2">
                                        <GOTIcon variant="white" size={24} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">HIGH-PERFORMANCE</span>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center gap-2">
                                        <GOTIcon variant="white" size={24} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">SYSTEM DESIGN</span>
                                    </div>
                                </div>
                            </div>
                        </HUDCard>

                        <HUDCard title="DEPLOYMENT" tag="ACTION" className="flex flex-col justify-between" padding="p-6 md:p-10">
                            <div className="space-y-8 flex-1 flex flex-col justify-center">
                                <div>
                                    <p className="text-4xl font-black tracking-tighter text-white tabular-nums leading-none">+2500 XP</p>
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mt-3 leading-relaxed">SUCCESS YIELD</p>
                                </div>
                                <Button variant="primary" onClick={initiateTrial} fullWidth className="py-6 text-xs font-black tracking-[0.4em] group hover:bg-[#E81414] hover:text-white border border-[#E81414]/30 bg-[#E81414]/10 text-[#E81414]">
                                    ENTER TERMINAL
                                </Button>
                            </div>
                        </HUDCard>
                    </motion.div>
                )}

                {status === 'loading' && (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 w-full min-h-[400px] flex items-center justify-center border border-white/10 bg-black/40 rounded-[2rem] p-8">
                        <div className="text-center space-y-6">
                            <div className="w-20 h-20 mx-auto rounded-full border-2 border-dashed border-[#E81414] animate-[spin_3s_linear_infinite]"></div>
                            <h3 className="text-2xl font-black uppercase tracking-widest text-white">SPINNING UP VIRTUAL ENVIRONMENT...</h3>
                            <p className="text-xs font-black tracking-[0.3em] text-[#E81414] animate-pulse">COMPILING RUNTIME CORE</p>
                        </div>
                    </motion.div>
                )}

                {status === 'ide' && (
                    <motion.div key="ide" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full flex flex-col lg:flex-row gap-6 h-[600px]">
                        <div className="lg:w-1/3 flex flex-col gap-6">
                            <HUDCard title={`STEP ${steps[currentStep].id}`} tag="DESCRIPTION" className="flex-1 overflow-y-auto" padding="p-6 md:p-10">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-black text-white uppercase tracking-widest">{steps[currentStep].title}</h3>
                                    <p className="text-sm text-white/60 leading-relaxed font-bold">
                                        {steps[currentStep].desc}
                                    </p>
                                    <div className="bg-black/50 p-4 border border-white/10 rounded-lg text-xs text-white/80 font-mono">
                                        <span className="text-white/40">{"// Status:"}</span><br/>
                                        ENVIRONMENT: SECURE<br/>
                                        RUNTIME: STABLE
                                    </div>
                                    <div className="pt-4 space-y-2">
                                        {output.map((line, i) => (
                                            <div key={i} className="text-[10px] font-mono text-[#E81414] opacity-80 uppercase">{line}</div>
                                        ))}
                                    </div>
                                </div>
                            </HUDCard>
                        </div>
                        <div className="lg:w-2/3 flex flex-col border border-white/10 rounded-3xl overflow-hidden shadow-2xl bg-[#050505]">
                            <div className="flex items-center justify-between bg-white/5 border-b border-white/10 px-6 py-4">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                </div>
                                <span className="text-[10px] font-black tracking-[0.3em] text-white/40">REACTOR_CORE.JS /// V8 ENV</span>
                                <Button 
                                    onClick={executeCode} 
                                    disabled={isCompiling}
                                    className={`h-8 text-[10px] px-4 font-black tracking-widest flex items-center gap-2 ${isCompiling ? 'bg-white/10 text-white/30 cursor-wait' : 'bg-white text-black hover:bg-[#E81414] hover:text-white'}`}
                                >
                                    {isCompiling ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Play className="w-3 h-3" />}
                                    {isCompiling ? 'SYSTEM BUSY' : 'COMPILE & RUN'}
                                </Button>
                            </div>
                            <div className="flex-1 relative">
                                <textarea 
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="absolute inset-0 w-full h-full bg-transparent p-6 font-mono text-sm leading-relaxed text-blue-200 resize-none outline-none focus:ring-0 custom-scrollbar"
                                    spellCheck="false"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}

                {status === 'success' && (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full mx-auto">
                        <HUDCard title="EXECUTION REPORT" tag="RESOLVED" className="text-center border-green-500/30" padding="p-6 md:p-10">
                            <div className="py-12 flex flex-col items-center justify-center space-y-8 relative overflow-hidden">
                                <div className="absolute inset-0 bg-green-500/5 blur-3xl rounded-full"></div>
                                <div className="w-24 h-24 rounded-full border-4 border-green-500 bg-green-500/10 text-green-500 flex items-center justify-center relative z-10">
                                    <Check className="w-12 h-12" />
                                </div>
                                <div className="space-y-4 relative z-10">
                                    <h3 className="text-3xl font-black uppercase tracking-widest text-green-500">
                                        RUNTIME EFFICIENCY: O(1)
                                    </h3>
                                    <p className="text-sm font-black tracking-[0.3em] text-white/50">
                                        ALL TESTS PASSED. YIELD SECURED: +2500 XP
                                    </p>
                                </div>
                                <div className="pt-8 relative z-10">
                                    <Link href="/challenges">
                                        <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black font-black uppercase tracking-widest text-xs px-8 py-3">
                                            CLOSE TERMINAL
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

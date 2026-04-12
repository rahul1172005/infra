'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Cloud, Server, Box, Terminal as TerminalIcon, CheckSquare, Square, CheckCircle } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { DotGrid } from '@/components/ui/DotGrid';
import { Button } from '@/components/ui/Button';
import { HUDCard } from '@/components/ui/HUDCard';
import { GOTIcon } from '@/components/icons/GOTIcon';

export default function TechQuizArena() {
    const [status, setStatus] = useState<'brief' | 'loading' | 'active' | 'success'>('brief');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [score, setScore] = useState(0);

    const questions = [
        {
            title: "SCALABILITY ARCHITECTURE",
            text: "IDENTIFY THE DATABASE STRUCTURE OPTIMIZED FOR HORIZONTAL SCALING ACROSS MULTIPLE CLOUD REGIONS WHILE MAINTAINING STRONG CONSISTENCY.",
            options: [
                "STANDARD RELATIONAL (RDBMS)",
                "DISTRIBUTED SQL (NEW SQL)",
                "GRAPH DATABASE",
                "ON-PREMISE MONOLITHIC DB"
            ],
            correct: 1
        },
        {
            title: "PIPELINE AUTOMATION",
            text: "WHICH CI/CD STRATEGY ENSURES ZERO-DOWNTIME DEPLOYMENT BY ROUTING TRAFFIC BETWEEN TWO IDENTICAL PRODUCTION ENVIRONMENTS?",
            options: [
                "BLUE-GREEN DEPLOYMENT",
                "CANARY RELEASE",
                "ROLLING UPDATE",
                "RECREATE STRATEGY"
            ],
            correct: 0
        }
    ];

    const initiateTrial = () => {
        setStatus('loading');
        setCurrentQuestion(0);
        setSelectedOption(null);
        setScore(0);
        setTimeout(() => setStatus('active'), 2000);
    };

    const verifyAnswer = () => {
        if (selectedOption === null) return;
        
        if (selectedOption === questions[currentQuestion].correct) {
            setScore(prev => prev + 250);
        }

        if (currentQuestion < questions.length - 1) {
            setStatus('loading');
            setTimeout(() => {
                setCurrentQuestion(prev => prev + 1);
                setSelectedOption(null);
                setStatus('active');
            }, 1000);
        } else {
            setStatus('loading');
            setTimeout(() => setStatus('success'), 1500);
        }
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
                <div className="px-4 py-1.5 rounded-full border border-white/30 bg-white/5 text-white/80 text-[10px] font-black uppercase tracking-[0.3em]">
                    MEDIUM DIFFICULTY
                </div>
            </div>

            <PageHeader
                tag={status === 'brief' ? "ARENA INITIALIZED: INFRASTRUCTURE" : "TERMINAL UPLINK ESTABLISHED"}
                title={<>TECH <span className="text-[#E81414]">QUIZ</span></>}
            />

            <AnimatePresence mode="wait">
                {status === 'brief' && (
                    <motion.div key="brief" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                        <HUDCard title="KNOWLEDGE BASE" tag="LORE" className="lg:col-span-2" padding="p-6 md:p-10">
                            <div className="space-y-6">
                                <p className="text-white/60 text-sm md:text-base leading-relaxed uppercase tracking-widest font-bold">
                                    ACCESS THE ARCHIVES OF TECHNOLOGY. PROVE YOUR SKILLS IN CLOUD MECHANICS, PIPELINE AUTOMATION, AND DATABASE OPTIMIZATION TACTICS.
                                </p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-6">
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center gap-2 items-center">
                                        <GOTIcon variant="white" size={24} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">CLOUD LORE</span>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center gap-2 items-center">
                                        <GOTIcon variant="white" size={24} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">PIPELINES</span>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center gap-2 items-center">
                                        <GOTIcon variant="white" size={24} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">DATABASES</span>
                                    </div>
                                </div>
                            </div>
                        </HUDCard>

                        <HUDCard title="EXECUTION" tag="YIELD" className="flex flex-col justify-between" padding="p-6 md:p-10">
                            <div className="space-y-8 flex-1 flex flex-col justify-center">
                                <div>
                                    <p className="text-4xl font-black tracking-tighter text-white tabular-nums leading-none">500HONOR</p>
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mt-3 leading-relaxed">SUCCESS YIELD</p>
                                </div>
                                <Button variant="outline" onClick={initiateTrial} fullWidth className="py-6 text-xs font-black tracking-[0.4em] group hover:bg-white hover:text-black border border-white/20 text-white">
                                    OPEN TERMINAL
                                </Button>
                            </div>
                        </HUDCard>
                    </motion.div>
                )}

                {status === 'loading' && (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 w-full min-h-[400px] flex items-center justify-center border border-white/10 bg-black/40 rounded-[2rem] p-8">
                        <div className="text-center space-y-6">
                            <div className="w-20 h-20 mx-auto border-y-2 border-[#E81414] animate-spin rounded-full shadow-[0_0_20px_rgba(232,20,20,0.4)]"></div>
                            <h3 className="text-2xl font-black uppercase tracking-widest text-white">QUERYING CLUSTER ARCHIVES...</h3>
                            <p className="text-xs font-black tracking-[0.3em] text-[#E81414] animate-pulse">FETCHING TECHNICAL METRICS</p>
                        </div>
                    </motion.div>
                )}

                {status === 'active' && (
                    <motion.div key="active" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full mx-auto space-y-6">
                        <HUDCard title={`QUERY: ${questions[currentQuestion].title}`} tag={`ARCHIVE 0${currentQuestion + 1}`} className="w-full bg-[#050505]" padding="p-6 md:p-10">
                            <div className="space-y-10">
                                <div className="p-6 bg-white/5 border border-white/10 rounded-xl relative overflow-hidden">
                                     <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E81414]"></div>
                                     <p className="text-lg md:text-xl font-black leading-relaxed tracking-widest text-white ml-2 uppercase">
                                         {questions[currentQuestion].text}
                                     </p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {questions[currentQuestion].options.map((opt, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedOption(idx)}
                                            className={`w-full text-left p-6 flex flex-col gap-4 rounded-xl border transition-all duration-300
                                                ${selectedOption === idx 
                                                    ? 'bg-[#E81414]/10 border-[#E81414] text-white shadow-[0_0_15px_rgba(232,20,20,0.15)]' 
                                                    : 'bg-black/50 border-white/10 text-white/60 hover:border-white/30 hover:bg-white/5 hover:text-white'}`}
                                        >
                                            <div className="flex justify-between items-center w-full">
                                                <span className="text-[10px] font-black tracking-[0.4em] opacity-50">NODE 0{idx + 1}</span>
                                                {selectedOption === idx ? <CheckSquare className="w-5 h-5 text-[#E81414]" /> : <Square className="w-5 h-5 opacity-40" />}
                                            </div>
                                            <span className="text-sm md:text-md font-bold tracking-widest uppercase">{opt}</span>
                                        </button>
                                    ))}
                                </div>

                                <div className="pt-8 flex justify-end">
                                    <Button 
                                        onClick={verifyAnswer} 
                                        disabled={selectedOption === null}
                                        className={`py-4 px-12 text-[10px] font-black tracking-[0.4em] border flex items-center gap-3 ${selectedOption !== null ? 'bg-white text-black hover:bg-[#E81414] hover:text-white border-white hover:border-[#E81414]' : 'bg-transparent text-white/30 border-white/10 cursor-not-allowed'}`}
                                    >
                                        <TerminalIcon className="w-4 h-4" /> VERIFY CONFIGURATION
                                    </Button>
                                </div>
                            </div>
                        </HUDCard>
                    </motion.div>
                )}

                {status === 'success' && (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full mx-auto">
                        <HUDCard title="CLUSTER VALIDATED" tag="APPROVED" className="text-center font-mono" padding="p-6 md:p-10">
                            <div className="py-12 flex flex-col items-center justify-center space-y-8 relative overflow-hidden">
                                <div className="w-24 h-24 rounded-full border border-white/20 bg-white/5 flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                    <CheckCircle className="w-10 h-10 text-white" />
                                </div>
                                <div className="space-y-4 relative z-10">
                                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white">
                                        INFRASTRUCTURE OPTIMIZED
                                    </h3>
                                    <p className="text-xs font-black tracking-[0.3em] text-[#E81414]">
                                        TOTAL YIELD: {score} HONOR SECURED.
                                    </p>
                                </div>
                                <div className="pt-8 relative z-10">
                                    <Link href="/challenges">
                                        <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black font-black uppercase tracking-widest text-[#E81414] text-[10px] px-8 py-4">
                                            CLOSE UPLINK
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

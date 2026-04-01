'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Brain, Cpu, Network, Check, X } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { DotGrid } from '@/components/ui/DotGrid';
import { Button } from '@/components/ui/Button';
import { HUDCard } from '@/components/ui/HUDCard';
import { GOTIcon } from '@/components/icons/GOTIcon';

export default function AIQuizArena() {
    const [status, setStatus] = useState<'brief' | 'loading' | 'active' | 'result'>('brief');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [answers, setAnswers] = useState<number[]>([]);
    const [score, setScore] = useState(0);

    const questions = [
        {
            text: "WHICH ARCHITECTURE INTRODUCED THE 'ATTENTION MECHANISM' AND INITIATED THE MODERN LLM REVOLUTION?",
            options: [
                "GENERATIVE ADVERSARIAL NETWORKS (GAN)",
                "LONG SHORT-TERM MEMORY (LSTM)",
                "TRANSFORMER ARCHITECTURE",
                "RECURRENT NEURAL NETWORKS (RNN)"
            ],
            correct: 2
        },
        {
            text: "WHAT IS THE PRIMARY PURPOSE OF 'RLHF' IN LLM TRAINING?",
            options: [
                "REDUCING HARDWARE FRICTION",
                "ALIGNING MODEL OUTPUTS WITH HUMAN PREFERENCES",
                "RECURSIVE LOSS HIERARCHY FILTRATION",
                "RANDOM LATENT HEURISTIC FORMATTING"
            ],
            correct: 1
        },
        {
            text: "WHICH TECHNIQUE IS MOST EFFECTIVE FOR REDUCING LLM HALLUCINATIONS BY RETRIEVING EXTERNAL DATA?",
            options: [
                "PARAMETER PRUNING",
                "RAG (RETRIEVAL-AUGMENTED GENERATION)",
                "LOW-RANK ADAPTATION (LORA)",
                "QUANTIZATION"
            ],
            correct: 1
        }
    ];

    const initiateTrial = () => {
        setStatus('loading');
        setCurrentQuestion(0);
        setAnswers([]);
        setScore(0);
        setTimeout(() => setStatus('active'), 2000);
    };

    const submitAnswer = () => {
        if (selectedOption === null) return;
        
        const newAnswers = [...answers, selectedOption];
        setAnswers(newAnswers);
        
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedOption(null);
        } else {
            // Calculate final score
            let correctCount = 0;
            newAnswers.forEach((ans, idx) => {
                if (ans === questions[idx].correct) correctCount++;
            });
            const finalScore = Math.round((correctCount / questions.length) * 1000);
            setScore(finalScore);
            setStatus('result');
        }
    };

    const question = questions[currentQuestion];

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
                    HARD DIFFICULTY
                </div>
            </div>

            <PageHeader
                tag={status === 'brief' ? "ARENA INITIALIZED: AI QUIZ" : "ACTIVE DEPLOYMENT"}
                title={<>NEURAL <span className="text-[#E81414]">NETWORKS</span></>}
            />

            <AnimatePresence mode="wait">
                {status === 'brief' && (
                    <motion.div key="brief" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                        <HUDCard title="ARENA PARAMETERS" tag="CONFIG" className="lg:col-span-2" padding="p-6 md:p-10">
                            <div className="space-y-6">
                                <p className="text-white/60 text-sm md:text-base leading-relaxed uppercase tracking-widest font-bold">
                                    YOU ARE ABOUT TO ENTER THE AI QUIZ ARENA. THIS TRIAL WILL TEST YOUR KNOWLEDGE ON LARGE LANGUAGE MODEL ARCHITECTURES, NEURAL NETWORKS, AND AI ETHICS SCENARIOS.
                                </p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-6">
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center gap-2">
                                        <GOTIcon variant="white" size={24} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">LLM ARCHITECTURES</span>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center gap-2">
                                        <GOTIcon variant="white" size={24} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">NEURAL NETWORKS</span>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center gap-2">
                                        <GOTIcon variant="white" size={24} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">ETHICS SCENARIOS</span>
                                    </div>
                                </div>
                            </div>
                        </HUDCard>

                        <HUDCard title="DEPLOYMENT" tag="ACTION" className="flex flex-col justify-between" padding="p-6 md:p-10">
                            <div className="space-y-8 flex-1 flex flex-col justify-center">
                                <div>
                                    <p className="text-4xl font-black tracking-tighter text-white tabular-nums leading-none">+1000 XP</p>
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mt-3 leading-relaxed">SUCCESS YIELD</p>
                                </div>
                                <Button variant="primary" onClick={initiateTrial} fullWidth className="py-6 text-xs font-black tracking-[0.4em] group hover:bg-[#E81414] hover:text-white border border-[#E81414]/30 bg-[#E81414]/10 text-[#E81414]">
                                    INITIATE TRIAL
                                </Button>
                            </div>
                        </HUDCard>
                    </motion.div>
                )}

                {status === 'loading' && (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 w-full min-h-[400px] flex items-center justify-center border border-white/10 bg-black/40 rounded-[2rem] p-8">
                        <div className="text-center space-y-6">
                            <div className="w-20 h-20 mx-auto rounded-full border-2 border-[#E81414] border-t-transparent animate-spin"></div>
                            <h3 className="text-2xl font-black uppercase tracking-widest text-white">CALIBRATING NEURAL LINK...</h3>
                            <p className="text-xs font-black tracking-[0.3em] text-[#E81414] animate-pulse">ESTABLISHING SYNAPSE PROTOCOL</p>
                        </div>
                    </motion.div>
                )}

                {status === 'active' && (
                    <motion.div key="active" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 w-full mx-auto space-y-6">
                        <HUDCard title={`QUESTION ${String(currentQuestion + 1).padStart(2, '0')}/${String(questions.length).padStart(2, '0')}`} tag="ACTIVE" className="w-full" padding="p-6 md:p-10">
                            <div className="space-y-8">
                                <h2 className="text-xl md:text-3xl font-black leading-relaxed tracking-tight text-white">
                                    {question.text}
                                </h2>
                                
                                <div className="space-y-4">
                                    {question.options.map((opt, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedOption(idx)}
                                            className={`w-full text-left p-6 flex items-center justify-between rounded-xl border transition-all duration-300
                                                ${selectedOption === idx 
                                                    ? 'bg-[#E81414]/20 border-[#E81414] text-white' 
                                                    : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30 hover:bg-white/10'}`}
                                        >
                                            <span className="text-sm md:text-base font-black tracking-widest uppercase">{opt}</span>
                                            {selectedOption === idx && <div className="w-3 h-3 bg-[#E81414] rounded-full shadow-[0_0_10px_rgba(232,20,20,0.8)]" />}
                                        </button>
                                    ))}
                                </div>

                                <div className="pt-8 border-t border-white/10 flex justify-end">
                                    <Button 
                                        onClick={submitAnswer} 
                                        disabled={selectedOption === null}
                                        className={`py-4 px-12 text-xs font-black tracking-[0.4em] ${selectedOption !== null ? 'bg-[#E81414] text-white hover:bg-white hover:text-black border border-transparent' : 'bg-white/5 text-white/30 border border-white/10 cursor-not-allowed'}`}
                                    >
                                        {currentQuestion < questions.length - 1 ? 'NEXT CALCULATION' : 'FINALIZE CALCULATION'}
                                    </Button>
                                </div>
                            </div>
                        </HUDCard>
                    </motion.div>
                )}

                {status === 'result' && (
                    <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full mx-auto">
                        <HUDCard title="TRIAL REPORT" tag="COMPLETED" className="text-center" padding="p-6 md:p-10">
                            <div className="py-12 flex flex-col items-center justify-center space-y-8 relative overflow-hidden">
                                <div className="absolute inset-0 bg-[#E81414]/5 blur-3xl rounded-full"></div>
                                <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center relative z-10 ${score > 0 ? 'border-green-500 bg-green-500/10 text-green-500' : 'border-[#E81414] bg-[#E81414]/10 text-[#E81414]'}`}>
                                    {score > 0 ? <Check className="w-12 h-12" /> : <X className="w-12 h-12" />}
                                </div>
                                <div className="space-y-4 relative z-10">
                                    <h3 className="text-3xl font-black uppercase tracking-widest text-white">
                                        {score > 0 ? 'SYNAPSE VERIFIED' : 'NEURAL MISMATCH'}
                                    </h3>
                                    <p className="text-sm font-black tracking-[0.3em] text-white/50">
                                        {score > 0 ? `YIELD SECURED: +${score} XP` : 'YIELD: 0 XP. REVIEW REQUIRED.'}
                                    </p>
                                </div>
                                <div className="pt-8 relative z-10">
                                    <Link href="/challenges">
                                        <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black font-black uppercase tracking-widest text-xs px-8 py-3">
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

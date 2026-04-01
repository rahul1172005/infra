'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Monitor, MousePointerClick, LayoutTemplate, Layers, Palette, Eye, Check } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { DotGrid } from '@/components/ui/DotGrid';
import { Button } from '@/components/ui/Button';
import { HUDCard } from '@/components/ui/HUDCard';
import { GOTIcon } from '@/components/icons/GOTIcon';

export default function UIUXArena() {
    const [status, setStatus] = useState<'brief' | 'loading' | 'canvas' | 'review'>('brief');
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedElement, setSelectedElement] = useState<number | null>(null);
    const [designScore, setDesignScore] = useState(0);

    const steps = [
        {
            id: 'UX-01',
            title: 'HIERARCHY VALIDATION',
            goal: 'Select the primary CTA to check contrast ratios.',
            target: 1
        },
        {
            id: 'UX-02',
            title: 'INTERACTION FLOW',
            goal: 'Tap the secondary action item to verify touch target size.',
            target: 2
        }
    ];

    const initiateTrial = () => {
        setStatus('loading');
        setCurrentStep(0);
        setSelectedElement(null);
        setTimeout(() => setStatus('canvas'), 2000);
    };

    const handleElementClick = (id: number) => {
        setSelectedElement(id);
        if (id === steps[currentStep].target) {
            setDesignScore(prev => prev + 50);
            if (currentStep < steps.length - 1) {
                setTimeout(() => {
                    setCurrentStep(prev => prev + 1);
                    setSelectedElement(null);
                }, 1000);
            } else {
                setTimeout(() => setStatus('review'), 1500);
            }
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
                tag={status === 'brief' ? "ARENA INITIALIZED: UI/UX" : "WORKSPACE ACTIVE"}
                title={<>DESIGN <span className="text-[#E81414]">SYSTEMS</span></>}
            />

            <AnimatePresence mode="wait">
                {status === 'brief' && (
                    <motion.div key="brief" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                        <HUDCard title="DESIGN BRIEF" tag="SPECS" className="lg:col-span-2" padding="p-6 md:p-10">
                            <div className="space-y-6">
                                <p className="text-white/60 text-sm md:text-base leading-relaxed uppercase tracking-widest font-bold">
                                    WELCOME TO THE CREATIVE FORGE. YOUR TASK IS TO CRAFT HIGH-FIDELITY MOCKUPS, ENSURE ACCESSIBILITY COMPLIANCE, AND OPTIMIZE INTERACTION FLOWS.
                                </p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-6">
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center gap-2">
                                        <GOTIcon variant="white" size={24} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">WIREFRAMING</span>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center gap-2">
                                        <GOTIcon variant="white" size={24} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">ACCESSIBILITY</span>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center gap-2">
                                        <GOTIcon variant="white" size={24} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">INTERACTION</span>
                                    </div>
                                </div>
                            </div>
                        </HUDCard>

                        <HUDCard title="REWARD POOL" tag="YIELD" className="flex flex-col justify-between" padding="p-6 md:p-10">
                            <div className="space-y-8 flex-1 flex flex-col justify-center">
                                <div>
                                    <p className="text-4xl font-black tracking-tighter text-white tabular-nums leading-none">+800 XP</p>
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mt-3 leading-relaxed">SUCCESS YIELD</p>
                                </div>
                                <Button variant="outline" onClick={initiateTrial} fullWidth className="py-6 text-xs font-black tracking-[0.4em] group hover:bg-white hover:text-black border border-white/20 text-white">
                                    LAUNCH CANVAS
                                </Button>
                            </div>
                        </HUDCard>
                    </motion.div>
                )}

                {status === 'loading' && (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 w-full min-h-[400px] flex items-center justify-center border border-white/10 bg-black/40 rounded-[2rem] p-8">
                        <div className="text-center space-y-6">
                            <div className="w-16 h-16 mx-auto grid grid-cols-2 gap-1 animate-pulse">
                                <div className="bg-white/50 rounded-tl-lg"></div>
                                <div className="bg-white rounded-tr-lg"></div>
                                <div className="bg-[#E81414] rounded-bl-lg"></div>
                                <div className="bg-white/20 rounded-br-lg"></div>
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-widest text-white">ASSEMBLING DESIGN TOKENS...</h3>
                            <p className="text-xs font-black tracking-[0.3em] text-white/40">LOADING COMPONENT LIBRARY</p>
                        </div>
                    </motion.div>
                )}

                {status === 'canvas' && (
                    <motion.div key="canvas" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full h-[600px] flex gap-4">
                        {/* Toolbox */}
                        <div className="w-16 md:w-20 lg:w-80 bg-black/50 border border-white/10 rounded-2xl flex flex-col p-6 shadow-xl space-y-6">
                            <div className="space-y-2">
                                <h4 className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">ACTIVE PROTOCOL</h4>
                                <div className="p-4 bg-[#E81414]/10 border border-[#E81414]/20 rounded-xl">
                                    <div className="text-[10px] font-black text-[#E81414] mb-1">{steps[currentStep].id}</div>
                                    <div className="text-xs font-bold text-white leading-tight uppercase tracking-widest">{steps[currentStep].title}</div>
                                    <p className="text-[10px] text-white/50 mt-2 font-mono leading-relaxed">{steps[currentStep].goal}</p>
                                </div>
                            </div>

                            <div className="flex-1 space-y-4">
                                <h4 className="hidden lg:block text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">Design Tokens</h4>
                                <div className="flex flex-col gap-3">
                                    <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center lg:justify-start gap-4 transition-colors">
                                        <LayoutTemplate className="w-5 h-5 text-white/80" />
                                        <span className="hidden lg:block text-xs font-black tracking-widest text-white/80 uppercase">LAYOUT_SYSTEM</span>
                                    </button>
                                    <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center lg:justify-start gap-4 transition-colors">
                                        <Palette className="w-5 h-5 text-white/80" />
                                        <span className="hidden lg:block text-xs font-black tracking-widest text-white/80 uppercase">COLOR_PALETTE</span>
                                    </button>
                                    <div className="pt-4 border-t border-white/10">
                                        <div className="text-[10px] font-black tracking-widest text-white/30 uppercase mb-2">PRECISION SCORE</div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div 
                                                className="h-full bg-[#E81414]" 
                                                animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Canvas Mock */}
                        <div className="flex-1 bg-neutral-900 border border-white/10 rounded-2xl relative overflow-hidden bg-[url('https://transparenttextures.com/patterns/cubes.png')] flex items-center justify-center p-8">
                            <div className="w-full max-w-sm aspect-[9/16] bg-black border border-white/20 rounded-[2rem] p-6 shadow-2xl relative">
                                {/* Header mock */}
                                <div className="w-full h-12 bg-white/10 rounded-xl mb-8 animate-pulse"></div>
                                
                                {/* Hero Card mock */}
                                <div 
                                    onClick={() => handleElementClick(1)}
                                    className={`w-full h-48 rounded-xl mb-6 transition-all cursor-pointer relative group overflow-hidden ${selectedElement === 1 ? 'border-2 border-[#E81414] bg-[#E81414]/10 shadow-[0_0_20px_rgba(232,20,20,0.2)]' : 'border border-white/20 bg-white/5 hover:border-white/40'}`}
                                >
                                    {selectedElement === 1 && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-2 right-2 p-1 bg-[#E81414] rounded-full">
                                            <Check className="w-3 h-3 text-white" />
                                        </motion.div>
                                    )}
                                </div>

                                {/* List mocks */}
                                <div className="space-y-4">
                                    <div 
                                        onClick={() => handleElementClick(2)}
                                        className={`w-full h-16 rounded-xl transition-all cursor-pointer relative ${selectedElement === 2 ? 'border-2 border-[#E81414] bg-[#E81414]/10 shadow-[0_0_20px_rgba(232,20,20,0.2)]' : 'border border-white/10 bg-white/5 hover:border-white/30'}`}
                                    >
                                        {selectedElement === 2 && (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-2 right-2 p-1 bg-[#E81414] rounded-full">
                                                <Check className="w-3 h-3 text-white" />
                                            </motion.div>
                                        )}
                                    </div>
                                    <div className="w-full h-16 rounded-xl border border-white/10 bg-white/5"></div>
                                    <div className="w-full h-16 rounded-xl border border-white/10 bg-white/5"></div>
                                </div>

                                {/* Floating Action Button mock */}
                                <div className="absolute bottom-6 right-6 w-14 h-14 bg-[#E81414] rounded-full shadow-[0_0_20px_rgba(232,20,20,0.5)] flex items-center justify-center">
                                    <div className="w-6 h-6 border-t-2 border-r-2 border-white rounded-tr-md"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {status === 'review' && (
                    <motion.div key="review" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full mx-auto">
                        <HUDCard title="DESIGN QA PASSED" tag="APPROVED" className="text-center" padding="p-6 md:p-10">
                            <div className="py-12 flex flex-col items-center justify-center space-y-8 relative overflow-hidden">
                                <div className="w-24 h-24 rounded-full border-4 border-white bg-white/10 text-white flex items-center justify-center relative z-10">
                                    <Check className="w-12 h-12" />
                                </div>
                                <div className="space-y-4 relative z-10">
                                    <h3 className="text-3xl font-black uppercase tracking-widest text-white">
                                        ACCESSIBILITY 100/100
                                    </h3>
                                    <p className="text-sm font-black tracking-[0.3em] text-white/50">
                                        PIXEL PERFECT REPRODUCTION. +800 XP ADDED.
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

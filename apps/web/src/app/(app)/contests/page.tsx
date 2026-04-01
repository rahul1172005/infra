'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Upload, CheckCircle2, Copy } from 'lucide-react';

import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { HUDCard } from '@/components/ui/HUDCard';
import { SurikenIcon } from '@/components/icons/SurikenIcon';
import { contestsConfig } from '@/configs/contests';

export default function ContestsArena() {
    const [status, setStatus] = useState<'brief' | 'loading' | 'active' | 'success'>('brief');
    const [selectedContest, setSelectedContest] = useState<any>(null);
    const [submissionUrl, setSubmissionUrl] = useState('');

    const startContest = (contest: any) => {
        setSelectedContest(contest);
        setStatus('loading');
        setTimeout(() => setStatus('active'), 2000);
    };

    const submitEntry = () => {
        if (!submissionUrl) return;
        setStatus('loading');
        setTimeout(() => setStatus('success'), 2000);
    };

    const reset = () => {
        setStatus('brief');
        setSelectedContest(null);
        setSubmissionUrl('');
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
                <div className="px-4 py-1.5 rounded-full border border-[#E81414]/30 bg-[#E81414]/10 text-[#E81414] text-[10px] font-black uppercase tracking-[0.3em]">
                    ROYAL CONTESTS
                </div>
            </div>

            <PageHeader 
                title={contestsConfig.header.title}
                accentTitle={contestsConfig.header.accentTitle}
                topLabel={contestsConfig.header.topLabel}
            />

            <AnimatePresence mode="wait">
                {status === 'brief' && (
                    <motion.div key="brief" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 relative z-10">
                        {contestsConfig.contests.map((contest: any, i: number) => {
                            const isAccent = contest.variant === 'accent';
                            return (
                                <HUDCard 
                                    key={i} 
                                    title={contest.title} 
                                    tag={contest.status} 
                                    className={`flex flex-col justify-between h-full ${isAccent ? 'border-[#E81414]/50 bg-[#E81414]/10' : ''}`}
                                    padding="p-6 md:p-10"
                                >
                                    <div className="space-y-6 relative z-10 flex-1">
                                        <p className="text-[12px] tracking-[0.2em] font-black uppercase leading-relaxed text-white/50">
                                            {contest.desc}
                                        </p>
                                        <div className="grid grid-cols-2 pt-6 border-t border-white/10 gap-6">
                                            <div className="space-y-4">
                                                <span className="text-[9px] md:text-[10px] tracking-[0.6em] font-black uppercase text-white/30">GOLD YIELD</span>
                                                <div className="flex items-center gap-3">
                                                    <SurikenIcon size="sm" className="text-[#E81414]" />
                                                    <p className="text-lg font-black uppercase text-white">{contest.gains}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <span className="text-[9px] md:text-[10px] tracking-[0.6em] font-black uppercase text-white/30">DEADLINE</span>
                                                <p className="text-sm font-black uppercase text-white tracking-widest leading-relaxed mt-1">{contest.window}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                                        <Button
                                            variant={isAccent ? "primary" : "outline"}
                                            size="lg"
                                            fullWidth
                                            className={`h-16 tracking-[0.3em] font-black ${isAccent ? 'bg-[#E81414] text-white hover:bg-white hover:text-black border-transparent' : 'border-white/20 text-white hover:bg-white hover:text-black'}`}
                                            onClick={() => startContest(contest)}
                                        >
                                            JOIN THE TRIAL
                                        </Button>
                                    </div>
                                </HUDCard>
                            );
                        })}
                    </motion.div>
                )}

                {status === 'loading' && (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 w-full min-h-[400px] flex items-center justify-center border border-white/10 bg-black/40 rounded-[2rem] p-8">
                        <div className="text-center space-y-6">
                            <div className="w-16 h-16 mx-auto rounded-full border-4 border-t-[#E81414] border-white/10 animate-spin"></div>
                            <h3 className="text-2xl font-black uppercase tracking-widest text-white">INITIALIZING PORTAL...</h3>
                            <p className="text-xs font-black tracking-[0.3em] text-[#E81414] animate-pulse">ESTABLISHING UPLINK</p>
                        </div>
                    </motion.div>
                )}

                {status === 'active' && selectedContest && (
                    <motion.div key="active" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full max-w-3xl mx-auto">
                        <HUDCard title={`SUBMISSION: ${selectedContest.title}`} tag="ACTIVE" className="w-full" padding="p-6 md:p-10">
                            <div className="space-y-10">
                                <div className="p-6 bg-[#E81414]/10 border border-[#E81414]/30 rounded-xl">
                                     <p className="text-sm md:text-base font-black leading-relaxed tracking-widest text-[#E81414]">
                                         UPLOAD YOUR ENTRY TO THE CROWN. ENSURE ALL GUIDELINES ARE MET BEFORE FINALIZING SUBMISSION.
                                     </p>
                                </div>
                                
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 block">ENTRY URL / DEPLOYMENT LINK</label>
                                    <div className="flex relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Copy className="w-4 h-4 text-white/30" />
                                        </div>
                                        <input 
                                            type="text" 
                                            value={submissionUrl}
                                            onChange={(e) => setSubmissionUrl(e.target.value)}
                                            placeholder="HTTPS://GITHUB.COM/YOUR-ENTRY..." 
                                            className="w-full bg-black/50 border border-white/10 rounded-xl py-5 pl-12 pr-4 text-white font-mono uppercase tracking-widest focus:outline-none focus:border-[#E81414] focus:ring-1 focus:ring-[#E81414] transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/10 flex justify-between items-center gap-4">
                                    <Button onClick={reset} variant="outline" className="border-white/10 text-white/40 hover:text-white px-8 py-4">
                                        CANCEL
                                    </Button>
                                    <Button 
                                        onClick={submitEntry} 
                                        disabled={!submissionUrl}
                                        className={`py-4 px-12 text-xs font-black tracking-[0.4em] flex items-center gap-3 ${submissionUrl ? 'bg-[#E81414] text-white hover:bg-white hover:text-black border border-transparent' : 'bg-white/5 text-white/30 border border-white/10 cursor-not-allowed'}`}
                                    >
                                        <Upload className="w-4 h-4" /> SUBMIT TO KING
                                    </Button>
                                </div>
                            </div>
                        </HUDCard>
                    </motion.div>
                )}

                {status === 'success' && (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full max-w-2xl mx-auto">
                        <HUDCard title="ENTRY RECORDED" tag="VERIFIED" className="text-center border-white/20" padding="p-6 md:p-10">
                            <div className="py-12 flex flex-col items-center justify-center space-y-8 relative overflow-hidden">
                                <div className="w-24 h-24 rounded-full border border-white/20 bg-white/5 flex items-center justify-center relative z-10">
                                    <CheckCircle2 className="w-12 h-12 text-white" />
                                </div>
                                <div className="space-y-4 relative z-10">
                                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white">
                                        SUBMISSION ACCEPTED
                                    </h3>
                                    <p className="text-xs font-black tracking-[0.3em] text-[#E81414]">
                                        YOUR ENTRY IS PENDING ROYAL REVIEW. OVERSIGHT WILL CONTACT YOU.
                                    </p>
                                </div>
                                <div className="pt-8 relative z-10">
                                    <Button onClick={reset} variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black font-black uppercase tracking-widest text-[10px] px-8 py-4">
                                        RETURN TO CONTESTS
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


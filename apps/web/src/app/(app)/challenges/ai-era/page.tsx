'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Brain, Check } from 'lucide-react';
import { GOTIcon } from '@/components/icons/GOTIcon';

import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';

const AI_CHALLENGES = [
    {
        id: 'ai-001',
        number: '01',
        title: 'Human-AI Co-Creation Gauntlet',
        subtitle: 'Build a system where AI fails first, then human improves it.',
        tasks: [
            'Use AI to solve a real problem',
            'Show where AI fails',
            'Design human + AI workflow',
            'Deliver improved final output',
        ],
        examples: [],
        whyHard: 'Requires failure analysis + redesign',
        xp: '+3,500 XP',
        difficulty: 'EXTREME',
    },
    {
        id: 'ai-002',
        number: '02',
        title: 'The Impossible Prompt Challenge',
        subtitle: 'Create a task that breaks AI.',
        tasks: [
            'Design a problem AI struggles with',
            'Test it on multiple AI tools',
            'Show different wrong outputs',
            'Build solution AI cannot solve',
        ],
        examples: ['Cultural humor detection', 'Ambiguous instructions', 'Emotional reasoning'],
        whyHard: 'Must outsmart AI',
        xp: '+3,000 XP',
        difficulty: 'HARD',
    },
    {
        id: 'ai-003',
        number: '03',
        title: 'Build AI That Uses the Real World',
        subtitle: 'Design AI that depends on human environment.',
        tasks: [
            'Create AI requiring human observation',
            'Integrate physical interaction context',
            'Ground decisions in real-world sensing',
        ],
        examples: ['AI that improves room lighting', 'AI that analyzes body posture', 'AI that adapts to noise level'],
        whyHard: "Needs real-world sensing AI can't replicate",
        xp: '+4,000 XP',
        difficulty: 'EXTREME',
    },
    {
        id: 'ai-004',
        number: '04',
        title: 'Emotion Intelligence Challenge',
        subtitle: "Build something AI can't understand well: emotions.",
        tasks: [
            'Detect human emotion accurately',
            'Adapt UI or workflow dynamically',
            'Improve decision making via emotion',
        ],
        examples: ['AI mood-based UI', 'Stress-aware study planner', 'Emotion-driven game'],
        whyHard: 'Emotional UX design is deeply human',
        xp: '+3,500 XP',
        difficulty: 'HARD',
    },
    {
        id: 'ai-005',
        number: '05',
        title: 'The Ambiguity Challenge',
        subtitle: 'Design for unclear, vague instructions.',
        tasks: [
            'Handle vague input like "make it better"',
            'Deliver interpretation logic',
            'Show multiple outcome branches',
            'Enable user refinement loop',
        ],
        examples: ['"More modern"', '"Looks wrong"', '"Needs more energy"'],
        whyHard: 'Requires deep human interpretation',
        xp: '+2,500 XP',
        difficulty: 'MEDIUM',
    },
    {
        id: 'ai-006',
        number: '06',
        title: 'Human Judgment Override',
        subtitle: 'Create AI that knows when to ask humans.',
        tasks: [
            'AI attempts solution autonomously',
            'Detects its own uncertainty',
            'Escalates to human for input',
            'Integrates human answer gracefully',
        ],
        examples: ['Coding assistant', 'Medical triage UI', 'Decision helper'],
        whyHard: 'Uncertainty UX is notoriously difficult',
        xp: '+3,000 XP',
        difficulty: 'HARD',
    },
    {
        id: 'ai-007',
        number: '07',
        title: 'AI Hallucination Hunter',
        subtitle: 'Detect and expose AI lies.',
        tasks: [
            'Generate AI answers on a topic',
            'Find factual hallucinations',
            'Design a hallucination detection system',
            'Provide correction workflow',
        ],
        examples: ['Fact checker UI', 'Citation validator', 'AI truth meter'],
        whyHard: 'Reasoning + verification at scale',
        xp: '+3,500 XP',
        difficulty: 'HARD',
    },
    {
        id: 'ai-008',
        number: '08',
        title: 'AI vs Human Creativity Test',
        subtitle: 'Design something where humans beat AI.',
        tasks: [
            'Create a puzzle AI cannot solve',
            'Design something AI cannot generate',
            'Build UX that AI cannot understand',
        ],
        examples: ['Cultural UI', 'Local language UX', 'Humor-based product'],
        whyHard: 'Requires original human thinking',
        xp: '+4,500 XP',
        difficulty: 'EXTREME',
    },
];

export default function AIEraPage() {
    const [accepted, setAccepted] = useState<Set<string>>(new Set());

    const toggleAccept = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setAccepted(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    return (
        <div className="w-full pb-20 space-y-10 md:space-y-14 relative overflow-hidden text-white">
            <DotGrid />

            {/* Back nav */}
            <div className="flex items-center gap-4 relative z-10">
                <Link href="/challenges">
                    <Button
                        variant="outline"
                        className="p-2 border-white/20 text-white hover:bg-white hover:text-black hover:border-white transition-colors rounded-xl"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <span className="text-[9px] tracking-[0.5em] font-black uppercase text-white/30">
                    CHALLENGES / AI ERA
                </span>
                <div className="px-4 py-1.5 rounded-full border border-[#E81414]/40 bg-[#E81414]/10 text-[#E81414] text-[9px] font-black uppercase tracking-[0.3em]">
                    8 MISSIONS ACTIVE
                </div>
            </div>

            <PageHeader
                tag="AI ERA — INTELLIGENCE BATTLEGROUND"
                title={<>AI <span className="text-[#E81414]">CHALLENGES</span></>}
            />

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
                {[
                    { label: 'TOTAL MISSIONS', value: '8' },
                    { label: 'XP POOL', value: '27,500' },
                    { label: 'AVG DIFFICULTY', value: 'HARD' },
                    { label: 'ACCEPTED', value: String(accepted.size) },
                ].map((s) => (
                    <div key={s.label} className="flex flex-col gap-1 p-5 rounded-2xl border border-white/10 bg-white/[0.03]">
                        <span className="text-2xl font-black tabular-nums text-white">{s.value}</span>
                        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30">{s.label}</span>
                    </div>
                ))}
            </div>

            {/* Challenge Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {AI_CHALLENGES.map((ch, i) => {
                    const isAccepted = accepted.has(ch.id);

                    return (
                        <motion.div
                            key={ch.id}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.07, duration: 0.45, ease: 'easeOut' }}
                            className="group relative flex flex-col rounded-[2rem] border border-white/10 overflow-hidden bg-black/40 hover:bg-[#E81414] transition-colors duration-500"
                        >
                            <div className="flex flex-col flex-1 p-7 md:p-9 gap-5">
                                {/* Top row */}
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="icon-wrap w-12 h-12 rounded-xl flex items-center justify-center border bg-white/5 border-white/10 group-hover:bg-black group-hover:border-white/20 transition-all duration-500 shrink-0">
                                            <GOTIcon variant="white" size={36} scale={1.25} x={0} y={0} />
                                        </div>
                                        <div className="w-px h-4 bg-white/15 group-hover:bg-white/30 transition-colors duration-500" />
                                        <span className="text-[8px] tracking-[0.35em] font-black uppercase px-3 py-1 rounded-full border border-white/12 text-white/30 group-hover:border-black/30 group-hover:text-black/60 transition-colors duration-500">
                                            {ch.difficulty}
                                        </span>
                                    </div>
                                    <span className="text-sm font-black tabular-nums text-[#E81414] group-hover:text-black transition-colors duration-500">
                                        {ch.xp}
                                    </span>
                                </div>

                                {/* Title + subtitle */}
                                <div>
                                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white group-hover:text-black leading-tight mb-2 transition-colors duration-500">
                                        {ch.title}
                                    </h3>
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 group-hover:text-black/65 leading-loose transition-colors duration-500">
                                        {ch.subtitle}
                                    </p>
                                </div>

                                {/* Tasks */}
                                <div>
                                    <p className="text-[8px] font-black uppercase tracking-[0.4em] text-white/25 group-hover:text-black/40 mb-3 transition-colors duration-500">
                                        MISSION TASKS
                                    </p>
                                    <ul className="space-y-2">
                                        {ch.tasks.map((task, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-[#E81414] group-hover:bg-black/50 transition-colors duration-500" />
                                                <span className="text-[11px] text-white/55 group-hover:text-black/75 font-semibold leading-snug transition-colors duration-500">
                                                    {task}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Examples */}
                                {ch.examples.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {ch.examples.map((ex, idx) => (
                                            <span
                                                key={idx}
                                                className="text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg border border-[#E81414]/30 text-[#E81414]/80 bg-[#E81414]/08 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-500"
                                            >
                                                {ex}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Why it's hard */}
                                <div className="flex items-start gap-4 p-5 rounded-xl border border-white/8 bg-white/[0.025] group-hover:border-black/20 group-hover:bg-black group-hover:shadow-2xl transition-all duration-500">
                                    <GOTIcon variant="white" size={24} scale={1.3} x={0} y={0} className="shrink-0 mt-0.5 group-hover:opacity-100" />
                                    <div>
                                        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/25 group-hover:text-white/40 mb-1 transition-colors duration-500">
                                            WHY IT'S HARD
                                        </p>
                                        <p className="text-[11px] text-white/55 group-hover:text-white font-semibold transition-colors duration-500">
                                            {ch.whyHard}
                                        </p>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="mt-auto pt-5 border-t border-white/8 group-hover:border-black/20 flex items-center justify-between gap-4 transition-colors duration-500">
                                    <div className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-black/40 transition-colors duration-500">
                                        AI ERA #{ch.number}
                                    </div>

                                    <button
                                        onClick={(e) => toggleAccept(ch.id, e)}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-300 active:scale-95 ${
                                            isAccepted
                                                ? 'border-white/30 text-white bg-white/15 group-hover:border-black group-hover:text-white group-hover:bg-black'
                                                : 'border-white/15 text-white/50 group-hover:border-black group-hover:text-white group-hover:bg-black'
                                        }`}
                                    >
                                        {isAccepted ? (
                                            <>
                                                <Check className="w-3.5 h-3.5" />
                                                ACCEPTED
                                            </>
                                        ) : (
                                            'ACCEPT'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

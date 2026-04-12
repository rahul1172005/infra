'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import { GOTIcon } from '@/components/icons/GOTIcon';

import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';

const UI_UX_CHALLENGES = [
    {
        id: 'uiux-001',
        number: '01',
        title: 'Cybersecurity Student Portfolio UI',
        subtitle: 'Design a portfolio for a cybersecurity student.',
        tasks: [
            'Threat dashboard visualization',
            'Skills mapped as security clearance levels',
            'Projects presented as vulnerabilities fixed',
            'Immersive dark hacker aesthetic',
            'Terminal-inspired navigation and UI elements'
        ],
        deliverables: ['landing page', 'projects page', 'resume UI', 'contact UI'],
        whyHard: 'Must balance complex data visualization with a minimalist hacker aesthetic.',
        honor: '10000HONOR',
        difficulty: 'HARD',
    },
    {
        id: 'uiux-002',
        number: '02',
        title: 'AI Study Companion App UI',
        subtitle: 'Design an AI-powered study planner.',
        tasks: [
            'AI-driven timetable generator',
            'Deep focus mode interface',
            'Active distraction blocker UI',
            'Learning progress heatmap',
            'Smart context-aware reminders'
        ],
        deliverables: ['dashboard', 'planner', 'analytics', 'AI chat'],
        whyHard: 'Simplifying high-density AI information for stressed students.',
        honor: '3000HONOR',
        difficulty: 'MEDIUM',
    },
    {
        id: 'uiux-003',
        number: '03',
        title: 'Startup Founder Dashboard UI',
        subtitle: 'Design UI for high-growth startup founders.',
        tasks: [
            'Real-time growth metrics dashboard',
            'Burn-rate and funding tracker',
            'Interactive product roadmap',
            'Asynchronous team collaboration hub',
            'Secure investor-ready data view'
        ],
        deliverables: ['dashboard', 'analytics', 'roadmap', 'team'],
        whyHard: 'Requires exceptional data hierarchy for high-pressure decision making.',
        honor: '4000HONOR',
        difficulty: 'EXTREME',
    },
    {
        id: 'uiux-004',
        number: '04',
        title: 'Gamer Performance Tracker UI',
        subtitle: 'Design app for competitive e-sports athletes.',
        tasks: [
            'In-depth performance statistics',
            'Reaction time training interface',
            'Global and regional leaderboards',
            'Dynamic match history timeline',
            'Skill-specific training UI'
        ],
        deliverables: ['dashboard', 'stats', 'training', 'profile'],
        whyHard: 'Creating a high-energy visual style that doesn\'t cause fatigue.',
        honor: '10000HONOR',
        difficulty: 'HARD',
    },
    {
        id: 'uiux-005',
        number: '05',
        title: 'College Student Life OS UI',
        subtitle: 'Design an all-in-one centralized college app.',
        tasks: [
            'Automated attendance tracking',
            'Dynamic course timetable',
            'Assignment deadline manager',
            'Campus events and news feed',
            'Biometric-secure digital notes'
        ],
        deliverables: ['home', 'timetable', 'assignments', 'profile'],
        whyHard: 'Consolidating multiple disconnected academic tools into one seamless OS.',
        honor: '2500HONOR',
        difficulty: 'MEDIUM',
    },
    {
        id: 'uiux-006',
        number: '06',
        title: 'Developer Portfolio Builder UI',
        subtitle: 'Design a tool that builds developer portfolios.',
        tasks: [
            'One-click GitHub project import',
            'Customizable project display cards',
            'Real-time design theme switcher',
            'PDF-ready resume generator',
            'Portfolio visitor analytics'
        ],
        deliverables: ['builder', 'themes', 'preview', 'export'],
        whyHard: 'Building a robust meta-design system that lets users express themselves.',
        honor: '3000HONOR',
        difficulty: 'HARD',
    },
    {
        id: 'uiux-007',
        number: '07',
        title: 'Mental Health Support App UI',
        subtitle: 'Design a calming mental wellness companion.',
        tasks: [
            'Intuitive daily mood tracker',
            'Immersive guided breathing UI',
            'Secure private thought journal',
            'Empathetic AI support companion',
            'Holistic wellness progress tracker'
        ],
        deliverables: ['home', 'mood', 'journal', 'progress'],
        whyHard: 'Using color theory and micro-animations to actively reduce anxiety.',
        honor: '10000HONOR',
        difficulty: 'HARD',
    },
    {
        id: 'uiux-008',
        number: '08',
        title: 'Future Career Explorer App UI',
        subtitle: 'Design an app helping students navigate career paths.',
        tasks: [
            'Non-linear career path visualization',
            'Adaptive skill acquisition roadmap',
            'Market-accurate salary insights',
            'Experience-based learning tracker',
            'Verified industry mentor portal'
        ],
        deliverables: ['explore', 'roadmap', 'progress', 'profile'],
        whyHard: 'Visualizing long-term career growth with uncertainty and branching paths.',
        honor: '4500HONOR',
        difficulty: 'EXTREME',
    },
];

export default function UIUXRealmPage() {
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
        <div className="w-full pb-20 space-y-10 md:space-y-14 relative overflow-hidden text-white font-normal">
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
                    CHALLENGES / UI/UX REALM
                </span>
                <div className="px-4 py-1.5 rounded-full border border-[#E81414]/40 bg-[#E81414]/10 text-[#E81414] text-[9px] font-black uppercase tracking-[0.3em]">
                    8 DESIGN TRIALS ACTIVE
                </div>
            </div>

            <PageHeader
                tag="UI/UX REALM — THE CREATIVE FORGE"
                title={<>DESIGN <span className="text-[#E81414]">CHALLENGES</span></>}
            />

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
                {[
                    { label: 'ACTIVE TRIALS', value: '8' },
                    { label: 'HONOR POOL', value: '27,000' },
                    { label: 'AVG DIFFICULTY', value: 'HARD' },
                    { label: 'ACCEPTED', value: String(accepted.size) },
                ].map((s) => (
                    <div key={s.label} className="flex flex-col gap-1 p-5 rounded-2xl border border-white/10 bg-white/[0.03]">
                        <span className="text-2xl font-normal tabular-nums text-white" style={{ fontFamily: "'Game of Thrones'" }}>{s.value}</span>
                        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30">{s.label}</span>
                    </div>
                ))}
            </div>

            {/* Challenge Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {UI_UX_CHALLENGES.map((ch, i) => {
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
                                    <span className="text-sm font-normal tabular-nums text-[#E81414] group-hover:text-black transition-colors duration-500" style={{ fontFamily: "'Game of Thrones'" }}>
                                        {ch.honor}
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

                                {/* Deliverables */}
                                <div className="flex flex-wrap gap-2">
                                    {ch.deliverables.map((dl, idx) => (
                                        <span
                                            key={idx}
                                            className="text-[8px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/10 text-white/40 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-500"
                                        >
                                            {dl}
                                        </span>
                                    ))}
                                </div>

                                {/* Tasks */}
                                <div>
                                    <p className="text-[8px] font-black uppercase tracking-[0.4em] text-white/25 group-hover:text-black/40 mb-3 transition-colors duration-500">
                                        CORE FEATURES
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

                                {/* Why it's hard */}
                                <div className="flex items-start gap-4 p-5 rounded-xl border border-white/8 bg-white/[0.025] group-hover:border-black/20 group-hover:bg-black group-hover:shadow-2xl transition-all duration-500">
                                    <GOTIcon variant="white" size={24} scale={1.3} x={0} y={0} className="shrink-0 mt-0.5 group-hover:opacity-100" />
                                    <div>
                                        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/25 group-hover:text-white/40 mb-1 transition-colors duration-500">
                                            DESIGN DIFFICULTY
                                        </p>
                                        <p className="text-[11px] text-white/55 group-hover:text-white font-semibold transition-colors duration-500">
                                            {ch.whyHard}
                                        </p>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="mt-auto pt-5 border-t border-white/8 group-hover:border-black/20 flex items-center justify-between gap-4 transition-colors duration-500">
                                    <div className="text-[9px] font-normal uppercase tracking-[0.3em] text-white/20 group-hover:text-black/40 transition-colors duration-500" style={{ fontFamily: "'Game of Thrones'" }}>
                                        UI/UX #{ch.number}
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
                                            'ACCEPT CHALLENGE'
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

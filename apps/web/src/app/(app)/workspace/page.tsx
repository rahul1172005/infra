'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Sword, Zap, Target, Crosshair } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GOTIcon } from '@/components/icons/GOTIcon';
import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { HUDCard } from '@/components/ui/HUDCard';
import { MetaCard } from '@/components/ui/MetaCard';

const CHALLENGES = [
    {
        id: 'QST-01',
        name: 'DRAGON PIT DEFENSE',
        domain: 'KINGSGUARD',
        points: 1500,
        difficulty: 'RUTHLESS',
        rules: ["DEFEND THE PIT FROM USURPERS", "FOLLOW THE DRAGON COMMANDS", "TIME LIMIT: 2 HOURS", "NO MERCY FOR TRAITORS"]
    },
    {
        id: 'QST-02',
        name: 'IRON BANK HEIST',
        domain: 'BRAAVOS',
        points: 2800,
        difficulty: 'NIGHTMARE',
        rules: ["BYPASS THE FACELESS MEN", "RECOVER THE LOST GOLD", "MAX 5000 STEALTH MOVES", "LEAVE NO TRACE"]
    },
    {
        id: 'QST-03',
        name: 'WHISPERS FROM VARYS',
        domain: 'SPYMASTER',
        points: 3400,
        difficulty: 'INSANE',
        rules: ["ANALYZE THE BIRD MESSAGES", "IDENTIFY THE TRAITOR IN THE COUNCIL", "DECODE THE VALYRIAN CIPHER", "REPORT TO THE QUEEN"]
    },
    {
        id: 'QST-04',
        name: 'WILDLING BREACH',
        domain: 'THE WALL',
        points: 4200,
        difficulty: 'GODLIKE',
        rules: ["STOP THE CLIMBERS", "DEFEND CASTLE BLACK", "USE THE SCORPION BOLTS", "NO RETREAT"]
    },
    {
        id: 'QST-05',
        name: 'NIGHT KING ASSAULT',
        domain: 'WINTERFELL',
        points: 5000,
        difficulty: 'UNREAL',
        rules: ["USE DRAGONGLASS BLADES", "FIND THE WHITE WALKERS", "PROTECT THE STARK LINEAGE", "VALAR MORGHULIS"]
    },
    {
        id: 'QST-06',
        name: 'THE MAD KING LEGACY',
        domain: 'MAESTERS',
        points: 8000,
        difficulty: 'IMPOSSIBLE',
        rules: ["REVEAL THE WILDFIRE LOCATIONS", "BYPASS THE ROYAL GUARDS", "SECURE THE THRONE ROOM", "FIRE AND BLOOD"]
    }
];

function FlipCard({ challenge }: { challenge: typeof CHALLENGES[0] }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="w-full h-[420px] relative cursor-pointer group/card"
            style={{ perspective: '2000px' }}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="w-full h-full relative"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* ── FRONT FACE ─────────────────────────────────────────────── */}
                <div
                    className="absolute inset-0 w-full h-full bg-black rounded-[2.5rem] p-12 md:p-14 flex flex-col justify-between overflow-hidden hover:bg-[#E81414] transition-colors duration-500 group-hover/card:text-black text-white shadow-2xl shadow-black/50 border border-white/10"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <DotGrid opacity="opacity-[0.08]" />

                    <div className="relative z-10 flex justify-between items-start">
                        <div className="flex items-center gap-4">
                            <GOTIcon type="targaryen" size={32} scale={2.5} x={0} y={0} className="group-hover/card:text-black/50 transition-colors" />
                            <span className="text-[10px] tracking-[0.5em] font-black uppercase text-white/30 group-hover/card:text-black/50 transition-colors">
                                {challenge.id}
                            </span>
                        </div>
                        <span className="px-5 py-2.5 bg-white/5 rounded-full text-[9px] tracking-[0.4em] font-black group-hover/card:bg-black group-hover/card:text-white transition-colors uppercase">
                            {challenge.difficulty}
                        </span>
                    </div>

                    <div className="relative z-10 space-y-4">
                        <h3 className="text-3xl font-black tracking-tight uppercase leading-snug">
                            {challenge.name}
                        </h3>
                        <p className="text-[11px] tracking-[0.4em] font-black uppercase text-[#E81414] group-hover/card:text-black/80 transition-colors">
                            {challenge.domain}
                        </p>
                    </div>

                    <div className="relative z-10 flex justify-between items-end pt-10 transition-colors">
                        <div className="flex flex-col">
                            <span className="text-[9px] tracking-[0.4em] font-black uppercase text-white/40 group-hover/card:text-black/50 transition-colors mb-2">REWARD POOL</span>
                            <span className="text-2xl font-black tracking-widest tabular-nums">{challenge.points} COINS</span>
                        </div>
                        <div className="w-14 h-14 rounded-full flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all transform scale-0 group-hover/card:scale-100">
                            {/* Space for dynamic badge if needed */}
                        </div>
                    </div>
                </div>

                {/* ── BACK FACE (RULES) ──────────────────────────────────────── */}
                <div
                    className="absolute inset-0 w-full h-full bg-[#E81414] rounded-[2.5rem] text-black p-12 md:p-14 flex flex-col overflow-hidden shadow-2xl"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <div className="flex justify-between items-center border-b border-black/10 pb-6 mb-6 shrink-0">
                        <div className="flex items-center gap-4">
                            <GOTIcon type="targaryen" size={24} scale={1.6} x={0} y={0} />
                            <h3 className="text-xl font-black tracking-widest uppercase">ENGAGEMENT RULES</h3>
                        </div>
                        <div className="p-2 rounded-full hover:bg-black hover:text-[#E81414] transition-colors cursor-pointer">
                            <Crosshair className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-8 custom-scrollbar pt-4">
                        {challenge.rules.map((rule, idx) => (
                            <div key={idx} className="flex items-start gap-4">
                                <span className="text-[10px] font-black text-black/40 tracking-widest mt-1">0{idx + 1}</span>
                                <p className="text-[13px] font-black uppercase tracking-[0.05em] leading-loose opacity-90">{rule}</p>
                            </div>
                        ))}
                    </div>

                    <Button
                        variant="primary"
                        fullWidth
                        className="mt-8 py-6 bg-black text-white hover:bg-white hover:text-black border-transparent"
                    >
                        TAKE THE OATH
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}

export default function WorkspacePage() {
    return (
        <div className="w-full pb-24 space-y-12 relative overflow-hidden">
            <DotGrid />

            {/* ══ HEADER ═══════════════════════════════════════════════ */}
            <PageHeader
                tag="SMALL COUNCIL MISSION CORE"
                title={<>ACTIVE<br /><span className="text-[#E81414]">QUESTS</span></>}
            />

            {/* ══ GRID ══════════════════════════════════════════════════ */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                {CHALLENGES.map((challenge) => (
                    <FlipCard key={challenge.id} challenge={challenge} />
                ))}
            </div>
        </div>
    );
}

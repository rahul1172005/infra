'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';
import { DotGrid, Scanlines } from '@/components/ui/Decorative';
import { Suriken } from '@/components/ui/Suriken';
import { PageHeader } from '@/components/ui/PageHeader';
import { SearchInput } from '@/components/ui/SearchInput';
import { HUDFrame } from '@/components/ui/HUDFrame';

export default function LeaderboardPage() {
    const [clans, setClans] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClans = async () => {
            try {
                const res = await fetch('http://localhost:5000/teams');
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data)) {
                        setClans(data);
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchClans();
    }, []);

    return (
        <div className="w-full space-y-8 md:space-y-14 lg:space-y-20 pb-16 md:pb-24 relative overflow-hidden">
            <DotGrid />

            {/* ══ HEADER ═════════════════════════════════════════════════════ */}
            <PageHeader
                title={<>GLOBAL<br /><span className="text-white">RANKS.</span></>}
                subtitle="SYSTEM HIERARCHY"
                stats={{
                    label: "RANK ID",
                    value: "#8,241",
                    locked: true
                }}
            />

            {/* ══ SEARCH & FILTERS ════════════════════════════════════════════ */}
            <div className="flex flex-col xl:flex-row gap-4 md:gap-6 relative z-10">
                <SearchInput placeholder="SEARCH OPERATIVE..." />
                <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full xl:w-auto">
                    <Button
                        variant="primary"
                        size="md"
                        fullWidth
                        className="xl:w-auto"
                    >
                        SYNDICATE VIEW
                    </Button>
                    <Button
                        variant="outline"
                        size="md"
                        fullWidth
                        className="xl:w-auto gap-3 md:gap-5"
                        icon={() => <Suriken size="sm" />}
                    >
                        FILTERS
                    </Button>
                </div>
            </div>

            {/* ══ LEADERBOARD TABLE ══════════════════════════════════════════ */}
            <div className="border border-white/10 bg-[#0A0A0A] overflow-hidden relative z-10 rounded-[2.5rem]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.03] text-white/40 text-[7px] md:text-[10px] tracking-[0.2em] md:tracking-[0.8em] font-black uppercase border-b border-white/10">
                                <th className="py-4 px-3 md:py-8 md:px-12">POS</th>
                                <th className="py-4 px-3 md:py-8 md:px-12">SYNDICATE ID</th>
                                <th className="py-4 px-3 md:py-8 md:px-12">XP RATING</th>
                                <th className="py-4 px-3 md:py-8 md:px-12 hidden sm:table-cell">MISSION STATS</th>
                                <th className="py-4 px-3 md:py-8 md:px-12 text-right">GROWTH</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-white/40 font-black tracking-widest text-[10px]">DOWNLOADING LEDGER...</td>
                                </tr>
                            ) : clans.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-white/40 font-black tracking-widest text-[10px]">NO DATA ESTABLISHED</td>
                                </tr>
                            ) : clans.map((team, i) => (
                                <tr key={team.id || i} className="hover:bg-white/[0.02] transition-all group/row cursor-pointer relative">
                                    <td className="py-4 px-3 md:py-10 md:px-12 text-sm md:text-2xl font-black tracking-tighter text-white/10 group-hover/row:text-white transition-colors">{(i + 1).toString().padStart(2, '0')}</td>
                                    <td className="py-4 px-3 md:py-10 md:px-12">
                                        <div className="flex items-center gap-3 md:gap-8">
                                            <div className={`w-8 h-8 md:w-14 md:h-14 ${i === 0 ? 'bg-[#E81414]' : 'bg-white/5'} border border-white/10 flex items-center justify-center shrink-0 transition-transform rounded-2xl`}>
                                                <span className={`${i === 0 ? 'text-white' : 'text-white/20'} text-[10px] md:text-[16px] font-black`}>{team.name?.[0] || '?'}</span>
                                            </div>
                                            <div className="flex flex-col gap-0.5 md:gap-1">
                                                <span className={`text-[10px] md:text-[16px] font-black tracking-tight md:tracking-widest uppercase ${i === 0 ? 'text-[#E81414]' : 'text-white'} truncate max-w-[80px] sm:max-w-none`}>{team.name}</span>
                                                <span className="text-[7px] md:text-[9px] tracking-[0.2em] md:tracking-[0.4em] font-black uppercase text-white/20">{i < 3 ? 'ELITE' : 'ACTIVE'} TAG</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-3 md:py-10 md:px-12">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs md:text-3xl font-bold tracking-tight md:tracking-widest text-white">{team.score?.toLocaleString() || '0'}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-3 md:py-10 md:px-12 hidden sm:table-cell">
                                        <div className="flex items-center gap-2 md:gap-5">
                                            <Suriken size="sm" />
                                            <span className="text-[9px] md:text-[11px] font-black tracking-[0.2em] uppercase text-white/30 truncate">{team._count?.members || 0} OPERATIVES</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-3 md:py-10 md:px-12 text-right">
                                        <div className="flex flex-col items-end gap-1 md:gap-1.5">
                                            <span className={`text-[9px] md:text-[12px] font-black tracking-[0.1em] md:tracking-[0.2em] uppercase text-green-500`}>N/A</span>
                                            <div className="flex items-center gap-1 md:gap-2">
                                                <Suriken size="sm" className="opacity-10" />
                                                <span className="text-[7px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] font-black uppercase text-white/10 hidden md:inline">30D VELOCITY</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ══ FOOTER INFO ════════════════════════════════════════════════ */}
            <HUDFrame
                title="SYNC PROTOCOL LOCKED"
                subtitle="SYSTEM VERSION OVERSIGHT"
                className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 md:gap-10"
            >
                <div className="flex items-center gap-5 md:gap-10 relative z-10">
                    <div className="w-12 h-12 md:w-16 md:h-16 border border-white/10 flex items-center justify-center bg-white/5 rounded-xl md:rounded-2xl shrink-0">
                        <Suriken size="lg" />
                    </div>
                    <div className="space-y-1.5 md:space-y-3 text-left">
                        <p className="text-[8px] md:text-[11px] tracking-[0.05em] font-black uppercase text-white/20 max-w-xl leading-relaxed">
                            RANKS ARE CALCULATED EVERY 60 CYCLES BASED ON CHALLENGE VELOCITY, DOMAIN STABILITY, AND COLLECTIVE SYNDICATE XP.
                        </p>
                    </div>
                </div>
                <Button
                    variant="primary"
                    size="lg"
                    className="w-full xl:w-auto mt-4 md:mt-0"
                    icon={Download}
                >
                    EXPORT LOGS
                </Button>
            </HUDFrame>
        </div>
    );
}

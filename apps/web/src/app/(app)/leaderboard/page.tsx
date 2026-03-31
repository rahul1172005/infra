'use client';

import { useEffect, useState } from 'react';
import { GOTIcon } from '@/components/icons/GOTIcon';
import { Button } from '@/components/ui/Button';
import { SurikenIcon } from '@/components/icons/SurikenIcon';
import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { HUDCard } from '@/components/ui/HUDCard';
import { MetaCard } from '@/components/ui/MetaCard';

export default function LeaderboardPage() {
    const [clans, setClans] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClans = async () => {
            let apiTeams: any[] = [];
            try {
                const res = await fetch('http://localhost:5000/teams');
                if (res.ok) {
                    apiTeams = await res.json();
                }
            } catch (err) {
                console.warn("Backend offline, using local registry");
            }

            // Merge with local persistent teams
            const localTeamsStr = localStorage.getItem('persistent_teams');
            const localTeams = localTeamsStr ? JSON.parse(localTeamsStr) : [];
            
            const combined = [...apiTeams];
            localTeams.forEach((lt: any) => {
                const idx = combined.findIndex(ct => ct.name === lt.name);
                if (idx !== -1) {
                    combined[idx] = { ...combined[idx], ...lt };
                } else {
                    combined.push(lt);
                }
            });

            // Sort by score
            combined.sort((a, b) => (b.score || 0) - (a.score || 0));

            setClans(combined);
            setLoading(false);
        };

        fetchClans();

        // Listen for profile/score updates
        window.addEventListener('profile_update', fetchClans);
        return () => window.removeEventListener('profile_update', fetchClans);
    }, []);

    return (
        <div className="w-full space-y-8 md:space-y-12 pb-20 relative">
            <DotGrid />

            {/* ══ HEADER ══════════════════════════════════════════════ */}
            <PageHeader
                tag="KINGDOM HIERARCHY"
                title={<>TOP<br /><span className="text-[#E81414]">HOUSES</span></>}
            />

            {/* ══ SEARCH & FILTERS ════════════════════════════════════════════ */}
            <div className="flex flex-col xl:flex-row gap-6 relative z-10">
                <div className="flex-1 bg-black border border-white/10 px-8 py-5 flex items-center gap-6 group/search cursor-text rounded-full transition-all hover:border-[#E81414]/50">
                    <GOTIcon type="zap" size={32} scale={1.2} x={0} y={1} className="opacity-20 transition-colors" />
                    <input
                        type="text"
                        placeholder="SEARCH SOLDIER OR HOUSE..."
                        className="bg-transparent border-none text-[12px] tracking-[0.3em] font-black uppercase text-white placeholder-white/20 focus:outline-none w-full min-w-0"
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                    <Button
                        variant="secondary"
                        icon={<GOTIcon type="shield" size={32} scale={1.2} x={0} y={0} />}
                        className="px-10"
                    >
                        FILTERS
                    </Button>
                    <Button
                        variant="primary"
                        icon={<GOTIcon type="shield" size={32} scale={1.2} x={0} y={0} />}
                        className="px-10"
                    >
                        EXPORT
                    </Button>
                </div>
            </div>

            {/* ══ LEADERBOARD TABLE ══════════════════════════════════════════ */}
            <HUDCard padding="none" title="ROYAL LEDGER" tag="REALM RANKS" icon={<GOTIcon type="zap" size={32} scale={1.2} x={0} y={0} className="opacity-40" />}>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="bg-white/[0.03] text-white/40 text-[8px] tracking-[0.4em] font-black uppercase border-b border-white/10">
                                <th className="py-8 px-10">POS</th>
                                <th className="py-8 px-10">HOUSE IDENTITY</th>
                                <th className="py-8 px-10">STRENGTH RATING</th>
                                <th className="py-8 px-10">SOLDIERS</th>
                                <th className="py-8 px-10 text-right">VELOCITY</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center text-white/20 font-black tracking-[0.4em] text-[10px] uppercase italic">ACCESSING ROYAL DATABASE...</td>
                                </tr>
                            ) : clans.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center text-white/20 font-black tracking-[0.4em] text-[10px] uppercase italic">NO DATA ESTABLISHED IN CURRENT CYCLE</td>
                                </tr>
                            ) : clans.map((team, i) => (
                                <tr key={team.id || i} className="hover:bg-[#E81414] transition-all duration-500 group/row cursor-pointer">
                                    <td className="py-8 px-10">
                                        <span className="text-xl font-black tracking-tighter text-[#E81414] group-hover/row:text-black transition-colors duration-500">{(i + 1).toString().padStart(2, '0')}</span>
                                    </td>
                                    <td className="py-8 px-10">
                                        <div className="flex items-center gap-6">
                                            <div className={`w-14 h-14 ${i === 0 ? 'bg-[#E81414] shadow-lg shadow-[#E81414]/20' : 'bg-white/5 group-hover/row:bg-black/20'} flex items-center justify-center shrink-0 rounded-2xl group-hover/row:scale-110 transition-transform duration-500`}>
                                                <span className={`${i === 0 ? 'text-white group-hover/row:text-black' : 'text-white/40 group-hover/row:text-black'} text-lg font-black transition-colors duration-500`}>{team.name?.[0] || '?'}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className={`text-[13px] font-black tracking-widest uppercase transition-colors duration-500 ${i === 0 ? 'text-[#E81414] group-hover/row:text-black' : 'text-white group-hover/row:text-black'}`}>{team.name}</span>
                                                <span className="text-[9px] tracking-[0.3em] font-black uppercase text-white/20 group-hover/row:text-black/50 transition-colors duration-500">{i < 3 ? 'ELITE MASTER' : 'ACTIVE SOLDIER'}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-8 px-10">
                                        <div className="flex items-center gap-4">
                                            <GOTIcon type="zap" size={32} scale={1.2} x={0} y={0} className={`${i === 0 ? 'text-[#E81414] group-hover/row:text-black' : 'text-white/20 group-hover/row:text-black'} transition-colors duration-500`} />
                                            <span className="text-xl font-black tracking-tighter text-[#E81414] group-hover/row:text-black tabular-nums transition-colors duration-500">{team.score?.toLocaleString() || '0'}</span>
                                        </div>
                                    </td>
                                    <td className="py-8 px-10">
                                        <div className="flex items-center gap-4">
                                            <span className="text-[10px] font-black tracking-[0.2em] uppercase transition-colors duration-500">
                                                <span className="text-[#E81414] group-hover/row:text-black transition-colors duration-500">{team._count?.members || 0}</span>
                                                <span className="text-white/40 group-hover/row:text-black ml-2 transition-colors duration-500">SOLDIERS</span>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-8 px-10 text-right">
                                        <div className="flex flex-col items-end">
                                            <span className="text-[11px] font-black tracking-widest uppercase text-[#E81414] group-hover/row:text-black transition-colors duration-500">+12.4%</span>
                                            <span className="text-[8px] tracking-[0.2em] font-black uppercase text-white/10 group-hover/row:text-black/50 transition-colors duration-500">30D GAIN</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </HUDCard>

            {/* ══ SYNC INFO ════════════════════════════════════════════════ */}
            <HUDCard variant="default" className="border-white/5 bg-black/40" padding="p-10 md:p-20">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-24">
                    <div className="flex items-center gap-10 md:gap-14">
                        <div className="w-20 h-20 bg-white/5 flex items-center justify-center rounded-[2rem] shrink-0">
                            <GOTIcon type="shield" size={40} scale={1.8} x={0} y={0} />
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-[11px] tracking-[0.6em] font-black uppercase text-white/40">WALL SYNC PROTOCOL</h4>
                            <p className="text-[11px] tracking-widest font-black uppercase text-white/20 leading-loose max-w-3xl">
                                RANKINGS ARE IMMUTABLE ONCE PERSISTED TO THE ROYAL LEDGER. CALCULATIONS FACTOR IN QUEST VELOCITY, REALM CONTROL, AND HOUSE COHESION.
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        className="text-white/40 hover:text-white px-10 py-6"
                        icon={<GOTIcon type="zap" size={32} scale={1.2} x={0} y={0} />}
                    >
                        VIEW RANKING CRITERIA
                    </Button>
                </div>
            </HUDCard>
        </div>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Trophy, Zap } from 'lucide-react';
import { GOTIcon, type GOTIconProps } from '@/components/icons/GOTIcon';
import ClanLead3DGraph from '@/components/dashboard/ClanLead3DGraph';
import { useAuthStore } from '@/lib/store/useAuthStore';

import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { HUDCard } from '@/components/ui/HUDCard';

export default function DashboardPage() {
    const { user, isAuthenticated } = useAuthStore();
    const [teams, setTeams] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<any>({ totalUsers: 0, totalTeams: 0, activeQuests: 0 });
    const [countdown, setCountdown] = useState({ days: 12, hours: 8, minutes: 45, seconds: 32 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch dynamic teams
                const teamRes = await fetch('/api/stats'); // We'll create this route
                if (teamRes.ok) {
                    const data = await teamRes.json();
                    setTeams(data.teams || []);
                    setStats(data.stats || { totalUsers: 0, totalTeams: 0, activeQuests: 0 });
                }
            } catch (err) {
                console.warn('Backend connection issue, showing cached data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 30000); // Polling for "dynamic" updates
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                let { days, hours, minutes, seconds } = prev;
                if (seconds > 0) seconds--;
                else {
                    seconds = 59;
                    if (minutes > 0) minutes--;
                    else {
                        minutes = 59;
                        if (hours > 0) hours--;
                        else {
                            hours = 23;
                            if (days > 0) days--;
                        }
                    }
                }
                return { days, hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const topTeam = teams[0] || null;
    const formatNum = (n: number) => n.toString().padStart(2, '0');

    return (
        <div className="w-full space-y-12 pb-20 relative">
            <DotGrid />

            {/* Dynamic Header */}
            <PageHeader
                tag={`NODE: ${user?.email?.split('@')[0]?.toUpperCase() || 'ANONYMOUS'} — ACCESS LEVEL: ${user?.role || 'VIEWER'}`}
                title={
                    isAuthenticated ? (
                        <>WELCOME BACK,<br /><span className="text-[#E81414] uppercase">{user?.name?.split(' ')[0] || 'RECRUIT'}</span></>
                    ) : (
                        <>FIRE AND BLOOD<br /><span className="text-[#E81414]">IRON THRONE</span></>
                    )
                }
            />

            {/* Core Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                <div className="p-10 bg-white/5 border border-white/10 rounded-[2rem] flex flex-col justify-between hover:border-[#E81414]/30 transition-all">
                    <span className="text-[10px] tracking-[0.4em] font-black text-white/20 uppercase">TOTAL OPERATIVES</span>
                    <div className="flex items-end justify-between">
                        <span className="text-5xl font-black tracking-tighter text-white tabular-nums">{stats.totalUsers || 0}</span>
                        <ShieldCheck className="text-[#E81414] w-8 h-8 opacity-40 mb-1" />
                    </div>
                </div>
                <div className="p-10 bg-white/5 border border-white/10 rounded-[2rem] flex flex-col justify-between hover:border-[#E81414]/30 transition-all">
                    <span className="text-[10px] tracking-[0.4em] font-black text-white/20 uppercase">ACTIVE HOUSES</span>
                    <div className="flex items-end justify-between">
                        <span className="text-5xl font-black tracking-tighter text-white tabular-nums">{teams.length || 0}</span>
                        <Trophy className="text-[#E81414] w-8 h-8 opacity-40 mb-1" />
                    </div>
                </div>
                <div className="p-10 bg-white/5 border border-white/10 rounded-[2rem] flex flex-col justify-between hover:border-[#E81414]/30 transition-all">
                    <span className="text-[10px] tracking-[0.4em] font-black text-white/20 uppercase">QUESTS DEPLOYED</span>
                    <div className="flex items-end justify-between">
                        <span className="text-5xl font-black tracking-tighter text-white tabular-nums">{stats.activeQuests || 12}</span>
                        <Zap className="text-[#E81414] w-8 h-8 opacity-40 mb-1" />
                    </div>
                </div>
            </div>

            {/* Visuals Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 relative z-10">
                <div className="xl:col-span-8">
                    <HUDCard
                        padding="none"
                        title="DYNASTY HIERARCHY — LIVE NEON SYNC"
                        tag="DYNAMIC CORE"
                        icon={<GOTIcon type="globe" size={64} className="opacity-80" scale={1.6} x={0} y={0} />}
                        className="h-full overflow-hidden"
                    >
                        <div
                            className="w-full relative bg-black/40"
                            style={{ height: 'clamp(380px, 45vw, 600px)' }}
                        >
                            <ClanLead3DGraph teams={teams} />
                        </div>
                    </HUDCard>
                </div>

                <div className="xl:col-span-4 grid grid-cols-1 gap-8">
                    {/* Alpha Clan Dominance */}
                    <div className="p-12 md:p-14 bg-[#E81414] text-white flex flex-col justify-between relative overflow-hidden rounded-[2.5rem] min-h-[300px] shadow-2xl shadow-black/20 border-none group cursor-pointer hover:bg-black transition-colors duration-500">
                        <DotGrid opacity="opacity-[0.1]" />
                        <div className="space-y-8 relative z-10 transition-colors duration-500 group-hover:text-white">
                            <span className="text-[10px] tracking-[0.3em] font-black uppercase opacity-60 flex items-center gap-3">
                                <GOTIcon type="trophy" size={28} scale={1.6} x={0} y={0} />
                                HOUSE LEADERSHIP
                            </span>
                            <h4 className="text-4xl md:text-5xl font-black tracking-tight uppercase leading-[1.2]">
                                {topTeam ? `${topTeam.name}` : 'SCANNING...'}
                                <br /><span className="text-black/30 group-hover:text-white/50 transition-colors duration-500">IN POWER</span>
                            </h4>
                            <div className="pt-4 flex items-center gap-6">
                                <div className="flex flex-col leading-none">
                                    <span className="text-2xl font-black tabular-nums">{topTeam?.score || 0}</span>
                                    <span className="text-[8px] tracking-[0.2em] font-black opacity-40 uppercase">HONOR PTS</span>
                                </div>
                                <div className="w-px h-8 bg-white/20" />
                                <div className="flex flex-col leading-none">
                                    <span className="text-2xl font-black tabular-nums">{topTeam?._count?.members || 0}</span>
                                    <span className="text-[8px] tracking-[0.2em] font-black opacity-40 uppercase">LOYALISTS</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Countdown */}
                    <HUDCard
                        title="BATTLE RESET"
                        tag="TEMPORAL SYNC"
                        padding="p-12 md:p-14"
                        icon={<GOTIcon type="zap" size={64} className="text-[#E81414]" scale={1.6} x={0} y={0} />}
                    >
                        <div className="flex flex-col gap-2">
                            <h4 className="text-3xl md:text-5xl font-black tracking-tighter tabular-nums text-[#E81414] flex items-center gap-2">
                                {formatNum(countdown.days)}<span className="text-white/20">:</span>
                                {formatNum(countdown.hours)}<span className="text-white/20">:</span>
                                {formatNum(countdown.minutes)}<span className="text-white/20">:</span>
                                {formatNum(countdown.seconds)}
                            </h4>
                            <div className="flex justify-between items-center text-[7px] tracking-[0.4em] font-black text-white/10 mt-1 uppercase">
                                <span>DAYS</span>
                                <span>HOURS</span>
                                <span>MINS</span>
                                <span>SECS</span>
                            </div>
                        </div>
                    </HUDCard>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {[
                    { title: 'HOUSE REGISTRY', val: 'VIEW HOUSES', sub: 'Explore dynamic alliances', href: '/teams', icon: <GOTIcon type="globe" size={80} /> },
                    { title: 'BATTLE FIELDS', val: 'PROVINCE SYNC', sub: 'Active competitive maps', href: '/domains', icon: <GOTIcon type="hand" size={80} /> },
                    { title: 'QUEST ARCHIVE', val: 'LOAD QUESTS', sub: 'Dynamic hurdle injection', href: '/challenges', icon: <GOTIcon type="lock" size={80} /> },
                    { title: 'ROYAL PERKS', val: 'STORE SYNC', sub: 'Exchange honor for gear', href: '/store', icon: <GOTIcon type="zap" size={80} />, accent: true }
                ].map((mod, i) => (
                    <div
                        key={i}
                        onClick={() => window.location.href = mod.href}
                        className={`cursor-pointer group relative h-[250px] p-10 flex flex-col justify-between border transition-all duration-500 rounded-[2rem] overflow-hidden ${mod.accent ? 'bg-white border-white text-black hover:bg-[#E81414] hover:border-[#E81414]' : 'bg-black border-white/10 hover:bg-[#E81414] text-white hover:text-black shadow-2xl shadow-black/50 hover:border-[#E81414]'}`}
                    >
                        <DotGrid opacity={mod.accent ? "opacity-[0.05]" : "opacity-[0.03]"} />
                        <div className="flex justify-between items-start relative z-10 w-full">
                            <div className="flex items-center justify-start text-[#E81414] group-hover:text-black transition-colors duration-500">
                                {React.cloneElement(mod.icon as React.ReactElement<GOTIconProps>, { scale: 1.6, x: 0, y: 0 })}
                            </div>
                        </div>

                        <div className="space-y-6 relative z-10 mt-auto pt-6">
                            <div className="space-y-2">
                                <p className={`text-xs md:text-sm tracking-[0.2em] font-black uppercase opacity-60 transition-colors duration-500 ${mod.accent ? 'text-black' : 'text-white group-hover:text-black'}`}>{mod.title}</p>
                                <p className={`text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight transition-colors duration-500 ${mod.accent ? 'text-black' : 'text-white group-hover:text-black'}`}>{mod.val}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className={`h-[2px] w-8 rounded-full transition-colors duration-500 ${mod.accent ? 'bg-black' : 'bg-[#E81414] group-hover:bg-black'}`} />
                                <p className={`text-[9px] tracking-[0.1em] font-black uppercase opacity-50 transition-colors duration-500 ${mod.accent ? 'text-black' : 'text-white group-hover:text-black'}`}>{mod.sub}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dynamic Ledger */}
            <HUDCard
                padding="none"
                title="REAL-TIME ACTIVITY LEDGER"
                tag="DYNAMIC EVENT STREAM"
                icon={<GOTIcon type="shield" size={64} className="opacity-80" scale={1.6} x={0} y={0} />}
                className="overflow-hidden"
            >
                <div className="divide-y divide-white/5 bg-black/20">
                    {teams.slice(0, 5).map((team, i) => (
                        <div key={i} className="px-6 md:px-10 py-6 md:py-10 flex items-center justify-between hover:bg-[#E81414] transition-all duration-300 group cursor-pointer text-white gap-6 md:gap-10">
                            <div className="flex items-center gap-6 md:gap-10 min-w-0">
                                <div className="hidden sm:flex flex-col items-center gap-1 border-r border-white/10 group-hover:border-black/20 pr-10 min-w-[100px]">
                                    <span className="text-[11px] font-black tracking-widest text-[#E81414] group-hover:text-black">{formatNum(14 - i)}:00</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-black/30" />
                                </div>
                                <div className="space-y-1 min-w-0">
                                    <span className="text-[9px] tracking-[0.4em] font-black uppercase text-white/20 group-hover:text-black/60 transition-colors uppercase">VERIFIED SYNC</span>
                                    <h4 className="text-base md:text-xl font-black tracking-tight uppercase group-hover:text-black transition-colors truncate">
                                        HOUSE {team.name} SYNCHRONIZED HONOR RECORDS
                                    </h4>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 md:gap-10 shrink-0">
                                <div className="flex flex-col items-end">
                                    <span className="text-lg md:text-3xl font-black tracking-tighter tabular-nums group-hover:text-black">+{team.score} HONOR</span>
                                    <span className="text-[8px] tracking-[0.4em] font-black uppercase opacity-40 group-hover:opacity-100 group-hover:text-black transition-colors duration-500">DYNAMIC SCORE</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </HUDCard>
        </div>
    );
}


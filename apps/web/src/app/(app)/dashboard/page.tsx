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
                showSuriken={false}
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
                {[
                    { label: 'TOTAL OPERATIVES', val: stats.totalUsers || 0 },
                    { label: 'ACTIVE HOUSES', val: teams.length || 0 },
                    { label: 'QUESTS DEPLOYED', val: stats.activeQuests || 12 }
                ].map((m, i) => (
                    <div 
                        key={i} 
                        className="p-12 bg-white/5 hover:bg-[#E81414] border border-white/10 hover:border-[#E81414] rounded-[2rem] flex flex-col items-center justify-center text-center gap-4 min-h-[240px] transition-all duration-500 cursor-default group hover:shadow-2xl hover:shadow-[#E81414]/20"
                    >
                        <span className="text-[12px] tracking-[0.4em] font-black text-white/30 group-hover:text-white/60 uppercase transition-colors">{m.label}</span>
                        <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white transition-transform group-hover:scale-110 duration-500" style={{ fontFamily: "'Game of Thrones'", lineHeight: '1', fontWeight: 900 }}>{m.val}</span>
                    </div>
                ))}
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
                    <div className="p-12 bg-[#E81414] text-white flex flex-col justify-between relative overflow-hidden rounded-[2.5rem] min-h-[340px] shadow-2xl shadow-black/20 border-none group">
                        <DotGrid opacity="opacity-[0.1]" />
                        <div className="space-y-6 relative z-10">
                            <span className="text-[10px] tracking-[0.3em] font-black uppercase opacity-60 flex items-center justify-start gap-3">
                                HOUSE LEADERSHIP
                            </span>
                            <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-[1.1] break-words">
                                {topTeam ? `${topTeam.name}` : 'SCANNING...'}
                                <br /><span className="text-white/40">IN POWER</span>
                            </h4>
                            <div className="pt-4 flex items-center gap-6">
                                <div className="flex flex-col leading-none">
                                    <span className="text-4xl font-black" style={{ fontFamily: "'Game of Thrones'", fontWeight: 900 }}>{topTeam?.score || 0}</span>
                                    <span className="text-[8px] tracking-[0.2em] font-black opacity-40 uppercase">HONOR PTS</span>
                                </div>
                                <div className="w-px h-8 bg-white/20" />
                                <div className="flex flex-col leading-none">
                                    <span className="text-4xl font-black" style={{ fontFamily: "'Game of Thrones'", fontWeight: 900 }}>{topTeam?._count?.members || 0}</span>
                                    <span className="text-[8px] tracking-[0.2em] font-black opacity-40 uppercase">LOYALISTS</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Countdown */}
                    <HUDCard
                        padding="p-8 sm:p-10 md:p-14"
                        title="BATTLE RESET"
                        tag="TEMPORAL SYNC"
                        className="w-full relative bg-black/40"
                        style={{ minHeight: '200px' }}
                        showSuriken={false}
                        headerClassName="!justify-center !text-center"
                    >
                        <div className="flex items-center justify-center h-full w-full">
                            <div className="grid grid-cols-4 gap-1 sm:gap-4 md:gap-8 lg:gap-14 w-full max-w-4xl mx-auto">
                                {[
                                    { label: 'DAYS', value: countdown.days },
                                    { label: 'HOURS', value: countdown.hours },
                                    { label: 'MINUTES', value: countdown.minutes },
                                    { label: 'SECONDS', value: countdown.seconds }
                                ].map((item) => (
                                    <div key={item.label} className="flex flex-col items-center justify-center gap-1 md:gap-3">
                                        <span 
                                            className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-black text-[#E81414] leading-normal" 
                                            style={{ fontFamily: "'Game of Thrones'", fontWeight: 900 }}
                                        >
                                            {item.value.toString().padStart(2, '0')}
                                        </span>
                                        <span 
                                            className="text-[5px] sm:text-[7px] md:text-[8px] lg:text-[10px] tracking-normal md:tracking-widest font-normal text-white/40 uppercase text-center whitespace-normal break-words" 
                                            style={{ fontFamily: "'Game of Thrones'" }}
                                        >
                                            {item.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </HUDCard>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {[
                    { title: 'HOUSE REGISTRY', val: 'VIEW HOUSES', sub: 'Explore dynamic alliances', href: '/teams', icon: <GOTIcon variant="white" size={80} scale={1.2} x={0} y={0} /> },
                    { title: 'BATTLE ARENA', val: 'VIEW CHALLENGES', sub: 'Conquer the rankings', href: '/challenges', icon: <GOTIcon variant="white" size={80} scale={1.2} x={0} y={0} /> },
                    { title: 'REALM MAP', val: 'VIEW PROVINCES', sub: 'Monitor global domains', href: '/domains', icon: <GOTIcon variant="white" size={80} scale={1.2} x={0} y={0} /> },
                    { title: 'ROYAL PERKS', val: 'STORE SYNC', sub: 'Exchange honor for gear', href: '/store', icon: <GOTIcon variant="white" size={80} scale={1.2} x={0} y={0} />, accent: true }
                ].map((mod, i) => (
                    <div
                        key={i}
                        onClick={() => window.location.href = mod.href}
                        className={`cursor-pointer group relative min-h-[320px] p-12 flex flex-col justify-between border rounded-[2rem] overflow-hidden transition-all duration-500 active:scale-[0.98] hover:shadow-2xl ${
                            mod.accent 
                            ? 'bg-white border-white text-black hover:bg-[#E81414] hover:border-[#E81414] hover:text-white' 
                            : 'bg-black border-white/10 text-white hover:bg-[#E81414] hover:border-[#E81414] shadow-2xl shadow-black/50'
                        }`}
                    >
                        <DotGrid opacity={mod.accent ? "opacity-[0.05]" : "opacity-[0.03]"} />
                        <div className="flex justify-between items-start relative z-10 w-full transition-transform duration-500 group-hover:translate-x-2">
                            <div className={`flex items-center justify-start transition-colors duration-500 ${mod.accent ? 'text-[#E81414] group-hover:text-white' : 'text-[#E81414] group-hover:text-white'}`}>
                                {React.cloneElement(mod.icon as React.ReactElement<GOTIconProps>, { scale: 1.3, x: 0, y: 0 })}
                            </div>
                        </div>

                        <div className="space-y-6 relative z-10 mt-auto pt-6 transition-transform duration-500 group-hover:translate-x-2">
                            <div className="space-y-2">
                                <p className={`text-xs md:text-sm tracking-[0.2em] font-black uppercase opacity-60 transition-colors duration-500 ${mod.accent ? 'text-black group-hover:text-white' : 'text-white group-hover:text-white'}`}>{mod.title}</p>
                                <p className={`text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight transition-colors duration-500 ${mod.accent ? 'text-black group-hover:text-white' : 'text-white group-hover:text-white'}`}>{mod.val}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className={`h-[2px] w-8 rounded-full transition-colors duration-500 ${mod.accent ? 'bg-black group-hover:bg-white' : 'bg-[#E81414] group-hover:bg-white'}`} />
                                <p className={`text-[9px] tracking-[0.1em] font-black uppercase opacity-50 transition-colors duration-500 ${mod.accent ? 'text-black group-hover:text-white' : 'text-white group-hover:text-white'}`}>{mod.sub}</p>
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
                icon={null}
                className="overflow-hidden"
            >
                <div className="divide-y divide-white/5 bg-black/20">
                    {teams.slice(0, 5).map((team, i) => (
                        <div 
                            key={i} 
                            className="px-8 md:px-12 py-8 md:py-12 flex items-center justify-between transition-all duration-500 group cursor-pointer text-white gap-6 md:gap-10 hover:bg-[#E81414] active:bg-[#C01010] active:scale-[0.99] relative overflow-hidden"
                        >
                            <div className="flex items-center gap-6 md:gap-10 min-w-0 relative z-10">
                                <div className="hidden sm:flex flex-col items-center gap-1 border-r border-white/10 pr-10 min-w-[140px] group-hover:border-white/20">
                                    <span className="text-[11px] font-black tracking-widest text-[#E81414] group-hover:text-white transition-colors duration-300" style={{ fontFamily: "'Game of Thrones'", fontWeight: 900 }}>{formatNum(14 - i)}:00</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white" />
                                </div>
                                <div className="space-y-1 min-w-0">
                                    <span className="text-[9px] tracking-[0.4em] font-black uppercase text-white/20 group-hover:text-white/60 transition-colors uppercase">VERIFIED SYNC</span>
                                    <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-black tracking-tight uppercase transition-colors break-words">
                                        HOUSE {team.name} <span className="hidden xs:inline">SYNCHRONIZED HONOR RECORDS</span>
                                    </h4>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 md:gap-10 shrink-0 relative z-10">
                                <div className="flex flex-col items-end">
                                    <span className="text-lg md:text-3xl font-black" style={{ fontFamily: "'Game of Thrones'", fontWeight: 900 }}>+{team.score} HONOR</span>
                                    <span className="text-[8px] tracking-[0.4em] font-black uppercase opacity-40 group-hover:opacity-100 group-hover:text-white transition-colors duration-500">DYNAMIC SCORE</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </HUDCard>
        </div>
    );
}


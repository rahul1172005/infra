'use client';

import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { GOTIcon, type GOTIconProps } from '@/components/icons/GOTIcon';
import ClanLead3DGraph from '@/components/dashboard/ClanLead3DGraph';
import { Button } from '@/components/ui/Button';

import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { HUDCard } from '@/components/ui/HUDCard';
import { MetaCard } from '@/components/ui/MetaCard';

export default function DashboardPage() {
    const [teams, setTeams] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [countdown, setCountdown] = useState({ days: 12, hours: 8, minutes: 45, seconds: 32 });

    useEffect(() => {
        const fetchTeams = async () => {
            let apiTeams: any[] = [];
            try {
                const res = await fetch('http://localhost:5000/teams');
                if (res.ok) {
                    apiTeams = await res.json();
                }
            } catch (err) {
                console.warn('Backend offline, using local registry');
            }

            // Sync with local teams
            const localTeamsStr = localStorage.getItem('persistent_teams');
            const localTeams = localTeamsStr ? JSON.parse(localTeamsStr) : [];
            
            const combined = [...apiTeams];
            localTeams.forEach((lt: any) => {
                if (!combined.find(ct => ct.name === lt.name)) {
                    combined.push(lt);
                }
            });

            // Sort by score descending
            combined.sort((a, b) => (b.score || 0) - (a.score || 0));

            setTeams(combined);
            setLoading(false);
        };
        fetchTeams();

        // Sync with manual score updates
        window.addEventListener('profile_update', fetchTeams);
        return () => window.removeEventListener('profile_update', fetchTeams);
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

            {/* Header Module */}
            <PageHeader
                tag="CENTRAL COMMAND CORE — TARGARYEN DYNASTY"
                title={<>FIRE AND BLOOD<br /><span className="text-[#E81414]">IRON THRONE</span></>}
            />

            {/* Hero Visuals Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 relative z-10">
                {/* 3D Visualizer - Col Span 8 */}
                <div className="xl:col-span-8">
                    <HUDCard
                        padding="none"
                        title="DYNASTY HIERARCHY VISUALIZER"
                        tag="REAL-TIME CORE"
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

                {/* Secondary Stats - Col Span 4 */}
                <div className="xl:col-span-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-8">
                    {/* Alpha Clan Dominance */}
                    <div className="p-12 md:p-14 bg-[#E81414] text-white flex flex-col justify-between relative overflow-hidden rounded-[2.5rem] min-h-[300px] shadow-2xl shadow-black/20 border-none group cursor-pointer hover:bg-black transition-colors duration-500">
                        <DotGrid opacity="opacity-[0.1]" />
                        <div className="space-y-8 relative z-10 transition-colors duration-500 group-hover:text-white">
                            <span className="text-[10px] tracking-[0.3em] font-black uppercase opacity-60 flex items-center gap-3">
                                <GOTIcon type="trophy" size={28} scale={1.6} x={0} y={0} />
                                TARGARYEN DOMINANCE
                            </span>
                            <h4 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-[1.2]">
                                {topTeam ? `${topTeam.name}` : 'SCANNING...'}
                                <br /><span className="text-black/30 group-hover:text-white/50 transition-colors duration-500">IN LEAD</span>
                            </h4>
                        </div>
                    </div>

                    {/* Sync Intelligence Card */}
                    <HUDCard
                        title="VALYRIAN COUNTDOWN"
                        tag="SYNC PULSE"
                        padding="p-12 md:p-14"
                        icon={<GOTIcon type="zap" size={64} className="text-[#E81414]" scale={1.6} x={0} y={0} />}
                        className="hover:border-white/10"
                    >
                        <div className="space-y-10">
                            <div className="space-y-6">
                                <div className="flex flex-col gap-2">
                                    <span className="text-[10px] tracking-[0.4em] font-black uppercase text-white/20">DEPLOYMENT ETA</span>
                                    <h4 className="text-3xl md:text-5xl font-black tracking-tighter tabular-nums text-[#E81414] flex items-center gap-2">
                                        {formatNum(countdown.days)}<span className="text-white/20">:</span>
                                        {formatNum(countdown.hours)}<span className="text-white/20">:</span>
                                        {formatNum(countdown.minutes)}<span className="text-white/20">:</span>
                                        {formatNum(countdown.seconds)}
                                    </h4>
                                    <div className="flex justify-between items-center text-[7px] tracking-[0.4em] font-black text-white/10 mt-1">
                                        <span>DAYS</span>
                                        <span>HOURS</span>
                                        <span>MINS</span>
                                        <span>SECS</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </HUDCard>
                </div>
            </div>


            {/* Action Modules Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {[
                    { title: 'HOUSE MANAGEMENT', val: 'DECLARE HOUSES', sub: 'Organize multiple families', href: '/teams', icon: <GOTIcon type="globe" size={80} /> },
                    { title: 'PROVINCE CONTROL', val: 'SELECT PROVINCE', sub: 'Configure competitive fields', href: '/domains', icon: <GOTIcon type="hand" size={80} /> },
                    { title: 'QUEST LAB', val: 'NEW QUESTS', sub: 'Build technical hurdles', href: '/challenges', icon: <GOTIcon type="lock" size={80} /> },
                    { title: 'HONOR SYSTEM', val: 'ADD COINS', sub: 'Reward completed missions', href: '/challenges', icon: <GOTIcon type="zap" size={80} />, accent: true }
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

            {/* Shogunate Records Ledger */}
            <HUDCard
                padding="none"
                title="DYNASTY RECORDS"
                tag="IMMUTABLE LEDGER"
                icon={<GOTIcon type="shield" size={64} className="opacity-80" scale={1.6} x={0} y={0} />}
                className="overflow-hidden"
            >
                <div className="divide-y divide-white/5 bg-black/20">
                    {[
                        { time: '14:20', event: 'ALPHA HOUSE: SECURED VALYRIAN REPAIR', points: '+450 COINS', status: 'VERIFIED' },
                        { time: '13:44', event: 'BATTLE PIT: KERNEL OVERFLOW EXPLOIT', points: '0', status: 'SYNCED' },
                        { time: '12:01', event: 'PROVINCE UPDATE: RED KEEP INFRASTRUCTURE', points: '0', status: 'ACTIVE' },
                        { time: '09:30', event: 'SIGMA HOUSE: COMPLETED DNS RECON', points: '+320 COINS', status: 'VERIFIED' },
                    ].map((log, i) => (
                        <div key={i} className="px-6 md:px-10 py-6 md:py-10 flex items-center justify-between hover:bg-[#E81414] transition-all duration-300 group cursor-pointer text-white gap-6 md:gap-10">
                            <div className="flex items-center gap-6 md:gap-10 min-w-0">
                                <div className="hidden sm:flex flex-col items-center gap-1 border-r border-white/10 group-hover:border-black/20 pr-10 min-w-[100px]">
                                    <span className="text-[11px] font-black tracking-widest text-[#E81414] group-hover:text-black">{log.time}</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-black/30" />
                                </div>
                                <div className="space-y-1 min-w-0">
                                    <span className="text-[9px] tracking-[0.4em] font-black uppercase text-white/20 group-hover:text-black/60 transition-colors uppercase">{log.status}</span>
                                    <h4 className="text-base md:text-xl font-black tracking-tight uppercase group-hover:text-black transition-colors  truncate">{log.event}</h4>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 md:gap-10 shrink-0">
                                <div className="flex flex-col items-end">
                                    <span className="text-lg md:text-3xl font-black tracking-tighter tabular-nums group-hover:text-black">{log.points !== '0' ? log.points : '--'}</span>
                                    {log.points !== '0' && <span className="text-[8px] tracking-[0.4em] font-black uppercase opacity-40 group-hover:opacity-100 group-hover:text-black transition-colors duration-500">REWARD</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Ledger Footer */}
                <div className="p-8 md:p-10 text-center border-t border-white/10 bg-white/5">
                    <div className="text-[10px] tracking-[0.6em] uppercase text-white/20 font-black italic flex items-center justify-center gap-6">
                        <GOTIcon type="targaryen" size={12} className="brightness-0 invert opacity-40" scale={1.6} x={0} y={0} />
                        IRON BANK ENCRYPTED RECORDS SYNC
                        <GOTIcon type="targaryen" size={12} className="brightness-0 invert opacity-40" scale={1.6} x={0} y={0} />
                    </div>
                </div>
            </HUDCard>
        </div>
    );
}

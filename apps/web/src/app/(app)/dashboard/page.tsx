'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ClanLead3DGraph from '@/components/dashboard/ClanLead3DGraph';
import { DotGrid } from '@/components/ui/Decorative';
import { PageHeader } from '@/components/ui/PageHeader';
import { Suriken } from '@/components/ui/Suriken';
import { HUDFrame } from '@/components/ui/HUDFrame';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Trophy, Zap, Shield, Target } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    const [teams, setTeams] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const res = await fetch('http://localhost:5000/teams');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setTeams(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTeams();
    }, []);

    const topTeam = teams[0] || null;

    return (
        <div className="w-full space-y-8 md:space-y-12 pb-16">
            <DotGrid />

            {/* ══ HEADER ══════════════════════════════════════════════ */}
            <PageHeader
                title={<>幕府<br /><span className="text-[#E81414]">SHOGUNATE</span></>}
                stats={{
                    label: "OPERATIONAL STATUS",
                    value: "SYNCED",
                    subValue: "核心作戰系統 — 侍闘技場"
                }}
                action={
                    <div className="flex gap-4">
                        <Link href="/challenges">
                            <Button variant="primary" icon={Zap} className="px-8 rounded-full">NEW MISSION</Button>
                        </Link>
                    </div>
                }
            />

            {/* ══ LEADERBOARD GRAPH & TOP STATS ═══════════════════════ */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                {/* 3D Visualizer */}
                <div className="lg:col-span-8 bg-[#050505] border border-white/10 rounded-[2.5rem] md:rounded-[3rem] relative overflow-hidden group">
                    <div 
                        className="w-full relative" 
                        style={{ height: 'clamp(400px, 70vh, 600px)' }}
                    >
                        <ClanLead3DGraph teams={teams} />
                        
                        {/* Overlay HUD elements */}
                        <div className="absolute top-8 left-8 p-4 bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl pointer-events-none">
                            <p className="text-[10px] tracking-[0.4em] font-black uppercase text-white/30 mb-1">LIVE DATAFEED</p>
                            <p className="text-sm font-black text-white italic">0x_NEURAL_MESH_ACTIVE</p>
                        </div>
                    </div>
                </div>

                {/* Side Stats */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Alpha Clan Highlight */}
                    <div className="bg-[#E81414] p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between min-h-[250px] group cursor-pointer relative overflow-hidden transition-all hover:scale-[1.02] active:scale-95">
                        <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-700">
                            <Trophy size={120} />
                        </div>
                        <div className="relative z-10 space-y-4">
                            <span className="text-[10px] tracking-[0.3em] font-black uppercase text-white/60">DOMINANT CLAN</span>
                            <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-tight">
                                {topTeam ? topTeam.name : 'SCANNING...'}
                            </h2>
                        </div>
                        <div className="relative z-10 flex items-end justify-between">
                            <div className="space-y-1">
                                <p className="text-[10px] tracking-[0.2em] font-black uppercase text-white/60">XP ACCUMULATED</p>
                                <p className="text-4xl font-black tabular-nums">{topTeam ? topTeam.score.toLocaleString() : '---'}</p>
                            </div>
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                                <Suriken size="md" color="white" />
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <HUDFrame title="STABILITY" className="!p-6">
                            <div className="text-center py-2">
                                <p className="text-3xl font-black text-white">99.4%</p>
                                <p className="text-[8px] font-black tracking-widest text-white/20 mt-1 uppercase">UPTIME</p>
                            </div>
                        </HUDFrame>
                        <HUDFrame title="ACTIVE" className="!p-6">
                            <div className="text-center py-2">
                                <p className="text-3xl font-black text-white">4.2k</p>
                                <p className="text-[8px] font-black tracking-widest text-[#E81414] mt-1 uppercase">PLAYERS</p>
                            </div>
                        </HUDFrame>
                    </div>

                    {/* Recent Activity */}
                    <HUDFrame title="SYSTEM ALERT" subtitle="SECURITY_LOGS" isLive={true}>
                        <div className="space-y-4 py-2">
                            {[
                                { msg: "NEW CLAN 'SHINOBI' ENLISTED", time: "2M AGO" },
                                { msg: "SECTOR 7 INTEGRITY CHECK", time: "5M AGO" },
                                { msg: "ARENA PHASE II DEPLOYED", time: "12M AGO" },
                            ].map((alert, i) => (
                                <div key={i} className="flex justify-between items-center group/item hover:bg-white/5 p-2 rounded-xl transition-colors">
                                    <p className="text-[9px] font-black tracking-wider text-white/60 uppercase">{alert.msg}</p>
                                    <span className="text-[8px] font-black text-white/20">{alert.time}</span>
                                </div>
                            ))}
                        </div>
                        <Link href="/analytics" className="block mt-6">
                            <Button variant="ghost" fullWidth className="rounded-full border border-white/5 hover:border-[#E81414]/30 text-[9px]">
                                FULL TELEMETRY <ArrowRight className="ml-2 w-3 h-3" />
                            </Button>
                        </Link>
                    </HUDFrame>
                </div>
            </div>

            {/* ══ FEATURE TILES ════════════════════════════════════════ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {[
                    { title: "BATTLE ARENA", icon: Target, href: "/arena", desc: "MATCHMAKING SYSTEM" },
                    { title: "KATA TRIALS", icon: Zap, href: "/challenges", desc: "SKILL VALIDATION" },
                    { title: "CLAN HUB", icon: Shield, href: "/teams", desc: "FORCE MANAGEMENT" },
                    { title: "MASTERY", icon: Trophy, href: "/profile", desc: "IDENTITY REGISTRY" },
                ].map((item) => (
                    <Link key={item.title} href={item.href}>
                        <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 group hover:border-[#E81414]/50 transition-all hover:-translate-y-1">
                            <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#E81414] group-hover:border-[#E81414] transition-all">
                                <item.icon className="w-5 h-5 text-white/40 group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tighter">{item.title}</h3>
                            <p className="text-[9px] font-black tracking-[0.3em] text-white/20 uppercase">{item.desc}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

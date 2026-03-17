'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import ClanLead3DGraph from '@/components/dashboard/ClanLead3DGraph';

/* ── Decorative Components ─────────────────────────────────────────── */
const DotGrid = () => (
    <div className="absolute inset-0 dot-grid pointer-events-none opacity-[0.05]" />
);

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
        <div className="w-full space-y-8 md:space-y-14 lg:space-y-20 pb-16">

            {/* ══ HEADER MODULE ══════════════════════════════════════════════ */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-8 md:pb-12 gap-6 md:gap-10">
                <div className="space-y-2 md:space-y-6">
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-[0.02em] uppercase leading-[0.85] text-white">
                        幕府<br /><span className="text-white">SHOGUNATE</span>
                    </h1>
                    <p className="text-white/15 text-[9px] md:text-[11px] tracking-[0.5em] font-black uppercase">核心作戦系統 — 侍闘技場</p>
                </div>

                {/* Status card — full width on mobile, auto on desktop */}
                <div className="w-full md:w-auto flex items-center gap-4">
                    <div className="hidden md:flex flex-col items-center gap-0.5 opacity-20 pointer-events-none select-none">
                        {'将軍様'.split('').map((c, i) => (
                            <span key={i} className="text-white font-black text-[13px] leading-tight">{c}</span>
                        ))}
                    </div>
                    <div className="flex-1 md:flex-none flex flex-col items-start md:items-end gap-3 p-5 md:p-8 border border-white/10 bg-[#0A0A0A] rounded-2xl md:rounded-[2.5rem]">
                        <span className="text-[9px] md:text-[10px] tracking-[0.1em] font-black uppercase text-white/20">Operational Status · 稼働状況</span>
                        <span className="text-xl md:text-3xl font-black uppercase tracking-[0.02em] text-white leading-none">SHOGUN SYNC</span>
                    </div>
                </div>
            </div>

            {/* ══ LEADERBOARD GRAPH ══════════════════════════════════════════════ */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
                {/* Graph — shorter on mobile */}
                <div
                    className="lg:col-span-2 border border-white/10 bg-[#000000] relative overflow-hidden rounded-2xl md:rounded-3xl"
                    style={{ height: 'clamp(380px, 65vw, 540px)' }}
                >
                    <ClanLead3DGraph teams={teams} />
                </div>

                {/* Stat cards — side by side on mobile, stacked on lg */}
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6 lg:gap-10">
                    {/* Alpha Clan card */}
                    <div className="p-5 md:p-10 bg-[#E81414] text-white flex flex-col justify-between relative overflow-hidden group cursor-pointer rounded-2xl md:rounded-[2.5rem] transition-transform hover:scale-[1.02] active:scale-95 min-h-[160px] md:min-h-[230px]">
                        <div className="space-y-1 md:space-y-4 relative z-10">
                            <span className="text-[8px] md:text-[10px] tracking-[0.2em] font-black uppercase opacity-60">Shogunate Dominance</span>
                            <h4 className="text-xl md:text-4xl font-black tracking-tight uppercase leading-[1.1]">
                                {topTeam ? `${topTeam.name} IN LEAD` : 'INITIATING SCAN...'}
                            </h4>
                        </div>
                        <div className="flex justify-between items-end relative z-10 mt-3 md:mt-0">
                            <div className="text-2xl md:text-5xl font-bold">{topTeam ? topTeam.score.toLocaleString() : '---'}</div>
                            <div className="p-2 md:p-4 bg-white/10 rounded-xl md:rounded-2xl backdrop-blur-md">
                                <img src="/suriken.png" alt="icon" className="w-5 h-5 md:w-8 md:h-8 brightness-0 invert object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                            </div>
                        </div>
                    </div>

                    {/* Sync card */}
                    <div className="p-5 md:p-10 border border-white/10 bg-[#0A0A0A] flex flex-col justify-between relative overflow-hidden group cursor-pointer hover:border-[#E81414]/30 transition-all rounded-2xl md:rounded-[2.5rem] min-h-[160px] md:min-h-[230px]">
                        <DotGrid />
                        <div className="space-y-1 md:space-y-4 relative z-10">
                            <span className="text-[8px] md:text-[10px] tracking-[0.2em] font-black uppercase text-white/20">Bushido Pulse</span>
                            <h4 className="text-xl md:text-4xl font-bold tracking-tight uppercase leading-[1.1] text-white">84% KATANA<br />SYNC RATE</h4>
                        </div>
                        <div className="flex items-center gap-3 md:gap-5 relative z-10 mt-3 md:mt-0">
                            <div className="p-2 md:p-3 bg-white/5 rounded-lg md:rounded-xl shrink-0">
                                <img src="/suriken.png" alt="icon" className="w-4 h-4 md:w-5 md:h-5 brightness-0 invert object-contain" style={{ transform: "scale(2.2) translate(0px, 0px)" }} />
                            </div>
                            <div className="flex-1 h-2 md:h-3 bg-white/5 relative rounded-full overflow-hidden">
                                <div className="absolute inset-y-0 left-0 w-4/5 bg-white rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══ ACTION MODULES ═══════════════════════════════════════════════ */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                <ModuleCard
                    title="CLAN MANAGEMENT"
                    val="CREATE CLANS"
                    icon={<img src="/suriken.png" alt="icon" className="w-full h-full object-contain" style={{ "transform": "scale(1.3) translate(0px, 1px)" }} />}
                    sub="Organize multiple families"
                    href="/teams"
                />
                <ModuleCard
                    title="PROVINCE CONTROL"
                    val="SELECT PROVINCE"
                    icon={<img src="/suriken.png" alt="icon" className="w-full h-full object-contain" style={{ "transform": "scale(1.3) translate(0px, 1px)" }} />}
                    sub="Configure competitive fields"
                    href="/domains"
                />
                <ModuleCard
                    title="DOJO LAB"
                    val="NEW CHALLENGES"
                    icon={<img src="/suriken.png" alt="icon" className="w-full h-full object-contain" style={{ "transform": "scale(1.3) translate(0px, 1px)" }} />}
                    sub="Build technical hurdles"
                    href="/challenges"
                />
                <ModuleCard
                    title="HONOR SYSTEM"
                    val="ADD POINTS"
                    icon={<img src="/suriken.png" alt="icon" className="w-full h-full object-contain" style={{ "transform": "scale(1.3) translate(0px, 1px)" }} />}
                    sub="Reward completed missions"
                    href="/challenges"
                    accent
                />
            </div>

            {/* ══ RECENT SYSTEM LOGS ═══════════════════════════════════════════ */}
            <div className="border border-white/10 bg-[#0A0A0A] overflow-hidden relative rounded-2xl md:rounded-[2.5rem]">
                {/* Log header */}
                <div className="p-5 md:p-10 border-b border-white/10 flex justify-between items-center bg-[#0F0F0F]">
                    <h3 className="text-[14px] md:text-[18px] tracking-[0.02em] font-black uppercase">SHOGUNATE RECORDS</h3>
                    <div className="px-4 md:px-6 py-1.5 md:py-2 bg-white/5 border border-white/10 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] rounded-full text-white/30">幕府稼働中</div>
                </div>

                {/* Log rows */}
                <div className="divide-y divide-white/5 bg-black">
                    {[
                        { time: '14:20', event: 'ALPHA CLAN: SECURED KATANA REPAIR', points: '+450XP', status: 'VERIFIED' },
                        { time: '13:44', event: 'DOJO CREATED: KERNEL OVERFLOW EXPLOIT', points: 'SCORE 0', status: 'SYNCED' },
                        { time: '12:01', event: 'PROVINCE UPDATE: CASTLE INFRASTRUCTURE', points: 'SCORE 0', status: 'ACTIVE' },
                        { time: '09:30', event: 'SIGMA SHADOW: COMPLETED DNS RECON', points: '+320XP', status: 'VERIFIED' },
                    ].map((log, i) => (
                        <div key={i} className="p-4 md:p-10 flex items-start md:items-center justify-between hover:bg-[#E81414] transition-all duration-300 group/log cursor-pointer text-white hover:text-black gap-3 md:gap-10">
                            <div className="flex items-start md:items-center gap-4 md:gap-10 min-w-0">
                                {/* Time — hidden on very small, visible from sm */}
                                <span className="hidden sm:block text-[10px] md:text-[11px] font-black tracking-tighter text-white/40 group-hover/log:text-black/60 transition-colors shrink-0">{log.time}</span>
                                <div className="space-y-0.5 md:space-y-1 min-w-0">
                                    <span className="block text-[11px] md:text-[16px] font-black tracking-tight uppercase group-hover/log:text-black transition-colors leading-[1.3] break-words">{log.event}</span>
                                    <p className="text-[8px] md:text-[10px] tracking-[0.02em] font-black uppercase text-white/30 group-hover/log:text-black/60 transition-colors">{log.status}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 md:gap-10 shrink-0">
                                <span className="text-sm md:text-lg font-black tracking-[0.1em] tabular-nums group-hover/log:text-black transition-colors">{log.points}</span>
                                <div className="hidden md:flex w-10 h-10 border border-white/10 group-hover/log:border-black rounded-xl items-center justify-center translate-x-2 opacity-0 group-hover/log:translate-x-0 group-hover/log:opacity-100 transition-all">
                                    <img src="/suriken.png" alt="icon" className="w-5 h-5 brightness-0 invert group-hover/log:brightness-0 group-hover/log:invert-0 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ModuleCard({ title, val, icon, sub, href, accent }: any) {
    return (
        <div
            onClick={() => window.location.href = href}
            className={`cursor-pointer group relative overflow-hidden h-[180px] md:h-[220px] lg:h-[260px] p-5 md:p-8 flex flex-col justify-between border transition-all duration-500 rounded-2xl md:rounded-[2.5rem]
 ${accent ? 'bg-white border-white text-black' : 'bg-[#0A0A0A] border-white/10 hover:bg-[#E81414] hover:border-[#E81414] text-white'}`}
        >
            <DotGrid />
            <div className="flex justify-between items-start relative z-10">
                <div className={`w-9 h-9 md:w-12 md:h-12 border flex items-center justify-center transition-all duration-500 rounded-xl md:rounded-2xl
 ${accent ? 'border-black bg-black text-white' : 'border-white/10 bg-white/5 group-hover:bg-black group-hover:border-black group-hover:text-white'}`}>
                    {icon}
                </div>
                <div className={`w-7 h-7 md:w-8 md:h-8 border border-black/5 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 ${accent ? 'text-black' : 'text-black shadow-xl bg-black/10'}`}>
                    <img src="/suriken.png" alt="icon" className="w-3 h-3 md:w-4 md:h-4 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                </div>
            </div>

            <div className="space-y-2 md:space-y-4 relative z-10">
                <div className="space-y-0.5 md:space-y-1">
                    <p className={`text-[8px] md:text-[10px] tracking-[0.05em] font-black uppercase opacity-40 transition-colors ${accent ? 'text-black' : 'text-white group-hover:text-black'}`}>{title}</p>
                    <p className={`text-base md:text-2xl font-black uppercase tracking-tight leading-none transition-colors ${accent ? 'text-black' : 'text-white group-hover:text-black'}`}>{val}</p>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                    <div className={`h-[2px] w-4 md:w-5 rounded-full transition-colors ${accent ? 'bg-black' : 'bg-[#E81414] group-hover:bg-black'}`} />
                    <p className={`text-[7px] md:text-[8px] tracking-[0.1em] font-black uppercase opacity-50 transition-colors ${accent ? 'text-black' : 'text-white group-hover:text-black'}`}>{sub}</p>
                </div>
            </div>
        </div>
    );
}

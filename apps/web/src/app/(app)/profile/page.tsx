'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, LogOut, Edit3, Trophy, Zap, Target, Shield, Star, Activity, Clock, Globe, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const DotGrid = () => (
    <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />
);

// Stat card component
function StatCard({ label, value, sub, accent = false }: { label: string; value: string; sub?: string; accent?: boolean }) {
    return (
        <div className={`p-6 md:p-8 border rounded-[2rem] relative overflow-hidden group cursor-default transition-all duration-300 ${accent ? 'bg-[#E81414] border-[#E81414] hover:bg-[#c91212]' : 'bg-[#0A0A0A] border-white/10 hover:border-white/20'}`}>
            <p className={`text-[9px] tracking-[0.5em] font-black uppercase mb-3 ${accent ? 'text-white/70' : 'text-white/30'}`}>{label}</p>
            <p className={`text-3xl md:text-4xl font-black tracking-tighter leading-none ${accent ? 'text-white' : 'text-white'}`}>{value}</p>
            {sub && <p className={`text-[9px] tracking-[0.3em] font-black uppercase mt-2 ${accent ? 'text-white/60' : 'text-white/20'}`}>{sub}</p>}
        </div>
    );
}

// Activity feed item
function ActivityItem({ action, time, xp }: { action: string; time: string; xp: string }) {
    return (
        <div className="flex items-center justify-between py-4 border-b border-white/5 group hover:border-white/10 transition-colors">
            <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-[#E81414]/10 border border-[#E81414]/20 rounded-full flex items-center justify-center shrink-0">
                    <Activity className="w-3 h-3 text-[#E81414]" />
                </div>
                <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white">{action}</p>
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 flex items-center gap-2 mt-0.5">
                        <Clock className="w-3 h-3" /> {time}
                    </p>
                </div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#E81414]">{xp}</span>
        </div>
    );
}

// Badge component
function Badge({ label, icon, earned = true }: { label: string; icon: React.ReactNode; earned?: boolean }) {
    return (
        <div className={`flex flex-col items-center gap-3 p-5 border rounded-[1.5rem] transition-all group cursor-default ${earned ? 'bg-[#0A0A0A] border-white/10 hover:border-[#E81414]/40' : 'bg-[#050505] border-white/5 opacity-40'}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${earned ? 'bg-[#E81414]/10 border border-[#E81414]/20' : 'bg-white/5 border border-white/10'}`}>
                {icon}
            </div>
            <p className={`text-[8px] tracking-[0.3em] font-black uppercase text-center leading-tight ${earned ? 'text-white/60' : 'text-white/20'}`}>{label}</p>
        </div>
    );
}

export default function ProfilePage() {
    const router = useRouter();
    const [copied, setCopied] = useState(false);
    const [logoutConfirm, setLogoutConfirm] = useState(false);

    const handleCopyId = () => {
        navigator.clipboard.writeText('ZAP-0xDE292X-BETA');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleLogout = () => {
        if (!logoutConfirm) {
            setLogoutConfirm(true);
            setTimeout(() => setLogoutConfirm(false), 3000);
            return;
        }
        // Clear session and redirect
        sessionStorage.removeItem('skipZapstersWelcome');
        router.push('/auth/login');
    };

    return (
        <div className="w-full pb-20 space-y-8 md:space-y-12 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#E81414]/5 blur-[200px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/[0.02] blur-[150px] pointer-events-none" />

            {/* ══ HEADER ══════════════════════════════════════════════ */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end border-b border-white/10 pb-10 md:pb-16 gap-8 relative z-10">
                <div className="space-y-6 md:space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center shrink-0">
                            <img src="/suriken.png" alt="icon" className="w-5 h-5 object-contain" style={{ transform: "scale(2.2)" }} />
                        </div>
                        <span className="text-[10px] tracking-[0.6em] font-black uppercase text-white/30">OPERATIVE ID SECURE CLEARANCE V4</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-white">
                        IDENTITY<br /><span className="text-[#E81414]">REGISTRY</span>
                    </h1>
                </div>

                {/* Right meta card */}
                <div className="w-full xl:w-auto flex flex-col gap-3">
                    <div className="p-6 md:p-8 border border-white/10 bg-[#0A0A0A] rounded-[2rem] flex flex-col gap-4 min-w-[240px]">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <span className="text-[9px] tracking-[0.6em] text-white/30 uppercase font-black">AUTH STATUS</span>
                            <div className="w-2 h-2 rounded-full bg-white/20" />
                        </div>
                        <span className="text-2xl font-black uppercase tracking-widest text-[#E81414]">ACTIVE</span>
                        <div className="flex items-center gap-3">
                            <span className="text-[9px] tracking-[0.2em] font-black uppercase text-white/20 truncate">ZAP-0xDE292X-BETA</span>
                            <button onClick={handleCopyId} className="text-white/20 hover:text-white transition-colors shrink-0">
                                {copied ? <Check className="w-3 h-3 text-[#E81414]" /> : <Copy className="w-3 h-3" />}
                            </button>
                        </div>
                    </div>
                    {/* Logout button */}
                    <button
                        onClick={handleLogout}
                        className={`flex items-center justify-center gap-3 px-6 py-4 text-[10px] font-black uppercase tracking-[0.4em] rounded-full border transition-all ${logoutConfirm ? 'bg-[#E81414] border-[#E81414] text-white' : 'bg-transparent border-white/10 text-white/40 hover:border-[#E81414]/50 hover:text-[#E81414]'}`}
                    >
                        <LogOut className="w-4 h-4" />
                        {logoutConfirm ? 'CONFIRM LOGOUT' : 'LOG OUT'}
                    </button>
                </div>
            </div>

            {/* ══ IDENTITY CARD ══════════════════════════════════════ */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#050505] border border-white/10 rounded-[2.5rem] md:rounded-[3rem] relative overflow-hidden"
            >
                <DotGrid />
                <div className="relative z-10 p-6 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center font-black text-black text-3xl md:text-4xl border-4 border-white/20">
                            RS
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center border-2 border-black">
                        </div>
                    </div>

                    {/* Identity info */}
                    <div className="flex-1 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">RAJA CLAN</h2>
                            <span className="text-[10px] tracking-[0.4em] font-black uppercase text-[#E81414] border border-[#E81414]/30 px-3 py-1.5 rounded-full self-start">SHOGUN</span>
                        </div>
                        <p className="text-[11px] tracking-[0.3em] font-black uppercase text-white/30">raja@zapsters.dev</p>
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] font-black uppercase text-white/30">
                                <Globe className="w-3 h-3" /> INDIA SECTOR SOUTH ASIA
                            </div>
                            <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] font-black uppercase text-white/30">
                                <Clock className="w-3 h-3" /> ENLISTED MAR 2025
                            </div>
                        </div>
                    </div>

                    {/* Edit button */}
                    <button className="flex items-center gap-3 px-6 py-4 border border-white/10 rounded-full hover:border-white/30 transition-all text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white shrink-0">
                        <Edit3 className="w-4 h-4" /> EDIT PROFILE
                    </button>
                </div>
            </motion.div>

            {/* ══ STATS GRID ═════════════════════════════════════════ */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                <StatCard label="CLAN RANK" value="#1" sub="GLOBAL SHOGUNATE" accent />
                <StatCard label="TOTAL XP" value="4,500" sub="SEASON SCORE" />
                <StatCard label="WIN RATE" value="87%" sub="ALL MATCHES" />
                <StatCard label="KATA LEVEL" value="LVL 42" sub="MASTER TIER" />
            </div>

            {/* ══ ACTIVITY + BADGES ══════════════════════════════════ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">

                {/* Activity Feed */}
                <div className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] overflow-hidden">
                    <div className="flex items-center justify-between px-8 md:px-10 py-6 border-b border-white/10">
                        <div className="space-y-1">
                            <span className="text-[9px] tracking-[0.5em] text-white/30 font-black uppercase">RECENT</span>
                            <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter">ACTIVITY LOG</h3>
                        </div>
                        <Activity className="w-5 h-5 text-white/20" />
                    </div>
                    <div className="px-8 md:px-10 py-4">
                        <ActivityItem action="BUSHIDO CHALLENGE COMPLETED" time="2H AGO" xp="+150 XP" />
                        <ActivityItem action="KATA TRIAL RANK 1 SECURED" time="5H AGO" xp="+320 XP" />
                        <ActivityItem action="DOMAIN MASTERY ACHIEVED" time="1D AGO" xp="+500 XP" />
                        <ActivityItem action="CLAN SYNC EXECUTED" time="2D AGO" xp="+80 XP" />
                        <ActivityItem action="NINJA RECON CLEARED" time="3D AGO" xp="+200 XP" />
                    </div>
                </div>

                {/* Badges */}
                <div className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] overflow-hidden">
                    <div className="flex items-center justify-between px-8 md:px-10 py-6 border-b border-white/10">
                        <div className="space-y-1">
                            <span className="text-[9px] tracking-[0.5em] text-white/30 font-black uppercase">EARNED</span>
                            <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter">HONOURS</h3>
                        </div>
                        <Trophy className="w-5 h-5 text-white/20" />
                    </div>
                    <div className="px-8 md:px-10 py-6 grid grid-cols-3 sm:grid-cols-4 gap-3">
                        <Badge label="SHOGUN" icon={<Trophy className="w-5 h-5 text-[#E81414]" />} earned />
                        <Badge label="DOMAIN MASTER" icon={<Target className="w-5 h-5 text-[#E81414]" />} earned />
                        <Badge label="KATA ELITE" icon={<Zap className="w-5 h-5 text-[#E81414]" />} earned />
                        <Badge label="IRON SHIELD" icon={<Shield className="w-5 h-5 text-[#E81414]" />} earned />
                        <Badge label="RONIN" icon={<Shield className="w-5 h-5 text-white/20" />} earned={false} />
                        <Badge label="GRAND MASTER" icon={<Trophy className="w-5 h-5 text-white/20" />} earned={false} />
                        <Badge label="VOID NINJA" icon={<Target className="w-5 h-5 text-white/20" />} earned={false} />
                        <Badge label="GENESIS" icon={<Zap className="w-5 h-5 text-white/20" />} earned={false} />
                    </div>
                </div>
            </div>

            {/* ══ DOMAIN MASTERY ═════════════════════════════════════ */}
            <div className="bg-[#050505] border border-white/10 rounded-[2.5rem] relative overflow-hidden z-10">
                <DotGrid />
                <div className="relative z-10">
                    <div className="flex items-center justify-between px-8 md:px-12 py-6 border-b border-white/10">
                        <div className="space-y-1">
                            <span className="text-[9px] tracking-[0.5em] text-white/30 font-black uppercase">PERFORMANCE</span>
                            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter">DOMAIN MASTERY</h3>
                        </div>
                        <Link href="/domains" className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors">
                            VIEW ALL <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="px-8 md:px-12 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { domain: 'BUSHIDO', score: 97, color: '#E81414' },
                            { domain: 'CASTLE', score: 84, color: '#E81414' },
                            { domain: 'NINJA', score: 76, color: '#FFFFFF' },
                            { domain: 'RECON', score: 62, color: '#FFFFFF' },
                        ].map(({ domain, score, color }) => (
                            <div key={domain} className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] tracking-[0.3em] font-black uppercase text-white/60">{domain}</span>
                                    <span className="text-[10px] tracking-[0.2em] font-black uppercase" style={{ color }}>{score}%</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${score}%` }}
                                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ DANGER ZONE ════════════════════════════════════════ */}
            <div className="border border-[#E81414]/20 rounded-[2.5rem] p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2">
                    <span className="text-[9px] tracking-[0.6em] font-black uppercase text-[#E81414]">DANGER ZONE</span>
                    <h3 className="text-xl font-black uppercase tracking-tighter">SESSION CONTROL</h3>
                    <p className="text-[10px] tracking-[0.2em] font-black uppercase text-white/30">TERMINATE YOUR ACTIVE SHOGUNATE SESSION AND CLEAR ALL LOCAL CREDENTIALS.</p>
                </div>
                <button
                    onClick={handleLogout}
                    className={`flex items-center gap-3 px-8 py-4 text-[11px] font-black uppercase tracking-[0.4em] rounded-full border transition-all shrink-0 ${logoutConfirm ? 'bg-[#E81414] border-[#E81414] text-white' : 'border-[#E81414]/40 text-[#E81414] hover:bg-[#E81414] hover:text-white'}`}
                >
                    <LogOut className="w-4 h-4" />
                    {logoutConfirm ? 'CLICK AGAIN TO CONFIRM' : 'LOG OUT'}
                </button>
            </div>
        </div>
    );
}

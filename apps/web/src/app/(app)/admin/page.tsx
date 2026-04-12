'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Users, Activity, Terminal, Database, Code, Eye } from 'lucide-react';
import { GOTIcon, type GOTIconProps } from '@/components/icons/GOTIcon';
import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { HUDCard } from '@/components/ui/HUDCard';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { UserRole } from '@zapsters/database';

export default function AdminPage() {
    const { user, isAuthenticated } = useAuthStore();
    const router = useRouter();

    const [mounted, setMounted] = useState(false);
    const [systemStats, setSystemStats] = useState({ totalUsers: 0, totalTeams: 0 });
    const [monitoringData, setMonitoringData] = useState<{ 
        activeSessions: any[]; 
        onlineCount: number; 
    }>({ activeSessions: [], onlineCount: 0 });

    useEffect(() => {
        setMounted(true);
        if (!isAuthenticated || user?.role !== UserRole.ADMIN) {
            router.push('/dashboard');
            return;
        }
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/stats');
                if (res.ok) {
                    const data = await res.json();
                    setSystemStats({
                        totalUsers: data.stats?.totalUsers ?? 0,
                        totalTeams: data.teams?.length ?? 0,
                    });
                }
            } catch (_) { /* silent — show cached */ }
        };

        const fetchMonitoring = async () => {
            try {
                const res = await fetch('/api/monitoring');
                if (res.ok) {
                    setMonitoringData(await res.json());
                }
            } catch (_) {}
        };

        fetchStats();
        fetchMonitoring();
        const timer = setInterval(fetchMonitoring, 30000); // 30s update cycle
        return () => clearInterval(timer);
    }, [isAuthenticated, user, router]);

    const logs = [
        { time: '09:21:42', category: 'AUTH',     message: 'ROOT IDENTIFIER SYNCED FROM NODE ALPHA',            type: 'default'  },
        { time: '09:22:15', category: 'KERNEL',   message: 'DB SHARD SEQUENCE 04 INITIATED — BACKUP COMPLETE',  type: 'accent'   },
        { time: '09:24:01', category: 'CRITICAL', message: 'MEMORY SPIKE US EAST 01 — AUTO SCALING TRIGGERED',  type: 'critical' },
        { time: '09:28:30', category: 'MISSION',  message: 'BRACKET MATRIX GENERATED FOR 4204 UNITS',           type: 'default'  },
        { time: '09:31:00', category: 'SYNC',     message: 'REAL-TIME LEADERBOARD PIPELINE REFRESHED',          type: 'default'  },
    ];

    const quickActions = [
        { title: 'SITUATION ROOM', val: 'REAL-TIME OPS', sub: 'Live challenge monitoring', href: '/admin/monitoring', icon: <GOTIcon type="shield" size={80} />, accent: true },
        { title: 'RECRUITMENT',   val: 'MANAGE OPERATIVES', sub: 'Global personnel access', href: '/teams', icon: <GOTIcon type="globe" size={80} /> },
        { title: 'DIAGNOSTICS',   val: 'SYSTEM AUDIT',      sub: 'Kernel fault scanner',     href: '/analytics', icon: <GOTIcon type="shield" size={80} /> },
        { title: 'DATA CORE',     val: 'DB CONSOLE',        sub: 'Shard sequence control',   href: '/operations', icon: <GOTIcon type="lock" size={80} /> },
    ];

    const statsData = [
        { label: 'SYSTEM INTEGRITY', value: '100%',                                                      Icon: Shield   },
        { label: 'ACTIVE NODES',     value: mounted ? String(systemStats.totalUsers || '—') : '—',       Icon: Users    },
        { label: 'SYNC RATE',        value: '98.2%',                                                     Icon: Activity },
    ];

    return (
        <div className="w-full space-y-12 pb-20 relative">
            <DotGrid />

            {/* Header — same dynamic tag pattern as Dashboard */}
            <PageHeader
                tag={`NODE: ${user?.email?.split('@')[0]?.toUpperCase() ?? 'ROOT'} — ACCESS LEVEL: ${user?.role ?? 'ADMIN'}`}
                title="SYSTEM"
                accentTitle="OVERWATCH"
            />

            {/* Core Metrics — identical card style to Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {statsData.map(({ label, value, Icon }, i) => (
                    <div
                        key={i}
                        className="p-10 bg-white/5 border border-white/10 rounded-[2rem] flex flex-col justify-between hover:border-[#E81414]/30 transition-all shadow-2xl shadow-black/50"
                    >
                        <span className="text-[10px] tracking-[0.4em] font-black text-white/20 uppercase">
                            {label}
                        </span>
                        <div className="flex items-end justify-between">
                            <span className="text-5xl font-black text-white tabular-nums">
                                {value}
                            </span>
                            <Icon className="text-[#E81414] w-8 h-8 opacity-40 mb-1" />
                        </div>
                    </div>
                ))}
            </div>

            {/* LIVE FIELD FEED — Real-time team monitoring */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <HUDCard
                    title="OPERATIVE SPECTATING"
                    tag="LIVE FEED"
                    icon={<Activity className="text-[#E81414]" />}
                    statusLabel={`${monitoringData.activeSessions.length} UNITS IN OPERATION`}
                >
                    <div className="divide-y divide-white/5 max-h-[400px] overflow-y-auto custom-scrollbar">
                        {monitoringData.activeSessions.length === 0 ? (
                            <div className="p-12 text-center text-white/10 font-black uppercase tracking-[0.4em]">
                                NO ACTIVE COMBATANTS
                            </div>
                        ) : monitoringData.activeSessions.map((session, i) => (
                            <div key={session.id} className="p-8 flex items-center justify-between group hover:bg-white/5 transition-all">
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <img 
                                            src={session.user.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.name}`} 
                                            className="w-14 h-14 rounded-full border-2 border-white/10" 
                                            alt="" 
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black bg-[#E81414] animate-pulse" title="ONLINE" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-sm font-black text-white uppercase tracking-wider">{session.user.name}</div>
                                        <div className="text-[10px] text-[#E81414] font-black tracking-widest uppercase">
                                            {session.team.name}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right space-y-2">
                                    <div className="flex items-center gap-2 justify-end">
                                        {session.status === 'CODING' ? (
                                            <Code className="w-3 h-3 text-[#E81414] animate-pulse" />
                                        ) : (
                                            <Eye className="w-3 h-3 text-white/30" />
                                        )}
                                        <div className="text-[11px] font-black text-white/80 uppercase group-hover:text-[#E81414] transition-colors">
                                            {session.challenge.title}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 justify-end">
                                        <div className="text-[9px] text-white/20 font-black tracking-widest uppercase">
                                            {new Date(session.joinedAt).toLocaleTimeString()}
                                        </div>
                                        <button 
                                            onClick={() => window.location.href = `/workspace?spectate=${session.user.id}`}
                                            className="text-[9px] bg-white/10 hover:bg-[#E81414] text-white py-1 px-3 rounded-full font-black uppercase tracking-widest transition-all"
                                        >
                                            SPECTATE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </HUDCard>

                <HUDCard
                    title="SYSTEM LOGS"
                    tag="LIVE SYNC"
                    icon={<Database className="text-[#E81414]" />}
                    statusLabel="OPERATIONAL"
                >
                    <div className="divide-y divide-white/5">
                        {logs.map((log, i) => (
                            <div
                                key={i}
                                className={`
                                    px-8 py-6
                                    flex items-center gap-8
                                    group cursor-pointer
                                    hover:bg-[#E81414] transition-all duration-300
                                    ${log.type === 'critical' ? 'bg-[#E81414]/5 border-l-4 border-l-[#E81414]' : ''}
                                `}
                            >
                                <span className="text-[10px] font-black tracking-widest text-white/20 group-hover:text-black">
                                    {log.time}
                                </span>
                                <span className="text-[11px] font-black truncate text-white/40 group-hover:text-black">
                                    {log.message}
                                </span>
                            </div>
                        ))}
                    </div>
                </HUDCard>
            </div>

            {/* Quick Actions — exact same card pattern as Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {quickActions.map((mod, i) => (
                    <div
                        key={i}
                        onClick={() => (window.location.href = mod.href)}
                        className={`
                            cursor-pointer group relative h-[250px] p-10
                            flex flex-col justify-between
                            border transition-all duration-500 rounded-[2rem] overflow-hidden
                            ${mod.accent
                                ? 'bg-white border-white text-black hover:bg-[#E81414] hover:border-[#E81414]'
                                : 'bg-black border-white/10 hover:bg-[#E81414] text-white hover:text-black shadow-2xl shadow-black/50 hover:border-[#E81414]'}
                        `}
                    >
                        <DotGrid opacity={mod.accent ? 'opacity-[0.05]' : 'opacity-[0.03]'} />

                        {/* Icon */}
                        <div className="flex justify-between items-start relative z-10 w-full">
                            <div className="flex items-center justify-start text-[#E81414] group-hover:text-black transition-colors duration-500">
                                {React.cloneElement(mod.icon as React.ReactElement<GOTIconProps>, { scale: 1.6, x: 0, y: 0 })}
                            </div>
                        </div>

                        {/* Label + Value */}
                        <div className="space-y-6 relative z-10 mt-auto pt-6">
                            <div className="space-y-2">
                                <p className={`text-xs md:text-sm tracking-[0.2em] font-black uppercase opacity-60 transition-colors duration-500 ${mod.accent ? 'text-black' : 'text-white group-hover:text-black'}`}>
                                    {mod.title}
                                </p>
                                <p className={`text-2xl md:text-3xl font-black uppercase leading-tight transition-colors duration-500 ${mod.accent ? 'text-black' : 'text-white group-hover:text-black'}`}>
                                    {mod.val}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className={`h-[2px] w-8 rounded-full transition-colors duration-500 ${mod.accent ? 'bg-black' : 'bg-[#E81414] group-hover:bg-black'}`} />
                                <p className={`text-[9px] tracking-[0.1em] font-black uppercase opacity-50 transition-colors duration-500 ${mod.accent ? 'text-black' : 'text-white group-hover:text-black'}`}>
                                    {mod.sub}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

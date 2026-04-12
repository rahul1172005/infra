'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Shield, Users, Terminal, Code, Eye, Lock, CheckCircle, Zap } from 'lucide-react';
import { GOTIcon } from '@/components/icons/GOTIcon';
import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { HUDCard } from '@/components/ui/HUDCard';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { UserRole } from '@zapsters/database';
import { io, Socket } from 'socket.io-client';

interface ActiveSession {
    id: string;
    status: 'CODING' | 'VIEWING';
    joinedAt: string;
    user: { name: string; picture: string; status: string };
    team: { name: string };
    challenge: { title: string };
}

interface Completion {
    id: string;
    team: { name: string };
    user: { name: string };
    challenge: { title: string };
    pointsEarned: number;
    completedAt: string;
}

export default function MonitoringPage() {
    const { user, isAuthenticated } = useAuthStore();
    const router = useRouter();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [data, setData] = useState<{ activeSessions: ActiveSession[], latestCompletions: Completion[], onlineCount: number }>({
        activeSessions: [],
        latestCompletions: [],
        onlineCount: 0
    });

    useEffect(() => {
        if (!isAuthenticated || user?.role !== UserRole.ADMIN) {
            router.push('/dashboard');
            return;
        }

        const fetchData = async () => {
            try {
                const token = useAuthStore.getState().token;
                if (!token) return;

                // Use internal relative API route to bridge the backend and avoid CORS
                const res = await fetch('/api/monitoring', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                if (res.ok) {
                    setData(await res.json());
                } else {
                    console.warn(`Internal monitoring status: ${res.status}`);
                }
            } catch (err) {
                console.error('Observation sync failed:', err);
            }
        };

        fetchData();

        const s = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000');
        setSocket(s);

        s.on('system_stats_update', fetchData);
        s.on('leaderboardUpdate', fetchData);

        return () => {
            s.disconnect();
        };
    }, [isAuthenticated, user, router]);

    return (
        <div className="w-full space-y-12 pb-20 relative">
            <DotGrid />

            <PageHeader
                tag="ADMIN OVERWATCH — REAL-TIME MONITORING"
                title="SITUATION"
                accentTitle="ROOM"
            />

            {/* LIVE ACTIVITY FEED */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                <HUDCard
                    title="ACTIVE CODING SESSIONS"
                    tag="LIVE"
                    icon={<Terminal className="text-[#E81414]" />}
                    statusLabel={`${data.activeSessions.length} SESSIONS — ${data.onlineCount} AGENTS ONLINE`}
                >
                    <div className="divide-y divide-white/5 max-h-[500px] overflow-y-auto">
                        {data.activeSessions.length === 0 ? (
                            <div className="p-10 text-center text-white/20 font-black uppercase tracking-widest">
                                NO ACTIVE SESSIONS DETECTED
                            </div>
                        ) : data.activeSessions.map((session) => (
                            <div key={session.id} className="p-6 flex items-center justify-between group hover:bg-white/5 transition-all">
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <img src={session.user.picture || 'https://via.placeholder.com/40'} className="w-12 h-12 rounded-full border-2 border-white/10" alt="" />
                                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black ${session.status === 'CODING' ? 'bg-[#E81414] animate-pulse' : 'bg-white/40'}`} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-black text-white uppercase">{session.user.name}</div>
                                        <div className="text-[10px] text-[#E81414] font-black tracking-widest">{session.team.name}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-2 justify-end">
                                        {session.status === 'CODING' ? <Code className="w-3 h-3 text-[#E81414]" /> : <Eye className="w-3 h-3 text-white/40" />}
                                        <span className="text-[11px] font-black text-white hover:text-[#E81414] transition-colors uppercase">{session.challenge.title}</span>
                                    </div>
                                    <div className="text-[9px] text-white/20 font-black tracking-tighter uppercase mt-1">
                                        JOINED {new Date(session.joinedAt).toLocaleTimeString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </HUDCard>

                <HUDCard
                    title="LATEST COMPLETIONS"
                    tag="INTEL"
                    icon={<CheckCircle className="text-[#E81414]" />}
                >
                    <div className="divide-y divide-white/5 max-h-[500px] overflow-y-auto">
                        {data.latestCompletions.length === 0 ? (
                            <div className="p-10 text-center text-white/20 font-black uppercase tracking-widest">
                                AWAITING MISSION SUCCESS...
                            </div>
                        ) : data.latestCompletions.map((comp) => (
                            <div key={comp.id} className="p-6 flex items-center justify-between bg-[#E81414]/5 group hover:bg-[#E81414]/10 transition-all border-l-2 border-[#E81414]/50">
                                <div className="flex items-center gap-4">
                                    <Zap className="w-5 h-5 text-[#E81414]" />
                                    <div>
                                        <div className="text-sm font-black text-white uppercase">{comp.team.name}</div>
                                        <div className="text-[10px] text-[#E81414] font-black tracking-widest">SOLVED BY {comp.user.name}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-black text-white">+{comp.pointsEarned}</div>
                                    <div className="text-[9px] text-white/40 font-black tracking-widest uppercase">
                                        {comp.challenge.title}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </HUDCard>
            </div>

            {/* QUICK MONITORING STATS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                {[
                    { label: 'THREAT LEVEL', value: 'NORMAL', color: 'text-white/60' },
                    { label: 'SYS LOAD', value: '42.1%', color: 'text-white' },
                    { label: 'QUEUE', value: '0 UNITS', color: 'text-white/40' },
                    { label: 'ACCESS CONTROL', value: 'STRICT', color: 'text-[#E81414]' },
                ].map((stat, i) => (
                    <div key={i} className="p-8 bg-black/40 border border-white/5 rounded-2xl">
                        <div className="text-[9px] font-black tracking-[0.3em] text-white/20 uppercase mb-2">{stat.label}</div>
                        <div className={`text-2xl font-black uppercase ${stat.color}`}>{stat.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, LogOut, Edit3, Target, Activity, Clock, Copy, Check } from 'lucide-react';
import { GOTIcon } from '@/components/icons/GOTIcon';
import { Button } from '@/components/ui/Button';
import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { HUDCard } from '@/components/ui/HUDCard';
import { StatGrid } from '@/components/ui/StatGrid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/useAuthStore';

// Activity feed item
function ActivityItem({ action, time, coins }: { action: string; time: string; coins: string }) {
    return (
        <div className="flex items-center justify-between py-6 md:py-8 border-b border-white/5 last:border-0 group hover:bg-[#E81414] hover:text-black px-6 md:px-10 transition-all cursor-pointer">
            <div className="flex items-center gap-6 md:gap-10">
                <div className="flex items-center justify-center shrink-0">
                    <GOTIcon type="zap" size={32} scale={1.6} x={0} y={0} className="text-[#E81414] group-hover:text-black" />
                </div>
                <div className="space-y-1">
                    <p className="text-[11px] font-black uppercase tracking-[0.3em]">{action}</p>
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30 group-hover:opacity-60 flex items-center gap-3 mt-0.5">
                        <Clock className="w-3 h-3" /> {time}
                    </p>
                </div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] tabular-nums group-hover:text-black">{coins}</span>
        </div>
    );
}

export default function ProfilePage() {
    const router = useRouter();
    const { user: storeUser, isAuthenticated, logout, login, token } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [logoutConfirm, setLogoutConfirm] = useState(false);
    const [selectedBadge, setSelectedBadge] = useState<any>(null);

    // Profile page implementation
    const [profile, setProfile] = useState({
        name: storeUser?.name || 'ANONYMOUS USER',
        fullName: storeUser?.fullName || '',
        nickname: storeUser?.nickname || '',
        house: storeUser?.house || '',
        role: storeUser?.role || 'RECRUIT',
        email: storeUser?.email || 'anon@realm.dev',
        avatar: storeUser?.picture || null,
        xp: storeUser?.xp || 0,
        level: storeUser?.level || 1,
        mmr: storeUser?.mmr || 1000,
        submissions: storeUser?._count?.submissions || 0,
        matchesWon: storeUser?._count?.matchesWon || 0,
        teamName: (storeUser as any)?.team?.name || ''
    });

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/auth/login');
            return;
        }

        const fetchFullProfile = async () => {
            try {
                const response = await fetch('/api/auth/me', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const fullData = await response.json();
                    login(fullData, token as string);
                    setProfile({
                        name: fullData.name,
                        fullName: fullData.fullName || '',
                        nickname: fullData.nickname || '',
                        house: fullData.house || '',
                        role: fullData.role,
                        email: fullData.email,
                        avatar: fullData.picture,
                        xp: fullData.xp,
                        level: fullData.level,
                        mmr: fullData.mmr,
                        submissions: fullData._count?.submissions || 0,
                        matchesWon: fullData._count?.matchesWon || 0,
                        teamName: fullData.team?.name || ''
                    });
                }
            } catch (err) {
                console.error('Failed to fetch full profile:', err);
            }
        };

        fetchFullProfile();
    }, [isAuthenticated, token]);

    const handleLogout = () => {
        if (!logoutConfirm) {
            setLogoutConfirm(true);
            setTimeout(() => setLogoutConfirm(false), 3000);
            return;
        }
        logout();
        router.push('/');
    };

    const handleSave = async () => {
        try {
            const response = await fetch('/api/auth/me', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: profile.name,
                    fullName: profile.fullName,
                    nickname: profile.nickname,
                    house: profile.house,
                    picture: profile.avatar
                })
            });
            if (response.ok) {
                const updatedUser = await response.json();
                login(updatedUser, token as string);
                setIsEditing(false);
            }
        } catch (err) {
            console.error('Update failed:', err);
        }
    };

    const getInitials = (name: string) => {
        if (!name) return '??';
        return name.split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    const BADGES = [
        { id: 'warden', label: "WARDEN", type: 'trophy', earned: profile.level >= 10, requirements: ["REACH LVL 10", "COMPLETE 5 QUESTS"] },
        { id: 'master', label: "DOMAIN MASTER", type: 'globe', earned: profile.submissions >= 10, requirements: ["CONQUER 3 PROVINCES", "MAINTAIN 80% SCORE"] },
        { id: 'elite', label: "COMBAT ELITE", type: 'zap', earned: profile.matchesWon >= 5, requirements: ["WIN 5 BATTLES", "NO LOSS STREAK > 3"] },
        { id: 'shield', label: "IRON SHIELD", type: 'shield', earned: true, requirements: ["DEFEND KINGDOM 10 TIMES", "PARTICIPATE IN 5 SIEGES"] },
    ];

    return (
        <div className="w-full pb-20 space-y-8 md:space-y-12 relative">
            <DotGrid />

            <PageHeader
                tag={`CLEARANCE V4 — ${profile.house || profile.teamName || 'UNASSIGNED'}`}
                title={<>IDENTITY<br /><span className="text-[#E81414]">REGISTRY</span></>}
                actions={
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            icon={isEditing ? Check : Edit3}
                            variant={isEditing ? 'secondary' : 'outline'}
                            fullWidth
                            className="py-4"
                        >
                            {isEditing ? 'CONSOLIDATE CHANGES' : 'EDIT IDENTITY'}
                        </Button>
                        <Button
                            onClick={handleLogout}
                            icon={LogOut}
                            variant={logoutConfirm ? 'secondary' : 'outline'}
                            fullWidth
                            className="py-4"
                        >
                            {logoutConfirm ? 'CONFIRM LOGOUT' : 'LOG OUT'}
                        </Button>
                    </div>
                }
            />

            <HUDCard padding="none" className="overflow-hidden border-[#E81414]/20">
                <div className="p-10 md:p-14 lg:p-20 flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-14 relative z-10">
                    <div className="relative shrink-0 group">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center font-black text-black text-3xl md:text-4xl relative z-10 overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                            {profile.avatar ? (
                                <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                getInitials(profile.nickname || profile.name)
                            )}
                        </div>
                        {isEditing && (
                            <div className="absolute inset-0 bg-black/60 z-20 flex flex-col items-center justify-center rounded-full border-2 border-white/20 border-dashed">
                                <Activity className="w-6 h-6 text-white mb-2" />
                                <span className="text-[8px] font-black tracking-widest text-center px-4 leading-tight opacity-60">PASTE URL IN FIELD</span>
                            </div>
                        )}
                    </div>

                    <div className="flex-1 space-y-8 w-full">
                        {isEditing ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] tracking-[0.4em] font-black uppercase text-white/30">DISPLAY NAME</label>
                                    <input
                                        type="text"
                                        value={profile.name}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-black uppercase tracking-widest text-sm focus:outline-none focus:border-[#E81414]/50 transition-colors"
                                        placeholder="USER NAME"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] tracking-[0.4em] font-black uppercase text-white/30">FULL NAME</label>
                                    <input
                                        type="text"
                                        value={profile.fullName}
                                        onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-black uppercase tracking-widest text-sm focus:outline-none focus:border-[#E81414]/50 transition-colors"
                                        placeholder="YOUR REAL NAME"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] tracking-[0.4em] font-black uppercase text-white/30">NICKNAME</label>
                                    <input
                                        type="text"
                                        value={profile.nickname}
                                        onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-black uppercase tracking-widest text-sm focus:outline-none focus:border-[#E81414]/50 transition-colors"
                                        placeholder="ALIAS"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] tracking-[0.4em] font-black uppercase text-white/30">HOUSE / FACTION</label>
                                    <input
                                        type="text"
                                        value={profile.house}
                                        onChange={(e) => setProfile({ ...profile, house: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-black uppercase tracking-widest text-sm focus:outline-none focus:border-[#E81414]/50 transition-colors"
                                        placeholder="HOUSE NAME"
                                    />
                                </div>
                                <div className="space-y-4 md:col-span-2">
                                    <label className="text-[10px] tracking-[0.4em] font-black uppercase text-white/30">AVATAR URL</label>
                                    <input
                                        type="text"
                                        value={profile.avatar || ''}
                                        onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-black uppercase tracking-widest text-sm focus:outline-none focus:border-[#E81414]/50 transition-colors"
                                        placeholder="IMAGE URL"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                                    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">
                                        {profile.nickname || profile.name}
                                    </h2>
                                    {profile.role && (
                                        <span className="text-[10px] tracking-[0.4em] font-black uppercase text-[#E81414] border border-[#E81414]/30 px-5 py-2 rounded-full self-start">
                                            {profile.role}
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] tracking-[0.4em] font-black uppercase text-white/40">
                                    <span>{profile.email}</span>
                                    {profile.house && <span className="text-white/20">• HOUSE {profile.house}</span>}
                                    <span className="text-white/20">• MMR {profile.mmr}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </HUDCard>

            <StatGrid stats={[
                { title: "BATTLE RECORD", value: `${profile.matchesWon} WON`, icon: (props: any) => <GOTIcon type="trophy" {...props} scale={1.6} x={0} y={0} />, color: "text-[#E81414]" },
                { title: "HONOR XP", value: profile.xp.toLocaleString(), icon: (props: any) => <GOTIcon type="zap" {...props} scale={1.6} x={0} y={0} />, color: "text-white" },
                { title: "SUBMISSIONS", value: profile.submissions.toString(), icon: (props: any) => <GOTIcon type="hand" {...props} scale={1.6} x={0} y={0} />, color: "text-white" },
                { title: "REALM LEVEL", value: `LVL ${profile.level}`, icon: (props: any) => <GOTIcon type="shield" {...props} scale={1.6} x={0} y={0} />, color: "text-[#E81414]" }
            ]} variant="oversight" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
                <HUDCard title="ACTIVITY LOG" padding="none" tag="RECENT" icon={<GOTIcon type="zap" size={56} className="text-[#E81414]" scale={1.6} x={0} y={0} />}>
                    <div className="divide-y divide-white/5 bg-black/20">
                        <ActivityItem action="REGISTRY INITIALIZED" time="JUST NOW" coins="+0 COINS" />
                        <ActivityItem action="AUTH SYNC COMPLETE" time="RECENT" coins="+0 COINS" />
                    </div>
                </HUDCard>

                <HUDCard title="HONOURS" tag="LEGACY" padding="none" icon={<GOTIcon type="trophy" size={56} className="text-[#E81414]" scale={1.6} x={0} y={0} />}>
                    <div className="p-10 md:p-14 bg-black/20">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                            {BADGES.map((badge) => (
                                <div
                                    key={badge.id}
                                    onClick={() => setSelectedBadge(badge)}
                                    className={`flex flex-col items-center gap-8 p-10 rounded-[2rem] transition-all duration-300 group cursor-pointer relative overflow-hidden ${badge.earned ? 'bg-white/5 text-white hover:bg-[#E81414] hover:text-black' : 'bg-black/40 text-white/20 grayscale opacity-40'}`}
                                >
                                    <div className={`flex items-center justify-center transition-colors duration-300 ${badge.earned ? 'text-[#E81414] group-hover:text-black' : 'text-white/20'}`}>
                                        <GOTIcon type={badge.type as any} size={48} scale={1.6} x={0} y={0} />
                                    </div>
                                    <p className={`text-[10px] tracking-[0.4em] font-black uppercase text-center leading-tight`}>{badge.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {selectedBadge && (
                        <div className="absolute inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col p-10 md:p-14 animate-in fade-in zoom-in duration-300">
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <span className="text-[10px] tracking-[0.6em] font-black uppercase text-[#E81414]">REQUIREMENTS</span>
                                    <h4 className="text-3xl font-black uppercase tracking-tighter mt-2">{selectedBadge.label}</h4>
                                </div>
                                <button onClick={() => setSelectedBadge(null)} className="text-white/30 hover:text-white transition-colors text-2xl font-black">✕</button>
                            </div>
                            <div className="space-y-6 flex-1">
                                {selectedBadge.requirements.map((req: string, idx: number) => (
                                    <div key={idx} className="flex items-center gap-6 p-6 bg-white/[0.03] border border-white/5 rounded-2xl">
                                        <div className="w-8 h-8 flex items-center justify-center text-[#E81414] font-black text-xs border border-[#E81414]/30 rounded-full">{idx + 1}</div>
                                        <span className="text-xs font-black tracking-widest uppercase text-white/60">{req}</span>
                                    </div>
                                ))}
                            </div>
                            <Button onClick={() => setSelectedBadge(null)} variant="outline" fullWidth className="py-4 mt-10">ACKNOWLEDGED</Button>
                        </div>
                    )}
                </HUDCard>
            </div>
        </div>
    );
}

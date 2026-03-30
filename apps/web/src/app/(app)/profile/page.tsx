'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, LogOut, Edit3, Target, Activity, Clock, Copy, Check } from 'lucide-react';
import { GOTIcon } from '@/components/icons/GOTIcon';
import { Button } from '@/components/ui/Button';
import { SurikenIcon } from '@/components/icons/SurikenIcon';
import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { HUDCard } from '@/components/ui/HUDCard';
import { MetaCard } from '@/components/ui/MetaCard';
import { StatGrid } from '@/components/ui/StatGrid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

// Profile page implementation starting with ProfilePage component
export default function ProfilePage() {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [copied, setCopied] = useState(false);
    const [logoutConfirm, setLogoutConfirm] = useState(false);
    const [selectedBadge, setSelectedBadge] = useState<any>(null);

    // Dynamic User State
    const [user, setUser] = useState({
        name: 'HOUSE RAJA',
        house: 'TARGARYEN',
        class: 'WARDEN',
        email: 'raja@realm.dev',
        avatar: null as string | null,
        sector: 'INDIA SECTOR SOUTH ASIA',
        joined: 'MAR 2025'
    });

    useEffect(() => {
        const stored = localStorage.getItem('user_profile');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setUser(prev => ({
                    ...prev,
                    name: parsed.name || prev.name,
                    house: parsed.house || prev.house,
                    class: parsed.class || prev.class,
                    avatar: parsed.avatar || prev.avatar
                }));
            } catch (e) {
                console.error("Failed to parse user profile", e);
            }
        }
    }, []);

    const handleCopyId = () => {
        navigator.clipboard.writeText('GOT-0xDE292X-BETA');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSaveProfile = () => {
        setIsEditing(false);
        // Persist to localStorage for global sync
        localStorage.setItem('user_profile', JSON.stringify({
            name: user.name,
            class: user.class,
            avatar: user.avatar
        }));
        // Trigger global event
        window.dispatchEvent(new Event('profile_update'));
    };

    const handleLogout = () => {
        if (!logoutConfirm) {
            setLogoutConfirm(true);
            setTimeout(() => setLogoutConfirm(false), 3000);
            return;
        }
        sessionStorage.removeItem('skipRealmWelcome');
        router.push('/auth/login');
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setUser(prev => ({ ...prev, avatar: result }));
                // Also update localStorage for immediate navbar update (if navbar uses it)
                const current = JSON.parse(localStorage.getItem('user_profile') || '{}');
                localStorage.setItem('user_profile', JSON.stringify({ ...current, avatar: result }));
                window.dispatchEvent(new Event('profile_update'));
            };
            reader.readAsDataURL(file);
        }
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    // Badge Requirements Logic
    const BADGES = [
        { id: 'warden', label: "WARDEN", type: 'trophy', earned: true, requirements: ["REACH LVL 10", "COMPLETE 5 QUESTS"] },
        { id: 'master', label: "DOMAIN MASTER", type: 'globe', earned: true, requirements: ["CONQUER 3 PROVINCES", "MAINTAIN 80% SCORE"] },
        { id: 'elite', label: "COMBAT ELITE", type: 'zap', earned: true, requirements: ["WIN 20 BATTLES", "NO LOSS STREAK > 3"] },
        { id: 'shield', label: "IRON SHIELD", type: 'shield', earned: true, requirements: ["DEFEND KINGDOM 10 TIMES", "PARTICIPATE IN 5 SIEGES"] },
        { id: 'outcast', label: "OUTCAST", type: 'shield', earned: false, requirements: ["FAIL 5 QUESTS IN A ROW", "LOSE ALL COINS"] },
        { id: 'grand', label: "GRAND MASTER", type: 'trophy', earned: false, requirements: ["REACH LVL 100", "CONTROL 7 PROVINCES"] },
        { id: 'watch', label: "NIGHT WATCH", type: 'globe', earned: false, requirements: ["EXPLORE NORTHERN BORDER", "SILENT RECON FOR 48H"] },
        { id: 'genesis', label: "GENESIS", type: 'zap', earned: false, requirements: ["FIRST 1% OF PLAYERS", "ALPHA ACCESS REQUIRED"] },
    ];

    return (
        <div className="w-full pb-20 space-y-8 md:space-y-12 relative">
            <DotGrid />

            {/* ══ HEADER ══════════════════════════════════════════════ */}
            <PageHeader
                tag="HOUSE ID ROYAL CLEARANCE V4"
                title={<>IDENTITY<br /><span className="text-[#E81414]">REGISTRY</span></>}
                actions={
                    <div className="flex flex-col gap-3">
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

            {/* ══ IDENTITY CARD ══════════════════════════════════════ */}
            <HUDCard padding="none" className="overflow-hidden">
                <div className="p-10 md:p-14 lg:p-20 flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-14 relative z-10">
                    {/* Avatar Module */}
                    <div className="relative shrink-0 group">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center font-black text-black text-3xl md:text-4xl relative z-10 overflow-hidden">
                            {user.avatar ? (
                                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                getInitials(user.name)
                            )}

                            {isEditing && (
                                <label className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                                    <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                                    <Edit3 className="w-6 h-6 text-white" />
                                </label>
                            )}
                        </div>
                        {/* Shield icon removed from absolute background as per user request */}
                    </div>

                    <div className="flex-1 space-y-6 w-full">
                        {isEditing ? (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[9px] tracking-[0.4em] font-black uppercase text-white/30">HOUSE NAME</label>
                                        <input
                                            type="text"
                                            value={user.name}
                                            onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value.toUpperCase() }))}
                                            className="w-full bg-white/5 border border-white/10 px-6 py-4 text-xl font-black tracking-tight outline-none focus:border-[#E81414]/50 transition-all text-white uppercase rounded-xl"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] tracking-[0.4em] font-black uppercase text-white/30">CLEARANCE LEVEL</label>
                                        <select
                                            value={user.class}
                                            onChange={(e) => setUser(prev => ({ ...prev, class: e.target.value }))}
                                            className="w-full bg-white/5 border border-white/10 px-6 py-4 text-xl font-black tracking-tight outline-none focus:border-[#E81414]/50 transition-all text-white uppercase rounded-xl appearance-none"
                                        >
                                            <option value="WARDEN">WARDEN</option>
                                            <option value="KNIGHT">KNIGHT</option>
                                            <option value="MASTER">MASTER</option>
                                            <option value="FORGE">FORGE</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter ">{user.name}</h2>
                                    <div className="flex flex-wrap gap-3">
                                        <span className="text-[10px] tracking-[0.4em] font-black uppercase text-[#E81414] border border-[#E81414]/30 px-5 py-2 rounded-full self-start">{user.class}</span>
                                        <span className="text-[10px] tracking-[0.4em] font-black uppercase text-white/50 border border-white/10 px-5 py-2 rounded-full self-start">HOUSE {user.house}</span>
                                    </div>
                                </div>
                                <p className="text-[11px] tracking-[0.4em] font-black uppercase text-white/30">{user.email}</p>
                            </div>
                        )}

                        <div className="flex flex-wrap items-center gap-6 pt-2">
                            <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] font-black uppercase text-white/30">
                                <GOTIcon type="globe" size={24} scale={1.6} x={0} y={0} /> {user.sector}
                            </div>
                            <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] font-black uppercase text-white/30">
                                <Clock className="w-4 h-4" /> ANOINTED {user.joined}
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                        icon={isEditing ? Check : Edit3}
                        variant={isEditing ? "outline" : "primary"}
                        className="w-full md:w-auto px-10 py-5"
                    >
                        {isEditing ? "SAVE REGISTRY" : "EDIT PROFILE"}
                    </Button>
                </div>
            </HUDCard>

            {/* ══ STATS GRID ═════════════════════════════════════════ */}
            <StatGrid stats={[
                { title: "HOUSE RANK", value: "1", icon: (props: any) => <GOTIcon type="trophy" {...props} scale={1.6} x={0} y={0} />, color: "text-[#E81414]" },
                { title: "TOTAL COINS", value: "4,500", icon: (props: any) => <GOTIcon type="zap" {...props} scale={1.6} x={0} y={0} />, color: "text-white" },
                { title: "WIN RATE", value: "87%", icon: (props: any) => <GOTIcon type="hand" {...props} scale={1.6} x={0} y={0} />, color: "text-white" },
                { title: "REALM LEVEL", value: "LVL 42", icon: (props: any) => <GOTIcon type="shield" {...props} scale={1.6} x={0} y={0} />, color: "text-[#E81414]" }
            ]} variant="oversight" />

            {/* ══ ACTIVITY + BADGES ══════════════════════════════════ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
                {/* Activity Log */}
                <HUDCard
                    title="ACTIVITY LOG"
                    padding="none"
                    tag="RECENT"
                    icon={<GOTIcon type="zap" size={56} className="text-[#E81414]" scale={1.6} x={0} y={0} />}
                >
                    <div className="divide-y divide-white/5 bg-black/20">
                        <ActivityItem action="KNIGHTHOOD CHALLENGE COMPLETED" time="2H AGO" coins="+150 COINS" />
                        <ActivityItem action="COMBAT TRIAL RANK 1 SECURED" time="5H AGO" coins="+320 COINS" />
                        <ActivityItem action="DOMAIN MASTERY ACHIEVED" time="1D AGO" coins="+500 COINS" />
                        <ActivityItem action="HOUSE SYNC EXECUTED" time="2D AGO" coins="+80 COINS" />
                        <ActivityItem action="VALYRIAN RECON CLEARED" time="3D AGO" coins="+200 COINS" />
                    </div>
                </HUDCard>

                {/* Honours */}
                <HUDCard
                    title="HONOURS"
                    tag="LEGACY"
                    padding="none"
                    icon={<GOTIcon type="trophy" size={56} className="text-[#E81414]" scale={1.6} x={0} y={0} />}
                >
                    <div className="p-10 md:p-14 bg-black/20">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">

                        {BADGES.map((badge) => (
                            <div
                                key={badge.id}
                                onClick={() => setSelectedBadge(badge)}
                                className={`
                                    flex flex-col items-center gap-8 p-10 rounded-[2rem] transition-all duration-300 group cursor-pointer relative overflow-hidden
                                    ${badge.earned
                                        ? 'bg-white/5 text-white hover:bg-[#E81414] hover:text-black'
                                        : 'bg-black/40 text-white/20 grayscale hover:grayscale-0 hover:bg-[#E81414] hover:text-black hover:opacity-100'}
                                `}
                            >
                                <div className={`flex items-center justify-center transition-colors duration-300 ${badge.earned ? 'text-[#E81414] group-hover:text-black' : 'text-white/20 group-hover:text-black'}`}>
                                    <GOTIcon type={badge.type as any} size={48} scale={1.6} x={0} y={0} />
                                </div>
                                <p className={`text-[10px] tracking-[0.4em] font-black uppercase text-center leading-tight transition-colors duration-300 ${badge.earned ? 'text-white group-hover:text-black' : 'text-white/20 group-hover:text-black'}`}>
                                    {badge.label}
                                </p>
                            </div>
                        ))}
                        </div>
                    </div>



                    {/* Badge Requirements Modal — Overlaid inside HUDCard */}
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
                                    <div key={idx} className="flex items-center gap-6 p-6 bg-white/[0.03] border border-white/5 rounded-2xl group hover:border-white/20 transition-all">
                                        <div className="w-8 h-8 flex items-center justify-center text-[#E81414] font-black text-xs border border-[#E81414]/30 rounded-full">
                                            {idx + 1}
                                        </div>
                                        <span className="text-xs font-black tracking-widest uppercase text-white/60 group-hover:text-white transition-colors">{req}</span>
                                    </div>
                                ))}
                            </div>

                            <Button onClick={() => setSelectedBadge(null)} variant="outline" fullWidth className="py-4 mt-10">
                                ACKNOWLEDGED
                            </Button>
                        </div>
                    )}
                </HUDCard>
            </div>

            {/* ... other sections ... */}


            {/* ══ DOMAIN MASTERY ═════════════════════════════════════ */}
            <HUDCard
                title="DOMAIN MASTERY"
                tag="PERFORMANCE"
                padding="p-10 md:p-14"
                icon={<GOTIcon type="globe" size={56} className="text-[#E81414]" scale={1.6} x={0} y={0} />}
                actions={
                    <Link href="/domains" className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors">
                        VIEW ALL <ArrowRight className="w-3 h-3" />
                    </Link>
                }
            >
                <div className="py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {[
                        { domain: 'DRAGON', score: 97, color: '#E81414' },
                        { domain: 'CASTLE', score: 84, color: '#E81414' },
                        { domain: 'VALYRIA', score: 76, color: '#FFFFFF' },
                        { domain: 'RECON', score: 62, color: '#FFFFFF' },
                    ].map(({ domain, score, color }) => (
                        <div key={domain} className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] tracking-[0.4em] font-black uppercase text-white/60">{domain}</span>
                                <span className="text-[10px] tracking-[0.3em] font-black uppercase" style={{ color }}>{score}%</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${score}%` }}
                                    transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                                    className="h-full rounded-full shadow-[0_0_10px_rgba(232,20,20,0.3)]"
                                    style={{ backgroundColor: color }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </HUDCard>

            {/* ══ DANGER ZONE ════════════════════════════════════════ */}
            <HUDCard variant="danger" className="border-[#E81414]/20 p-6 md:px-10 md:py-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10 w-full">
                    <div className="space-y-2">
                        <span className="text-[9px] tracking-[0.6em] font-black uppercase text-[#E81414]">DANGER ZONE</span>
                        <h3 className="text-xl font-black uppercase tracking-tighter text-white">SESSION CONTROL</h3>
                        <p className="text-[10px] tracking-[0.2em] font-black uppercase text-white/30">TERMINATE YOUR ACTIVE ROYAL SESSION AND CLEAR ALL LOCAL CREDENTIALS.</p>
                    </div>
                    <Button
                        onClick={handleLogout}
                        icon={LogOut}
                        variant={logoutConfirm ? 'secondary' : 'outline'}
                        className="w-full md:w-auto py-4 px-10 shrink-0"
                    >
                        {logoutConfirm ? 'CLICK AGAIN TO CONFIRM' : 'LOG OUT'}
                    </Button>
                </div>
            </HUDCard>
        </div>
    );
}

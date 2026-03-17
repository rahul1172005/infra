'use client';

import { motion } from 'framer-motion';
import {
    Activity, Trophy, Target, Zap, Shield,
    Mail, MapPin, Calendar, Edit3,
    Share2, Award, Flame,
    Terminal, Cpu, Globe, Hash
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DotGrid } from '@/components/ui/Decorative';
import { PageHeader } from '@/components/ui/PageHeader';
import { HUDFrame } from '@/components/ui/HUDFrame';
import { Suriken } from '@/components/ui/Suriken';

// Stats Component
function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
    return (
        <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-[2.5rem] group hover:border-[#E81414]/30 transition-all relative overflow-hidden">
            <DotGrid />
            <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-10 h-10 border border-white/10 group-hover:border-[#E81414]/50 group-hover:bg-[#E81414]/5 rounded-full flex items-center justify-center transition-all text-white/40 group-hover:text-[#E81414]">
                    {icon}
                </div>
                <span className="text-[10px] tracking-[0.4em] font-black uppercase text-white/30">{label}</span>
            </div>
            <div className="relative z-10">
                <p className="text-4xl font-black tracking-tighter text-white mb-1">{value}</p>
                <p className="text-[9px] tracking-[0.2em] font-black uppercase text-[#E81414]">{sub}</p>
            </div>
        </div>
    );
}

// Activity Item
function ActivityItem({ type, title, time, points }: { type: string; title: string; time: string; points: string }) {
    return (
        <div className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 group cursor-default">
            <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-[#E81414] group-hover:border-[#E81414] transition-all">
                    <Zap className="w-3.5 h-3.5 text-white/40 group-hover:text-white" />
                </div>
                <div className="space-y-0.5">
                    <p className="text-[11px] font-black uppercase tracking-wider text-white group-hover:text-[#E81414] transition-colors">{title}</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-white/20">{type} • {time}</p>
                </div>
            </div>
            <span className="text-[10px] font-black tracking-widest text-[#E81414]">{points}</span>
        </div>
    );
}

// Badge Component
function Badge({ name, icon: Icon, color = "#E81414" }: { name: string; icon: any; color?: string }) {
    return (
        <div className="flex flex-col items-center gap-3 group">
            <div
                className="w-16 h-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center transition-all group-hover:scale-110 relative overflow-hidden"
                style={{ borderColor: `${color}20` }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Icon className="w-8 h-8 transition-all group-hover:scale-110" style={{ color }} />
            </div>
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/30 group-hover:text-white transition-colors">{name}</span>
        </div>
    );
}

export default function ProfilePage() {
    return (
        <div className="w-full pb-20 space-y-12 relative overflow-hidden">
            <DotGrid />

            {/* ══ HEADER ══════════════════════════════════════════════ */}
            <PageHeader
                title={<>SYSTEM<br /><span className="text-[#E81414]">OPERATIVE</span></>}
                stats={{
                    label: "SYNC STATUS",
                    value: "ONLINE",
                    subValue: "ENCRYPTED NODE"
                }}
                action={
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Button variant="outline" icon={Share2} className="px-8 rounded-full">SHARE</Button>
                        <Button variant="primary" icon={Edit3} className="px-8 rounded-full">EDIT PROFILE</Button>
                    </div>
                }
            />

            {/* ══ IDENTITY CARD ═══════════════════════════════════════ */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 relative z-10">
                {/* Main Profile Info */}
                <div className="xl:col-span-8 bg-[#0A0A0A] border border-white/10 rounded-[3rem] p-8 md:p-12 relative overflow-hidden group">
                    <DotGrid />
                    <div className="flex flex-col md:flex-row gap-10 items-start md:items-center relative z-10">
                        {/* Avatar Hub */}
                        <div className="relative group/avatar shrink-0">
                            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-white/10 p-2 group-hover/avatar:border-[#E81414]/50 transition-all duration-500">
                                <div className="w-full h-full rounded-full bg-gradient-to-br from-white/10 to-transparent overflow-hidden relative border border-white/5">
                                    <div className="absolute inset-0 bg-[url('https://api.dicebear.com/7.x/bottts/svg?seed=raja')] bg-cover opacity-80 group-hover/avatar:scale-110 transition-transform duration-700" />
                                    {/* HUD Overlay on Avatar */}
                                    <div className="absolute inset-0 border-[10px] border-black/20 pointer-events-none" />
                                </div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-[#E81414] text-white text-[10px] font-black px-4 py-1.5 rounded-full border-4 border-[#0A0A0A] tracking-widest animate-pulse">
                                LVL 42
                            </div>
                        </div>

                        {/* Bio / Details */}
                        <div className="flex-1 space-y-8">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white mb-2">RAJA<span className="text-white/20">.EXE</span></h2>
                                <p className="text-[10px] tracking-[0.5em] font-black uppercase text-[#E81414] flex items-center gap-3">
                                    <Suriken size="xs" color="#E81414" /> LEAD SYSTEM ARCHITECT
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                {[
                                    { icon: Mail, text: 'RAJA@ZAPSTERS.DEV', label: 'DIRECT NODE' },
                                    { icon: MapPin, text: 'BANGALORE, IN', label: 'GEO LOCATION' },
                                    { icon: Globe, text: '@RAJACONTROLS', label: 'NETWORK ID' },
                                    { icon: Calendar, text: 'EST. OCT 2023', label: 'UPTIME SINCE' },
                                ].map(({ icon: Icon, text, label }) => (
                                    <div key={label} className="space-y-1">
                                        <p className="text-[7px] tracking-[0.4em] font-black uppercase text-white/20">{label}</p>
                                        <div className="flex items-center gap-2">
                                            <Icon className="w-3 h-3 text-[#E81414]" />
                                            <span className="text-[10px] font-black uppercase tracking-wider text-white/70">{text}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <div className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full flex items-center gap-3 group-hover:border-[#E81414]/30 transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-[#E81414]" />
                                    <span className="text-[9px] font-black tracking-[0.2em] text-white/60">ACTIVE IN CLAN: SHINOBI_X</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Status / Rank */}
                <div className="xl:col-span-4 space-y-6">
                    <HUDFrame title="RANKING" subtitle="LEADERBOARD POSITION">
                        <div className="py-2 text-center">
                            <p className="text-[10px] tracking-[0.5em] font-black uppercase text-white/20 mb-2">GLOBAL PLACEMENT</p>
                            <p className="text-7xl font-black tracking-tighter text-white">#12</p>
                            <p className="text-[9px] tracking-[0.2em] font-black uppercase text-[#E81414] mt-2">TOP 0.1% WORLDWIDE</p>
                        </div>
                    </HUDFrame>

                    <HUDFrame title="DOMAIN MASTERY" subtitle="CORE COMPETENCIES">
                        <div className="space-y-5">
                            {[
                                { name: 'KATA TRIALS', progress: 92, color: '#E81414' },
                                { name: 'SHOGUNATE ARCH', progress: 84, color: '#fff' },
                                { name: 'GHOST PROTOCOL', progress: 67, color: '#444' }
                            ].map((stat) => (
                                <div key={stat.name} className="space-y-1.5">
                                    <div className="flex justify-between text-[8px] font-black tracking-widest uppercase">
                                        <span className="text-white/60">{stat.name}</span>
                                        <span className="text-white">{stat.progress}%</span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${stat.progress}%` }}
                                            className="h-full bg-current"
                                            style={{ color: stat.color }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </HUDFrame>
                </div>
            </div>

            {/* ══ STATS MESH ══════════════════════════════════════════ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                <StatCard icon={<Trophy className="w-5 h-5" />} label="TOTAL WINS" value="1,284" sub="+12 THIS WEEK" />
                <StatCard icon={<Target className="w-5 h-5" />} label="ACCURACY" value="98.4%" sub="SYSTEM OPTIMIZED" />
                <StatCard icon={<Flame className="w-5 h-5" />} label="STREAK" value="24 DAYS" sub="FLAME ACTIVE" />
                <StatCard icon={<Award className="w-5 h-5" />} label="ACHIEVEMENTS" value="48 / 60" sub="ELITE STATUS" />
            </div>

            {/* ══ RECENT ACTIVITY & BADGES ════════════════════════════ */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                {/* Activity Feed */}
                <div className="lg:col-span-7">
                    <HUDFrame title="ACTIVITY LOG" subtitle="TELEMETRY FEED">
                        <div className="divide-y divide-white/5">
                            <ActivityItem type="MATCH WON" title="DEFEATED SYSTEM_AGENT_04" time="2 HOURS AGO" points="+450 XP" />
                            <ActivityItem type="ACHIEVEMENT" title="UNLOCKED 'GHOST IN SHELL'" time="5 HOURS AGO" points="+1000 XP" />
                            <ActivityItem type="KATA TRIAL" title="COMPLETED LEVEL 09 ARCH" time="1 DAY AGO" points="+200 XP" />
                            <ActivityItem type="CLAN WAR" title="PARTICIPATED IN CLAN_X RAID" time="2 DAYS AGO" points="+1200 XP" />
                            <ActivityItem type="MASTERY" title="UPGRADED TO ELITE ARCHITECT" time="3 DAYS AGO" points="+5000 XP" />
                        </div>
                    </HUDFrame>
                </div>

                {/* Badges / Inventory */}
                <div className="lg:col-span-5">
                    <HUDFrame title="ELITE BADGES" subtitle="PROVEN CAPABILITIES">
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-y-10 gap-x-4 py-4">
                            <Badge name="PIONEER" icon={Globe} color="#E81414" />
                            <Badge name="OVERCLOCK" icon={Cpu} color="#FFF" />
                            <Badge name="STEALTH" icon={Shield} color="#444" />
                            <Badge name="CODER" icon={Terminal} color="#E81414" />
                            <Badge name="ALPHA" icon={Hash} color="#FFF" />
                            <Badge name="ZAPSTER" icon={Zap} color="#E81414" />
                            <Badge name="VETERAN" icon={Calendar} color="#FFF" />
                            <Badge name="LEGEND" icon={Award} color="#444" />
                        </div>
                        <Button variant="ghost" fullWidth className="mt-8 border-dashed border-white/10 hover:border-[#E81414]/30 rounded-full">
                            VIEW FULL INVENTORY
                        </Button>
                    </HUDFrame>
                </div>
            </div>
        </div>
    );
}

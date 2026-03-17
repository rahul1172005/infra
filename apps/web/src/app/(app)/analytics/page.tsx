'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip,
    AreaChart, Area, CartesianGrid, ReferenceLine
} from 'recharts';
import SamuraiRadar from '../../SamuraiRadar';
import { Button } from '@/components/ui/Button';
import { LayoutGrid, BarChart3, AreaChart as AreaChartIcon, Plus, Minus, Search, Activity, Zap, Shield, Target } from 'lucide-react';
import { DotGrid } from '@/components/ui/Decorative';
import { HUDFrame } from '@/components/ui/HUDFrame';
import { PageHeader } from '@/components/ui/PageHeader';
import { Suriken } from '@/components/ui/Suriken';
import { SearchInput } from '@/components/ui/SearchInput';

// ── DATA ────────────────────────────────────────────────────────────── */
const SECTORS = ['GLOBAL', 'NORTH', 'SOUTH', 'EAST', 'WEST', 'CENTRAL'];

// ── RADIAL GAUGE ────────────────────────────────────────────────────── */
const RadialGauge = ({ value, label, sub }: { value: number; label: string; sub: string }) => (
    <div className="flex flex-col items-center gap-3 md:gap-4">
        <div className="relative w-28 h-28 sm:w-36 sm:h-36">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="66" stroke="rgba(255,255,255,0.04)" strokeWidth="2" fill="transparent" strokeDasharray="4 4" />
                <circle cx="80" cy="80" r="66" stroke="rgba(255,255,255,0.03)" strokeWidth="10" fill="transparent" />
                <motion.circle
                    cx="80" cy="80" r="66"
                    stroke="#E81414" strokeWidth="6" fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray="414"
                    initial={{ strokeDashoffset: 414 }}
                    animate={{ strokeDashoffset: 414 - (414 * value) / 100 }}
                    transition={{ duration: 1.8, ease: 'circOut' }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-white tabular-nums">{Math.floor(value)}<span className="text-sm text-white/30">%</span></span>
                <span className="text-[7px] font-black tracking-[0.35em] text-white/15 uppercase mt-1">{sub}</span>
            </div>
        </div>
        <p className="text-[9px] font-black tracking-[0.5em] text-white/30 uppercase">{label}</p>
    </div>
);

// ── STAT BAR ────────────────────────────────────────────────────────── */
const StatBar = ({ label, value, color = '#E81414' }: { label: string; value: number; color?: string }) => (
    <div className="space-y-2">
        <div className="flex justify-between text-[9px] font-black tracking-[0.2em] font-mono">
            <span className="text-white/30 uppercase">{label}</span>
            <span className="text-white/60">{Math.floor(value)}%</span>
        </div>
        <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
                className="h-full rounded-full"
                style={{ background: color }}
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1.2, ease: 'circOut' }}
            />
        </div>
    </div>
);

// ── MINI SPARKLINE ───────────────────────────────── */
const Sparkline = ({ color = '#E81414', height = 40 }: { color?: string; height?: number }) => {
    const [points, setPoints] = useState<{x: number, y: number}[]>([]);
    
    useEffect(() => {
        setPoints(Array.from({ length: 20 }, (_, i) => ({
            x: i,
            y: 30 + Math.sin(i * 0.7) * 12 + Math.cos(i * 1.3) * 8 + Math.random() * 6,
        })));
    }, []);

    if (points.length === 0) return <div style={{ height }} />;
    const w = 200, h = height;
    const xs = points.map(p => (p.x / 19) * w);
    const ys = points.map(p => h - ((p.y - 10) / 50) * h);
    const d = points.map((_, i) => `${i === 0 ? 'M' : 'L'} ${xs[i].toFixed(1)} ${ys[i].toFixed(1)}`).join(' ');
    const fill = `${d} L ${xs[xs.length - 1].toFixed(1)} ${h} L ${xs[0].toFixed(1)} ${h} Z`;
    return (
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full" style={{ height }}>
            <defs>
                <linearGradient id={`sg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.18" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d={fill} fill={`url(#sg-${color.replace('#', '')})`} />
            <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
    );
};

// ── MAIN PAGE ────────────────────────────────────────────────────────── */
export default function AnalyticsPage() {
    const [teams, setTeams] = useState<any[]>([]);
    const [chartMode, setChartMode] = useState<'bar' | 'area'>('area');
    const [activeSector, setActiveSector] = useState('GLOBAL');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'roster' | 'analytics'>('analytics');
    const [scanPos, setScanPos] = useState(0);
    const [commandLogs, setCommandLogs] = useState<{ id: string; action: string; timestamp: string }[]>([]);
    const [metrics, setMetrics] = useState({
        stability: 95,
        battleReady: 85,
        zenFlow: 75
    });

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        // Fetch real team data
        const fetchTeams = async () => {
            try {
                const res = await fetch('http://localhost:5000/teams');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setTeams(data.map((t: any, i: number) => ({
                        id: t.id,
                        team: t.name,
                        value: Math.min(100, Math.floor((t.score || 0) / 100)), // Scale XP to %
                        points: t.score || 0,
                        velocity: Math.floor(Math.random() * 40 + 30),
                        stability: Math.floor(Math.random() * 40 + 60),
                        sync: Math.floor(Math.random() * 20 + 75),
                        status: Math.random() > 0.9 ? 'AT RISK' : 'SECURE',
                        sector: SECTORS[(i % (SECTORS.length - 1)) + 1],
                    })));
                }
            } catch (err) {
                console.error("Failed to fetch teams", err);
            }
        };
        fetchTeams();
        setMetrics({
            stability: Math.floor(90 + Math.random() * 10),
            battleReady: Math.floor(70 + Math.random() * 20),
            zenFlow: Math.floor(60 + Math.random() * 25)
        });
    }, []);

    // ── LIVE SIMULATION ──────────────────────────────────────────
    useEffect(() => {
        const interval = setInterval(() => {
            setTeams(prev => prev.map(t => ({
                ...t,
                value: Math.max(30, Math.min(100, t.value + (Math.random() - 0.5) * 4)),
                sync: Math.max(20, Math.min(100, t.sync + (Math.random() - 0.5) * 6)),
                velocity: Math.max(0, Math.min(100, t.velocity + (Math.random() - 0.5) * 2))
            })));
            setMetrics(m => ({
                stability: Math.max(90, Math.min(100, m.stability + (Math.random() - 0.5) * 2)),
                battleReady: Math.max(70, Math.min(100, m.battleReady + (Math.random() - 0.5) * 3)),
                zenFlow: Math.max(60, Math.min(100, m.zenFlow + (Math.random() - 0.5) * 4))
            }));
            setScanPos(s => (s + 1) % 100);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const updatePoints = (id: string, amount: number) => {
        setTeams(prev => prev.map(t => t.id === id ? { ...t, points: Math.max(0, t.points + amount) } : t));
        const teamName = teams.find(t => t.id === id)?.team;
        setCommandLogs(prev => [
            { id, action: `${amount > 0 ? '+' : ''}${amount} PTS → ${teamName}`, timestamp: new Date().toLocaleTimeString() },
            ...prev,
        ].slice(0, 8));
    };

    const filteredData = teams.filter(d =>
        (activeSector === 'GLOBAL' || d.sector === activeSector) &&
        (d.team.toLowerCase().includes(searchQuery.toLowerCase()) || d.id.includes(searchQuery))
    );
    const chartData = filteredData.slice(0, 12);

    return (
        <div className="w-full pb-24 bg-[#000000] min-h-screen font-mono relative text-white">
            <DotGrid className="opacity-[0.025]" />

            <div className="relative z-10 p-4 sm:p-8 space-y-8">
                {/* ── HEADER ──────────────────────────────────────────── */ }
                <PageHeader
                    title={<>COMMAND<br /><span className="text-[#E81414]">ROSTER</span></>}
                    stats={{
                        label: "ACTIVE CLANS",
                        value: teams.length.toString(),
                        subValue: "REAL-TIME MONITOR"
                    }}
                    action={
                        <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-4 w-full xl:w-auto">
                            <div className="flex p-1 bg-white/[0.03] rounded-full border border-white/5 h-12 gap-1 px-1">
                                <Button
                                    variant={viewMode === 'analytics' ? 'primary' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('analytics')}
                                    className="px-6 rounded-full text-[9px]"
                                >
                                    ANALYTICS
                                </Button>
                                <Button
                                    variant={viewMode === 'roster' ? 'primary' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('roster')}
                                    className="px-6 rounded-full text-[9px]"
                                >
                                    ROSTER
                                </Button>
                            </div>

                            <SearchInput
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="SEARCH CLANS..."
                                className="w-full xl:w-64"
                            />
                        </div>
                    }
                />

                {/* Sector filter */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                    {SECTORS.map(sector => (
                        <Button
                            key={sector}
                            variant={activeSector === sector ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setActiveSector(sector)}
                            className="px-6 rounded-full text-[8px] whitespace-nowrap"
                        >
                            {sector}
                        </Button>
                    ))}
                </div>

                {/* ── METRIC CARDS ────────────────────────────────────── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { title: 'SYST STABILITY', sub: '系統穩定性', value: metrics.stability, label: 'INTEGRITY', slug: 'CASTLE WALL' },
                        { title: 'BATTLE READY', sub: '戰鬥準備量', value: metrics.battleReady, label: 'RESOURCES', slug: 'SHOGUN ARMORY' },
                        { title: 'ZEN FLOW', sub: '禪流速率', value: metrics.zenFlow, label: 'THROUGHPUT', slug: 'TEMP SYNC' },
                        { title: 'GLOBAL SYNC', sub: '全球同步率', value: teams[0]?.sync || 88, label: 'NETWORK', slug: 'GRID LOCK' },
                    ].map((card) => (
                        <HUDFrame key={card.title} title={card.title} subtitle={card.sub} isLive={true}>
                            <div className="flex justify-center py-4">
                                <RadialGauge value={card.value} label={card.label} sub={card.slug} />
                            </div>
                        </HUDFrame>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {viewMode === 'analytics' ? (
                        <motion.div
                            key="analytics"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.25 }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                        >
                            {/* ── LEFT COLUMN ───── */}
                            <div className="lg:col-span-4 space-y-6">
                                <HUDFrame title="FORCE RADAR" subtitle="BUSHIDO TACTICAL">
                                    <SamuraiRadar teams={filteredData.slice(0, 5)} />
                                </HUDFrame>

                                <HUDFrame title="PROVINCE LOAD" subtitle="SECTOR DENSITY" isLive={true}>
                                    <div className="space-y-5 py-2">
                                        {chartData.slice(0, 5).map((clan, i) => (
                                            <StatBar key={i} label={clan.team} value={clan.sync} color={i === 0 ? '#E81414' : 'rgba(255,255,255,0.25)'} />
                                        ))}
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
                                        <p className="text-[7px] font-black text-white/20 tracking-widest uppercase">RECENT TELEMETRY</p>
                                        <div className="space-y-3">
                                            {commandLogs.slice(0, 3).map((log, i) => (
                                                <div key={i} className="flex items-center gap-3 text-[9px] font-black uppercase text-white/40">
                                                    <span className="text-[#E81414]">❯</span>
                                                    <span className="truncate">{log.action}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </HUDFrame>
                            </div>

                            {/* ── RIGHT COLUMN ───── */}
                            <div className="lg:col-span-8 space-y-6">
                                <HUDFrame title="STREAM ANALYTICS" subtitle="TEMPORAL SYNC GRID" isLive={true}>
                                    <div className="flex gap-2 mb-8">
                                        <Button
                                            variant={chartMode === 'area' ? 'primary' : 'outline'}
                                            size="sm"
                                            onClick={() => setChartMode('area')}
                                            className="px-6 rounded-full text-[8px]"
                                            icon={AreaChartIcon}
                                        >
                                            AREA STREAM
                                        </Button>
                                        <Button
                                            variant={chartMode === 'bar' ? 'primary' : 'outline'}
                                            size="sm"
                                            onClick={() => setChartMode('bar')}
                                            className="px-6 rounded-full text-[8px]"
                                            icon={BarChart3}
                                        >
                                            BAR HUD
                                        </Button>
                                    </div>

                                    <div className="h-[400px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            {chartMode === 'bar' ? (
                                                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -30, bottom: 30 }}>
                                                    <CartesianGrid strokeDasharray="1 4" vertical={false} stroke="rgba(255,255,255,0.03)" />
                                                    <XAxis dataKey="team" stroke="transparent" tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 8, fontFamily: 'monospace', fontWeight: 900 }} axisLine={false} tickLine={false} angle={-40} textAnchor="end" />
                                                    <YAxis stroke="transparent" tick={{ fill: 'rgba(255,255,255,0.15)', fontSize: 8, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                                                    <Tooltip
                                                        formatter={((value: number) => [`${Math.floor(value)}%`, '']) as any}
                                                        contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(232,20,20,0.3)', fontSize: 9, fontWeight: 900, fontFamily: 'monospace', borderRadius: 12 }}
                                                        itemStyle={{ color: '#E81414' }}
                                                        labelStyle={{ color: 'rgba(255,255,255,0.4)' }}
                                                    />
                                                    <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#E81414" fillOpacity={0.85} barSize={28} />
                                                    <Bar dataKey="sync" radius={[4, 4, 0, 0]} fill="rgba(255,255,255,0.08)" barSize={28} />
                                                </BarChart>
                                            ) : (
                                                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -30, bottom: 30 }}>
                                                    <defs>
                                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#E81414" stopOpacity={0.6} />
                                                            <stop offset="60%" stopColor="#E81414" stopOpacity={0.1} />
                                                            <stop offset="95%" stopColor="#E81414" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="1 8" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                                    <XAxis dataKey="team" stroke="transparent" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 7, fontFamily: 'monospace', fontWeight: 900 }} axisLine={false} tickLine={false} angle={-40} textAnchor="end" interval={0} />
                                                    <YAxis stroke="transparent" tick={{ fill: 'rgba(255,255,255,0.15)', fontSize: 7, fontFamily: 'monospace' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                                                    <Tooltip
                                                        cursor={{ stroke: '#E81414', strokeWidth: 1, strokeDasharray: '4 4' }}
                                                        formatter={((value: number) => [`${Math.floor(value)}%`, '']) as any}
                                                        contentStyle={{ backgroundColor: 'rgba(10,10,10,0.95)', border: '1px solid #E81414', fontSize: 9, fontWeight: 900, fontFamily: 'monospace', borderRadius: 12, backdropFilter: 'blur(8px)' }}
                                                        itemStyle={{ color: '#E81414' }}
                                                        labelStyle={{ color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}
                                                    />
                                                    <Area type="monotone" dataKey="value" stroke="#E81414" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" animationDuration={1000} dot={false} />
                                                    <ReferenceLine x={chartData[Math.floor(scanPos / (100 / chartData.length))]?.team} stroke="#E81414" strokeWidth={0.5} strokeOpacity={0.3} />
                                                </AreaChart>
                                            )}
                                        </ResponsiveContainer>
                                    </div>
                                </HUDFrame>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <HUDFrame title="LOGISTICAL DIST" subtitle="SECTOR LOAD" isLive={true}>
                                        <div className="grid grid-cols-3 gap-3 py-2">
                                            {SECTORS.slice(1).map(s => {
                                                const sectorAvg = teams.filter(t => t.sector === s).reduce((acc, curr) => acc + curr.value, 0) / (teams.filter(t => t.sector === s).length || 1);
                                                return (
                                                    <div key={s} className="flex flex-col items-center gap-2">
                                                        <div className={`w-full py-3 border border-white/5 rounded-2xl flex items-center justify-center transition-all ${activeSector === s ? 'bg-[#E81414]/10 border-[#E81414]/20 text-[#E81414]' : 'bg-white/[0.03] text-white/25'}`}>
                                                            <span className="text-[10px] font-black">{Math.floor(sectorAvg)}%</span>
                                                        </div>
                                                        <span className="text-[7px] font-black tracking-widest text-white/15 uppercase">{s}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </HUDFrame>

                                    <HUDFrame title="VELOCITY STREAM" subtitle="TEMPORAL DRIFT" isLive={true}>
                                        <div className="space-y-4 py-1">
                                            {chartData.slice(0, 3).map((clan, i) => (
                                                <div key={i} className="space-y-1.5">
                                                    <div className="flex justify-between text-[8px] font-black uppercase">
                                                        <span className="text-white/25 truncate max-w-[120px]">{clan.team}</span>
                                                        <span className="text-white/50">{Math.floor(clan.velocity)}%</span>
                                                    </div>
                                                    <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                                                        <motion.div
                                                            className="h-full rounded-full"
                                                            style={{ background: i === 0 ? '#E81414' : 'rgba(255,255,255,0.2)' }}
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${clan.velocity}%` }}
                                                            transition={{ duration: 0.5, ease: 'circOut' }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="pt-4 border-t border-white/5">
                                                <Sparkline color="#E81414" />
                                            </div>
                                        </div>
                                    </HUDFrame>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="roster"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-6"
                        >
                            <HUDFrame title="COMMAND GRID" subtitle="GRID ARRAY MONITOR" isLive={true}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                    {[
                                        { label: 'TOTAL CLANS', value: filteredData.length, icon: Shield },
                                        { label: 'AT RISK', value: filteredData.filter(t => t.status === 'AT RISK').length, icon: Activity },
                                        { label: 'AVG SYNC', value: Math.floor(filteredData.reduce((a, b) => a + b.sync, 0) / (filteredData.length || 1)) + '%', icon: Zap },
                                        { label: 'TARGET SECTOR', value: activeSector, icon: Target },
                                    ].map(s => (
                                        <div key={s.label} className="bg-white/[0.02] border border-white/5 rounded-[1.5rem] p-5 flex items-center gap-4">
                                            <div className="w-10 h-10 border border-white/5 rounded-full flex items-center justify-center bg-white/5">
                                                <s.icon className="w-4 h-4 text-[#E81414]" />
                                            </div>
                                            <div>
                                                <p className="text-[7px] font-black tracking-widest text-white/20 uppercase mb-1">{s.label}</p>
                                                <p className="text-xl font-black text-white leading-none">{s.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 border-t border-white/5 pt-8">
                                    {filteredData.map(team => (
                                        <div
                                            key={team.id}
                                            className="group relative p-6 bg-[#050505] border border-white/10 rounded-[2rem] hover:border-[#E81414]/30 transition-all"
                                        >
                                            <div className="space-y-5">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="text-[7px] text-white/20 font-black tracking-widest mb-1">{team.id}</p>
                                                        <p className="text-sm font-black text-white uppercase tracking-tight leading-tight truncate">{team.team}</p>
                                                        <p className="text-[7px] font-black tracking-[0.3em] text-[#E81414] uppercase mt-1">{team.sector}</p>
                                                    </div>
                                                    <Suriken size="xs" color={team.status === 'AT RISK' ? '#E81414' : 'rgba(255,255,255,0.1)'} className={team.status === 'AT RISK' ? 'animate-pulse' : ''} />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                                                    <div>
                                                        <span className="text-[7px] text-white/15 font-black uppercase block mb-1">XP RESERVE</span>
                                                        <p className="text-base font-black text-white tabular-nums">{team.points.toLocaleString()}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-[7px] text-white/15 font-black uppercase block mb-1">SYNC%</span>
                                                        <p className="text-base font-black text-white/40 tabular-nums">{Math.floor(team.sync)}%</p>
                                                    </div>
                                                </div>

                                                <div className="h-[2px] w-full bg-white/[0.04] rounded-full overflow-hidden">
                                                    <div className="h-full bg-[#E81414] rounded-full transition-all" style={{ width: `${team.sync}%`, opacity: 0.6 }} />
                                                </div>

                                                <div className="grid grid-cols-2 gap-2">
                                                    <Button
                                                        variant="primary"
                                                        size="sm"
                                                        onClick={() => updatePoints(team.id, 500)}
                                                        className="py-3 h-auto text-[8px] rounded-full"
                                                        icon={Plus}
                                                    >
                                                        +500
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => updatePoints(team.id, -500)}
                                                        className="py-3 h-auto text-[8px] rounded-full"
                                                        icon={Minus}
                                                    >
                                                        -500
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 p-8 bg-[#030303] border border-white/5 rounded-[2.5rem]">
                                    <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
                                        <Terminal className="w-4 h-4 text-[#E81414]" />
                                        <h3 className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">COMMAND_EXECUTION_LOG</h3>
                                    </div>
                                    <div className="space-y-4 max-h-[300px] overflow-y-auto no-scrollbar">
                                        {commandLogs.length === 0 ? (
                                            <p className="text-[8px] font-black text-white/10 uppercase tracking-widest">NO_LOGS_DETECTED</p>
                                        ) : (
                                            commandLogs.map((log, i) => (
                                                <div key={i} className="flex gap-4 items-center text-[10px] font-mono group">
                                                    <span className="text-white/10 shrink-0">[{log.timestamp}]</span>
                                                    <span className="text-[#E81414] font-black group-hover:translate-x-1 transition-transform">❯❯</span>
                                                    <span className="text-white/60 tracking-wider flex-1 truncate">{log.action}</span>
                                                    <span className="text-[#E81414]/20 text-[7px] font-black">[AUTHORIZED]</span>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </HUDFrame>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

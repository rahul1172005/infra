'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip,
    AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, Radar,
    CartesianGrid, ReferenceLine
} from 'recharts';
import SamuraiRadar from '../../SamuraiRadar';

// ── DATA ────────────────────────────────────────────────────────────── */
const SECTORS = ['GLOBAL', 'NORTH', 'SOUTH', 'EAST', 'WEST', 'CENTRAL'];
const CLAN_NAMES = ['DRAGON', 'TIGER', 'CRANE', 'SNAKE', 'MONKEY', 'PHOENIX', 'WOLF', 'BEAR', 'SHARK', 'EAGLE'];



const POWER_DATA = [
    { subject: 'STRENGTH', A: 120, B: 110 },
    { subject: 'SPEED', A: 98, B: 130 },
    { subject: 'SPIRIT', A: 86, B: 130 },
    { subject: 'HONOR', A: 99, B: 100 },
    { subject: 'STRATEGY', A: 85, B: 90 },
    { subject: 'STEALTH', A: 65, B: 85 },
];

// ── HUD FRAME ───────────────────────────────────────────────────────── */
const HUDFrame = ({
    children, title, subtitle, status = 'SECURE', isLive = false
}: {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    status?: 'SECURE' | 'AT RISK' | 'BREACHED';
    isLive?: boolean;
}) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const dateStr = mounted ? new Date().toLocaleDateString() : '00/00/0000';

    return (
    <div className="relative border border-white/5 bg-[#040404] p-4 sm:p-6 md:p-8 rounded-2xl overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E81414]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 sm:mb-6 md:mb-8 border-b border-white/5 pb-5 gap-4">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <img
                        src="/suriken.png"
                        alt="icon"
                        className="w-5 h-5 object-contain opacity-70"
                        style={{ transform: 'scale(2.2) translate(0px, 0px)' }}
                    />
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <p className="text-[11px] font-black tracking-[0.3em] text-white uppercase leading-none font-mono">{title}</p>
                        {isLive && <span className="text-[6px] font-black text-[#E81414] animate-pulse">LIVE</span>}
                    </div>
                    {subtitle && <p className="text-[8px] font-black tracking-[0.4em] text-white/20 uppercase leading-none font-mono">{subtitle}</p>}
                </div>
            </div>
            <div className="flex gap-2">
                <span className="text-[7px] font-black text-white/10 tracking-widest uppercase">{dateStr}</span>
                <span className="text-[7px] font-black text-[#E81414]/40 tracking-widest">v3.4.0</span>
            </div>
        </div>
        <div className="w-full overflow-visible relative">
            {isLive && (
                <div 
                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{ 
                        backgroundImage: 'linear-gradient(rgba(232,20,20,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(232,20,20,0.1) 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}
                />
            )}
            {children}
        </div>
    </div>
    );
};

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



// ── MINI SPARKLINE (pure SVG, no 3D) ───────────────────────────────── */
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
            {/* Subtle dot grid background */}
            <div
                className="fixed inset-0 opacity-[0.025] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
            />

            <div className="relative z-10 p-4 sm:p-8 space-y-8">

                {/* ── HEADER ──────────────────────────────────────────── */}
                <div className="border-b border-white/5 pb-8 space-y-6">

                    <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 pt-2">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-[#E81414] text-white text-[8px] font-black tracking-[0.3em] rounded">TACTICAL HQ</span>
                                <span className="text-[8px] font-black tracking-[0.5em] text-white/20 uppercase">CRIMSON COMMAND CENTER</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-none">
                                COMMAND<br />
                                <span className="text-[#E81414]">ROSTER</span>
                            </h1>
                            <p className="text-[9px] text-white/20 tracking-[0.4em] uppercase font-mono">
                                400 CLANS | REAL-TIME MONITOR | SEASON III
                            </p>
                        </div>

                        <div className="flex flex-col items-end gap-4">
                            {/* View toggle */}
                            <div className="flex p-1 bg-white/[0.03] rounded-xl border border-white/5 h-11">
                                <button
                                    onClick={() => setViewMode('analytics')}
                                    className={`px-4 sm:px-7 py-2 rounded-lg transition-all text-[8px] sm:text-[9px] font-black tracking-widest ${viewMode === 'analytics' ? 'bg-[#E81414] text-white' : 'text-white/30 hover:text-white'}`}
                                >
                                    ANALYTICS
                                </button>
                                <button
                                    onClick={() => setViewMode('roster')}
                                    className={`px-4 sm:px-7 py-2 rounded-lg transition-all text-[8px] sm:text-[9px] font-black tracking-widest ${viewMode === 'roster' ? 'bg-[#E81414] text-white' : 'text-white/30 hover:text-white'}`}
                                >
                                    COMMAND ROSTER
                                </button>
                            </div>

                            {/* Search */}
                            <input
                                type="text"
                                placeholder="SEARCH CLAN ID NAME"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full md:w-[380px] bg-white/[0.03] border border-white/5 px-5 py-3 rounded-xl text-[9px] font-black tracking-widest text-[#E81414] placeholder:text-white/10 focus:outline-none focus:border-[#E81414]/30 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Sector filter */}
                    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
                        {SECTORS.map(sector => (
                            <button
                                key={sector}
                                onClick={() => setActiveSector(sector)}
                                className={`px-5 py-1.5 rounded-full text-[8px] font-black tracking-[0.4em] uppercase transition-all border shrink-0
                                    ${activeSector === sector
                                        ? 'bg-[#E81414] border-[#E81414] text-white'
                                        : 'bg-white/[0.03] border-white/8 text-white/30 hover:text-white hover:border-white/20'}`}
                            >
                                {sector}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── METRIC CARDS ────────────────────────────────────── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {[
                        { title: 'SYST STABILITY', sub: '系統穩定性', value: metrics.stability, label: 'INTEGRITY', slug: 'CASTLE WALL', status: 'SECURE' as const },
                        { title: 'BATTLE READY', sub: '戰鬥準備量', value: metrics.battleReady, label: 'RESOURCES', slug: 'SHOGUN ARMORY', status: 'AT RISK' as const },
                        { title: 'ZEN FLOW', sub: '禪流速率', value: metrics.zenFlow, label: 'THROUGHPUT', slug: 'TEMP SYNC', status: 'SECURE' as const },
                        { title: 'GLOBAL SYNC', sub: '全球同步率', value: teams[0]?.sync || 88, label: 'NETWORK', slug: 'GRID LOCK', status: 'SECURE' as const },
                    ].map((card, i) => (
                        <HUDFrame key={card.title} title={card.title} subtitle={card.sub} status={card.status} isLive={true}>
                            <div className="flex justify-center py-2">
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

                                {/* Radar web chart */}
                                <HUDFrame title="FORCE RADAR" subtitle="戰力雷達 BUSHIDO TACTICAL">
                                    <SamuraiRadar teams={filteredData.slice(0, 5)} />
                                </HUDFrame>

                                {/* Province sync bars */}
                                <HUDFrame title="PROVINCE LOAD" subtitle="橫向指標 SECTOR DENSITY" isLive={true}>
                                    <div className="space-y-5 py-2">
                                        {chartData.slice(0, 5).map((clan, i) => (
                                            <StatBar key={i} label={clan.team} value={clan.sync} color={i === 0 ? '#E81414' : 'rgba(255,255,255,0.25)'} />
                                        ))}
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/5 space-y-1">
                                        <p className="text-[7px] font-black text-white/20 tracking-widest uppercase">RECENT ANOMALIES</p>
                                        <div className="h-20 overflow-hidden relative">
                                            <div className="space-y-1 animate-slide-up">
                                                {commandLogs.map((log, i) => (
                                                    <div key={log.id + i} className="flex justify-between text-[7px] font-mono">
                                                        <span className="text-[#E81414]">{log.action}</span>
                                                        <span className="text-white/10">{log.timestamp}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </HUDFrame>
                            </div>

                            {/* ── RIGHT COLUMN ───── */}
                            <div className="lg:col-span-8 space-y-6">
                                <HUDFrame title="TACTICAL DATAPLANE" subtitle="戰術數據層 PERFORMANCE MONITOR" isLive={true}>
                                    {/* Chart mode toggle */}
                                    <div className="flex gap-2 mb-5">
                                        <button
                                            onClick={() => setChartMode('area')}
                                            className={`px-5 py-1.5 rounded-lg text-[8px] font-black tracking-widest transition-all border ${chartMode === 'area' ? 'bg-[#E81414] border-[#E81414] text-white' : 'border-white/5 text-white/30 hover:text-white'}`}
                                        >
                                            AREA STREAM
                                        </button>
                                        <button
                                            onClick={() => setChartMode('bar')}
                                            className={`px-5 py-1.5 rounded-lg text-[8px] font-black tracking-widest transition-all border ${chartMode === 'bar' ? 'bg-[#E81414] border-[#E81414] text-white' : 'border-white/5 text-white/30 hover:text-white'}`}
                                        >
                                            BAR HUD
                                        </button>
                                    </div>

                                    <div className="h-[380px] w-full">
                                            {chartMode === 'bar' ? (
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -30, bottom: 30 }}>
                                                        <CartesianGrid strokeDasharray="1 4" vertical={false} stroke="rgba(255,255,255,0.03)" />
                                                        <XAxis dataKey="team" stroke="transparent" tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 8, fontFamily: 'monospace', fontWeight: 900 }} axisLine={false} tickLine={false} angle={-40} textAnchor="end" />
                                                        <YAxis stroke="transparent" tick={{ fill: 'rgba(255,255,255,0.15)', fontSize: 8, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                                                        <Tooltip
                                                            formatter={((value: number) => [`${Math.floor(value)}%`, '']) as any}
                                                            contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(232,20,20,0.3)', fontSize: 9, fontWeight: 900, fontFamily: 'monospace', borderRadius: 8 }}
                                                            itemStyle={{ color: '#E81414' }}
                                                            labelStyle={{ color: 'rgba(255,255,255,0.4)' }}
                                                        />
                                                        <Bar dataKey="value" radius={[3, 3, 0, 0]} fill="#E81414" fillOpacity={0.85} barSize={28} />
                                                        <Bar dataKey="sync" radius={[3, 3, 0, 0]} fill="rgba(255,255,255,0.08)" barSize={28} />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            ) : (
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -30, bottom: 30 }}>
                                                        <defs>
                                                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="5%" stopColor="#E81414" stopOpacity={0.6} />
                                                                <stop offset="60%" stopColor="#E81414" stopOpacity={0.1} />
                                                                <stop offset="95%" stopColor="#E81414" stopOpacity={0} />
                                                            </linearGradient>
                                                            <linearGradient id="colorSync" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="5%" stopColor="#fff" stopOpacity={0.1} />
                                                                <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                                                            </linearGradient>
                                                        </defs>
                                                        <CartesianGrid strokeDasharray="1 8" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                                        <XAxis 
                                                            dataKey="team" 
                                                            stroke="transparent" 
                                                            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 7, fontFamily: 'monospace', fontWeight: 900 }} 
                                                            axisLine={false} 
                                                            tickLine={false} 
                                                            angle={-40} 
                                                            textAnchor="end" 
                                                            interval={0}
                                                        />
                                                        <YAxis 
                                                            stroke="transparent" 
                                                            tick={{ fill: 'rgba(255,255,255,0.15)', fontSize: 7, fontFamily: 'monospace' }} 
                                                            axisLine={false} 
                                                            tickLine={false} 
                                                            domain={[0, 100]}
                                                        />
                                                        <Tooltip
                                                            cursor={{ stroke: '#E81414', strokeWidth: 1, strokeDasharray: '4 4' }}
                                                            formatter={((value: number) => [`${Math.floor(value)}%`, '']) as any}
                                                            contentStyle={{ 
                                                                backgroundColor: 'rgba(10,10,10,0.95)', 
                                                                border: '1px solid #E81414', 
                                                                fontSize: 9, 
                                                                fontWeight: 900, 
                                                                fontFamily: 'monospace', 
                                                                borderRadius: 4,
                                                                backdropFilter: 'blur(8px)',
                                                                boxShadow: '0 0 20px rgba(232,20,20,0.2)'
                                                            }}
                                                            itemStyle={{ color: '#E81414' }}
                                                            labelStyle={{ color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}
                                                        />
                                                        <Area 
                                                            type="monotone" 
                                                            dataKey="value" 
                                                            stroke="#E81414" 
                                                            strokeWidth={3} 
                                                            fillOpacity={1} 
                                                            fill="url(#colorValue)" 
                                                            animationDuration={1000}
                                                            dot={false}
                                                        />
                                                        <Area 
                                                            type="monotone" 
                                                            dataKey="value" 
                                                            stroke="#fff" 
                                                            strokeWidth={0.5} 
                                                            strokeOpacity={0.2}
                                                            fill="transparent" 
                                                            animationDuration={1500}
                                                            dot={false}
                                                        />
                                                        <Area 
                                                            type="monotone" 
                                                            dataKey="sync" 
                                                            stroke="rgba(255,255,255,0.1)" 
                                                            strokeWidth={1} 
                                                            fill="url(#colorSync)"
                                                            animationDuration={2000}
                                                            dot={false}
                                                        />
                                                        <ReferenceLine x={chartData[Math.floor(scanPos / (100 / chartData.length))]?.team} stroke="#E81414" strokeWidth={0.5} strokeOpacity={0.3} />
                                                    </AreaChart>                                                
                                                </ResponsiveContainer>
                                            )}
                                    </div>
                                </HUDFrame>

                                {/* Bottom 2-col stats */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <HUDFrame title="LOGISTICAL DIST" subtitle="物流分配" isLive={true}>
                                        <div className="grid grid-cols-3 gap-2 py-2">
                                            {SECTORS.slice(1).map(s => {
                                                const sectorAvg = teams.filter(t => t.sector === s).reduce((acc, curr) => acc + curr.value, 0) / (teams.filter(t => t.sector === s).length || 1);
                                                return (
                                                    <div key={s} className="flex flex-col items-center gap-1.5 md:gap-2">
                                                        <div className={`w-full py-2 border border-white/5 rounded-lg flex items-center justify-center transition-all ${activeSector === s ? 'bg-[#E81414]/10 border-[#E81414]/20 text-[#E81414]' : 'bg-white/[0.03] text-white/25'}`}>
                                                            <span className="text-[9px] font-black">{Math.floor(sectorAvg)}%</span>
                                                        </div>
                                                        <span className="text-[7px] font-black tracking-widest text-white/15 uppercase">{s}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </HUDFrame>

                                    <HUDFrame title="VELOCITY STREAM" subtitle="速度帶指標" isLive={true}>
                                        <div className="space-y-3 py-1">
                                            {chartData.slice(0, 4).map((clan, i) => (
                                                <div key={i} className="space-y-1">
                                                    <div className="flex justify-between text-[8px] font-black font-mono">
                                                        <span className="text-white/25 uppercase truncate max-w-[120px]">{clan.team}</span>
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
                                            <div className="pt-3 border-t border-white/5">
                                                <Sparkline />
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
                            <HUDFrame title="COMMAND ROSTER 400" subtitle="全體隊伍監控 GRID ARRAY" isLive={true}>
                                {/* Summary row */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
                                    {[
                                        { label: 'TOTAL CLANS', value: filteredData.length },
                                        { label: 'AT RISK', value: filteredData.filter(t => t.status === 'AT RISK').length },
                                        { label: 'SECTOR', value: activeSector },
                                    ].map(s => (
                                        <div key={s.label} className="bg-white/[0.02] border border-white/5 rounded-xl px-3 py-3 md:px-5 md:py-4">
                                            <p className="text-[6px] md:text-[7px] font-black tracking-[0.4em] text-white/20 uppercase mb-1 md:mb-2">{s.label}</p>
                                            <p className="text-sm md:text-xl font-black text-white leading-none">{s.value}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Team grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 max-h-none sm:max-h-[820px] overflow-y-visible sm:overflow-y-auto no-scrollbar border-t border-white/5 pt-6">
                                    {filteredData.map(team => (
                                        <div
                                            key={team.id}
                                            className="group relative p-4 md:p-6 bg-[#020202] border border-white/[0.06] rounded-xl hover:border-[#E81414]/20 transition-colors duration-200"
                                        >

                                            <div className="space-y-4">
                                                <div>
                                                    <p className="text-[7px] text-white/20 font-black tracking-widest font-mono mb-1">{team.id}</p>
                                                    <p className="text-[13px] font-black text-white uppercase tracking-tight leading-tight truncate">{team.team}</p>
                                                    <p className="text-[7px] font-black tracking-[0.3em] text-white/15 uppercase mt-1">{team.sector}</p>
                                                </div>

                                                <div className="border-t border-white/5 pt-3 grid grid-cols-2 gap-3">
                                                    <div>
                                                        <span className="text-[7px] text-white/15 font-black uppercase block mb-1">XP RESERVE</span>
                                                        <p className="text-base font-black text-white leading-none tabular-nums">{team.points.toLocaleString()}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-[7px] text-white/15 font-black uppercase block mb-1">SYNC%</span>
                                                        <p className="text-base font-black text-white/40 leading-none tabular-nums">{Math.floor(team.sync)}%</p>
                                                    </div>
                                                </div>

                                                {/* Sync bar */}
                                                <div className="h-[2px] w-full bg-white/[0.04] rounded-full overflow-hidden">
                                                    <div className="h-full bg-[#E81414] rounded-full transition-all" style={{ width: `${team.sync}%`, opacity: 0.6 }} />
                                                </div>

                                                {/* Actions */}
                                                <div className="grid grid-cols-2 gap-2 pt-1">
                                                    <button
                                                        onClick={() => updatePoints(team.id, 500)}
                                                        className="py-2.5 bg-[#E81414]/5 border border-[#E81414]/10 rounded-lg text-[8px] font-black text-[#E81414] hover:bg-[#E81414] hover:text-white transition-all"
                                                    >
                                                        +500 PTS
                                                    </button>
                                                    <button
                                                        onClick={() => updatePoints(team.id, -500)}
                                                        className="py-2.5 bg-white/[0.03] border border-white/5 rounded-lg text-[8px] font-black text-white/25 hover:bg-white hover:text-black transition-all"
                                                    >
                                                        −500 PTS
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Execution log */}
                                <div className="mt-8 p-6 bg-[#050505] border border-white/5 rounded-xl">
                                    <h3 className="text-[9px] font-black tracking-[0.5em] text-white/20 uppercase border-b border-white/5 pb-4 mb-5">
                                        OPERATIONAL EXECUTION LOG
                                    </h3>
                                    {commandLogs.length === 0 ? (
                                        <p className="text-[8px] font-black tracking-widest text-white/10 uppercase">NO OPERATIONS LOGGED</p>
                                    ) : (
                                        <div className="space-y-3 max-h-[220px] overflow-y-auto no-scrollbar">
                                            {commandLogs.map((log, i) => (
                                                <div key={i} className="flex gap-5 items-center text-[10px] font-mono">
                                                    <span className="text-white/10 shrink-0 tabular-nums">[{log.timestamp}]</span>
                                                    <span className="text-[#E81414] font-black shrink-0">❯❯</span>
                                                    <span className="text-white/60 tracking-widest uppercase font-bold flex-1 truncate">{log.action}</span>
                                                    <span className="text-white/15 shrink-0">[SIG OK]</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </HUDFrame>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

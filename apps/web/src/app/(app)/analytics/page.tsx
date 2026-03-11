'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip,
    AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, Radar,
    CartesianGrid
} from 'recharts';

// ── DATA ────────────────────────────────────────────────────────────── */
const SECTORS = ['GLOBAL', 'NORTH', 'SOUTH', 'EAST', 'WEST', 'CENTRAL'];
const CLAN_NAMES = ['DRAGON', 'TIGER', 'CRANE', 'SNAKE', 'MONKEY', 'PHOENIX', 'WOLF', 'BEAR', 'SHARK', 'EAGLE'];

const GENERATED_TEAMS_BASE = Array.from({ length: 400 }, (_, i) => ({
    id: `0x${(i + 1000).toString(16).toUpperCase()}`,
    team: `${CLAN_NAMES[i % CLAN_NAMES.length]}_${Math.floor(i / 10 + 1).toString().padStart(2, '0')}`,
    value: Math.floor(Math.random() * 60 + 40),
    points: Math.floor(Math.random() * 50000 + 10000),
    velocity: Math.floor(Math.random() * 100),
    stability: Math.floor(Math.random() * 40 + 60),
    sync: Math.floor(Math.random() * 100),
    sector: SECTORS[Math.floor(Math.random() * (SECTORS.length - 1)) + 1],
    status: Math.random() > 0.9 ? 'AT RISK' : 'SECURE' as 'SECURE' | 'AT RISK',
}));

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
    children, title, subtitle, status = 'SECURE',
}: {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    status?: 'SECURE' | 'AT RISK' | 'BREACHED';
}) => (
    <div className="relative border border-white/5 bg-[#040404] p-4 sm:p-6 md:p-8 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 sm:mb-6 md:mb-8 border-b border-white/5 pb-5 gap-4">
            <div className="flex items-center gap-4">
                <img
                    src="/suriken.png"
                    alt="icon"
                    className="w-5 h-5 object-contain opacity-70"
                    style={{ transform: 'scale(2.2) translate(0px, 0px)' }}
                />
                <div className="space-y-1">
                    <p className="text-[11px] font-black tracking-[0.3em] text-white uppercase leading-none font-mono">{title}</p>
                    {subtitle && <p className="text-[8px] font-black tracking-[0.4em] text-white/20 uppercase leading-none font-mono">{subtitle}</p>}
                </div>
            </div>

        </div>
        <div className="w-full overflow-visible">{children}</div>
    </div>
);

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
                <span className="text-2xl font-black text-white tabular-nums">{value}<span className="text-sm text-white/30">%</span></span>
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
            <span className="text-white/60">{value}%</span>
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
    const points = Array.from({ length: 20 }, (_, i) => ({
        x: i,
        y: 30 + Math.sin(i * 0.7) * 12 + Math.cos(i * 1.3) * 8 + Math.random() * 6,
    }));
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
    const [teams, setTeams] = useState(GENERATED_TEAMS_BASE);
    const [chartMode, setChartMode] = useState<'bar' | 'area'>('area');
    const [activeSector, setActiveSector] = useState('GLOBAL');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'roster' | 'analytics'>('analytics');
    const [commandLogs, setCommandLogs] = useState<{ id: string; action: string; timestamp: string }[]>([]);

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
                                <span className="px-3 py-1 bg-[#E81414] text-white text-[8px] font-black tracking-[0.3em] rounded">TACTICAL_HQ</span>
                                <span className="text-[8px] font-black tracking-[0.5em] text-white/20 uppercase">CRIMSON_COMMAND_CENTER</span>
                            </div>
                            <div className="flex items-end gap-6">
                                <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-none">
                                    COMMAND<br />
                                    <span className="text-[#E81414]">ROSTER</span>
                                </h1>
                                <img
                                    src="/suriken.png"
                                    alt="shuriken"
                                    className="w-14 h-14 object-contain mb-1 opacity-80 animate-spin"
                                    style={{ transform: 'scale(2.2) translate(0px, 0px)', animationDuration: '12s' }}
                                />
                            </div>
                            <p className="text-[9px] text-white/20 tracking-[0.4em] uppercase font-mono">
                                400 CLANS · REAL-TIME MONITOR · SEASON III
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
                                    COMMAND_ROSTER
                                </button>
                            </div>

                            {/* Search */}
                            <input
                                type="text"
                                placeholder="SEARCH CLAN ID / NAME..."
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
                        { title: 'SYST_STABILITY', sub: '系統穩定性', value: 94, label: 'INTEGRITY', slug: 'CASTLE_WALL', status: 'SECURE' as const },
                        { title: 'BATTLE_READY', sub: '戰鬥準備量', value: 78, label: 'RESOURCES', slug: 'SHOGUN_ARMORY', status: 'AT RISK' as const },
                        { title: 'ZEN_FLOW', sub: '禪流速率', value: 62, label: 'THROUGHPUT', slug: 'TEMP_SYNC', status: 'SECURE' as const },
                        { title: 'GLOBAL_SYNC', sub: '全球同步率', value: 88, label: 'NETWORK', slug: 'GRID_LOCK', status: 'SECURE' as const },
                    ].map(card => (
                        <HUDFrame key={card.title} title={card.title} subtitle={card.sub} status={card.status}>
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
                                <HUDFrame title="FORCE RADAR" subtitle="戰力雷達 // TACTICAL SCANNER">
                                    <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RadarChart data={POWER_DATA} cx="50%" cy="50%" outerRadius="75%">
                                                <PolarGrid stroke="rgba(255,255,255,0.05)" />
                                                <PolarAngleAxis
                                                    dataKey="subject"
                                                    tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 9, fontFamily: 'monospace', fontWeight: 900 }}
                                                />
                                                <Radar name="ALPHA" dataKey="A" stroke="#E81414" fill="#E81414" fillOpacity={0.08} strokeWidth={1.5} />
                                                <Radar name="BETA" dataKey="B" stroke="rgba(255,255,255,0.3)" fill="rgba(255,255,255,0.03)" strokeWidth={1} />
                                            </RadarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="flex gap-5 pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-2 text-[8px] font-black tracking-widest text-white/30 font-mono">
                                            <div className="w-6 h-[1.5px] bg-[#E81414]" />ALPHA CLAN
                                        </div>
                                        <div className="flex items-center gap-2 text-[8px] font-black tracking-widest text-white/30 font-mono">
                                            <div className="w-6 h-[1px] bg-white/30" />AVG FIELD
                                        </div>
                                    </div>
                                </HUDFrame>

                                {/* Province sync bars */}
                                <HUDFrame title="PROVINCE LOAD" subtitle="橫向指標 // SECTOR DENSITY">
                                    <div className="space-y-5 py-2">
                                        {chartData.slice(0, 5).map((clan, i) => (
                                            <StatBar key={i} label={clan.team} value={clan.sync} color={i === 0 ? '#E81414' : 'rgba(255,255,255,0.25)'} />
                                        ))}
                                    </div>
                                </HUDFrame>
                            </div>

                            {/* ── RIGHT COLUMN ───── */}
                            <div className="lg:col-span-8 space-y-6">
                                <HUDFrame title="TACTICAL DATAPLANE" subtitle="戰術數據層 // PERFORMANCE MONITOR">
                                    {/* Chart mode toggle */}
                                    <div className="flex gap-2 mb-5">
                                        <button
                                            onClick={() => setChartMode('area')}
                                            className={`px-5 py-1.5 rounded-lg text-[8px] font-black tracking-widest transition-all border ${chartMode === 'area' ? 'bg-[#E81414] border-[#E81414] text-white' : 'border-white/5 text-white/30 hover:text-white'}`}
                                        >
                                            AREA_STREAM
                                        </button>
                                        <button
                                            onClick={() => setChartMode('bar')}
                                            className={`px-5 py-1.5 rounded-lg text-[8px] font-black tracking-widest transition-all border ${chartMode === 'bar' ? 'bg-[#E81414] border-[#E81414] text-white' : 'border-white/5 text-white/30 hover:text-white'}`}
                                        >
                                            BAR_HUD
                                        </button>
                                    </div>

                                    <div className="h-[380px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            {chartMode === 'bar' ? (
                                                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -30, bottom: 30 }}>
                                                    <CartesianGrid strokeDasharray="1 4" vertical={false} stroke="rgba(255,255,255,0.03)" />
                                                    <XAxis dataKey="team" stroke="transparent" tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 8, fontFamily: 'monospace', fontWeight: 900 }} axisLine={false} tickLine={false} angle={-40} textAnchor="end" />
                                                    <YAxis stroke="transparent" tick={{ fill: 'rgba(255,255,255,0.15)', fontSize: 8, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                                                    <Tooltip
                                                        contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(232,20,20,0.3)', fontSize: 9, fontWeight: 900, fontFamily: 'monospace', borderRadius: 8 }}
                                                        itemStyle={{ color: '#E81414' }}
                                                        labelStyle={{ color: 'rgba(255,255,255,0.4)' }}
                                                    />
                                                    <Bar dataKey="value" radius={[3, 3, 0, 0]} fill="#E81414" fillOpacity={0.85} barSize={28} />
                                                    <Bar dataKey="sync" radius={[3, 3, 0, 0]} fill="rgba(255,255,255,0.08)" barSize={28} />
                                                </BarChart>
                                            ) : (
                                                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -30, bottom: 30 }}>
                                                    <defs>
                                                        <linearGradient id="cg1" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="0%" stopColor="#E81414" stopOpacity={0.3} />
                                                            <stop offset="100%" stopColor="#E81414" stopOpacity={0} />
                                                        </linearGradient>
                                                        <linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" stopOpacity={1} />
                                                            <stop offset="100%" stopColor="rgba(255,255,255,0)" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="1 4" vertical={false} stroke="rgba(255,255,255,0.03)" />
                                                    <XAxis dataKey="team" stroke="transparent" tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 8, fontFamily: 'monospace', fontWeight: 900 }} axisLine={false} tickLine={false} angle={-40} textAnchor="end" />
                                                    <YAxis stroke="transparent" tick={{ fill: 'rgba(255,255,255,0.15)', fontSize: 8, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                                                    <Tooltip
                                                        contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(232,20,20,0.3)', fontSize: 9, fontWeight: 900, fontFamily: 'monospace', borderRadius: 8 }}
                                                        itemStyle={{ color: '#E81414' }}
                                                        labelStyle={{ color: 'rgba(255,255,255,0.4)' }}
                                                    />
                                                    <Area type="monotone" dataKey="value" stroke="#E81414" strokeWidth={1.5} fill="url(#cg1)" />
                                                    <Area type="monotone" dataKey="sync" stroke="rgba(255,255,255,0.2)" strokeWidth={1} fill="url(#cg2)" />
                                                </AreaChart>
                                            )}
                                        </ResponsiveContainer>
                                    </div>
                                </HUDFrame>

                                {/* Bottom 2-col stats */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <HUDFrame title="LOGISTICAL_DIST" subtitle="物流分配">
                                        <div className="grid grid-cols-3 gap-2 py-2">
                                            {SECTORS.slice(1).map(s => (
                                                <div key={s} className="flex flex-col items-center gap-1.5 md:gap-2">
                                                    <div className={`w-full py-2 border border-white/5 rounded-lg flex items-center justify-center transition-all ${activeSector === s ? 'bg-[#E81414]/10 border-[#E81414]/20 text-[#E81414]' : 'bg-white/[0.03] text-white/25'}`}>
                                                        <span className="text-[9px] font-black">92%</span>
                                                    </div>
                                                    <span className="text-[7px] font-black tracking-widest text-white/15 uppercase">{s}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </HUDFrame>

                                    <HUDFrame title="VELOCITY_STREAM" subtitle="速度帶指標">
                                        <div className="space-y-3 py-1">
                                            {chartData.slice(0, 4).map((clan, i) => (
                                                <div key={i} className="space-y-1">
                                                    <div className="flex justify-between text-[8px] font-black font-mono">
                                                        <span className="text-white/25 uppercase truncate max-w-[120px]">{clan.team}</span>
                                                        <span className="text-white/50">{clan.velocity}%</span>
                                                    </div>
                                                    <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                                                        <motion.div
                                                            className="h-full rounded-full"
                                                            style={{ background: i === 0 ? '#E81414' : 'rgba(255,255,255,0.2)' }}
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${clan.velocity}%` }}
                                                            transition={{ duration: 1.0 + i * 0.2, ease: 'circOut' }}
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
                            <HUDFrame title="COMMAND_ROSTER_400" subtitle="全體隊伍監控 // GRID_ARRAY">
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
                                            {/* Status indicator */}
                                            <div className={`absolute top-4 right-4 w-1.5 h-1.5 rounded-full ${team.status === 'AT RISK' ? 'bg-white/20' : 'bg-[#E81414]'} animate-pulse`} />

                                            <div className="space-y-4">
                                                <div>
                                                    <p className="text-[7px] text-white/20 font-black tracking-widest font-mono mb-1">{team.id}</p>
                                                    <p className="text-[13px] font-black text-white uppercase tracking-tight leading-tight truncate">{team.team}</p>
                                                    <p className="text-[7px] font-black tracking-[0.3em] text-white/15 uppercase mt-1">{team.sector}</p>
                                                </div>

                                                <div className="border-t border-white/5 pt-3 grid grid-cols-2 gap-3">
                                                    <div>
                                                        <span className="text-[7px] text-white/15 font-black uppercase block mb-1">XP_RESERVE</span>
                                                        <p className="text-base font-black text-white leading-none tabular-nums">{team.points.toLocaleString()}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-[7px] text-white/15 font-black uppercase block mb-1">SYNC%</span>
                                                        <p className="text-base font-black text-white/40 leading-none tabular-nums">{team.sync}%</p>
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
                                        OPERATIONAL_EXECUTION_LOG
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
                                                    <span className="text-white/15 shrink-0">[SIG_OK]</span>
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

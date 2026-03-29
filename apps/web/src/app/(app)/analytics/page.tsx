'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip,
    AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, Radar,
    CartesianGrid, ReferenceLine, Legend, Cell
} from 'recharts';
import DynastyRadar from '../../SamuraiRadar';
import { Button } from '@/components/ui/Button';
import { GOTIcon } from '@/components/icons/GOTIcon';
import { SurikenIcon } from '@/components/icons/SurikenIcon';
import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { HUDCard } from '@/components/ui/HUDCard';
import { RadialGauge } from '@/components/ui/RadialGauge';
import { StatBar } from '@/components/ui/StatBar';

const SECTORS = ['GLOBAL', 'THE NORTH', 'THE REACH', 'DORNE', 'THE WEST', 'IRON ISLANDS'];

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
            let apiTeams: any[] = [];
            try {
                const res = await fetch('http://localhost:5000/teams');
                if (res.ok) {
                    apiTeams = await res.json();
                }
            } catch (err) {
                console.warn("Backend offline, using local registry");
            }

            // Merge with local persistent teams
            const localTeamsStr = localStorage.getItem('persistent_teams');
            const localTeams = localTeamsStr ? JSON.parse(localTeamsStr) : [];
            
            const rawCombined = [...apiTeams];
            localTeams.forEach((lt: any) => {
                const idx = rawCombined.findIndex(ct => ct.name === lt.name);
                if (idx !== -1) {
                    rawCombined[idx] = { ...rawCombined[idx], ...lt };
                } else {
                    rawCombined.push(lt);
                }
            });

            const processed = rawCombined.map((t: any, i: number) => ({
                id: t.id || `local-${t.name}`,
                team: t.name,
                value: Math.min(100, Math.floor((t.score || 0) / 100)), // Scale XP to %
                points: t.score || 0,
                velocity: Math.floor(Math.random() * 40 + 30),
                stability: Math.floor(Math.random() * 40 + 60),
                sync: Math.floor(Math.random() * 20 + 75),
                status: Math.random() > 0.9 ? 'AT RISK' : 'SECURE',
                sector: SECTORS[(i % (SECTORS.length - 1)) + 1],
            }));

            setTeams(processed);
        };
        fetchTeams();

        setMetrics({
            stability: Math.floor(90 + Math.random() * 10),
            battleReady: Math.floor(70 + Math.random() * 20),
            zenFlow: Math.floor(60 + Math.random() * 25)
        });

        // Sync with manual score updates
        window.addEventListener('profile_update', fetchTeams);
        return () => window.removeEventListener('profile_update', fetchTeams);
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
    const emptyData = Array.from({ length: 6 }).map((_, i) => ({
        team: `---`,
        value: 0,
        sync: 0,
        velocity: 0,
        stability: 0
    }));
    const displayData = chartData.length > 0 ? chartData : emptyData;


    if (!mounted) return null;

    return (
        <div className="w-full pb-24 bg-[#000000] min-h-screen font-mono relative text-white">
            <div
                className="fixed inset-0 opacity-[0.025] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
            />

            <div className="relative z-10 p-4 sm:p-8 space-y-8">
                <PageHeader 
                    title="ROYAL" 
                    accentTitle="HQ" 
                    subtitle="DRAGON COMMAND CENTER"
                    topLabel="400 HOUSES | REAL-TIME MONITOR | SEASON III"
                />

                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
                    {SECTORS.map(sector => (
                        <Button
                            key={sector}
                            variant={activeSector === sector ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setActiveSector(sector)}
                            className="px-5 py-1.5 h-auto text-[8px]"
                        >
                            {sector}
                        </Button>
                    ))}
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {[
                        { title: 'REALM STABILITY', sub: 'KINGDOM SECURITY', value: metrics.stability, label: 'INTEGRITY', slug: 'RED KEEP WALL', status: 'SECURE' as const, icon: 'shield' as const },
                        { title: 'WAR READY', sub: 'ARMY PREP', value: metrics.battleReady, label: 'RESOURCES', slug: 'ROYAL ARMORY', status: 'AT RISK' as const, icon: 'zap' as const },
                        { title: 'DIRE FLOW', sub: 'VALYRIAN SPEED', value: metrics.zenFlow, label: 'THROUGHPUT', slug: 'KINGDOM SYNC', status: 'SECURE' as const, icon: 'zap' as const },
                        { title: 'REALM SYNC', sub: 'KINGDOM SYNC', value: teams[0]?.sync || 88, label: 'NETWORK', slug: 'GRID LOCK', status: 'SECURE' as const, icon: 'globe' as const },
                    ].map((card, i) => (
                        <HUDCard 
                            key={card.title} 
                            title={card.title} 
                            subtitle={card.sub} 
                            icon={<GOTIcon type="zap" size={32} scale={1.2} x={0} y={0} className="opacity-40" />}
                        >
                            <div className="flex justify-center py-4 md:py-10">
                                <RadialGauge value={card.value} label={card.label} sub={card.slug} />
                            </div>
                        </HUDCard>
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
                            <div className="lg:col-span-4 space-y-6">
                                <HUDCard title="FORCE RADAR" subtitle="TACTICAL PROJECTION" contentClassName="p-0 border-none bg-black overflow-hidden h-[450px]">
                                    <DynastyRadar teams={filteredData.slice(0, 5)} />
                                </HUDCard>

                                <HUDCard title="KINGDOM LOAD" subtitle="KINGDOM DENSITY" contentClassName="p-6 space-y-5">
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
                                                    <div key={i} className="flex justify-between items-center text-[8px] font-black font-mono">
                                                        <span className="text-white/40">{log.action}</span>
                                                        <span className="text-[#E81414]/40">{log.timestamp}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </HUDCard>
                            </div>

                            <div className="lg:col-span-8 space-y-6">
                                <HUDCard 
                                    title="REALM SYNC STREAM" 
                                    subtitle="TEMPORAL HOUSE DRIFT"
                                    headerClassName="flex-wrap gap-y-3"
                                    actions={
                                        <div className="flex gap-2 flex-wrap">
                                            <Button
                                                variant={chartMode === 'area' ? 'primary' : 'outline'}
                                                size="sm"
                                                onClick={() => setChartMode('area')}
                                                className="px-4 h-8 text-[8px]"
                                            >
                                                AREA
                                            </Button>
                                            <Button
                                                variant={chartMode === 'bar' ? 'primary' : 'outline'}
                                                size="sm"
                                                onClick={() => setChartMode('bar')}
                                                className="px-4 h-8 text-[8px]"
                                            >
                                                BAR
                                            </Button>
                                        </div>
                                    }
                                >
                                    <div className="h-[300px] sm:h-[400px] w-full p-3 sm:p-8">
                                        <div className="flex items-center justify-start gap-4 sm:gap-6 mb-4 sm:mb-8 flex-wrap">
                                            <div>
                                                <p className="text-white/30 text-[8px] font-black uppercase tracking-widest">Active Nodes</p>
                                                <p className="text-white font-mono text-base sm:text-lg leading-none mt-1">{filteredData.length}</p>
                                            </div>
                                            <div>
                                                <p className="text-white/30 text-[8px] font-black uppercase tracking-widest">Avg Pulse</p>
                                                <p className="text-[#E81414] font-mono text-base sm:text-lg leading-none mt-1">84%</p>
                                            </div>
                                        </div>

                                        {chartMode === 'bar' ? (
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={displayData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                                    <XAxis 
                                                        dataKey="team" 
                                                        stroke="rgba(255,255,255,0.1)" 
                                                        tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10, fontFamily: 'Inter, sans-serif', fontWeight: 700 }} 
                                                        axisLine={true} 
                                                        tickLine={false} 
                                                        dy={10}
                                                    />
                                                    <YAxis 
                                                        stroke="rgba(255,255,255,0.1)" 
                                                        tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'Inter, sans-serif' }} 
                                                        axisLine={true} 
                                                        tickLine={false} 
                                                    />
                                                    <Tooltip
                                                        cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                                                        contentStyle={{ 
                                                            backgroundColor: '#0a0a0a', 
                                                            border: '1px solid rgba(255,255,255,0.1)', 
                                                            borderRadius: 12, 
                                                            padding: '12px',
                                                            boxShadow: '0 20px 40px rgba(0,0,0,0.5)' 
                                                        }}
                                                        itemStyle={{ fontSize: '11px', fontWeight: 800 }}
                                                        labelStyle={{ color: 'rgba(255,255,255,0.4)', marginBottom: '8px', fontSize: '10px' }}
                                                    />
                                                    <Legend 
                                                        verticalAlign="top" 
                                                        align="right" 
                                                        iconType="circle"
                                                        wrapperStyle={{ paddingTop: '0', paddingBottom: '30px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}
                                                    />
                                                    <Bar name="CURRENT POWER" dataKey="value" radius={[6, 6, 0, 0]} fill="#E81414" barSize={34}>
                                                        {displayData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={index === 0 ? '#E81414' : 'rgba(232,20,20,0.4)'} />
                                                        ))}
                                                    </Bar>
                                                    <Bar name="PLATFORM SYNC" dataKey="sync" radius={[6, 6, 0, 0]} fill="rgba(255,255,255,0.1)" barSize={34} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        ) : (
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={displayData} margin={{ top: 0, right: 30, left: 0, bottom: 30 }}>
                                                    <defs>
                                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#E81414" stopOpacity={0.4} />
                                                            <stop offset="95%" stopColor="#E81414" stopOpacity={0} />
                                                        </linearGradient>
                                                        <linearGradient id="colorSync" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#fff" stopOpacity={0.05} />
                                                            <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                                    <XAxis 
                                                        dataKey="team" 
                                                        stroke="rgba(255,255,255,0.1)" 
                                                        tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10, fontFamily: 'Inter, sans-serif', fontWeight: 700 }} 
                                                        axisLine={true} 
                                                        tickLine={false} 
                                                        dy={10}
                                                    />
                                                    <YAxis 
                                                        stroke="rgba(255,255,255,0.1)" 
                                                        tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'Inter, sans-serif' }} 
                                                        axisLine={true} 
                                                        tickLine={false} 
                                                        domain={[0, 100]}
                                                    />
                                                    <Tooltip
                                                        contentStyle={{ 
                                                            backgroundColor: '#0a0a0a', 
                                                            border: '1px solid rgba(255,255,255,0.1)', 
                                                            borderRadius: 12, 
                                                            padding: '12px',
                                                            boxShadow: '0 20px 40px rgba(0,0,0,0.5)' 
                                                        }}
                                                        itemStyle={{ fontSize: '11px', fontWeight: 800 }}
                                                        labelStyle={{ color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}
                                                    />
                                                    <Legend 
                                                        verticalAlign="top" 
                                                        align="right" 
                                                        iconType="circle"
                                                        wrapperStyle={{ paddingTop: '0', paddingBottom: '30px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}
                                                    />
                                                    <Area 
                                                        name="HOUSE STRENGTH"
                                                        type="monotone" 
                                                        dataKey="value" 
                                                        stroke="#E81414" 
                                                        strokeWidth={4} 
                                                        fillOpacity={1} 
                                                        fill="url(#colorValue)" 
                                                        activeDot={{ r: 8, strokeWidth: 0, fill: '#fff' }}
                                                        dot={{ r: 3, fill: '#E81414', strokeWidth: 0 }}
                                                    />
                                                    <Area 
                                                        name="SYNC STABILITY"
                                                        type="monotone" 
                                                        dataKey="sync" 
                                                        stroke="rgba(255,255,255,0.5)" 
                                                        strokeWidth={2} 
                                                        fillOpacity={1}
                                                        fill="url(#colorSync)"
                                                        activeDot={{ r: 8, strokeWidth: 0, fill: '#fff' }}
                                                        dot={{ r: 3, fill: 'rgba(255,255,255,0.5)', strokeWidth: 0 }}
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        )}
                                    </div>
                                </HUDCard>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <HUDCard title="ROYAL LOGISTICS" subtitle="SUPPLY LINES" contentClassName="p-4 md:p-10">
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-2">
                                            {SECTORS.slice(1).map(s => {
                                                const sectorAvg = teams.filter(t => t.sector === s).reduce((acc, curr) => acc + curr.value, 0) / (teams.filter(t => t.sector === s).length || 1);
                                                return (
                                                    <div key={s} className="flex flex-col items-center gap-1.5 md:gap-2">
                                                        <div className={`w-full py-2 border border-white/5 rounded-lg flex items-center justify-center transition-all ${activeSector === s ? 'bg-[#E81414]/10 border-[#E81414]/20 text-[#E81414]' : 'bg-white/[0.03] text-white/25'}`}>
                                                            <span className="text-[9px] font-black">{Math.floor(sectorAvg)}%</span>
                                                        </div>
                                                        <span className="text-[7px] font-black tracking-widest text-white/15 uppercase text-center leading-tight">{s}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </HUDCard>

                                    <HUDCard title="DRAGON VELOCITY" subtitle="DRAGON STREAM" contentClassName="p-10">
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
                                    </HUDCard>
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
                            <HUDCard title="ROYAL ROSTER 400" subtitle="HOUSE MONITOR GRID">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
                                    {[
                                        { label: 'TOTAL HOUSES', value: filteredData.length },
                                        { label: 'AT RISK', value: filteredData.filter(t => t.status === 'AT RISK').length },
                                        { label: 'SECTOR', value: activeSector },
                                    ].map(s => (
                                        <div key={s.label} className="bg-white/[0.02] border border-white/5 rounded-xl px-3 py-3 md:px-5 md:py-4">
                                            <p className="text-[6px] md:text-[7px] font-black tracking-[0.4em] text-white/20 uppercase mb-1 md:mb-2">{s.label}</p>
                                            <p className="text-sm md:text-xl font-black text-white ">{s.value}</p>
                                        </div>
                                    ))}
                                </div>

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
                                                        <p className="text-base font-black text-white  tabular-nums">{team.points.toLocaleString()}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-[7px] text-white/15 font-black uppercase block mb-1">SYNC%</span>
                                                        <p className="text-base font-black text-white/40  tabular-nums">{Math.floor(team.sync)}%</p>
                                                    </div>
                                                </div>

                                                <div className="h-[2px] w-full bg-white/[0.04] rounded-full overflow-hidden">
                                                    <div className="h-full bg-[#E81414] rounded-full transition-all" style={{ width: `${team.sync}%`, opacity: 0.6 }} />
                                                </div>

                                                <div className="grid grid-cols-2 gap-2 pt-1">
                                                    <Button
                                                        variant="primary"
                                                        size="sm"
                                                        fullWidth
                                                        onClick={() => updatePoints(team.id, 500)}
                                                        className="py-2.5 h-auto text-[8px] bg-[#E81414]/5 border-[#E81414]/10 text-[#E81414] hover:bg-[#E81414] hover:text-white"
                                                        icon={<GOTIcon type="zap" size={12} scale={1.2} x={0} y={0} />}
                                                    >
                                                        +500 PTS
                                                    </Button>
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        fullWidth
                                                        onClick={() => updatePoints(team.id, -500)}
                                                        className="py-2.5 h-auto text-[8px]"
                                                        icon={<GOTIcon type="zap" size={12} scale={1.2} x={0} y={0} />}
                                                    >
                                                        −500 PTS
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 p-6 bg-black border border-white/5 rounded-xl">
                                    <h3 className="text-[9px] font-black tracking-[0.5em] text-white/20 uppercase border-b border-white/5 pb-4 mb-5">
                                        ROYAL EXECUTION LOG
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
                            </HUDCard>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}



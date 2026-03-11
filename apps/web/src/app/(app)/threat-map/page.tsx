'use client';

import { motion } from 'framer-motion';

import { useState, useEffect } from 'react';

/* ── Decorative Components ─────────────────────────────────────────── */
const DotGrid = () => (
    <div className="absolute inset-0 dot-grid pointer-events-none opacity-[0.05]" />
);

const MetricCard = ({ label, value, color = "text-white" }: { label: string; value: string, color?: string }) => (
    <div className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-10 flex flex-col gap-6 min-w-[240px] hover:bg-[#E81414] hover:border-[#E81414] group transition-all text-white hover:text-black">
        <span className="text-[10px] tracking-[0.8em] uppercase font-black text-white/30 group-hover:text-black/60 transition-colors">{label}</span>
        <span className={`text-5xl font-bold tracking-tighter uppercase ${color} group-hover:text-black transition-colors`}>{value}</span>
    </div>
);

export default function ThreatMapPage() {
    const [points, setPoints] = useState<{ x: number, y: number, id: number, intensity: number }[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setPoints(prev => {
                const newPoints = [...prev.filter(p => Math.random() > 0.3), {
                    x: Math.random() * 80 + 10,
                    y: Math.random() * 80 + 10,
                    id: Date.now(),
                    intensity: Math.random()
                }].slice(-15);
                return newPoints;
            });
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full pb-24 space-y-16 relative overflow-hidden">
            <DotGrid />

            {/* ══ HEADER SECTION ══════════════════════════════════════════════ */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end border-b border-white/10 pb-12 gap-12 relative z-10">
                <div className="space-y-6">
                    <h1 className="text-6xl md:text-8xl tracking-tighter uppercase font-black leading-[0.85] text-white">
                        THREAT<br /><span className="text-white">DYNAMICS</span>
                    </h1>
                </div>

                <div className="flex flex-wrap gap-8">
                    <MetricCard label="ANOMALIES" value="12,042" color="text-[#E81414]" />
                    <MetricCard label="STABILITY" value="94.2%" />
                </div>
            </div>

            {/* ══ MATRICES ═══════════════════════════════════════════════════ */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-fit min-h-[900px] relative z-10">

                {/* Left: Global Sensor Grid */}
                <div className="xl:col-span-8 bg-[#050505] border border-white/10 rounded-[3rem] relative overflow-hidden flex items-center justify-center p-16 group/map hover:border-white/20 transition-all">
                    <DotGrid />
                    <div className="absolute inset-0 scanlines opacity-5 pointer-events-none mix-blend-overlay group-hover/map:opacity-10 transition-opacity" />

                    {/* Geodesic Overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.1]">
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white" />
                        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-white/20 rounded-full" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-white/10 rounded-full animate-spin-slow line-dashed" />
                    </div>

                    <div className="absolute top-12 left-12 flex flex-col gap-6 z-10 bg-black/50 backdrop-blur-md rounded-3xl p-6 border border-white/10">
                        <div className="flex items-center gap-6 group/target cursor-pointer">
                            <img src="/suriken.png" alt="icon" className="w-8 h-8 [#E81414] transition-transform duration-700 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                            <div className="space-y-1">
                                <span className="text-[12px] font-black tracking-[0.6em] uppercase text-white">SENSOR CORE V9.4</span>
                                <div className="flex items-center gap-4">
                                    
                                    <span className="text-[9px] tracking-[0.4em] font-black text-white/40 uppercase">GRID STABLE</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active Threat Points */}
                    <div className="absolute inset-20 z-20">
                        {points.map((p) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
                                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                            >
                                <div className={`w-32 h-32 rounded-full ${p.intensity > 0.6 ? 'bg-[#E81414]' : 'bg-white'} opacity-5 animate-ping`} />
                                <div className={`absolute w-3 h-3 rounded-full ${p.intensity > 0.6 ? 'bg-[#E81414]' : 'bg-white'} border border-black group-hover/map:scale-150 transition-transform`} />

                                <div className="absolute top-12 whitespace-nowrap bg-black text-white px-5 py-2 text-[9px] font-black tracking-[0.4em] uppercase border border-white/20 rounded-full shadow-2xl backdrop-blur-md">
                                    <span className={p.intensity > 0.6 ? 'text-[#E81414]' : 'text-white'}>
                                        {p.intensity > 0.6 ? 'PRIORITY ALPHA' : 'SECTOR SYNC'}
                                    </span> 0x{p.id.toString().slice(-4)}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="absolute bottom-12 right-12 flex items-center gap-6 bg-black/50 backdrop-blur-md rounded-full px-6 py-4 border border-white/10">
                        <img src="/suriken.png" alt="icon" className="w-5 h-5 animate-pulse object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        <span className="text-[9px] tracking-[0.6em] font-black uppercase text-white/40">LIVE PULSE ESTABLISHED</span>
                    </div>
                </div>

                {/* Right: Incident Vault */}
                <div className="xl:col-span-4 bg-[#0A0A0A] border border-white/10 rounded-[3rem] flex flex-col relative overflow-hidden group/sidebar transition-all">
                    <div className="p-10 border-b border-white/10 bg-white/5 text-white flex justify-between items-center relative overflow-hidden">
                        <div className="flex items-center gap-6 relative z-10">
                            <img src="/suriken.png" alt="icon" className="w-8 h-8 [#E81414] object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                            <span className="text-[14px] font-black tracking-[0.6em] uppercase">THREAT VAULT</span>
                        </div>
                        
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide relative z-10">
                        {[
                            { t: '12:00:42', s: 'AP SOUTH', type: 'KERNEL BREACH', sev: 'CRITICAL' },
                            { t: '11:59:12', s: 'EU CENTRAL', type: 'SQL INJECT V2', sev: 'HIGH' },
                            { t: '11:58:05', s: 'US EAST', type: 'PORT SCAN X', sev: 'MID' },
                            { t: '11:57:44', s: 'UNKNOWN', type: 'ENCRYPT BLOCK', sev: 'CRITICAL' },
                            { t: '11:56:30', s: 'GLOBAL CDN', type: 'DNS HIJACK', sev: 'HIGH' },
                        ].map((incident, i) => (
                            <div key={i} className="bg-black border border-white/10 rounded-[2rem] p-8 relative group/item hover:bg-[#E81414] hover:border-[#E81414] hover:text-black text-white transition-all cursor-pointer overflow-hidden">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="flex items-center gap-4">
                                        <img src="/suriken.png" alt="icon" className="w-4 h-4 [#E81414] group-hover/item:text-black transition-colors object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                        <span className="text-[10px] font-black tracking-[0.3em] uppercase group-hover/item:text-black/60 text-white/40 transition-colors">{incident.t}</span>
                                    </div>
                                    <span className="text-[9px] px-4 py-1 border border-current rounded-full font-black uppercase tracking-[0.4em] group-hover/item:text-black/80 transition-colors">{incident.s}</span>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-xl font-black tracking-tighter uppercase transition-colors">{incident.type}</h4>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-2 h-2 rounded-full ${incident.sev === 'CRITICAL' ? 'bg-[#E81414] group-hover/item:bg-black' : 'bg-white group-hover/item:bg-black/50'} transition-colors`} />
                                        <span className={`text-[9px] font-black tracking-[0.4em] uppercase opacity-40 group-hover/item:text-black/60 group-hover/item:opacity-100 transition-colors`}>
                                            {incident.sev} SEVERITY
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-8 border-t border-white/10 bg-black group/footer relative z-10">
                        <button className="w-full py-6 rounded-full bg-white text-black text-[11px] tracking-[0.6em] font-black uppercase hover:bg-[#E81414] hover:text-white transition-all flex items-center justify-center gap-6 relative overflow-hidden group/btn">
                            <span className="relative z-10">DOWNLOAD VAULT V9</span>
                            <img src="/suriken.png" alt="icon" className="w-5 h-5 relative z-10 group-hover/btn:translate-x-4 transition-transform object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ══ ACTION FOOTER ═══════════════════════════════════════════════ */}
            <div className="p-10 border border-white/10 rounded-[3rem] bg-[#0A0A0A] flex flex-col md:flex-row items-center justify-between group/action cursor-pointer hover:bg-[#E81414] hover:border-[#E81414] transition-all text-white hover:text-black gap-8">
                <div className="flex items-center gap-8 relative z-10">
                    <img src="/suriken.png" alt="icon" className="w-10 h-10 [#E81414] group-hover:text-black transition-colors object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                    <div className="space-y-2 text-center md:text-left">
                        <p className="text-[10px] tracking-[0.6em] font-black uppercase text-white/30 group-hover:text-black/60 transition-colors">OPERATIONAL SYNC</p>
                        <h4 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white group-hover:text-black transition-colors">DEPLOY GLOBAL SHIELD V4</h4>
                    </div>
                </div>
                <div className="flex items-center gap-8 group-hover:text-black transition-colors">
                    <span className="text-4xl font-bold">0x9F</span>
                    <img src="/suriken.png" alt="icon" className="w-10 h-10 group-hover/action:translate-x-2 transition-transform object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                </div>
            </div>
        </div>
    );
}

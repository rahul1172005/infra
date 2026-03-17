'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Rocket, Shield } from 'lucide-react';

/* ── Decorative Elements ─────────────────────────────────────────────── */
const DotGrid = ({ className = ""}: { className?: string }) => (
 <div className={`absolute inset-0 dot-grid opacity-[0.05] pointer-events-none ${className}`} />
);

export default function BattleRoyalePage() {
 return (
 <div className="w-full pb-24 space-y-16 relative overflow-hidden">
 {/* Background Effects */}
 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(232,20,20,0.03)_0%,transparent_70%)] pointer-events-none"/>

 {/* Header Module */}
 <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center border-b border-white/10 pb-12 gap-10 relative z-10">
 <div className="space-y-6">
 <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] text-white">
 BATTLE<br /><span className="text-[#E81414]">ROYALE.</span>
 </h1>
 </div>

 <div className="flex items-center gap-10 bg-[#0A0A0A] border border-white/10 p-10 group hover:bg-[#E81414] hover:border-[#E81414] transition-all rounded-[2.5rem]">
 <div className="flex flex-col items-start gap-4">
 <span className="text-[10px] tracking-[0.4em] font-black uppercase text-white/30 group-hover:text-black/60 transition-colors">DEPLOYMENT WINDOW</span>
 <div className="flex items-center gap-6">
 
 <span className="text-4xl font-black uppercase tracking-widest text-white group-hover:text-black tabular-nums transition-colors">04:22:15</span>
 </div>
 </div>
 </div>
 </div>

 {/* Main Stage Section */}
 <div className="bg-[#050505] border border-white/10 relative min-h-[700px] flex flex-col items-center justify-center p-12 overflow-hidden text-center group/stage rounded-[3rem] transition-all">
 <DotGrid />
 <div className="absolute inset-0 scanlines opacity-5 pointer-events-none"/>

 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.01] uppercase select-none pointer-events-none whitespace-nowrap group-hover:tracking-[0.1em] transition-all duration-1000">
 SHRINKING ZONE
 </div>

 <div className="relative z-10 space-y-12 max-w-4xl px-8">
 <div className="w-32 h-32 bg-white/5 border border-white/10 flex items-center justify-center mx-auto hover:bg-[#E81414] group/icon transition-all relative rounded-full">
 <span className="text-6xl font-black text-white group-hover/icon:scale-110 transition-transform">X</span>
 </div>

 <div className="space-y-8 group/text">
 <h2 className="text-5xl md:text-8xl font-black uppercase text-white tracking-widest leading-none border-b-4 border-[#E81414] pb-6 inline-block">
 DROPSHIP EN ROUTE.
 </h2>
 <div className="p-12 border border-white/5 bg-[#0A0A0A] max-w-2xl mx-auto backdrop-blur-sm rounded-[2.5rem]">
 <p className="text-[14px] tracking-[0.1em] font-black text-white/50 uppercase leading-loose group-hover/text:text-white transition-colors duration-500">
 100 elite operatives drop into the grid. Survive tactical compression.
 Victory awarded to the last active node.
 </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 w-full">
                            <Button
                                variant="primary"
                                size="lg"
                                fullWidth
                                icon={Rocket}
                            >
                                SECURE DEPARTURE
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                fullWidth
                                icon={Shield}
                            >
                                RULES ENGAGEMENT
                            </Button>
                        </div>
 </div>
 </div>

 {/* Metrics Bottom Info */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
 <MetricBlock label="MAX LOBBY NODES"value="100.00"icon="[M]"/>
 <MetricBlock label="ZONE PROTOCOL"value="KERNEL LEAK"valueColor="text-[#E81414]"icon="[!]"/>
 <MetricBlock label="ELO REWARD POOL"value="15,000"icon="[+]"/>
 </div>
 </div>
 );
}

function MetricBlock({ label, value, valueColor = "text-white", icon }: any) {
 return (
 <div className="p-10 bg-[#0A0A0A] border border-white/10 hover:bg-[#E81414] hover:border-[#E81414] transition-all group/metric cursor-default rounded-[2.5rem]">
 <div className="flex flex-col gap-6">
 <div className="flex justify-between items-center border-b border-white/10 group-hover/metric:border-black/20 pb-6 transition-colors">
 <span className="text-[10px] tracking-[0.4em] font-black uppercase text-white/30 group-hover/metric:text-black/50 transition-colors">{label}</span>
 <div className="text-[#E81414] group-hover/metric:text-black transition-colors font-black text-xs">{icon}</div>
 </div>
 <p className={`text-4xl font-black tracking-tighter uppercase ${valueColor} group-hover/metric:text-black transition-colors`}>{value}</p>
 </div>
 </div>
 );
}

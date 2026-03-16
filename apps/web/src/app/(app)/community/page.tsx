'use client';

import { motion } from 'framer-motion';

const MessageCircle = (props: any) => <span {...props}>[M]</span>;
const Heart = (props: any) => <span {...props}>[H]</span>;
const Share2 = (props: any) => <span {...props}>[S]</span>;
const Terminal = (props: any) => <span {...props}>[T]</span>;
/* ── Decorative Elements ─────────────────────────────────────────────── */
const DotGrid = ({ className = "" }: { className?: string }) => (
    <div className={`absolute inset-0 dot-grid opacity-[0.03] pointer-events-none ${className}`} />
);

export default function CommunityPage() {
    return (
        <div className="w-full pb-20 space-y-12 text-black">

            {/* Header Module */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end border-b-2 border-black pb-12 gap-10">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-black flex items-center justify-center">
                            <img src="/suriken.png" alt="icon" className="w-5 h-5 white object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        </div>
                        <span className="text-[11px] tracking-[0.4em] font-black uppercase text-[#AAAAAA]">OPEN SOURCE NEXUS</span>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]">
                        DEV<br /><span className="text-[#E81414]">COMMUNITY.</span>
                    </h1>
                </div>

                <div className="flex items-center gap-8 bg-[#F9F9F9] border-2 border-black p-8">
                    <div className="flex flex-col items-start gap-1">
                        <span className="text-[10px] tracking-[0.4em] font-black uppercase text-[#999999]">NETWORK LOAD</span>
                        <div className="flex items-center gap-4">
                            
                            <span className="text-3xl font-black uppercase tracking-widest text-black text-[#E81414]">CRITICAL 100%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Locked State Container */}
            <div className="bg-white border-2 border-black relative min-h-[600px] flex flex-col items-center justify-center p-12 overflow-hidden text-center group">
                <DotGrid />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-black/[0.01] uppercase select-none pointer-events-none whitespace-nowrap">
                    DDOS MITIGATION
                </div>

                <div className="relative z-10 space-y-12 max-w-3xl px-8">
                    <div className="w-24 h-24 border-2 border-black bg-white flex items-center justify-center mx-auto hover:bg-black group/icon transition-all shadow-none">
                        <img src="/suriken.png" alt="icon" className="w-10 h-10 black group-hover/icon: transition-colors object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        <div className="absolute top-0 right-0 w-3 h-3 bg-[#E81414]" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 bg-black" />
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-5xl md:text-7xl font-black uppercase text-black tracking-tighter leading-none border-b-4 border-black pb-4 inline-block">
                            FORUMS OFFLINE.
                        </h2>
                        <div className="bg-[#F9F9F9] border-2 border-black p-10 max-w-2xl mx-auto">
                            <p className="text-[14px] tracking-[0.3em] font-black text-black uppercase leading-[1.8]">
                                The community sector is currently under heavy thread rotation.
                                Forums will initialize back once global DDoS mitigation
                                processes reach stabilization state.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="px-10 py-5 bg-black text-white text-[11px] tracking-[0.6em] font-black uppercase flex items-center gap-4">
                            VIEW STATUS PAGE <img src="/suriken.png" alt="icon" className="w-4 h-4 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        </div>
                        <div className="px-10 py-5 border-2 border-black bg-white text-black text-[11px] tracking-[0.6em] font-black uppercase hover:bg-[#F9F9F9] transition-all flex items-center gap-4">
                            RETRY CONNECTION <img src="/suriken.png" alt="icon" className="w-4 h-4 [#AAAAAA] object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Industrial Bottom Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 border-2 border-black bg-white divide-x-2 divide-black">
                {[
                    { label: 'ACTIVE THREADS', value: '42,012', icon: MessageCircle },
                    { label: 'ENGAGEMENT', value: '98%', icon: Heart },
                    { label: 'FORKS', value: '1,204', icon: Share2 },
                    { label: 'NODES', value: '1,421', icon: Terminal },
                ].map((stat, i) => (
                    <div key={i} className="p-8 flex flex-col gap-3 group hover:bg-[#F9F9F9] transition-colors">
                        <div className="flex items-center justify-between">
                            <stat.icon className="w-4 h-4 text-[#AAAAAA] group-hover:text-[#E81414] transition-colors" />
                            <span className="text-[9px] tracking-[0.4em] font-black uppercase text-[#999999]">{stat.label}</span>
                        </div>
                        <p className="text-xl font-black tracking-widest uppercase">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

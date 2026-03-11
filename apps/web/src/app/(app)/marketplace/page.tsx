'use client';

import { motion } from 'framer-motion';


/* ── Decorative Elements ─────────────────────────────────────────────── */
const DotGrid = ({ className = "" }: { className?: string }) => (
    <div className={`absolute inset-0 dot-grid opacity-[0.05] pointer-events-none ${className}`} />
);

export default function MarketplacePage() {
    return (
        <div className="w-full pb-24 space-y-16 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#E81414]/5 blur-[200px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/[0.02] blur-[150px] pointer-events-none" />

            {/* Header Module */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end border-b-2 border-white/10 pb-16 gap-12 relative z-10">
                <div className="space-y-8">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 flex items-center justify-center transition-transform duration-500 relative group/header">
                            <img
                                src="/logo.png"
                                alt="Zapsters Logo"
                                className="w-full h-full object-contain"
                                style={{ transform: "scale(2.2) translate(0px, 0px)" }}
                            />
                        </div>
                        <span className="text-[11px] tracking-[0.8em] font-black uppercase text-white/30">Logistic_Exchange_v9 // Global_Supply</span>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-white">
                        CORE<br /><span className="text-[#E81414]">MARKET.</span>
                    </h1>
                </div>

                <div className="flex items-center gap-12 bg-white/[0.02] border-2 border-white/10 p-10 group hover:border-[#E81414]/30 transition-all">
                    <div className="flex flex-col items-start gap-3">
                        <span className="text-[10px] tracking-[0.6em] font-black uppercase text-white/20">OPERATIVE_CREDITS_v4</span>
                        <div className="flex items-center gap-8">
                            <img src="/suriken.png" alt="icon" className="w-10 h-10 [#E81414] group-hover:scale-110 transition-transform object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                            <span className="text-5xl font-black uppercase tracking-tighter text-white">0.00 <span className="text-white/10">ZXP</span></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Marketplace Content (Locked State) */}
            <div className="bg-black border-2 border-white/10 relative min-h-[750px] flex flex-col items-center justify-center p-16 overflow-hidden group/stage hover:border-white/20 transition-all">
                <DotGrid />
                <div className="absolute inset-0 scanlines opacity-5 pointer-events-none group-hover/stage:opacity-10 transition-opacity" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.01] uppercase select-none pointer-events-none whitespace-nowrap">
                    OFFLINE_MODE_v9
                </div>

                <div className="relative z-10 flex flex-col items-center gap-16 max-w-4xl text-center">
                    <div className="w-32 h-32 border-2 border-white/10 bg-white/5 flex items-center justify-center relative hover:bg-black group/icon transition-all duration-500">
                        <img src="/suriken.png" alt="icon" className="w-12 h-12 [#E81414] group-hover:scale-110 transition-transform z-10 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        <div className="absolute inset-0 bg-[#E81414]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

                        {/* Corner markers */}
                        <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-[#E81414]" />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-white" />
                    </div>

                    <div className="space-y-12">
                        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none group-hover:scale-105 transition-transform duration-700">
                            SUPPLY CHAIN<br /><span className="text-[#E81414]">INTERRUPTION.</span>
                        </h2>
                        <div className="bg-white p-16 border-2 border-white flex flex-col items-center gap-10 max-w-3xl mx-auto shadow-[0_0_50px_rgba(255,255,255,0.05)] relative overflow-hidden group/notice">
                            <div className="absolute inset-0 scanlines opacity-5 invert pointer-events-none" />
                            <p className="text-[16px] tracking-[0.3em] font-black text-black uppercase leading-relaxed relative z-10">
                                Marketplace synchronization is currently suspended for node maintenance.
                                Global hardware shipments are redirected to local sector hubs.
                                Check back for priority clearance status.
                            </p>
                            <button className="px-12 py-5 bg-black text-white text-[12px] tracking-[0.6em] font-black uppercase hover:bg-[#E81414] transition-all relative z-10 flex items-center gap-6 group/btn">
                                REQUEST_CLEARANCE_v4 <img src="/suriken.png" alt="icon" className="w-5 h-5 group-hover/btn:translate-x-4 transition-transform object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full pt-16 border-t-2 border-white/5">
                        <MarketStatus label="Sync_Node" status="Refused" icon={<img src="/suriken.png" alt="icon" className="w-4 h-4 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />} />
                        <MarketStatus label="Edge_Link" status="Offline" icon={<img src="/suriken.png" alt="icon" className="w-4 h-4 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />} />
                        <MarketStatus label="Hardware" status="Blocked" icon={<img src="/suriken.png" alt="icon" className="w-4 h-4 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />} />
                        <MarketStatus label="Security" status="Active" icon={<img src="/suriken.png" alt="icon" className="w-4 h-4 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />} />
                    </div>
                </div>
            </div>

            {/* Future Listings Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ListingType label="Industrial_HW_v9" val="Tier_04_Prime" icon={<img src="/suriken.png" alt="icon" className="w-full h-full object-contain" style={{ "transform": "scale(1.3) translate(0px, 1px)" }} />} />
                <ListingType label="Neural_Logic_BETA" val="Kernel_v1.0" icon={<img src="/suriken.png" alt="icon" className="w-full h-full object-contain" style={{ "transform": "scale(1.3) translate(0px, 1px)" }} />} />
                <ListingType label="Sector_Access_OPS" val="Restricted" icon={<img src="/suriken.png" alt="icon" className="w-full h-full object-contain" style={{ "transform": "scale(1.3) translate(0px, 1px)" }} />} />
            </div>
        </div>
    );
}

function MarketStatus({ label, status, icon }: any) {
    return (
        <div className="flex flex-col items-center gap-4 group/status cursor-pointer">
            <div className="text-white/10 group-hover/status:text-[#E81414] transition-colors">{icon}</div>
            <div className="flex flex-col items-center gap-1">
                <span className="text-[9px] tracking-[0.6em] font-black uppercase text-white/20 group-hover:text-white transition-colors">{label}</span>
                <span className="text-[12px] tracking-[0.3em] font-black uppercase text-white group-hover:text-[#E81414] transition-colors">{status}</span>
            </div>
        </div>
    );
}

function ListingType({ label, val, icon }: any) {
    return (
        <div className="p-12 bg-black border-2 border-white/5 flex flex-col justify-between min-h-[280px] group cursor-wait relative overflow-hidden hover:border-[#E81414] transition-all">
            <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-[#E81414]/10 transition-all group-hover:scale-125">
                {icon && <div className="w-32 h-32">{icon}</div>}
            </div>
            <div className="relative z-10 space-y-4">
                <span className="text-[11px] tracking-[0.6em] font-black uppercase text-[#E81414] group-hover:tracking-[1em] transition-all duration-500">{label}</span>
                <p className="text-3xl font-black uppercase tracking-tighter text-white/20 group-hover:text-white transition-all duration-500">{val}</p>
            </div>
            <div className="h-1.5 w-full bg-white/5 mt-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-1000" />
            </div>
        </div>
    );
}

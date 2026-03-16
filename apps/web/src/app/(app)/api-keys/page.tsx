'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Eye, EyeOff, RefreshCcw, Trash2, Key, Shield, Activity, Lock } from 'lucide-react';

/* ── Decorative Elements ─────────────────────────────────────────────── */
const DotGrid = ({ className = "" }: { className?: string }) => (
    <div className={`absolute inset-0 dot-grid opacity-[0.03] pointer-events-none ${className}`} />
);

export default function ApiKeysPage() {
    const [showKey, setShowKey] = useState<number | null>(null);

    return (
        <div className="w-full pb-20 space-y-12">

            {/* Header Module */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end border-b border-white/10 pb-12 gap-10">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-[#E81414]/10 border border-[#E81414]/20 flex items-center justify-center rounded-lg">
                            <Lock className="w-4 h-4 text-[#E81414]" />
                        </div>
                        <span className="text-[11px] tracking-[0.5em] font-black uppercase text-white/30">SECURE CREDENTIAL VAULT</span>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-white">
                        API<br /><span className="text-[#E81414]">TOKENS</span>
                    </h1>
                </div>

                <div className="flex flex-col items-end gap-6 w-full xl:w-auto">
                    <button className="w-full xl:w-auto px-10 py-5 bg-[#E81414] text-white text-[11px] tracking-[0.5em] font-black uppercase hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 group rounded-2xl">
                        <Key className="w-5 h-5 transition-transform group-hover:rotate-12" />
                        GENERATE NEW ID
                    </button>
                    <div className="text-[9px] tracking-[0.4em] font-black uppercase text-white/40 flex items-center gap-4">
                        <span className="text-white">ACTIVE: 02</span>
                        <div className="w-12 h-0.5 bg-white/10" />
                        <span>LIMIT: 05</span>
                    </div>
                </div>
            </div>

            {/* Keys Ledger Table Container */}
            <div className="bg-[#0A0A0A] border border-white/10 flex flex-col relative overflow-hidden rounded-[2.5rem]">
                <DotGrid />

                <div className="px-10 py-8 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <div className="flex items-center gap-4">
                        <h2 className="text-[11px] tracking-[0.4em] uppercase font-black text-white/60">ACTIVE CREDENTIALS</h2>
                    </div>
                    <div className="flex items-center gap-6">
                        <Shield className="w-4 h-4 text-white/20" />
                        <span className="text-[9px] tracking-[0.3em] uppercase font-black text-white/20">Integrity VERIFIED GCM</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left font-black uppercase border-collapse">
                        <thead className="bg-white/5 border-b border-white/10">
                            <tr className="text-white/30 text-[10px] tracking-[0.3em]">
                                <th className="p-10 font-black">TOKEN ID</th>
                                <th className="p-10 font-black">CREDENTIAL HASH</th>
                                <th className="p-10 font-black">LAST SYNC</th>
                                <th className="p-10 font-black text-right">ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 overflow-hidden">
                            {[
                                { id: 1, name: 'DEV TEST NODE X', key: 'zp_test_a9f8b4v2c1', used: '2 MINS AGO' },
                                { id: 2, name: 'PROD BOT WORKER 04', key: 'zp_prod_x7k9m2n4q8', used: 'NEVER' }
                            ].map((token) => (
                                <tr key={token.id} className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="p-10 font-black text-white">
                                        <div className="flex items-center gap-4">
                                            <div className="w-2 h-2 bg-white/10 group-hover:bg-[#E81414] transition-colors rounded-full" />
                                            <span className="tracking-widest">{token.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-10">
                                        <div className="flex items-center gap-8 bg-black/40 border border-white/10 p-5 rounded-2xl w-fit group-hover:border-[#E81414]/30 transition-all">
                                            <span className={`text-[13px] tracking-widest font-mono ${showKey === token.id ? 'text-white' : 'text-white/20 select-none'}`}>
                                                {showKey === token.id ? token.key : '••••••••••••••••••••'}
                                            </span>
                                            <div className="flex gap-4 border-l border-white/10 pl-5 h-6 items-center">
                                                <button
                                                    onClick={() => setShowKey(showKey === token.id ? null : token.id)}
                                                    className="p-1 hover:text-[#E81414] text-white/30 transition-colors"
                                                >
                                                    {showKey === token.id ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </button>
                                                <button className="p-1 hover:text-white text-white/30 transition-colors">
                                                    <RefreshCcw size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-10 text-white/30 text-[10px] tracking-widest font-black">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-1.5 h-1.5 rounded-full ${token.used === 'NEVER' ? 'bg-white/10' : 'bg-[#E81414]'}`} />
                                            {token.used}
                                        </div>
                                    </td>
                                    <td className="p-10 text-right">
                                        <button className="p-4 text-white/20 hover:text-[#E81414] transition-all bg-white/5 hover:bg-[#E81414]/10 rounded-xl border border-transparent hover:border-[#E81414]/20">
                                            <Trash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Industrial Footer */}
                <div className="p-12 text-center bg-white/5 border-t border-white/10">
                    <p className="text-[10px] tracking-[0.5em] uppercase text-white/20 font-black italic">VAULT ENCRYPTED AES 256 GCM SYNC</p>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-10 bg-[#0A0A0A] border border-white/10 space-y-8 group hover:border-[#E81414]/30 transition-all rounded-[2.5rem] flex flex-col justify-between relative overflow-hidden">
                    <DotGrid />
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 border border-white/10 bg-white/5 group-hover:bg-[#E81414] group-hover:border-[#E81414] transition-all flex items-center justify-center rounded-2xl">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[11px] tracking-[0.5em] font-black uppercase text-white">USAGE TELEMETRY</span>
                    </div>
                    <div className="space-y-6 relative z-10">
                        <p className="text-[12px] tracking-[0.1em] font-black uppercase text-white/40 leading-relaxed">Analyze authentication logs for suspicious algorithmic call patterns.</p>
                        <button className="flex items-center gap-4 text-[11px] font-black uppercase text-[#E81414] hover:text-white transition-colors group/btn">
                            INITIALIZE ANALYSIS <RefreshCcw className="w-4 h-4 group-hover/btn:rotate-180 transition-transform duration-700" />
                        </button>
                    </div>
                </div>

                <div className="p-10 bg-[#0A0A0A] border border-white/10 space-y-8 group hover:border-[#E81414]/30 transition-all rounded-[2.5rem] flex flex-col justify-between relative overflow-hidden">
                    <DotGrid />
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 border border-white/10 bg-white/5 group-hover:bg-[#E81414] group-hover:border-[#E81414] transition-all flex items-center justify-center rounded-2xl">
                            <RefreshCcw className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[11px] tracking-[0.5em] font-black uppercase text-white">ROTATE SECRETS</span>
                    </div>
                    <div className="space-y-6 relative z-10">
                        <p className="text-[12px] tracking-[0.1em] font-black uppercase text-white/40 leading-relaxed">Enforce mandatory credential renewal protocols for all active nodes.</p>
                        <button className="flex items-center gap-4 text-[11px] font-black uppercase text-[#E81414] hover:text-white transition-colors group/btn">
                            TRIGGER ROTATION <Activity className="w-4 h-4 group-hover/btn:scale-125 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

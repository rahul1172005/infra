'use client';

import { motion } from 'framer-motion';

import { useState } from 'react';

/* ── Decorative Elements ─────────────────────────────────────────────── */
const DotGrid = ({ className = "" }: { className?: string }) => (
    <div className={`absolute inset-0 dot-grid opacity-[0.03] pointer-events-none ${className}`} />
);

export default function ApiKeysPage() {
    const [showKey, setShowKey] = useState<number | null>(null);

    return (
        <div className="w-full pb-20 space-y-12 text-black">

            {/* Header Module */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end border-b-2 border-black pb-12 gap-10">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-black flex items-center justify-center">
                            <img src="/suriken.png" alt="icon" className="w-5 h-5 white object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        </div>
                        <span className="text-[11px] tracking-[0.5em] font-black uppercase text-[#AAAAAA]">Secure_Credential_Vault</span>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]">
                        API<br /><span className="text-[#E81414]">TOKENS.</span>
                    </h1>
                </div>

                <div className="flex flex-col items-end gap-6 w-full xl:w-auto">
                    <button className="w-full xl:w-auto px-10 py-5 bg-[#E81414] text-white text-[11px] tracking-[0.5em] font-black uppercase hover:bg-black transition-all flex items-center justify-center gap-4 group">
                        <img src="/suriken.png" alt="icon" className="w-5 h-5 transition-transform object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        GENERATE NEW ID
                    </button>
                    <div className="text-[9px] tracking-[0.4em] font-black uppercase text-[#AAAAAA] flex items-center gap-4">
                        <span className="text-black">ACTIVE: 02</span>
                        <div className="w-12 h-0.5 bg-black/10" />
                        <span>LIMIT: 05</span>
                    </div>
                </div>
            </div>

            {/* Keys Ledger Table Container */}
            <div className="bg-white border-2 border-black flex flex-col relative overflow-hidden">
                <DotGrid />

                <div className="px-8 py-6 border-b-2 border-black flex justify-between items-center bg-[#F9F9F9]">
                    <div className="flex items-center gap-4">
                        
                        <h2 className="text-[11px] tracking-[0.4em] uppercase font-black">ACTIVE CREDENTIALS</h2>
                    </div>
                    <div className="flex items-center gap-6">
                        <img src="/suriken.png" alt="icon" className="w-4 h-4 [#AAAAAA] object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        <span className="text-[9px] tracking-[0.3em] uppercase font-black text-[#AAAAAA]">Integrity: VERIFIED_GCM</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left font-black uppercase border-collapse">
                        <thead className="bg-[#F9F9F9] border-b-2 border-black">
                            <tr className="text-[#AAAAAA] text-[10px] tracking-[0.3em]">
                                <th className="p-8 font-black">TOKEN ID</th>
                                <th className="p-8 font-black">CREDENTIAL HASH</th>
                                <th className="p-8 font-black">LAST SYNC</th>
                                <th className="p-8 font-black text-right">ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-black/5">
                            {[
                                { id: 1, name: 'DEV TEST NODE X', key: 'zp_test_a9f8b4v2c1', used: '2 MINS AGO' },
                                { id: 2, name: 'PROD BOT WORKER 04', key: 'zp_prod_x7k9m2n4q8', used: 'NEVER' }
                            ].map((token) => (
                                <tr key={token.id} className="group hover:bg-[#F9F9F9] transition-colors">
                                    <td className="p-8 font-black text-black">
                                        <div className="flex items-center gap-4">
                                            <div className="w-2 h-2 bg-black group-hover:bg-[#E81414] transition-colors" />
                                            <span className="tracking-widest">{token.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex items-center gap-8 bg-white border-2 border-black p-4 w-fit group-hover:border-[#E81414] transition-all">
                                            <span className={` text-[12px] tracking-widest ${showKey === token.id ? 'text-black' : 'text-[#CCCCCC] select-none uppercase'}`}>
                                                {showKey === token.id ? token.key : '••••••••••••••••••••'}
                                            </span>
                                            <div className="flex gap-4 border-l-2 border-black/10 pl-4 h-5 items-center">
                                                <button
                                                    onClick={() => setShowKey(showKey === token.id ? null : token.id)}
                                                    className="p-1 hover:text-[#E81414] text-[#AAAAAA] transition-colors"
                                                >
                                                    {showKey === token.id ? <img src="/suriken.png" alt="icon" className="w-4 h-4 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} /> : <img src="/suriken.png" alt="icon" className="w-4 h-4 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />}
                                                </button>
                                                <button className="p-1 hover:text-black text-[#AAAAAA] transition-colors">
                                                    <img src="/suriken.png" alt="icon" className="w-4 h-4 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-8 text-[#AAAAAA] text-[10px] tracking-widest font-black">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-1.5 h-1.5 ${token.used === 'NEVER' ? 'bg-[#CCCCCC]' : 'bg-[#E81414]'}`} />
                                            {token.used}
                                        </div>
                                    </td>
                                    <td className="p-8 text-right">
                                        <button className="p-4 text-black hover:text-[#E81414] border-2 border-transparent hover:border-black transition-all">
                                            <img src="/suriken.png" alt="icon" className="w-5 h-5 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Industrial Footer */}
                <div className="p-12 text-center bg-[#F9F9F9] border-t-2 border-black">
                    <p className="text-[10px] tracking-[0.5em] uppercase text-[#999999] font-black">Vault_Encrypted: AES_256_GCM_SYNC_V4</p>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-black bg-black p-[1px]">
                <div className="p-10 bg-white space-y-6 group hover:bg-[#F9F9F9] transition-colors border-r-2 border-black flex flex-col justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 border-2 border-black bg-[#F9F9F9] group-hover:bg-black group-hover:text-white transition-all flex items-center justify-center">
                            <img src="/suriken.png" alt="icon" className="w-5 h-5 [#E81414] object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        </div>
                        <span className="text-[11px] tracking-[0.5em] font-black uppercase">Usage_Telemetry</span>
                    </div>
                    <div className="space-y-4">
                        <p className="text-[11px] tracking-[0.2em] font-black uppercase text-[#AAAAAA]">Analyze authentication logs for suspicious algorithmic call patterns.</p>
                        <button className="flex items-center gap-4 text-[11px] font-black uppercase group-hover:text-[#E81414] transition-colors">
                            INITIALIZE ANALYSIS <img src="/suriken.png" alt="icon" className="w-4 h-4 group-hover:animate-pulse object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        </button>
                    </div>
                </div>
                <div className="p-10 bg-white space-y-6 group hover:bg-[#F9F9F9] transition-colors flex flex-col justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 border-2 border-black bg-[#F9F9F9] group-hover:bg-black group-hover:text-white transition-all flex items-center justify-center">
                            <img src="/suriken.png" alt="icon" className="w-5 h-5 black group-hover:text-white transition-all object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        </div>
                        <span className="text-[11px] tracking-[0.5em] font-black uppercase">Rotate_Secrets</span>
                    </div>
                    <div className="space-y-4">
                        <p className="text-[11px] tracking-[0.2em] font-black uppercase text-[#AAAAAA]">Enforce mandatory credential renewal protocols for all active nodes.</p>
                        <button className="flex items-center gap-4 text-[11px] font-black uppercase group-hover:text-[#E81414] transition-colors">
                            TRIGGER ROTATION <img src="/suriken.png" alt="icon" className="w-4 h-4 object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

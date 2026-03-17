'use client';

import { useState } from 'react';
import { Eye, EyeOff, RefreshCcw, Trash2, Key, Lock, Activity } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DotGrid } from '@/components/ui/Decorative';
import { PageHeader } from '@/components/ui/PageHeader';
import { HUDFrame } from '@/components/ui/HUDFrame';
import { Suriken } from '@/components/ui/Suriken';

export default function ApiKeysPage() {
    const [showKey, setShowKey] = useState<number | null>(null);

    return (
        <div className="w-full pb-20 space-y-12 relative overflow-hidden">
            <DotGrid />

            {/* Header Module */}
            <PageHeader
                title={<>API<br /><span className="text-[#E81414]">TOKENS</span></>}
                stats={{
                    label: "ACTIVE CREDENTIALS",
                    value: "02 / 05",
                    subValue: "VAULT SECURE"
                }}
                action={
                    <Button
                        variant="primary"
                        size="lg"
                        fullWidth
                        icon={Key}
                        className="xl:w-auto px-10 py-5"
                    >
                        GENERATE NEW ID
                    </Button>
                }
            />

            {/* Keys Ledger Table Container */}
            <div className="bg-[#0A0A0A] border border-white/10 flex flex-col relative overflow-hidden rounded-[2.5rem] z-10">
                <div className="px-10 py-8 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <div className="flex items-center gap-4">
                        <Suriken size="sm" />
                        <h2 className="text-[11px] tracking-[0.4em] uppercase font-black text-white/60">ACTIVE CREDENTIALS</h2>
                    </div>
                    <div className="hidden sm:flex items-center gap-6">
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
                                        <div className="flex items-center gap-8 bg-black/40 border border-white/10 p-5 rounded-full w-fit group-hover:border-[#E81414]/30 transition-all">
                                            <span className={`text-[13px] tracking-widest font-mono ${showKey === token.id ? 'text-white' : 'text-white/20 select-none'}`}>
                                                {showKey === token.id ? token.key : '••••••••••••••••••••'}
                                            </span>
                                            <div className="flex gap-4 border-l border-white/10 pl-5 h-6 items-center">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setShowKey(showKey === token.id ? null : token.id)}
                                                    className="p-1 h-auto hover:text-[#E81414]"
                                                    icon={showKey === token.id ? EyeOff : Eye}
                                                />
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="p-1 h-auto hover:text-white"
                                                    icon={RefreshCcw}
                                                />
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
                                        <Button
                                            variant="ghost"
                                            size="md"
                                            className="p-4 h-auto text-white/20 hover:text-[#E81414] bg-white/5 hover:bg-[#E81414]/10 border-transparent hover:border-[#E81414]/20 rounded-full"
                                            icon={Trash2}
                                        />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <HUDFrame title="USAGE TELEMETRY" subtitle="ALGORITHMIC PATTERNS">
                    <div className="space-y-6">
                        <p className="text-[12px] tracking-[0.1em] font-black uppercase text-white/40 leading-relaxed">
                            Analyze authentication logs for suspicious algorithmic call patterns and node behavior.
                        </p>
                        <Button
                            variant="ghost"
                            size="sm"
                            fullWidth
                            className="text-[#E81414] hover:text-white p-0 h-auto justify-start tracking-widest"
                            icon={RefreshCcw}
                        >
                            INITIALIZE ANALYSIS
                        </Button>
                    </div>
                </HUDFrame>

                <HUDFrame title="ROTATE SECRETS" subtitle="CREDENTIAL RENEWAL">
                    <div className="space-y-6">
                        <p className="text-[12px] tracking-[0.1em] font-black uppercase text-white/40 leading-relaxed">
                            Enforce mandatory credential renewal protocols for all active nodes in the shogunate.
                        </p>
                        <Button
                            variant="ghost"
                            size="sm"
                            fullWidth
                            className="text-[#E81414] hover:text-white p-0 h-auto justify-start tracking-widest"
                            icon={Activity}
                        >
                            TRIGGER ROTATION
                        </Button>
                    </div>
                </HUDFrame>
            </div>
        </div>
    );
}

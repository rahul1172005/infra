'use client';

import { useState } from 'react';
import { Eye, EyeOff, RefreshCcw, Trash2, Key, Shield, Activity, Lock, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SurikenIcon } from '@/components/icons/SurikenIcon';
import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { HUDCard } from '@/components/ui/HUDCard';
import { MetaCard } from '@/components/ui/MetaCard';

export default function ApiKeysPage() {
    const [showKey, setShowKey] = useState<number | null>(null);

    return (
        <div className="w-full pb-20 space-y-12 relative">
            <DotGrid />

            {/* ══ HEADER ══════════════════════════════════════════════ */}
            <PageHeader
                tag="SECURE CREDENTIAL VAULT"
                title={<>API<br /><span className="text-[#E81414]">TOKENS</span></>}
                actions={
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            variant="primary"
                            icon={Key}
                            className="px-10 h-14"
                        >
                            GENERATE NEW ID
                        </Button>
                    </div>
                }
            />

            {/* ══ KEYS LEDGER ══════════════════════════════════════════ */}
            <HUDCard
                padding="none"
                title="ACTIVE CREDENTIALS"
                tag="ROYAL VAULT"
                icon={<Lock className="w-4 h-4 text-white/40" />}
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-white/[0.03] text-white/40 text-[8px] tracking-[0.4em] font-black uppercase border-b border-white/10">
                                <th className="py-8 px-10">TOKEN IDENTITY</th>
                                <th className="py-8 px-10">CREDENTIAL HASH</th>
                                <th className="py-8 px-10">LAST SYNC</th>
                                <th className="py-8 px-10 text-right">ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[
                                { id: 1, name: 'DEV TEST NODE X', key: 'got_test_a9f8b4v2c1', used: '2 MINS AGO' },
                                { id: 2, name: 'PROD BOT WORKER 04', key: 'got_prod_x7k9m2n4q8', used: 'NEVER' }
                            ].map((token) => (
                                <tr key={token.id} className="group hover:bg-white/[0.02] transition-all group/row">
                                    <td className="py-10 px-10">
                                        <div className="flex items-center gap-6">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#E81414] animate-pulse" />
                                            <div className="flex flex-col">
                                                <span className="text-[14px] font-black tracking-widest text-white">{token.name}</span>
                                                <span className="text-[8px] tracking-[0.3em] font-black text-white/20">ACCESS LEVEL: FULL</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-10 px-10">
                                        <div className="flex items-center gap-6 bg-black/40 border border-white/10 px-6 py-4 rounded-full group-hover:border-[#E81414]/30 transition-all w-fit">
                                            <code className={`text-[12px] tracking-widest font-mono ${showKey === token.id ? 'text-white' : 'text-white/10 select-none'}`}>
                                                {showKey === token.id ? token.key : '•'.repeat(24)}
                                            </code>
                                            <div className="flex items-center gap-4 border-l border-white/10 pl-6">
                                                <button
                                                    onClick={() => setShowKey(showKey === token.id ? null : token.id)}
                                                    className="text-white/20 hover:text-[#E81414] transition-colors"
                                                >
                                                    {showKey === token.id ? <EyeOff size={14} /> : <Eye size={14} />}
                                                </button>
                                                <button className="text-white/20 hover:text-white transition-colors">
                                                    <RefreshCcw size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-10 px-10">
                                        <div className="flex flex-col">
                                            <span className="text-[11px] font-black text-white/40 tracking-widest">{token.used}</span>
                                            <span className="text-[8px] tracking-[0.2em] font-black text-white/10 uppercase">TELEMETRY DATA ACTIVE</span>
                                        </div>
                                    </td>
                                    <td className="py-10 px-10 text-right">
                                        <Button
                                            variant="ghost"
                                            className="h-10 w-10 !p-0 rounded-xl text-white/20 hover:text-[#E81414] hover:bg-[#E81414]/10"
                                            icon={Trash2}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-8 text-center border-t border-white/5 bg-white/[0.01]">
                    <span className="text-[9px] tracking-[0.5em] font-black text-white/10 uppercase">VAULT PROTOCOL: AES-256-GCM SYNC SECURE</span>
                </div>
            </HUDCard>

            {/* ══ TELEMETRY GAUGE ══════════════════════════════════════════ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                <HUDCard
                    title="TELEMETRY SCAN"
                    tag="SECURITY MONITOR"
                    icon={<Activity className="w-4 h-4 text-[#E81414]" />}
                >
                    <div className="space-y-6 pt-2">
                        <p className="text-[11px] tracking-[0.1em] font-black uppercase leading-relaxed text-white/40">
                            ANALYZE AUTHENTICATION LOGS FOR SUSPICIOUS ALGORITHMIC CALL PATTERNS AND ANOMALOUS FOOTPRINTS.
                        </p>
                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                            <MetaCard label="LAST SCAN" value="0.4S AGO" />
                            <Button
                                variant="ghost"
                                className="text-[#E81414] hover:text-white"
                                icon={RefreshCcw}
                            >
                                START ANALYSIS
                            </Button>
                        </div>
                    </div>
                </HUDCard>

                <HUDCard
                    title="SECRET ROTATION"
                    tag="ENFORCEMENT"
                    icon={<Fingerprint className="w-4 h-4 text-white/20" />}
                >
                    <div className="space-y-6 pt-2">
                        <p className="text-[11px] tracking-[0.1em] font-black uppercase leading-relaxed text-white/40">
                            ENFORCE MANDATORY CREDENTIAL RENEWAL PROTOCOLS FOR ALL ACTIVE NODES TO MAINTAIN CRYPTOGRAPHIC INTEGRITY.
                        </p>
                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                            <MetaCard label="COMPLIANCE" value="94.2%" />
                            <Button
                                variant="ghost"
                                className="text-white/20 hover:text-white"
                                icon={Shield}
                            >
                                TRIGGER ROTATION
                            </Button>
                        </div>
                    </div>
                </HUDCard>
            </div>
        </div>
    );
}

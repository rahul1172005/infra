'use client';

import React from 'react';
import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatGrid } from '@/components/ui/StatGrid';
import { SurikenIcon } from '@/components/icons/SurikenIcon';
import { Button } from '@/components/ui/Button';
import { ActionCard } from '@/components/ui/ActionCard';
import { adminConfig } from '@/configs/admin';
import { Shield, Users } from 'lucide-react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { UserRole } from '@zapsters/database';

export default function AdminPage() {
    const { user, isAuthenticated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated || user?.role !== UserRole.ADMIN) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, user, router]);
    const logs = [
        { time: "09:21:42", category: "AUTH", message: "ROOT IDENTIFIER SYNCED FROM 192.168.1.1", type: "default" },
        { time: "09:22:15", category: "KERNEL", message: "DB SHARD SEQUENCE 04 INITIATED", type: "accent" },
        { time: "09:24:01", category: "CRITICAL", message: "MEMORY SPIKE US EAST 01 AUTO SCALING TRIGGERED", type: "critical" },
        { time: "09:28:30", category: "MISSION", message: "BRACKET MATRIX GENERATED FOR 4204 UNITS", type: "default" },
    ];

    return (
        <div className="w-full pb-20 space-y-12">
            <PageHeader 
                title={adminConfig.header.title}
                accentTitle={adminConfig.header.accentTitle}
                topLabel={adminConfig.header.topLabel}
                variant="oversight"
            />

            <StatGrid stats={adminConfig.stats} columns={4} variant="oversight" />

            {/* Terminal logs kept as it's the core of the admin page */}
            <div className="bg-black border border-white/10 flex flex-col relative overflow-hidden group/stage rounded-[2.5rem] shadow-[16px_16px_0px_rgba(255,255,255,0.05)] z-10">
                <DotGrid />
                <div className="absolute inset-0 scanlines opacity-5 pointer-events-none group-hover/stage:opacity-10 transition-opacity" />

                <div className="p-6 md:p-10 border-b border-white/10 bg-black flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4 md:gap-10">
                        <SurikenIcon size="lg" />
                        <span className="text-[12px] md:text-[16px] font-black uppercase tracking-[0.4em] md:tracking-[1em] text-white/60">SYSTEM LOGS</span>
                    </div>
                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-[12px] tracking-[0.2em] md:tracking-[0.6em] font-black uppercase text-white/40 group-hover/stage:text-[#E81414] transition-colors">
                            <SurikenIcon size="sm" /> LIVE SYNC
                        </div>
                    </div>
                </div>

                <div className="p-6 md:p-12 lg:p-16 min-h-[300px] md:min-h-[500px] text-base md:text-lg font-bold uppercase tracking-widest leading-[2.5] space-y-6 md:space-y-8 bg-black relative z-10 overflow-x-auto text-left">
                    {logs.map((log, i) => (
                        <div key={i} className={`flex gap-5 md:gap-10 group/log cursor-pointer border-white/5 pb-4 overflow-hidden 
                            ${log.type === 'critical' ? 'border-l-[8px] md:border-l-[12px] border-l-[#E81414] pl-5 md:pl-10 bg-[#E81414]/5 py-4' : 'border-b'}
                        `}>
                            <span className={`${log.type === 'critical' ? 'text-[#E81414]' : 'text-white/20 group-hover:text-white transition-colors'}`}>{log.time}</span>
                            <span className={`px-4 py-1  h-fit 
                                ${log.type === 'critical' ? 'border-2 border-[#E81414] text-[#E81414]' : 
                                  log.type === 'accent' ? 'bg-[#E81414] text-white' : 
                                  'bg-white/10 text-white/60'}
                            `}>
                                {log.category}
                            </span>
                            <span className={`${log.type === 'critical' ? 'text-[#E81414] font-black' : 'text-white/40 group-hover:text-white transition-colors'}`}>{log.message}</span>
                        </div>
                    ))}

                    <div className="flex items-center gap-10 mt-20 text-white/10 group-hover/stage:text-white/40 transition-colors">
                        <span className="text-2xl tracking-[1em] font-black">AWAITING INPUT...</span>
                    </div>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.01] uppercase select-none pointer-events-none whitespace-nowrap group-hover:tracking-[0.05em] transition-all duration-1000">
                    OVERSIGHT
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
                <ActionCard
                    title="RECRUITMENT COMMAND"
                    backgroundText="OPERATIVES"
                    description="MANAGE INCOMING OPERATIVES AND ASSIGN CLEARANCE TIERS TO SECTOR NODES. ACCESS THE GLOBAL PERSONNEL DATABASE."
                    icon={true}
                    variant="oversight"
                >
                    <Button variant="primary" size="lg" icon={Users} className="mx-auto">ACCESS DATABASE</Button>
                </ActionCard>

                <ActionCard
                    title="SYSTEM AUDITS"
                    backgroundText="INTEGRITY"
                    description="EXECUTE GLOBAL DIAGNOSTIC PROTOCOLS AND VERIFY SECTOR INTEGRITY. IDENTIFY LATENCY SPIKES AND KERNEL FAULTS."
                    icon={true}
                    variant="oversight"
                >
                    <Button variant="outline" size="lg" icon={Shield} className="mx-auto">INITIALIZE SCAN</Button>
                </ActionCard>
            </div>
        </div>
    );
}

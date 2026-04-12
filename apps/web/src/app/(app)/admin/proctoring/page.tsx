'use client';

import React, { useState, useEffect } from 'react';
import { Camera, ShieldAlert, UserX, UserCheck, Unlock, Shield, History, MapPin, EyeOff } from 'lucide-react';
import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { HUDCard } from '@/components/ui/HUDCard';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/lib/store/useAuthStore';

export default function AdminProctoringPage() {
    const [violations, setViolations] = useState<any[]>([]);
    const [selectedViolation, setSelectedViolation] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchViolations = async () => {
        try {
            const token = useAuthStore.getState().token;
            if (!token) return;
            const res = await fetch('/api/admin/proctor', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setViolations(data.violations || []);
                // Update selected violation if it exists in the new data
                if (selectedViolation) {
                    const updated = data.violations.find((v: any) => v.id === selectedViolation.id);
                    setSelectedViolation(updated || null);
                } else if (data.violations && data.violations.length > 0) {
                    setSelectedViolation(data.violations[0]);
                }
            }
        } catch (e) {
            console.error('Failed to fetch violations', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchViolations();
        const int = setInterval(fetchViolations, 5000);
        return () => clearInterval(int);
    }, []);

    const handleUnlock = async (id: string, userId: string, challengeId: string) => {
        // Optimistic UI update
        setViolations(prev => prev.map(v => v.id === id ? { ...v, locked: false, attempts: 0 } : v));
        if (selectedViolation?.id === id) {
            setSelectedViolation((prev: any) => prev ? { ...prev, locked: false, attempts: 0 } : null);
        }
        
        try {
            const token = useAuthStore.getState().token;
            await fetch('/api/admin/proctor', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ action: 'UNLOCK', userId, challengeId })
            });
            fetchViolations();
        } catch (e) {
            console.error(e);
        }
    };

    const handleAddAttempts = async (id: string, userId: string, challengeId: string, extra: number) => {
        setViolations(prev => prev.map(v => v.id === id ? { ...v, attempts: Math.max(0, v.attempts - extra), locked: false } : v));
        if (selectedViolation?.id === id) {
            setSelectedViolation((prev: any) => prev ? { ...prev, attempts: Math.max(0, prev.attempts - extra), locked: false } : null);
        }
        
        try {
            const token = useAuthStore.getState().token;
            await fetch('/api/admin/proctor', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ action: 'GRANT_ATTEMPTS', userId, challengeId, removeCount: extra })
            });
            fetchViolations();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="w-full space-y-12 pb-20 relative">
            <DotGrid />

            <PageHeader
                tag="ADMINISTRATIVE OVERSIGHT — PROCTORING & EVIDENCE"
                title="PROCTOR"
                accentTitle="LOGS"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                
                {/* LEFT COLUMN: VIOLATION LOGS LIST */}
                <div className="lg:col-span-1 space-y-8">
                    <HUDCard
                        title="RECENT ALERTS"
                        tag="LIVE LOGS"
                        icon={<ZapstersLogo className="w-5 h-5 opacity-90 brightness-0 invert text-[#E81414] mix-blend-screen" />}
                    >
                        <div className="divide-y divide-white/5 max-h-[700px] overflow-y-auto">
                            {loading && violations.length === 0 ? (
                                <div className="p-8 text-center text-white/30 text-[10px] font-black uppercase tracking-widest">
                                    Loading secure logs...
                                </div>
                            ) : violations.length === 0 ? (
                                <div className="p-8 text-center text-white/30 text-[10px] font-black uppercase tracking-widest">
                                    NO ACTIVE PROCTORING ALERTS
                                </div>
                            ) : violations.map((v) => (
                                <button 
                                    key={v.id} 
                                    onClick={() => setSelectedViolation(v)}
                                    className={`w-full text-left p-6 flex flex-col gap-4 border-l-2 transition-all ${
                                        selectedViolation?.id === v.id ? 'bg-white/5 border-[#E81414]' : 'hover:bg-white/[0.02] border-transparent'
                                    }`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <img src={v.user.pic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${v.userId}`} className="w-10 h-10 rounded-full border border-white/20" alt="Avatar" />
                                                {v.locked && <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#E81414] rounded-full border border-black" title="LOCKED OUT" />}
                                            </div>
                                            <div>
                                                <div className="text-sm font-black text-white uppercase">{v.user.name}</div>
                                                <div className="text-[9px] text-[#E81414] font-black tracking-[0.2em]">{v.type.replace('_', ' ')}</div>
                                            </div>
                                        </div>
                                        <div className="text-[10px] text-white/30 font-black">{v.timestamp}</div>
                                    </div>
                                    
                                    <div className="flex justify-between items-end border-t border-white/5 pt-3 mt-1">
                                        <div className="text-[9px] font-bold text-white/50 tracking-widest">{v.challenge}</div>
                                        <div className="text-[9px] font-black tracking-widest text-[#E81414]">ATTEMPTS: {v.attempts}/7 {v.locked && '(LOCKED)'}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </HUDCard>
                </div>

                {/* RIGHT COLUMN: DETAILED INVESTIGATION & EVIDENCE */}
                <div className="lg:col-span-2 space-y-8">
                    {selectedViolation ? (
                        <HUDCard
                            title="INCIDENT REPORT"
                            tag={`ID: ${selectedViolation.id.toUpperCase()}`}
                            icon={<Camera className="text-white/60" />}
                        >
                            <div className="p-8 space-y-8">
                                {/* EVIDENCE SNAPSHOT */}
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 flex items-center gap-2">
                                        <Camera className="w-3 h-3" /> EVIDENCE SNAPSHOT
                                    </h4>
                                    <div className="relative rounded-2xl overflow-hidden border border-[#E81414]/30 aspect-video bg-black flex items-center justify-center">
                                        <img src={selectedViolation.snapshot} className="w-full h-full object-cover opacity-80 mix-blend-luminosity" alt="Evidence" />
                                        <div className="absolute inset-0 pointer-events-none border border-white/5" />
                                        
                                        {/* Targeting overlay styling */}
                                        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#E81414]/50" />
                                        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#E81414]/50" />
                                        
                                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#E81414]/30 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-[#E81414] rounded-full animate-pulse" />
                                            <span className="text-[9px] font-black text-[#E81414] tracking-widest">FRAME CAPTURE @ {selectedViolation.timestamp}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* PERFORMANCE & LOGS */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-black/40 border border-white/5 p-6 rounded-2xl space-y-4">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 flex items-center gap-2">
                                            <History className="w-3 h-3" /> ATTEMPT HISTORY
                                        </h4>
                                        <ul className="space-y-3 text-[11px] font-bold text-white/70 uppercase">
                                            <li className="flex justify-between border-b border-white/5 pb-2 text-[#E81414]"><span>Attempt {selectedViolation.attempts}: {selectedViolation.type.replace('_', ' ')}</span> <span>{selectedViolation.timestamp}</span></li>
                                        </ul>
                                    </div>

                                    <div className="bg-black/40 border border-white/5 p-6 rounded-2xl space-y-4">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 flex items-center gap-2">
                                            <Shield className="w-3 h-3" /> ACCOUNT STATUS
                                        </h4>
                                        <div className="space-y-4 text-sm font-black text-white uppercase tracking-widest">
                                            <div className="flex justify-between items-center">
                                                <span className="text-white/40">LOCK STATUS:</span>
                                                <span className={selectedViolation.locked ? 'text-[#E81414]' : 'text-green-500'}>{selectedViolation.locked ? 'LOCKED' : 'CLEARED'}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-white/40">RISK METRIC:</span>
                                                <span className="text-yellow-500">84% PROBABILITY</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ADMIN ACTIONS */}
                                <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                                    {selectedViolation.locked && (
                                        <Button 
                                            variant="secondary" 
                                            onClick={() => handleUnlock(selectedViolation.id, selectedViolation.userId, selectedViolation.challengeId)}
                                            className="px-6 h-10 border border-[#E81414]/30 hover:bg-[#E81414]/10 text-[#E81414]"
                                        >
                                            <Unlock className="w-4 h-4 mr-2" /> UNLOCK CHALLENGE
                                        </Button>
                                    )}
                                    {selectedViolation.attempts > 0 && (
                                    <Button 
                                        variant="secondary" 
                                        onClick={() => handleAddAttempts(selectedViolation.id, selectedViolation.userId, selectedViolation.challengeId, 2)}
                                        className="px-6 h-10"
                                    >
                                        <UserCheck className="w-4 h-4 mr-2" /> GRANT 2 EXTRA ATTEMPTS
                                    </Button>
                                    )}
                                </div>
                            </div>
                        </HUDCard>
                    ) : (
                        <div className="w-full h-[500px] bg-black/20 border border-white/5 rounded-2xl flex flex-col items-center justify-center p-8 text-center">
                            <EyeOff className="w-12 h-12 text-white/10 mb-4" />
                            <h3 className="text-xl font-black text-white/20 uppercase tracking-widest">NO INCIDENT SELECTED</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function ZapstersLogo({ className }: { className?: string }) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <img
                src="/logo.png"
                alt="Zapsters"
                className="w-full h-full object-contain brightness-0 invert scale-150"
            />
        </div>
    );
}

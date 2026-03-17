'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Trash2, Rocket } from 'lucide-react';
import { DotGrid } from '@/components/ui/Decorative';
import { Suriken } from '@/components/ui/Suriken';
import { PageHeader } from '@/components/ui/PageHeader';
import { HUDFrame } from '@/components/ui/HUDFrame';

export default function TeamsPage() {
    const [groups, setGroups] = useState<any[]>([]);
    const [newName, setNewName] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchTeams = async () => {
        try {
            const res = await fetch('http://localhost:5000/teams');
            if (res.ok) {
                const data = await res.json();
                setGroups(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const handleCreate = async () => {
        if (!newName.trim()) return;
        try {
            await fetch('http://localhost:5000/teams', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName })
            });
            setNewName('');
            fetchTeams();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string, e: any) => {
        e.stopPropagation();
        if(!confirm('Delete this clan?')) return;
        try {
            await fetch(`http://localhost:5000/teams/${id}`, { method: 'DELETE' });
            fetchTeams();
        } catch (err) {
            console.error(err);
        }
    };

    const handlePoints = async (id: string, amount: number, e: any) => {
        e.stopPropagation();
        try {
            await fetch(`http://localhost:5000/teams/${id}/points`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ points: amount })
            });
            fetchTeams();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="w-full space-y-8 md:space-y-14 lg:space-y-20 pb-16 relative overflow-hidden">
            <DotGrid />
            {/* ══ HEADER ═════════════════════════════════════════════════════ */}
            <PageHeader
                title={<>幕府<br /><span className="text-white">CLANS</span></>}
                stats={{
                    label: "INTEGRITY VERIFIED GCM",
                    value: "SYNC STABLE",
                    subValue: "0101-X"
                }}
            />

            {/* ══ MAIN MANAGEMENT GRID ═══════════════════════════════════════ */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-10 lg:gap-12 relative z-10">

                {/* Left: Active Groups List */}
                <div className="xl:col-span-8 space-y-12">
                    <div className="bg-[#0A0A0A] border border-white/10 overflow-hidden rounded-[2.5rem]">
                        <div className="p-4 md:p-10 border-b border-white/10 flex flex-col sm:flex-row justify-between sm:items-center bg-white/[0.03] text-white gap-4">
                            <div className="flex items-center gap-4 md:gap-6">
                                <Suriken size="md" />
                                <h3 className="text-base md:text-[18px] tracking-[0.2em] md:tracking-[0.4em] font-black uppercase">CURRENT ACTIVE CLANS</h3>
                            </div>
                            <div className="hidden md:flex items-center gap-6 px-6 py-2 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] rounded-full bg-white/5">
                                SYNC STABLE
                            </div>
                        </div>

                        <div className="divide-y divide-white/5">
                            {loading && <div className="p-8 text-center text-white/40 font-black tracking-widest">LOADING DATABASE</div>}
                            {!loading && groups.length === 0 && <div className="p-8 text-center text-white/40 font-black tracking-widest">NO CLANS IDENTIFIED</div>}
                            {!loading && groups.map((group, idx) => (
                                <div key={group.id} className="p-3 md:p-8 flex items-center justify-between hover:bg-[#E81414]/10 transition-all duration-300 group cursor-pointer text-white gap-3 relative">
                                    <div className="flex items-center gap-4 md:gap-8 min-w-0">
                                        <div className="w-10 h-10 md:w-12 md:h-12 border border-white/10 flex items-center justify-center group-hover:bg-[#E81414] group-hover:border-[#E81414] transition-all rounded-xl md:rounded-2xl shrink-0">
                                            <span className="text-base md:text-lg font-black">{idx + 1}</span>
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-base md:text-2xl font-black tracking-tighter uppercase">{group.name}</h4>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <Suriken size="sm" className="opacity-40" />
                                                    <span className="text-[8px] tracking-[0.3em] font-black uppercase text-white/40">{group._count?.members || 0} OPERATIVES</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                                        <div className="flex flex-col items-center gap-1 sm:gap-2">
                                            <span className="text-xl md:text-3xl font-black text-[#E81414] leading-none tabular-nums">{group.score.toLocaleString()}</span>
                                            <span className="text-[7px] md:text-[8px] tracking-[0.3em] font-black uppercase text-white/40">POINTS</span>
                                        </div>

                                         <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
                                            <div className="flex gap-2 flex-1 sm:flex-none">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    fullWidth
                                                    onClick={(e) => handlePoints(group.id, 100, e)}
                                                    className="flex-1 sm:px-3 sm:py-1 h-auto"
                                                >
                                                    +100
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    fullWidth
                                                    onClick={(e) => handlePoints(group.id, -100, e)}
                                                    className="flex-1 sm:px-3 sm:py-1 h-auto"
                                                >
                                                    -100
                                                </Button>
                                            </div>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                fullWidth
                                                onClick={(e) => handleDelete(group.id, e)}
                                                className="flex-1 sm:px-3 sm:py-1 h-auto tracking-widest"
                                                icon={Trash2}
                                            >
                                                DELETE
                                            </Button>
                                         </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Group Configuration Sidebar */}
                <div className="xl:col-span-4 space-y-12">
                    <HUDFrame title="QUICK SETUP" subtitle="CLAN DEPLOYMENT">
                        <div className="space-y-8 relative z-10">
                            <div className="space-y-3">
                                <label className="text-[9px] tracking-[0.4em] font-black uppercase text-white/30">CLAN IDENTIFIER</label>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    placeholder="ENTER NAME"
                                    className="w-full bg-white/5 border border-white/10 p-5 text-[11px] font-black tracking-[0.2em] outline-none focus:border-[#E81414]/50 transition-all text-white uppercase rounded-full"
                                />
                            </div>

                             <Button
                                onClick={handleCreate}
                                variant="primary"
                                size="lg"
                                fullWidth
                                className="mt-4"
                                icon={Rocket}
                            >
                                DEPLOY CLAN
                            </Button>
                        </div>
                    </HUDFrame>

                    <HUDFrame title="OVERSIGHT" subtitle="PROTOCOL RULES">
                        <p className="text-[11px] tracking-[0.05em] font-black uppercase leading-relaxed text-white/40">
                            Clans are restricted to a maximum of 20 families per shogunate.
                            Province selection must be synchronized across all assigned units
                            before global deployment. Honor is aggregated based on collective
                            mission performance metrics.
                        </p>
                    </HUDFrame>
                </div>
            </div>
        </div>
    );
}

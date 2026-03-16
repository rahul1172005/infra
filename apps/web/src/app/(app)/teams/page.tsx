'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/* ── Decorative Components ─────────────────────────────────────────── */
const DotGrid = () => (
    <div className="absolute inset-0 dot-grid pointer-events-none opacity-[0.05]" />
);

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
            {/* ══ HEADER ═════════════════════════════════════════════════════ */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center border-b border-white/10 pb-8 md:pb-12 gap-6 relative z-10">
                <div className="space-y-6">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-white">
                        幕府<br /><span className="text-white">CLANS</span>
                    </h1>
                </div>

                <div className="w-full xl:w-auto flex items-center gap-6 bg-[#0A0A0A] border border-white/10 p-5 md:p-10 rounded-2xl md:rounded-[2.5rem] group hover:border-[#E81414]/30 transition-all">
                    <div className="flex flex-col items-start gap-3">
                        <span className="text-[9px] tracking-[0.3em] uppercase font-black text-white/20">INTEGRITY VERIFIED GCM</span>
                        <div className="flex items-center gap-6">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">SYNCING WITH GLOBAL LEDGER</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══ MAIN MANAGEMENT GRID ═══════════════════════════════════════ */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-10 lg:gap-12 relative z-10">

                {/* Left: Active Groups List */}
                <div className="xl:col-span-8 space-y-12">
                    <div className="bg-[#0A0A0A] border border-white/10 overflow-hidden rounded-[2.5rem]">
                        <div className="p-4 md:p-10 border-b border-white/10 flex flex-col sm:flex-row justify-between sm:items-center bg-white/[0.03] text-white gap-4">
                            <div className="flex items-center gap-4 md:gap-6">
                                <img src="/suriken.png" alt="icon" className="w-5 h-5 md:w-6 md:h-6 [#E81414] object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
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
                                                    <img src="/suriken.png" alt="icon" className="w-4 h-4 [#E81414] object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                                                    <span className="text-[8px] tracking-[0.3em] font-black uppercase text-white/40">{group._count?.members || 0} OPERATIVES</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-row items-center gap-6">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-2xl md:text-3xl font-black text-[#E81414] leading-none">{group.score.toLocaleString()}</span>
                                            <span className="text-[8px] tracking-[0.3em] font-black uppercase text-white/40">POINTS</span>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="flex gap-2">
                                                <button onClick={(e) => handlePoints(group.id, 100, e)} className="px-3 py-1 bg-white/5 hover:bg-white hover:text-black border border-white/10 rounded text-[10px] font-black transition-colors">+100</button>
                                                <button onClick={(e) => handlePoints(group.id, -100, e)} className="px-3 py-1 bg-white/5 hover:bg-white hover:text-black border border-white/10 rounded text-[10px] font-black transition-colors">-100</button>
                                            </div>
                                            <button onClick={(e) => handleDelete(group.id, e)} className="px-3 py-1 bg-[#E81414]/20 hover:bg-[#E81414] text-[#E81414] hover:text-white border border-[#E81414]/30 rounded text-[10px] font-black tracking-widest uppercase transition-colors text-center">DELETE</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Group Configuration Sidebar */}
                <div className="xl:col-span-4 space-y-12">
                    <div className="bg-[#0A0A0A] p-6 md:p-10 space-y-6 md:space-y-10 border border-white/10 relative overflow-hidden group/config transition-all rounded-2xl md:rounded-[2.5rem]">
                        <div className="absolute inset-0 scanlines opacity-5 pointer-events-none" />
                        <div className="flex items-center gap-6 border-b border-white/10 pb-6 relative z-10">
                            <img src="/suriken.png" alt="icon" className="w-6 h-6 [#E81414] object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                            <span className="text-[12px] tracking-[0.6em] font-black uppercase text-white/60">QUICK SETUP</span>
                        </div>

                        <div className="space-y-8 relative z-10">
                            <div className="space-y-3">
                                <label className="text-[9px] tracking-[0.4em] font-black uppercase text-white/30">CLAN IDENTIFIER</label>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    placeholder="ENTER NAME"
                                    className="w-full bg-white/5 border border-white/10 p-5 text-[11px] font-black tracking-[0.2em] outline-none focus:border-[#E81414]/50 transition-all text-white uppercase rounded-xl"
                                />
                            </div>

                            <button onClick={handleCreate} className="w-full py-6 bg-white text-black text-[11px] font-black tracking-[0.6em] uppercase hover:bg-[#E81414] hover:text-white transition-all relative overflow-hidden group/submit rounded-full mt-4">
                                <span className="relative z-10">DEPLOY CLAN</span>
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-[#E81414] translate-y-full group-hover/submit:translate-y-0 transition-transform duration-300" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-[#0A0A0A] border border-white/10 p-10 space-y-8 group/info rounded-[2.5rem]">
                        <div className="flex items-center gap-6 mb-6">
                            <img src="/suriken.png" alt="icon" className="w-6 h-6 [#E81414] object-contain" style={{ "transform": "scale(2.2) translate(0px, 0px)" }} />
                            <span className="text-[11px] tracking-[0.4em] font-black uppercase text-white/30">OVERSIGHT PROTOCOL</span>
                        </div>
                        <p className="text-[11px] tracking-[0.05em] font-black uppercase leading-relaxed text-white/40">
                            Clans are restricted to a maximum of 20 families per shogunate.
                            Province selection must be synchronized across all assigned units
                            before global deployment. Honor is aggregated based on collective
                            mission performance metrics.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

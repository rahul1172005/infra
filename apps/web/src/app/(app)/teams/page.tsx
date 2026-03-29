'use client';

import { useEffect, useState } from 'react';

import { GOTIcon } from '@/components/icons/GOTIcon';
import { Button } from '@/components/ui/Button';
import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { HUDCard } from '@/components/ui/HUDCard';
import { MetaCard } from '@/components/ui/MetaCard';

// Mode → member count mapping
const MODE_SIZES: Record<string, number> = {
    SOLO: 1,
    DUO: 2,
    TRIO: 3,
    SQUAD: 4,
    CUSTOM: 0, // user defines
};

const DEFAULT_FORM = {
    name: '',
    mode: 'SQUAD',
    customSize: 4,
    memberNames: ['', '', '', ''],
    leaderName: '',
    email: '',
    phone: '',
};

export default function TeamsPage() {
    const [groups, setGroups] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeHouse, setActiveHouse] = useState<string | null>(null);

    // Create Modal State
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [formData, setFormData] = useState({ ...DEFAULT_FORM });

    // ── helpers ──────────────────────────────────────────────
    const getMemberCount = () => {
        if (formData.mode === 'CUSTOM') return formData.customSize;
        return MODE_SIZES[formData.mode] ?? 1;
    };

    const handleModeChange = (mode: string) => {
        const count = MODE_SIZES[mode] ?? 1;
        const names = Array.from({ length: count }, (_, i) => formData.memberNames[i] ?? '');
        setFormData(prev => ({ ...prev, mode, memberNames: names }));
    };

    const handleCustomSize = (val: number) => {
        const clamped = Math.max(1, Math.min(20, val));
        const names = Array.from({ length: clamped }, (_, i) => formData.memberNames[i] ?? '');
        setFormData(prev => ({ ...prev, customSize: clamped, memberNames: names }));
    };

    const handleMemberName = (idx: number, val: string) => {
        const updated = [...formData.memberNames];
        updated[idx] = val;
        setFormData(prev => ({ ...prev, memberNames: updated }));
    };

    // ── data fetching ─────────────────────────────────────────
    const fetchTeams = async () => {
        setLoading(true);
        let apiTeams: any[] = [];
        try {
            const res = await fetch('http://localhost:5000/teams');
            if (res.ok) apiTeams = await res.json();
        } catch {
            console.warn('Backend offline, using local registry');
        }

        const localTeamsStr = localStorage.getItem('persistent_teams');
        const localTeams = localTeamsStr ? JSON.parse(localTeamsStr) : [];

        const combined = [...apiTeams];
        localTeams.forEach((lt: any) => {
            if (!combined.find(ct => ct.name === lt.name)) combined.push(lt);
        });

        setGroups(combined);
        setLoading(false);
    };

    useEffect(() => {
        fetchTeams();
        const profile = localStorage.getItem('user_profile');
        if (profile) {
            const p = JSON.parse(profile);
            setActiveHouse(p.house || null);
        }
    }, []);

    // ── actions ───────────────────────────────────────────────
    const handleCreate = async () => {
        if (!formData.name.trim()) return;
        const nameNormalized = formData.name.toUpperCase();
        const memberCount = getMemberCount();

        const newTeam = {
            id: 'local-' + Date.now(),
            name: nameNormalized,
            score: 0,
            _count: { members: memberCount },
            metadata: {
                mode: formData.mode,
                customSize: formData.customSize,
                memberNames: formData.memberNames.slice(0, memberCount),
                leaderName: formData.leaderName,
                email: formData.email,
                phone: formData.phone,
            },
        };

        const localTeamsStr = localStorage.getItem('persistent_teams');
        const localTeams = localTeamsStr ? JSON.parse(localTeamsStr) : [];
        localTeams.push(newTeam);
        localStorage.setItem('persistent_teams', JSON.stringify(localTeams));

        setFormData({ ...DEFAULT_FORM });
        setIsCreateModalOpen(false);
        fetchTeams();
        alert('✅ TEAM CREATED SUCCESSFULLY');
    };

    const handleDelete = async (id: string, e: any) => {
        e.stopPropagation();
        if (!confirm('Delete this team?')) return;

        if (!id.startsWith('local-')) {
            try { await fetch(`http://localhost:5000/teams/${id}`, { method: 'DELETE' }); } catch {}
        }

        const localTeamsStr = localStorage.getItem('persistent_teams');
        if (localTeamsStr) {
            const filtered = JSON.parse(localTeamsStr).filter((t: any) => t.id !== id);
            localStorage.setItem('persistent_teams', JSON.stringify(filtered));
        }
        fetchTeams();
    };

    const handlePoints = async (id: string, amount: number, e: any) => {
        e.stopPropagation();

        if (!id.startsWith('local-')) {
            try {
                await fetch(`http://localhost:5000/teams/${id}/points`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ points: amount }),
                });
            } catch {}
        }

        const localTeamsStr = localStorage.getItem('persistent_teams');
        if (localTeamsStr) {
            const localTeams = JSON.parse(localTeamsStr);
            const team = localTeams.find((t: any) => t.id === id);
            if (team) {
                team.score = Math.max(0, team.score + amount);
                localStorage.setItem('persistent_teams', JSON.stringify(localTeams));
            }
        }
        fetchTeams();
    };

    // ── render ────────────────────────────────────────────────
    const memberCount = getMemberCount();

    return (
        <div className="w-full space-y-12 pb-20 relative">
            <DotGrid />

            {/* ══ HEADER ══════════════════════════════════════════════ */}
            <PageHeader
                tag="KINGDOM MANAGEMENT"
                title={<>GREAT<br /><span className="text-[#E81414]">HOUSES</span></>}
            />

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 relative z-10">
                {/* Left: Active Groups List */}
                <div className="xl:col-span-8 space-y-12">
                    <HUDCard
                        padding="none"
                        title="ACTIVE HOUSES"
                        tag="REALM STATUS"
                        icon={<GOTIcon type="globe" size={56} className="opacity-60" scale={1.6} x={0} y={0} />}
                    >
                        <div className="divide-y divide-white/5">
                            {loading && (
                                <div className="p-20 text-center text-white/20 font-black tracking-[0.4em] text-[10px] uppercase italic">
                                    ACCESSING HOUSE RECORDS...
                                </div>
                            )}
                            {!loading && groups.length === 0 && (
                                <div className="p-20 text-center text-white/20 font-black tracking-[0.4em] text-[10px] uppercase italic">
                                    NO HOUSES IDENTIFIED IN THE SEVEN KINGDOMS
                                </div>
                            )}
                            {!loading && groups.map((group, idx) => {
                                const isLoyal = activeHouse === group.name;
                                const teamMode = group.metadata?.mode || 'SQUAD';
                                return (
                                    <div
                                        key={group.id}
                                        className="p-6 md:p-10 flex flex-col md:flex-row items-center justify-between hover:bg-white/[0.02] transition-all duration-300 group cursor-pointer gap-6"
                                    >
                                        {/* Left: Index + Name + Tags */}
                                        <div className="flex items-center gap-8 min-w-0 w-full md:w-auto">
                                            <div className={`w-14 h-14 border border-white/10 flex items-center justify-center transition-all rounded-2xl shrink-0 ${isLoyal ? 'bg-[#E81414] border-[#E81414]' : 'group-hover:bg-white/10'}`}>
                                                <span className="text-xl font-black text-white">{(idx + 1).toString().padStart(2, '0')}</span>
                                            </div>
                                            <div className="space-y-2 min-w-0">
                                                {/* Team name — no truncate, full visibility */}
                                                <div className="flex items-center gap-3 flex-wrap">
                                                    <h4 className="text-xl md:text-3xl font-black tracking-tighter uppercase text-white break-all">
                                                        {group.name}
                                                    </h4>
                                                    {/* Mode tag */}
                                                    <span className="text-[8px] bg-white/10 text-white/60 px-3 py-1 rounded-full font-black tracking-widest border border-white/10 shrink-0">
                                                        {teamMode}
                                                    </span>
                                                    {/* Loyal tag */}
                                                    {isLoyal && (
                                                        <span className="text-[8px] bg-[#E81414] text-white px-3 py-1 rounded-full font-black tracking-widest shrink-0">
                                                            ★ LOYAL
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <GOTIcon size={16} scale={1.6} x={0} y={0} />
                                                    <span className="text-[10px] tracking-[0.2em] font-black uppercase text-white/40">
                                                        {group._count?.members || 0} MEMBERS
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right: Score + Actions */}
                                        <div className="flex items-center gap-10 w-full md:w-auto justify-between md:justify-end">
                                            <div className="flex flex-col items-end">
                                                <span className="text-2xl md:text-4xl font-black text-[#E81414] tabular-nums group-hover:scale-105 transition-transform">
                                                    {group.score.toLocaleString()}
                                                </span>
                                                <span className="text-[9px] tracking-[0.3em] font-black uppercase text-white/20">STRENGTH</span>
                                            </div>

                                            <div className="flex gap-4">
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    onClick={(e) => handlePoints(group.id, 100, e)}
                                                    className="h-11 px-8 text-[10px] font-black tracking-[0.2em] rounded-2xl bg-[#E81414] hover:bg-[#ff1a1a] border-none flex items-center gap-3"
                                                    icon={<GOTIcon type="zap" size={24} scale={1.2} x={0} y={0} />}
                                                >
                                                    ADD POINT
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={(e) => handleDelete(group.id, e)}
                                                    className="h-11 px-8 text-[10px] font-black tracking-[0.2em] rounded-2xl text-[#E81414] border-[#E81414]/40 hover:bg-[#E81414]/10 transition-all flex items-center gap-3"
                                                    icon={<GOTIcon type="hand" size={24} scale={1.2} x={0} y={0} />}
                                                >
                                                    DELETE TEAM
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </HUDCard>
                </div>

                {/* Right: Sidebar */}
                <div className="xl:col-span-4 space-y-12">
                    <HUDCard title="DECLARE A HOUSE" tag="FOUNDATION" icon={<GOTIcon type="zap" size={56} className="text-[#E81414]" scale={1.6} x={0} y={0} />}>
                        <div className="space-y-8 p-6">
                            <p className="text-[11px] tracking-[0.1em] font-black uppercase leading-relaxed text-white/30">
                                INITIALIZE A NEW TACTICAL UNIT. ALL FIELDS MUST BE VALIDATED BEFORE DEPLOYMENT.
                            </p>
                            <Button
                                onClick={() => setIsCreateModalOpen(true)}
                                variant="primary"
                                icon={<GOTIcon type="zap" size={32} scale={1.6} x={0} y={0} />}
                                fullWidth
                                className="py-8 text-[11px] tracking-[0.4rem]"
                            >
                                CREATE NEW TEAM
                            </Button>
                        </div>
                    </HUDCard>

                    <HUDCard title="COUNCIL" tag="DECREE" icon={<GOTIcon type="shield" size={56} className="opacity-50" scale={1.6} x={0} y={0} />}>
                        <div className="space-y-6 p-10">
                            <p className="text-[11px] tracking-[0.1em] font-black uppercase leading-relaxed text-white/30">
                                HOUSES ARE RESTRICTED TO A MAXIMUM OF 20 MEMBERS PER UNIT. PROVINCE SELECTION MUST BE SYNCHRONIZED ACROSS ALL ASSIGNED UNITS BY ROYAL DECREE.
                            </p>
                            <div className="pt-6 border-t border-white/5">
                                <MetaCard label="LAST AUDIT" value="0XF24D9...B2" />
                            </div>
                        </div>
                    </HUDCard>
                </div>
            </div>

            {/* ══ CREATE MODAL ═══════════════════════════════════════════ */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 md:p-8 overflow-y-auto bg-black/95 backdrop-blur-xl">
                    <div className="absolute inset-0 bg-red-900/5 pointer-events-none" />
                    <HUDCard
                        title="DEPLOY TACTICAL UNIT"
                        tag="FORMATION"
                        className="w-full max-w-4xl shadow-2xl shadow-red-900/10 border-[#E81414]/20 my-8 relative z-10"
                        contentClassName="p-8 md:p-14"
                        actions={
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="text-white/40 hover:text-white transition-colors uppercase font-black text-[10px] tracking-[0.2em]"
                            >
                                [ ABORT ]
                            </button>
                        }
                    >
                        <div className="space-y-10">
                            {/* Row 1: Name + Mode */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Unit Name */}
                                <div className="space-y-4">
                                    <label className="text-[10px] tracking-[0.5em] font-black uppercase text-[#E81414]">1. UNIT DESIGNATION</label>
                                    <input
                                        type="text"
                                        placeholder="ENTER TEAM NAME"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 px-8 py-5 text-[14px] font-black tracking-[0.2em] outline-none focus:border-[#E81414] transition-all text-white uppercase rounded-2xl"
                                    />
                                </div>

                                {/* Engagement Mode */}
                                <div className="space-y-4">
                                    <label className="text-[10px] tracking-[0.5em] font-black uppercase text-[#E81414]">2. ENGAGEMENT MODE</label>
                                    <div className="grid grid-cols-5 gap-2">
                                        {Object.keys(MODE_SIZES).map(m => (
                                            <button
                                                key={m}
                                                onClick={() => handleModeChange(m)}
                                                className={`py-3 text-[9px] font-black tracking-widest rounded-xl border transition-all ${formData.mode === m
                                                    ? 'bg-[#E81414] border-[#E81414] text-white shadow-lg shadow-red-900/40'
                                                    : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                                                    }`}
                                            >
                                                {m}
                                            </button>
                                        ))}
                                    </div>
                                    {/* Custom size input */}
                                    {formData.mode === 'CUSTOM' && (
                                        <div className="flex items-center gap-4 pt-2">
                                            <label className="text-[9px] tracking-[0.4em] font-black uppercase text-white/40">TEAM SIZE</label>
                                            <input
                                                type="number"
                                                min={1}
                                                max={20}
                                                value={formData.customSize}
                                                onChange={(e) => handleCustomSize(parseInt(e.target.value) || 1)}
                                                className="w-24 bg-white/5 border border-white/10 px-4 py-3 text-[14px] font-black text-center outline-none focus:border-[#E81414] transition-all text-white rounded-xl"
                                            />
                                            <span className="text-[9px] tracking-[0.3em] font-black uppercase text-white/30">MEMBERS</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Row 2: Member Names — dynamic based on mode */}
                            <div className="space-y-4">
                                <label className="text-[10px] tracking-[0.5em] font-black uppercase text-[#E81414]">
                                    3. MEMBER ROSTER
                                    <span className="ml-4 text-white/30 normal-case font-black tracking-normal text-[9px]">
                                        — {memberCount} {memberCount === 1 ? 'MEMBER' : 'MEMBERS'} REQUIRED
                                    </span>
                                </label>
                                <div className={`grid gap-4 ${memberCount > 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                                    {Array.from({ length: memberCount }).map((_, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <span className="text-[10px] font-black text-white/30 w-6 shrink-0 tabular-nums">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            <input
                                                type="text"
                                                placeholder={i === 0 ? 'MEMBER NAME (LEADER)' : `MEMBER ${i + 1} NAME`}
                                                value={formData.memberNames[i] ?? ''}
                                                onChange={(e) => handleMemberName(i, e.target.value)}
                                                className="flex-1 bg-white/5 border border-white/10 px-6 py-4 text-[12px] font-black tracking-[0.1em] outline-none focus:border-[#E81414]/60 transition-all text-white uppercase rounded-xl"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Row 3: Leader + Comms */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Leader */}
                                <div className="space-y-4">
                                    <label className="text-[10px] tracking-[0.5em] font-black uppercase text-[#E81414]">4. COMMAND STRUCTURE</label>
                                    <input
                                        type="text"
                                        placeholder="TEAM LEADER NAME"
                                        value={formData.leaderName}
                                        onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 px-8 py-4 text-[12px] font-black tracking-[0.1em] outline-none focus:border-[#E81414]/50 transition-all text-white uppercase rounded-xl"
                                    />
                                </div>

                                {/* Comms */}
                                <div className="space-y-4">
                                    <label className="text-[10px] tracking-[0.5em] font-black uppercase text-[#E81414]">5. COMMS DATA</label>
                                    <div className="space-y-3">
                                        <input
                                            type="email"
                                            placeholder="EMAIL ADDRESS"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 px-8 py-4 text-[12px] font-black tracking-[0.1em] outline-none focus:border-[#E81414]/50 transition-all text-white uppercase rounded-xl"
                                        />
                                        <input
                                            type="tel"
                                            placeholder="CONTACT NUMBER"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 px-8 py-4 text-[12px] font-black tracking-[0.1em] outline-none focus:border-[#E81414]/50 transition-all text-white uppercase rounded-xl"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Deploy Button */}
                            <div className="pt-4 border-t border-white/5">
                                <Button
                                    onClick={handleCreate}
                                    variant="primary"
                                    fullWidth
                                    className="py-8 font-black text-[12px] tracking-[0.5em]"
                                    icon={<GOTIcon type="zap" size={32} scale={1.6} x={0} y={0} />}
                                >
                                    INITIALIZE UNIT
                                </Button>
                            </div>
                        </div>
                    </HUDCard>
                </div>
            )}
        </div>
    );
}

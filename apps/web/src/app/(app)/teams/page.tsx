'use client';
import { useState, useEffect } from 'react';
import { GOTIcon } from '@/components/icons/GOTIcon';
import { Button } from '@/components/ui/Button';
import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { HUDCard } from '@/components/ui/HUDCard';
import { MetaCard } from '@/components/ui/MetaCard';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { UserRole } from '@zapsters/database';
import { JoinRequests } from '@/components/team/JoinRequests';

const MODE_SIZES: Record<string, number> = {
    SOLO: 1,
    DUO: 2,
    TRIO: 3,
    SQUAD: 4,
    CUSTOM: 0,
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
    const [expandedTeamId, setExpandedTeamId] = useState<string | null>(null);
    const { user, token } = useAuthStore();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [formData, setFormData] = useState({ ...DEFAULT_FORM });
    const [requestingId, setRequestingId] = useState<string | null>(null);

    const fetchTeams = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const res = await fetch('/api/teams', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setGroups(data);
            }
        } catch (err) {
            console.error('Failed to fetch teams:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchTeams();
    }, [token]);

    const handleCreate = async () => {
        if (!formData.name.trim()) return alert('❌ UNIT DESIGNATION IS REQUIRED');
        const size = formData.mode === 'CUSTOM' ? formData.customSize : MODE_SIZES[formData.mode];
        
        try {
            const res = await fetch('/api/teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: formData.name,
                    maxMembers: size,
                }),
            });

            if (res.ok) {
                setFormData({ ...DEFAULT_FORM });
                setIsCreateModalOpen(false);
                fetchTeams();
                alert('✅ HOUSE ESTABLISHED SUCCESSFULLY');
                window.location.reload(); // To update user.teamId in store
            } else {
                const error = await res.json();
                alert(`❌ FAILED: ${error.message}`);
            }
        } catch (err) {
            alert('❌ NETWORK FAILURE');
        }
    };

    const handleJoinRequest = async (teamId: string) => {
        if (!token) return;
        setRequestingId(teamId);
        try {
            const res = await fetch(`/api/teams/${teamId}/request-join`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                alert('✉️ ENLISTMENT RAVEN SENT. WAIT FOR HOUSE LEADER APPROVAL.');
            } else {
                const err = await res.json();
                alert(`❌ ERROR: ${err.message}`);
            }
        } catch (err) {
            alert('❌ NETWORK FAILURE');
        } finally {
            setRequestingId(null);
        }
    };

    const handleLeave = async () => {
        if (!myTeam || !token) return;
        if (!confirm('ARE YOU SURE YOU WANT TO ABANDON YOUR HOUSE? THIS ACTION IS FINAL.')) return;

        try {
            const res = await fetch(`/api/teams/${myTeam.id}/leave`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                alert('✅ YOU HAVE ABANDONED YOUR HOUSE.');
                window.location.reload();
            } else {
                const err = await res.json();
                alert(`❌ FAILED: ${err.message}`);
            }
        } catch (err) {
            alert('❌ NETWORK FAILURE');
        }
    };

    const handleDelete = async () => {
        if (!myTeam || !token) return;
        if (!confirm('WARNING: THIS WILL DISSOLVE THE HOUSE AND REMOVE ALL MEMBERS. PROCEED?')) return;

        try {
            const res = await fetch(`/api/teams/${myTeam.id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                alert('🔥 THE HOUSE HAS BEEN REDUCED TO ASHES.');
                window.location.reload();
            } else {
                const err = await res.json();
                alert(`❌ FAILED: ${err.message}`);
            }
        } catch (err) {
            alert('❌ NETWORK FAILURE');
        }
    };

    const myTeam = groups?.find(g => user?.teamId === g.id);
    const joinableTeams = groups?.filter(g => user?.teamId !== g.id && (g.members?.length || 0) < g.maxMembers) || [];

    return (
        <div className="w-full space-y-12 pb-20 relative">
            <DotGrid />
            <PageHeader
                tag="KINGDOM MANAGEMENT"
                title={<>GREAT<br /><span className="text-[#E81414]">HOUSES</span></>}
            />

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 relative z-10">
                <div className="xl:col-span-8 space-y-12">
                    
                    {/* ══ MY HOUSE ══════════════════════════════════════════════ */}
                    {myTeam && (
                        <HUDCard
                            title="MY HOUSE"
                            tag="ALLEGIANCE"
                            icon={<GOTIcon variant="white" size={48} className="opacity-60" scale={1.2} x={0} y={0} />}
                            className="border-[#E81414]/30 bg-[#E81414]/5"
                        >
                            <div className="p-8 space-y-8">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 bg-[#E81414] rounded-3xl flex items-center justify-center border-4 border-white/10 shadow-xl shadow-red-900/20">
                                            <span className="text-4xl font-black text-white font-got-num">
                                                {myTeam.name[0]}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-3xl font-black text-white uppercase tracking-tight">{myTeam.name}</h3>
                                            <div className="flex items-center gap-4">
                                                <span className="text-[10px] font-black text-[#E81414] uppercase tracking-widest bg-[#E81414]/10 px-3 py-1 rounded-full border border-[#E81414]/20">
                                                    STRENGTH: {myTeam.score.toLocaleString()}
                                                </span>
                                                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest italic">
                                                    {(myTeam.members?.length || 0)} / {myTeam.maxMembers} UNITS
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 flex-wrap justify-center md:justify-end">
                                        {myTeam.ownerId === user?.id ? (
                                            <Button 
                                                variant="outline" 
                                                onClick={handleDelete}
                                                className="border-[#E81414]/20 hover:bg-[#E81414] hover:border-[#E81414] text-[#E81414] hover:text-white h-10 px-6 text-[9px] font-black tracking-widest transition-all"
                                            >
                                                DISSOLVE HOUSE
                                            </Button>
                                        ) : (
                                            <Button 
                                                variant="outline" 
                                                onClick={handleLeave}
                                                className="border-white/10 hover:bg-[#E81414] hover:border-[#E81414] text-white/40 hover:text-white h-10 px-6 text-[9px] font-black tracking-widest transition-all"
                                            >
                                                LEAVE HOUSE
                                            </Button>
                                        )}
                                        <Button variant="outline" className="border-white/10 h-10 px-6 text-[9px] font-black tracking-widest">
                                            VIEW MANIFEST
                                        </Button>
                                    </div>
                                </div>

                                {/* Join Requests for Leader */}
                                {myTeam.ownerId === user?.id && (
                                    <JoinRequests teamId={myTeam.id} />
                                )}

                                {/* Members Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6 border-t border-white/5">
                                    {myTeam.members?.map((m: any) => (
                                        <div key={m.user.id} className="flex flex-col items-center gap-3 p-4 bg-black/40 border border-white/5 rounded-2xl hover:border-[#E81414]/40 transition-all">
                                            <img 
                                                src={m.user.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${m.user.name}`} 
                                                className="w-12 h-12 rounded-xl border border-white/5" alt="" 
                                            />
                                            <span className="text-[10px] font-black text-white uppercase truncate w-full text-center">{m.user.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </HUDCard>
                    )}

                    {/* ══ JOIN LIST ══════════════════════════════════════════════ */}
                    <HUDCard
                        padding="none"
                        title="AVAILABLE HOUSES"
                        tag="RECRUITMENT OPEN"
                        icon={<GOTIcon variant="white" size={48} className="opacity-60" scale={1.2} x={0} y={0} />}
                    >
                        <div className="divide-y divide-white/5">
                            {loading ? (
                                <div className="p-20 text-center text-white/20 font-black tracking-[0.4em] text-[10px] uppercase italic">
                                    SCANNING THE REALM...
                                </div>
                            ) : joinableTeams.length === 0 ? (
                                <div className="p-20 text-center text-white/20 font-black tracking-[0.4em] text-[10px] uppercase italic">
                                    ALL HOUSES ARE AT MAXIMUM CAPACITY
                                </div>
                            ) : joinableTeams.map((group: any) => (
                                <div key={group.id} className="p-8 flex flex-col md:flex-row items-center justify-between hover:bg-white/[0.01] transition-all group gap-6">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#E81414] group-hover:border-[#E81414] transition-all">
                                            <span className="text-xl font-black text-white font-got-num">{group.name[0]}</span>
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-xl font-black text-white uppercase group-hover:text-[#E81414] transition-colors">{group.name}</h4>
                                            <div className="flex items-center gap-4 text-[9px] font-black text-white/20 uppercase tracking-widest">
                                                <span>{(group.members?.length || 0)} / {group.maxMembers} UNITS</span>
                                                <span className="w-1 h-1 bg-white/10 rounded-full" />
                                                <span>LEADER: {group.owner?.name || 'UNKNOWN'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {!user?.teamId && (
                                        <Button 
                                            variant="primary" 
                                            size="sm"
                                            loading={requestingId === group.id}
                                            onClick={() => handleJoinRequest(group.id)}
                                            className="h-10 px-8 text-[10px] tracking-[0.2em] bg-[#E81414]/10 hover:bg-[#E81414] text-[#E81414] hover:text-white border-[#E81414]/20"
                                        >
                                            REQUEST ENLISTMENT
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </HUDCard>
                </div>

                {/* Sidebar */}
                <div className="xl:col-span-4 space-y-12">
                    {!user?.teamId && (
                        <HUDCard title="FOUND A HOUSE" tag="COMMAND" icon={<GOTIcon variant="white" size={48} className="opacity-60" scale={1.2} x={0} y={0} />}>
                            <div className="p-10 space-y-8">
                                <p className="text-[11px] tracking-[0.1em] font-black uppercase leading-relaxed text-white/30">
                                    BECOME A LORD OF WESTEROS. INITIALIZE A NEW TACTICAL UNIT.
                                </p>
                                <Button
                                    onClick={() => setIsCreateModalOpen(true)}
                                    variant="primary"
                                    icon={<GOTIcon type="zap" size={32} scale={1.6} x={0} y={0} />}
                                    fullWidth
                                    className="py-8 text-[11px] tracking-[0.4rem]"
                                >
                                    CREATE HOUSE
                                </Button>
                            </div>
                        </HUDCard>
                    )}

                    <HUDCard title="BATTLE DECREE" tag="RULES" icon={<GOTIcon variant="white" size={48} className="opacity-60" scale={1.2} x={0} y={0} />}>
                        <div className="p-10 space-y-8">
                            <div className="space-y-4">
                                <h6 className="text-[10px] font-black text-[#E81414] tracking-widest uppercase">ENLISTMENT POLICY</h6>
                                <p className="text-[10px] text-white/40 leading-relaxed uppercase font-black">
                                    1. ONE HOUSE PER PLAYER.<br />
                                    2. LEAVING A HOUSE REQUIRES SYSTEM VALIDATION.<br />
                                    3. TEAM STRENGTH IS CALCULATED FROM TOTAL UNIT PERFORMANCE.
                                </p>
                            </div>
                        </div>
                    </HUDCard>
                </div>
            </div>

            {/* Create Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/95 backdrop-blur-xl">
                    <HUDCard
                        title="ESTABLISH HOUSE"
                        tag="FOUNDATION"
                        className="w-full max-w-2xl border-[#E81414]/20"
                        contentClassName="p-12"
                        actions={
                            <button onClick={() => setIsCreateModalOpen(false)} className="text-white/40 hover:text-white text-[10px] font-black uppercase tracking-widest">[ ABORT ]</button>
                        }
                    >
                        <div className="space-y-10">
                            <div className="space-y-4">
                                <label className="text-[10px] tracking-[0.5em] font-black uppercase text-[#E81414]">HOUSE NAME</label>
                                <input
                                    type="text"
                                    placeholder="ENTER TITLE"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 px-8 py-5 text-[14px] font-black tracking-[0.2em] outline-none focus:border-[#E81414] text-white uppercase rounded-2xl"
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] tracking-[0.5em] font-black uppercase text-[#E81414]">ENGAGEMENT SCALE</label>
                                <div className="grid grid-cols-4 gap-4">
                                    {['SOLO', 'DUO', 'TRIO', 'SQUAD'].map(mode => (
                                        <button
                                            key={mode}
                                            onClick={() => setFormData({ ...formData, mode })}
                                            className={`py-4 text-[10px] font-black tracking-widest rounded-2xl border transition-all ${formData.mode === mode ? 'bg-[#E81414] border-[#E81414] text-white' : 'bg-white/5 border-white/10 text-white/40'}`}
                                        >
                                            {mode}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <Button
                                onClick={handleCreate}
                                variant="primary"
                                fullWidth
                                className="py-8 font-black text-[12px] tracking-[0.5em]"
                                icon={<GOTIcon type="zap" size={32} scale={1.6} x={0} y={0} />}
                            >
                                DEPLOY HOUSE
                            </Button>
                        </div>
                    </HUDCard>
                </div>
            )}
        </div>
    );
}

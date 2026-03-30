'use client';

import { useState, useEffect } from 'react';
import { HUDCard } from '@/components/ui/HUDCard';
import { Save, Plus, Database, TrendingUp, Users } from 'lucide-react';

interface Team {
    id?: string;
    name: string;
    score: number;
    house?: string;
}

export default function BattleScoresPage() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchTeams = async () => {
            let apiTeams: any[] = [];
            try {
                const res = await fetch('http://localhost:5000/teams');
                if (res.ok) {
                    apiTeams = await res.json();
                }
            } catch (err) {
                console.warn('Backend offline, using local registry');
            }

            // Sync with local teams
            const localTeamsStr = localStorage.getItem('persistent_teams');
            const localTeams = localTeamsStr ? JSON.parse(localTeamsStr) : [];
            
            const combined = [...apiTeams];
            localTeams.forEach((lt: any) => {
                const idx = combined.findIndex(ct => ct.name === lt.name);
                if (idx !== -1) {
                    combined[idx] = lt; // Local override
                } else {
                    combined.push(lt);
                }
            });

            setTeams(combined.sort((a,b) => b.score - a.score));
            setLoading(false);
        };
        fetchTeams();
    }, []);

    const handleScoreChange = (name: string, newScore: number) => {
        setTeams(prev => prev.map(t => t.name === name ? { ...t, score: newScore } : t));
    };

    const handleSave = async (team: Team) => {
        setSaving(true);
        
        // 1. Update in Local Storage
        const localTeamsStr = localStorage.getItem('persistent_teams');
        let localTeams = localTeamsStr ? JSON.parse(localTeamsStr) : [];
        
        const idx = localTeams.findIndex((lt: any) => lt.name === team.name);
        if (idx !== -1) {
            localTeams[idx] = team;
        } else {
            localTeams.push(team);
        }
        localStorage.setItem('persistent_teams', JSON.stringify(localTeams));

        // 2. Try to update Backend API if ID exists
        if (team.id) {
            try {
                await fetch(`http://localhost:5000/teams/${team.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ score: team.score })
                });
            } catch (err) {
                console.warn('Backend update failed, kept in local registry');
            }
        }

        setSaving(false);
        // Dispatch update event for navbar/dashboard
        window.dispatchEvent(new Event('profile_update'));
    };

    if (loading) return (
        <div className="flex items-center justify-center h-[60vh]">
            <div className="text-[#E81414] animate-pulse font-black text-xs tracking-[0.5em]">INITIALIZING OPERATIONS...</div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto space-y-12">
            
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-[#E81414]">
                        <span className="text-[10px] tracking-[0.5em] font-black uppercase">RECORDS & LOGISTICS</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">BATTLE SCORES</h1>
                    <p className="text-white/40 text-[11px] tracking-[0.3em] font-black uppercase">MANUAL SCORE OVERRIDE & POINT ADMINISTRATION</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full">
                        <span className="text-white/40 text-[10px] tracking-[0.2em] font-black uppercase mr-4">RECORDS:</span>
                        <span className="text-white text-[12px] font-black">{teams.length} HOUSES</span>
                    </div>
                </div>
            </div>

            {/* Manual Entry Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {teams.map((team) => (
                    <HUDCard key={team.name} className="overflow-hidden group border border-white/10 bg-white/[0.02]">
                        <div className="p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 min-h-[140px]">
                            <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white flex items-center justify-center text-black font-black text-lg sm:text-xl rounded-full shrink-0">
                                    {team.name[0]}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight group-hover:text-[#E81414] transition-colors">{team.name}</h3>
                                    <p className="text-white/30 text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.3em] font-black uppercase leading-none">HOUSE IDENTITY</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto pt-4 sm:pt-0 border-t border-white/5 sm:border-none">
                                <div className="space-y-2">
                                    <p className="text-white/20 text-[7px] sm:text-[8px] tracking-[0.2em] sm:tracking-[0.3em] font-black text-left sm:text-right uppercase">CURRENT SCORE</p>
                                    <input 
                                        type="number" 
                                        value={team.score}
                                        onChange={(e) => handleScoreChange(team.name, parseInt(e.target.value) || 0)}
                                        className="w-24 sm:w-32 bg-white/5 border border-white/10 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-white text-xl sm:text-2xl font-black text-right focus:border-[#E81414] focus:outline-none transition-all"
                                    />
                                </div>
                                <button 
                                    onClick={() => handleSave(team)}
                                    disabled={saving}
                                    className="p-3 sm:p-4 bg-white hover:bg-[#E81414] text-black hover:text-white rounded-xl transition-all border-none mt-4 sm:mt-0"
                                >
                                    <Save size={20} className="sm:w-6 sm:h-6" />
                                </button>
                            </div>
                        </div>
                    </HUDCard>
                ))}
            </div>

            {/* Empty State */}
            {teams.length === 0 && (
                <HUDCard className="border-none py-20 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-white/20">
                        <Users size={40} />
                    </div>
                    <div className="space-y-2">
                        <p className="text-white text-xl font-black uppercase tracking-wider">NO HOUSES REGISTERED</p>
                        <p className="text-white/30 text-[10px] tracking-[0.3em] font-black uppercase">DEPLOY NEW TEAMS IN THE REGISTRY MODULE TO BEGIN SCORING</p>
                    </div>
                </HUDCard>
            )}

            {/* Footer Notice */}
            <div className="py-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
                <div className="flex items-center gap-4 text-[10px] tracking-[0.4em] font-black uppercase">
                    <span>MANUAL OVERRIDES LOGGED TO SYSTEM AUDIT</span>
                </div>
                <div className="text-[9px] tracking-[0.5em] font-black uppercase">
                    OPERATIONAL CONTROL PANEL v4.2 // SECURITY CLEARANCE: LEVEL 5
                </div>
            </div>
        </div>
    );
}

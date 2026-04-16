'use client';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import { GOTIcon } from '@/components/icons/GOTIcon';

interface JoinRequest {
    id: string;
    userId: string;
    status: string;
    user: {
        id: string;
        name: string;
        picture: string;
        xp: number;
        level: number;
    };
}

export function JoinRequests({ teamId }: { teamId: string }) {
    const [requests, setRequests] = useState<JoinRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuthStore();

    const fetchRequests = async () => {
        if (!token) return;
        try {
            const res = await fetch(`/api/teams/${teamId}/join-requests`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setRequests(data);
            }
        } catch (err) {
            console.error('Failed to fetch requests:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [teamId, token]);

    const handleResponse = async (requestId: string, accept: boolean) => {
        if (!token) return;
        try {
            const res = await fetch(`/api/teams/requests/${requestId}/respond`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ accept })
            });

            if (res.ok) {
                setRequests(prev => prev.filter(r => r.id !== requestId));
                // Optionally trigger a page refresh or event to update team member list
                if (accept) {
                   window.location.reload(); // Simple way to refresh team list
                }
            } else {
                const err = await res.json();
                alert(`Error: ${err.message}`);
            }
        } catch (err) {
            console.error('Failed to respond to request:', err);
        }
    };

    if (loading) return <div className="text-[10px] font-black text-white/20 tracking-widest">SCANNING FOR RECRUITS...</div>;
    if (requests.length === 0) return null;

    return (
        <div className="space-y-6 mt-8 p-6 bg-[#E81414]/5 border border-[#E81414]/20 rounded-3xl">
            <div className="flex items-center gap-3">
                <GOTIcon size={20} variant="white" scale={1.2} x={0} y={0} />
                <h6 className="text-sm font-black text-white uppercase tracking-widest">PENDING ENLISTMENTS</h6>
            </div>
            
            <div className="space-y-4">
                {requests.map(request => (
                    <div key={request.id} className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl group">
                        <div className="flex items-center gap-4">
                            <img 
                                src={request.user.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${request.user.name}`} 
                                className="w-10 h-10 rounded-xl border border-white/10" 
                                alt="" 
                            />
                            <div className="space-y-1">
                                <div className="text-[11px] font-black text-white uppercase">{request.user.name}</div>
                                <div className="text-[9px] font-black text-[#E81414] uppercase tracking-tighter">{request.user.xp.toLocaleString()} XP • LVL {request.user.level}</div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button 
                                size="sm" 
                                className="h-8 px-4 text-[9px] bg-green-600 hover:bg-green-500"
                                onClick={() => handleResponse(request.id, true)}
                            >
                                ACCEPT
                            </Button>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 px-4 text-[9px] border-white/10 hover:bg-white/5"
                                onClick={() => handleResponse(request.id, false)}
                            >
                                REJECT
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

'use client';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { GOTIcon } from '@/components/icons/GOTIcon';
import Link from 'next/link';

interface Notification {
    id: string;
    type: string;
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
    metadata?: any;
}

export function NotificationBell() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const { token, isAuthenticated } = useAuthStore();

    const fetchNotifications = async () => {
        if (!token) return;
        try {
            const res = await fetch('/api/notifications', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setNotifications(data);
            }
        } catch (err) {
            console.error('Failed to fetch notifications:', err);
        }
    };

    const markAsRead = async (id: string) => {
        if (!token) return;
        try {
            await fetch(`/api/notifications/${id}/read`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
        } catch (err) {
            console.error('Failed to mark as read:', err);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchNotifications();
            const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
            return () => clearInterval(interval);
        }
    }, [isAuthenticated, token]);

    const unreadCount = notifications.filter(n => !n.read).length;

    if (!isAuthenticated) return null;

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`relative w-10 h-10 border rounded-full flex items-center justify-center transition-all ${unreadCount > 0 ? 'border-[#E81414] bg-[#E81414]/10' : 'border-white/10 hover:border-white/30'}`}
            >
                <GOTIcon size={18} variant={unreadCount > 0 ? 'white' : undefined} scale={1.2} x={0} y={0} />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#E81414] text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-black animate-pulse">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-[190]" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-full right-0 mt-4 w-80 bg-black border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-[200] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="p-5 border-b border-white/5 flex items-center justify-between">
                            <span className="text-[10px] font-black text-white/40 tracking-[0.3em] uppercase">RAVEN MESSAGES</span>
                            {unreadCount > 0 && (
                                <button className="text-[8px] font-black text-[#E81414] hover:text-white transition-colors uppercase h-auto p-0">
                                    [ CLEAR ALL ]
                                </button>
                            )}
                        </div>
                        
                        <div className="max-h-96 overflow-y-auto no-scrollbar">
                            {notifications.length === 0 ? (
                                <div className="p-10 text-center text-[10px] text-white/20 font-black tracking-widest italic uppercase">
                                    NO RAVENS IN THE SKY
                                </div>
                            ) : (
                                notifications.map(notif => (
                                    <div 
                                        key={notif.id} 
                                        onClick={() => markAsRead(notif.id)}
                                        className={`p-5 space-y-2 border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer ${!notif.read ? 'bg-white/[0.03]' : ''}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black text-[#E81414] uppercase tracking-widest">{notif.title}</span>
                                            <span className="text-[8px] font-black text-white/20 uppercase">{new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <p className="text-[11px] text-white font-black uppercase leading-relaxed tracking-tight line-clamp-2">
                                            {notif.message}
                                        </p>
                                        {!notif.read && (
                                            <div className="w-1 h-1 bg-[#E81414] rounded-full" />
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                        
                        <Link 
                            href="/profile" 
                            onClick={() => setIsOpen(false)}
                            className="block p-4 text-center text-[9px] font-black text-white/30 hover:text-white transition-colors bg-white/5 uppercase tracking-[0.2em]"
                        >
                            VIEW ALL ACTIVITY
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}

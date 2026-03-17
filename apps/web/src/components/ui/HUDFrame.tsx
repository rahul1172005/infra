'use client';

import React, { useState, useEffect } from 'react';
import { Suriken } from './Suriken';

interface HUDFrameProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    status?: 'SECURE' | 'AT RISK' | 'BREACHED';
    isLive?: boolean;
    className?: string;
}

export const HUDFrame = ({
    children, 
    title, 
    subtitle, 
    status = 'SECURE', 
    isLive = false,
    className = ''
}: HUDFrameProps) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const dateStr = mounted ? new Date().toLocaleDateString() : '00/00/0000';

    return (
        <div className={`relative border border-white/5 bg-[#040404] p-4 sm:p-6 md:p-8 rounded-2xl overflow-hidden group ${className}`}>
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E81414]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {(title || subtitle) && (
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 sm:mb-6 md:mb-8 border-b border-white/5 pb-5 gap-4">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Suriken size="md" className="opacity-70" />
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <p className="text-[11px] font-black tracking-[0.3em] text-white uppercase leading-none font-mono">{title}</p>
                                {isLive && <span className="text-[6px] font-black text-[#E81414]">LIVE</span>}
                            </div>
                            {subtitle && <p className="text-[8px] font-black tracking-[0.4em] text-white/20 uppercase leading-none font-mono">{subtitle}</p>}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-[7px] font-black text-white/10 tracking-widest uppercase">{dateStr}</span>
                        <span className="text-[7px] font-black text-[#E81414]/40 tracking-widest">v3.4.0</span>
                    </div>
                </div>
            )}

            <div className="w-full overflow-visible relative">
                {isLive && (
                    <div 
                        className="absolute inset-0 pointer-events-none opacity-[0.03]"
                        style={{ 
                            backgroundImage: 'linear-gradient(rgba(232,20,20,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(232,20,20,0.1) 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }}
                    />
                )}
                {children}
            </div>
        </div>
    );
};

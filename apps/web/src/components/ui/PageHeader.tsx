'use client';

import React from 'react';
import { Suriken } from './Suriken';

interface PageHeaderProps {
    title: string | React.ReactNode;
    subtitle?: string;
    stats?: {
        label: string;
        value: string | number;
        subValue?: string;
        locked?: boolean;
    };
    icon?: string;
}

export const PageHeader = ({ title, subtitle, stats, icon }: PageHeaderProps) => {
    return (
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center border-b border-white/10 pb-8 md:pb-12 gap-6 relative z-10 w-full">
            <div className="space-y-6">
                <div className="flex items-center gap-6">
                    <div className="w-12 h-12 flex items-center justify-center transition-transform duration-500 relative group/header">
                        <img
                            src={icon || "/logo.png"}
                            alt="Logo"
                            className="w-full h-full object-contain"
                            style={{ transform: "scale(2.2) translate(0px, 0px)" }}
                        />
                    </div>
                    {subtitle && <span className="text-[11px] tracking-[0.6em] font-black uppercase text-white/30">{subtitle}</span>}
                </div>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-white">
                    {title}
                </h1>
            </div>

            {stats && (
                <div className="w-full xl:w-auto flex items-center gap-6 bg-[#0A0A0A] border border-white/10 p-5 md:p-10 rounded-2xl md:rounded-[2.5rem] group hover:border-[#E81414]/30 transition-all">
                    <div className="flex flex-col items-start gap-2">
                        <span className="text-[9px] md:text-[10px] tracking-[0.4em] font-black uppercase text-white/30">{stats.label}</span>
                        <div className="flex items-center gap-3 md:gap-5">
                            <span className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white">{stats.value}</span>
                            {stats.locked && (
                                <div className="px-3 md:px-4 py-1 md:py-1.5 border border-white/10 text-[8px] md:text-[9px] tracking-[0.3em] font-black uppercase text-white/40 rounded-full bg-white/5">
                                    LOCKED
                                </div>
                            )}
                            {stats.subValue && (
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 whitespace-nowrap">
                                    {stats.subValue}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="h-10 md:h-16 w-[1px] bg-white/10 ml-auto" />
                    <Suriken size="xl" className="opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
            )}
        </div>
    );
};

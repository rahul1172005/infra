'use client';

import React from 'react';

interface MetaCardProps {
    label: string;
    value?: string | number;
    subValue?: string;
    sub?: string;
    accentColor?: string;
    className?: string;
    children?: React.ReactNode;
    icon?: any;
    onSubClick?: () => void;
    subIcon?: React.ReactNode;
}

export const MetaCard = ({
    label,
    value,
    subValue,
    sub,
    accentColor = '#E81414',
    className = '',
    children,
    icon,
    onSubClick,
    subIcon
}: MetaCardProps) => {
    return (
        <div className={`p-6 md:p-10 border border-white/10 bg-black rounded-2xl md:rounded-[2.5rem] flex flex-col gap-3 group hover:border-[#E81414]/30 transition-all ${className}`}>
            <div className="flex justify-between items-start">
                <span className="text-[9px] md:text-[10px] tracking-[0.6em] text-white/30 uppercase font-black">
                    {label}
                </span>
                {icon && (
                    <div className="text-[#E81414] opacity-40">
                        {typeof icon === 'function' ? React.createElement(icon as any) : icon}
                    </div>
                )}
            </div>
            {value !== undefined && (
                <span className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white ">
                    {value}
                </span>
            )}
            {(subValue || sub) && (
                <div 
                    onClick={onSubClick}
                    className={`flex items-center gap-2 mt-auto pt-2 border-t border-white/5 ${onSubClick ? 'cursor-pointer hover:text-white transition-colors' : ''}`}
                >
                    {subIcon && <div className="text-[#E81414] opacity-50">{subIcon}</div>}
                    <span className="text-[9px] tracking-[0.2em] font-black uppercase text-white/20 truncate">
                        {sub || subValue}
                    </span>
                </div>
            )}
            {children}
        </div>
    );
};

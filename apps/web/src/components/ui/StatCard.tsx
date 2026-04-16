'use client';

import React from 'react';
import { DotGrid } from './DotGrid';

interface StatCardProps {
    title: string;
    value: string;
    icon?: React.ReactNode | React.ElementType;
    color?: string;
    variant?: 'oversight' | 'industrial';
    className?: string;
    scale?: number;
}

export const StatCard = ({
    title,
    value,
    icon,
    color,
    variant = 'oversight',
    className = '',
    scale = 1.2
}: StatCardProps) => {
    const isOversight = variant === 'oversight';
    const isLongValue = value.length > 8;
    const isVeryLongValue = value.length > 15;

    const renderIcon = () => {
        if (!icon) return null;
        if (React.isValidElement(icon)) return icon;
        const IconComponent = icon as React.ElementType;
        return <IconComponent className="w-8 h-8 md:w-14 md:h-14 transition-all duration-300" strokeWidth={2} />;
    };

    return (
        <div
            className={`
                p-8 md:p-12 border-2 md:border-[3px] flex flex-col justify-between min-h-[140px] md:min-h-[260px] 
                group transition-all duration-500 relative overflow-hidden h-full 
                rounded-[2.5rem] cursor-pointer
                ${isOversight
                    ? 'bg-black border-white/5 text-white'
                    : 'bg-white border-black text-black'}
                ${className}
            `}
        >
            {/* Red hover overlay */}
            <div className="absolute inset-0 bg-[#E81414] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

            <DotGrid opacity={isOversight ? 'opacity-[0.03]' : 'opacity-[0.03]'} />

            <div className="flex justify-between items-start relative z-10 gap-x-6">
                <div className="flex-1 text-left">
                    <span className={`
                        text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] 
                        transition-all duration-500 block whitespace-normal break-words
                        ${isOversight
                            ? 'text-white/40 group-hover:text-black group-hover:opacity-100'
                            : 'text-black/40 group-hover:text-black group-hover:opacity-100'}
                    `}>
                        {title}
                    </span>
                </div>

                {icon && (
                    <div
                        className={`
                            flex-shrink-0 flex items-center justify-center transition-all duration-500 
                            ${isOversight ? 'text-white group-hover:text-black' : 'text-black'}
                        `}
                        style={{
                            transform: `scale(${scale === 1.2 ? 1 : scale})`
                        }}
                    >
                        {renderIcon()}
                    </div>
                )}
            </div>

            <h3 className={`
                ${isVeryLongValue ? 'text-lg md:text-2xl' : isLongValue ? 'text-xl md:text-4xl' : 'text-2xl md:text-6xl'} 
                font-normal leading-[1.2] mt-auto relative z-10 transition-all duration-500 group-hover:-translate-y-1 uppercase
                ${isOversight ? 'text-white group-hover:text-black' : 'text-black'}
            `} style={{ fontFamily: "'Game of Thrones'", fontWeight: 900 }}>
                {value}
            </h3>
        </div>
    );
};

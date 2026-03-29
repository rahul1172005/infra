'use client';

import React from 'react';
import { DotGrid } from './DotGrid';
import { SurikenIcon } from '@/components/icons/SurikenIcon';

interface StatCardProps {
    title: string;
    value: string;
    icon?: any;
    color?: string;
    variant?: 'oversight' | 'industrial';
    className?: string;
    scale?: number;
    x?: number;
    y?: number;
}

export const StatCard = ({
    title,
    value,
    icon,
    color = 'text-white',
    variant = 'oversight',
    className = '',
    scale = 1.2,
    x = 20,
    y = -20
}: StatCardProps) => {
    const isOversight = variant === 'oversight';
    const isLongValue = value.length > 8;
    const isVeryLongValue = value.length > 15;

    const renderIcon = () => {
        if (!icon) return null;
        if (React.isValidElement(icon)) return icon;
        const IconComponent = icon as React.ElementType;
        return <IconComponent className="w-6 h-6 md:w-10 md:h-10 transition-all duration-300" strokeWidth={2} />;
    };

    return (
        <div
            className={`
                p-6 md:p-10 border-2 md:border-[3px] flex flex-col justify-between min-h-[120px] md:min-h-[240px] 
                group transition-all duration-300 relative overflow-hidden h-full 
                rounded-[2rem]
                ${isOversight
                    ? 'bg-black border-white/5 hover:bg-[#E81414] hover:border-[#E81414] text-white hover:text-black'
                    : 'bg-white border-black hover:bg-[#E81414] hover:text-black'}
                ${className}
            `}
        >
            <DotGrid opacity={isOversight ? 'opacity-[0.03]' : 'opacity-[0.03]'} />

            <div className="flex justify-between items-start relative z-10 gap-x-4">
                <div className="flex-1 text-left">
                    <span className={`
                        text-[8px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] 
                        transition-all block whitespace-nowrap
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
                            flex-shrink-0 flex items-center justify-center transition-colors duration-300 
                            ${isOversight ? 'text-[#E81414] group-hover:text-black' : 'text-black'}
                        `}
                        style={{
                            transform: `scale(${scale}) translate(${x}px, ${y}px)`
                        }}
                    >
                        {renderIcon()}
                    </div>
                )}
            </div>

            <h3 className={`
                ${isVeryLongValue ? 'text-base md:text-xl' : isLongValue ? 'text-lg md:text-3xl' : 'text-xl md:text-5xl'} 
                font-black tracking-tighter leading-none mt-auto relative z-10 transition-all duration-500 group-hover:-translate-y-1 uppercase
                ${isOversight ? 'text-white group-hover:text-black' : 'text-black'}
            `}>
                {value}
            </h3>
        </div>
    );
};

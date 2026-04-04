'use client';

import React from 'react';
import { GOTIcon } from '@/components/icons/GOTIcon';

interface PageHeaderProps {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    accentTitle?: string;
    topLabel?: string;
    tag?: string;
    children?: React.ReactNode;
    actions?: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
    variant?: 'oversight' | 'industrial';
    showSuriken?: boolean;
}

export const PageHeader = ({
    title,
    accentTitle,
    subtitle,
    topLabel,
    tag,
    children,
    actions,
    icon,
    className = '',
    variant = 'oversight',
    showSuriken = true
}: PageHeaderProps) => {
    const isOversight = variant === 'oversight';
    
    return (
        <div className={`
            flex flex-col xl:flex-row justify-between items-start xl:items-end 
            border-b-2 md:border-b-4 pb-8 md:pb-16 gap-6 md:gap-12 relative z-10
            ${isOversight ? 'border-white' : 'border-black'}
            ${className}
        `}>
            <div className="space-y-6 md:space-y-10">
                {(topLabel || tag || showSuriken || icon) && (
                    <div className="flex items-center gap-4 md:gap-8">
                        {icon ? (
                            <div className="flex-shrink-0 text-[#E81414]">{icon}</div>
                        ) : showSuriken ? (
                            <GOTIcon type="targaryen" size={64} className={isOversight ? 'brightness-0 invert opacity-80' : 'opacity-90'} />
                        ) : null}

                        {(topLabel || tag) && (
                            <span className={`
                                text-[10px] md:text-[12px] tracking-[0.6em] md:tracking-[1em] font-black uppercase 
                                ${isOversight ? 'text-white/30' : 'text-black/30'}
                            `}>
                                {topLabel || tag}
                            </span>
                        )}
                    </div>
                )}
                
                <div className="space-y-2">
                    {subtitle && (
                        <span className="text-[10px] tracking-[0.6em] text-[#E81414] font-black uppercase block mb-4">
                            {subtitle}
                        </span>
                    )}
                    <h1 className={`
                        text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-black tracking-tight md:tracking-normal uppercase leading-[1.1] break-words
                        ${isOversight ? 'text-white' : 'text-black'}
                    `}>
                        {title}
                        {accentTitle && (
                            <>
                                <br />
                                <span className="text-[#E81414]">
                                    {accentTitle}
                                </span>
                            </>
                        )}
                    </h1>
                </div>
            </div>

            {(children || actions) && (
                <div className="w-full xl:w-auto">
                    {children || actions}
                </div>
            )}
        </div>
    );
};

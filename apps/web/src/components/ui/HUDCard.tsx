'use client';

import React from 'react';
import { DotGrid } from './DotGrid';
import { GOTIcon } from '@/components/icons/GOTIcon';

interface HUDCardProps {
    children: React.ReactNode;
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    statusLabel?: string;
    showSuriken?: boolean;
    className?: string;
    headerClassName?: string;
    contentClassName?: string;
    showDotGrid?: boolean;
    dotGridOpacity?: string;
    footer?: React.ReactNode;
    padding?: string;
    tag?: string;
    icon?: any;
    variant?: string;
    group?: boolean;
    actions?: React.ReactNode;
}

export const HUDCard = ({
    children,
    title,
    subtitle,
    statusLabel,
    showSuriken = true,
    className = '',
    headerClassName = '',
    contentClassName = '',
    showDotGrid = true,
    dotGridOpacity = 'opacity-[0.03]',
    footer,
    padding,
    tag,
    icon,
    variant,
    group,
    actions
}: HUDCardProps) => {
    return (
        <div className={`bg-black border border-white/10 rounded-[2.5rem] overflow-hidden relative flex flex-col ${className}`}>
            {showDotGrid && <DotGrid opacity={dotGridOpacity} />}
            
            {(title || subtitle || statusLabel) && (
                <div className={`p-6 md:p-10 border-b border-white/10 flex justify-between items-center bg-white/[0.03] text-white relative z-10 ${headerClassName}`}>
                    <div className="flex items-center gap-4 md:gap-6">
                        {showSuriken && !icon && <GOTIcon size="lg" scale={1.2} x={0} y={0} />}
                        {icon && (
                            <div className="flex-shrink-0 flex items-center justify-center text-[#E81414]">
                                {typeof icon === 'function' ? React.createElement(icon as any) : icon}
                            </div>
                        )}
                        <div className="flex flex-col gap-2">
                            {tag && <span className="text-[7px] tracking-[0.4em] font-black uppercase text-[#E81414] mb-1">{tag}</span>}
                             {title && <h3 className="text-xs md:text-sm tracking-[0.3em] md:tracking-[0.4em] font-black uppercase leading-[1.4]">{title}</h3>}
                             {subtitle && <p className="text-[7px] md:text-[9px] tracking-[0.3em] font-black uppercase text-white/30">{subtitle}</p>}
                        </div>
                    </div>
                    {(statusLabel || actions) && (
                        <div className="flex items-center gap-3 md:gap-6">
                            {actions}
                            {statusLabel && (
                                <>
                                    <GOTIcon size="sm" className="opacity-20 hidden md:block" scale={1.2} x={0} y={0} />
                                    <div className="px-4 py-1.5 border border-white/10 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] rounded-full bg-white/5">
                                        {statusLabel}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className={`flex-1 relative z-10 ${padding || ''} ${contentClassName}`}>
                {children}
            </div>

            {footer && (
                <div className="p-6 md:p-10 bg-white/[0.01] border-t border-white/5 relative z-10">
                    {footer}
                </div>
            )}
        </div>
    );
};

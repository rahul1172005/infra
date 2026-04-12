import React from 'react';
import { DotGrid } from './DotGrid';
import { GOTIcon } from '@/components/icons/GOTIcon';

interface ActionCardProps {
    title: string;
    subtitle?: string;
    description: string;
    backgroundText?: string;
    icon?: React.ReactNode | boolean; // true for default GOTIcon
    variant?: 'industrial' | 'oversight';
    className?: string;
    children?: React.ReactNode;
    footer?: React.ReactNode;
}

export function ActionCard({
    title,
    subtitle,
    description,
    backgroundText,
    icon,
    variant = 'oversight',
    className = "",
    children,
    footer
}: ActionCardProps) {
    const isOversight = variant === 'oversight';

    return (
        <div className={`relative min-h-[500px] md:min-h-[600px] flex flex-col items-center justify-center p-8 md:p-12 lg:p-20 overflow-hidden text-center group transition-all duration-500 rounded-[2rem] md:rounded-[3.5rem] ${
            isOversight 
                ? 'bg-black border border-white/10 hover:bg-[#E81414] hover:border-[#E81414] text-white hover:text-black' 
                : 'bg-white border-2 border-black hover:bg-[#E81414] hover:border-[#E81414] hover:text-black'
        } ${className}`}>
            <DotGrid opacity={isOversight ? "opacity-[0.05]" : "opacity-[0.03]"} />
            
            {/* Tactical Corners */}
            <div className={`absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 transition-colors duration-500 rounded-tr-[2rem] md:rounded-tr-[3.5rem] ${isOversight ? 'border-white/10 group-hover:border-[#E81414]' : 'border-black/10 group-hover:border-black'}`} />
            <div className={`absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 transition-colors duration-500 rounded-bl-[2rem] md:rounded-bl-[3.5rem] ${isOversight ? 'border-white/10 group-hover:border-[#E81414]' : 'border-black/10 group-hover:border-black'}`} />
            
            <div className="absolute inset-0 scanlines opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity" />

            {backgroundText && (
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black uppercase select-none pointer-events-none whitespace-nowrap group-hover:tracking-widest transition-all duration-1000 ${
                    isOversight ? 'text-white/[0.01]' : 'text-black/[0.01]'
                }`}>
                    {backgroundText}
                </div>
            )}

            {/* Background shuriken removed */}

            <div className="relative z-10 space-y-8 md:space-y-12 max-w-4xl px-4 w-full">
                {icon && (
                    <div className="flex items-center justify-center mx-auto transition-colors duration-500 group-hover:text-black">
                        {typeof icon === 'boolean' ? (
                            <GOTIcon size={64} scale={1.2} x={0} y={0} className={isOversight ? "text-white group-hover:text-black transition-colors" : "text-black group-hover:text-black transition-colors"} />
                        ) : (
                            icon
                        )}
                    </div>
                )}

                <div className="space-y-6 md:space-y-8">
                    <div className="space-y-2">
                        {subtitle && (
                            <p className={`text-[10px] tracking-[0.6em] font-black uppercase mb-2 transition-colors duration-500 ${
                                isOversight ? 'text-white/20 group-hover:text-black/50' : 'text-black/20 group-hover:text-black/50'
                            }`}>
                                {subtitle}
                            </p>
                        )}
                        <h2 className={`text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-[0.1em] leading-relaxed border-b-4 pb-4 md:pb-6 inline-block transition-colors duration-500 ${
                            isOversight ? 'text-white border-[#E81414] group-hover:text-black group-hover:border-black' : 'text-black border-black group-hover:text-black group-hover:border-black'
                        }`}>
                            {title}
                        </h2>
                    </div>
                    
                    <div className={`p-8 md:p-12 border max-w-2xl mx-auto backdrop-blur-sm rounded-[2rem] md:rounded-[2.5rem] transition-colors duration-500 ${
                        isOversight ? 'bg-black border-white/5 group-hover:bg-black/10 group-hover:border-black/20' : 'bg-[#F9F9F9] border-black group-hover:bg-white/20'
                    }`}>
                        <p className={`text-[14px] md:text-[16px] leading-relaxed ${
                            isOversight ? 'text-white/50 group-hover:text-black/80' : 'text-black group-hover:text-black/80'
                        } transition-colors duration-500`}>
                            {description}
                        </p>
                        {children && <div className="mt-10">{children}</div>}
                    </div>
                </div>

                {footer && (
                    <div className="mt-8 md:mt-12">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}

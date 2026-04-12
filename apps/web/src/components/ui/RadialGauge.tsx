'use client';

import { motion } from 'framer-motion';

interface RadialGaugeProps {
    value: number;
    label: string;
    sub: string;
    size?: 'sm' | 'md' | 'lg';
}

export const RadialGauge = ({ value, label, sub, size = 'md' }: RadialGaugeProps) => {
    const sizeClasses = {
        sm: 'w-20 h-20',
        md: 'w-28 h-28 sm:w-36 sm:h-36',
        lg: 'w-40 h-40 sm:w-52 sm:h-52'
    };

    return (
        <div className="flex flex-col items-center gap-3 md:gap-4">
            <div className={`relative ${sizeClasses[size]}`}>
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="66" stroke="rgba(255,255,255,0.04)" strokeWidth="2" fill="transparent" strokeDasharray="4 4" />
                    <circle cx="80" cy="80" r="66" stroke="rgba(255,255,255,0.03)" strokeWidth="10" fill="transparent" />
                    <motion.circle
                        cx="80" cy="80" r="66"
                        stroke="#E81414" strokeWidth="6" fill="transparent"
                        strokeLinecap="round"
                        strokeDasharray="414"
                        initial={{ strokeDashoffset: 414 }}
                        animate={{ strokeDashoffset: 414 - (414 * value) / 100 }}
                        transition={{ duration: 1.8, ease: 'circOut' }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl sm:text-2xl font-black text-white tabular-nums" style={{ fontFamily: "'Game of Thrones'", fontWeight: 900 }}>{Math.floor(value)}<span className="text-xs sm:text-sm text-white/30">%</span></span>
                    {sub && <span className="text-[6px] sm:text-[7px] font-black tracking-widest text-white/15 uppercase mt-1">{sub}</span>}
                </div>
            </div>
            <p className="text-[8px] sm:text-[9px] font-black tracking-widest text-white/30 uppercase text-center px-1">{label}</p>
        </div>
    );
};

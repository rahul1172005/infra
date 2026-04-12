'use client';

import { motion } from 'framer-motion';

interface StatBarProps {
    label: string;
    value: number;
    color?: string;
    showValue?: boolean;
}

export const StatBar = ({ 
    label, 
    value, 
    color = '#E81414',
    showValue = true 
}: StatBarProps) => {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-[9px] font-normal tracking-[0.2em]">
                <span className="text-white/30 uppercase">{label}</span>
                {showValue && <span className="text-white/60 tabular-nums" style={{ fontFamily: "'Game of Thrones'", fontWeight: 900 }}>{Math.floor(value)}%</span>}
            </div>
            <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1.2, ease: 'circOut' }}
                />
            </div>
        </div>
    );
};

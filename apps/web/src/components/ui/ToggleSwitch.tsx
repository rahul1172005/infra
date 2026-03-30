import * as React from 'react';
import { motion } from 'framer-motion';

export function ToggleSwitch({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
    return (
        <button
            onClick={onToggle}
            className={`relative w-16 h-8 rounded-full transition-all duration-300 shrink-0 group p-0 overflow-hidden ${
                enabled 
                    ? 'bg-[#E81414] border-[#E81414]' 
                    : 'bg-[#1A1A1A] border border-white/10 hover:border-white/20'
            }`}
        >
            <motion.span 
                initial={false}
                animate={{
                    x: enabled ? 40 : 4,
                }}
                transition={{ type: "spring", stiffness: 600, damping: 30 }}
                className={`absolute top-1/2 -translate-y-1/2 left-0 w-5 h-5 bg-white rounded-full pointer-events-none z-10`} 
            />
            {/* Flat hover effect instead of gradient gloss */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/5 transition-opacity pointer-events-none" />
        </button>
    );
}

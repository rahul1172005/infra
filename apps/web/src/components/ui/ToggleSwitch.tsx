import * as React from 'react';
import { motion } from 'framer-motion';

export function ToggleSwitch({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
    return (
        <button
            onClick={onToggle}
            className={`relative w-16 h-8 rounded-full transition-all duration-300 shrink-0 group p-0 overflow-hidden ${
                enabled 
                    ? 'bg-[#E81414] shadow-[0_0_20px_rgba(232,20,20,0.2)] border-[#E81414]' 
                    : 'bg-[#1A1A1A] border border-white/10 hover:border-white/20'
            }`}
        >
            <motion.span 
                initial={false}
                animate={{
                    x: enabled ? 34 : 4,
                    scale: enabled ? 1.05 : 1
                }}
                transition={{ type: "spring", stiffness: 600, damping: 30 }}
                className={`absolute top-1.5 left-0 w-5 h-5 bg-white rounded-full shadow-lg pointer-events-none z-10 ${
                    enabled ? 'shadow-white/40' : 'shadow-black/50'
                }`} 
            />
            {/* Gloss effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none z-0" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/5 transition-opacity pointer-events-none" />
        </button>
    );
}

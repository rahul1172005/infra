import * as React from 'react';

export function ToggleSwitch({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
    return (
        <button
            onClick={onToggle}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 shrink-0 ${enabled ? 'bg-[#E81414]' : 'bg-white/10'}`}
        >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${enabled ? 'left-7' : 'left-1'}`} />
        </button>
    );
}

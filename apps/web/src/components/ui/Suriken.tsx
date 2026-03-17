'use client';

import React from 'react';

interface SurikenProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    style?: React.CSSProperties;
}

export const Suriken = ({ className = '', size = 'md', style }: SurikenProps) => {
    const dimensions = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
        xl: 'w-8 h-8',
    };

    return (
        <img
            src="/suriken.png"
            alt="suriken icon"
            className={`${dimensions[size]} object-contain ${className}`}
            style={{ 
                transform: "scale(2.2)",
                ...style 
            }}
        />
    );
};

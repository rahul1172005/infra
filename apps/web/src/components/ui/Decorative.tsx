'use client';

import React from 'react';

export const DotGrid = ({ className = '' }: { className?: string }) => (
    <div className={`absolute inset-0 dot-grid pointer-events-none opacity-[0.05] ${className}`} />
);

export const Scanlines = ({ className = '' }: { className?: string }) => (
    <div className={`absolute inset-0 scanlines opacity-5 pointer-events-none ${className}`} />
);

export const BackgroundGlow = () => (
    <>
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#E81414]/5 blur-[200px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/[0.02] blur-[150px] pointer-events-none" />
    </>
);

'use client';

interface DotGridProps {
    className?: string;
    opacity?: string;
}

export const DotGrid = ({ className = '', opacity = 'opacity-[0.05]' }: DotGridProps) => (
    <div className={`absolute inset-0 dot-grid pointer-events-none ${opacity} ${className}`} />
);

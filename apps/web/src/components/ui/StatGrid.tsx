'use client';

import React from 'react';
import { StatCard } from './StatCard';

interface StatGridProps {
    stats: {
        title: string;
        value: string;
        icon?: any;
        color?: string;
    }[];
    variant?: 'oversight' | 'industrial';
    columns?: 2 | 3 | 4;
}

export const StatGrid = ({ 
    stats, 
    variant = 'oversight',
    columns = 4 
}: StatGridProps) => {
    const gridCols = {
        2: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    };

    return (
        <div className={`grid ${gridCols[columns]} gap-4 md:gap-8 lg:gap-12 relative z-10`}>
            {stats.map((stat, i) => (
                <StatCard 
                    key={i}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    color={stat.color}
                    variant={variant}
                />
            ))}
        </div>
    );
};

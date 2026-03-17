'use client';

import React from 'react';
import { Suriken } from './Suriken';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    containerClassName?: string;
}

export const SearchInput = ({ containerClassName = '', ...props }: SearchInputProps) => {
    return (
        <div className={`flex-1 bg-[#0A0A0A] border border-white/10 px-5 md:px-8 py-4 md:py-5 flex items-center gap-4 md:gap-6 group/search cursor-text rounded-full transition-all hover:border-white/20 ${containerClassName}`}>
            <Suriken size="md" className="opacity-20 group-hover/search:opacity-50 transition-opacity" />
            <input
                {...props}
                className={`bg-transparent border-none text-[10px] md:text-[12px] tracking-[0.3em] font-black uppercase text-white placeholder-white/20 focus:outline-none w-full min-w-0 ${props.className || ''}`}
            />
        </div>
    );
};

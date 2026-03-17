import * as React from 'react';
import { ArrowRight } from 'lucide-react';

interface SectorCardProps {
  num?: string;
  title: string;
  desc: string;
  bgImage?: string;
  imageStyle?: React.CSSProperties;
}

export default function SectorCard({ num, title, desc, bgImage, imageStyle }: SectorCardProps) {
  return (
    <div className="group bg-[#0A0A0A] text-white border border-white/10 p-8 flex flex-col justify-between min-h-[300px] hover:border-transparent cursor-pointer relative overflow-hidden rounded-[2.5rem] transition-all duration-300">
      {/* Hover Background Overlay */}
      <div className="absolute inset-0 bg-[#E81414] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

      {/* Top Layer Image (Behind wordings) */}
      {bgImage && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-100 group-hover:opacity-100 transition-opacity duration-500 z-[1]">
          <img
            src={bgImage}
            alt=""
            className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal"
            style={imageStyle}
          />
        </div>
      )}

      {/* Wordings Layer */}
      <div className="relative z-[10] h-full flex flex-col justify-between">
        <span className="text-[9px] tracking-[0.4em] font-black text-white/20 group-hover:text-black transition-colors uppercase">{num}</span>

        <div className="space-y-2 -translate-y-6 group-hover:-translate-y-20 transition-transform duration-500">
          <h4 className="text-xl font-black tracking-tighter uppercase leading-none group-hover:text-black transition-colors">
            {title}
          </h4>
          <p className="text-[10px] tracking-widest font-black uppercase text-white/30 group-hover:text-black/70 leading-relaxed transition-colors">
            {desc}
          </p>
        </div>

        <div className="flex justify-start opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

import * as React from 'react';
import { ArrowRight } from 'lucide-react';

interface ProtocolRowProps {
  title: string;
  desc: string;
  bgImage?: string;
  imageStyle?: React.CSSProperties;
}

export default function ProtocolRow({ title, desc, bgImage, imageStyle }: ProtocolRowProps) {
  return (
    <div className="group flex flex-col md:flex-row md:items-center justify-between py-10 transition-all cursor-pointer px-10 relative rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-transparent">
      {/* Hover Background Overlay */}
      <div className="absolute inset-0 bg-[#E81414] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

      {/* Background Image Layer */}
      {bgImage && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-500 z-[1] flex items-center justify-center">
          <img
            src={bgImage}
            alt=""
            className="w-full h-full object-contain mix-blend-luminosity group-hover:mix-blend-normal opacity-20 group-hover:opacity-40 transition-all duration-500"
            style={imageStyle}
          />
        </div>
      )}

      <div className="relative z-[10] flex flex-col md:flex-row md:items-center justify-between w-full">
        <div className="space-y-3">
          <h3 className="text-3xl md:text-5xl font-black text-white tracking-widest uppercase transition-colors group-hover:text-black">
            {title}
          </h3>
          <p className="text-[10px] tracking-[0.15em] font-black uppercase text-white/15 group-hover:text-black/70 transition-colors">{desc}</p>
        </div>
        <div className="w-14 h-14 border border-white/10 rounded-full flex items-center justify-center group-hover:border-black group-hover:bg-black transition-all mt-8 md:mt-0 shadow-lg">
          <ArrowRight className="w-5 h-5 text-white transition-all transform" />
        </div>
      </div>
    </div>
  );
}

import { GOTIcon } from '../icons/GOTIcon';

interface ProtocolRowProps {
  title: string;
  desc: string;
  scale?: number;
  x?: number;
  y?: number;
  mobileScale?: number;
  mobileX?: number;
  mobileY?: number;
  imgSrc?: string;
}

export default function ProtocolRow({ 
  title, 
  desc, 
  scale = 1.6, 
  x = 0, 
  y = 0, 
  mobileScale,
  mobileX,
  mobileY,
  imgSrc 
}: ProtocolRowProps) {
  const finalMobileScale = mobileScale ?? scale;
  const finalMobileX = mobileX ?? x;
  const finalMobileY = mobileY ?? y;

  return (
    <div className="group flex flex-col md:flex-row md:items-center justify-between py-10 transition-all duration-500 cursor-pointer relative rounded-[2.5rem] overflow-hidden border border-white/10 px-0">
      {/* Hover Background Overlay */}
      <div className="absolute inset-0 bg-[#E81414] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

      {/* Background Image Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-500 z-[1] flex items-center justify-center">
        <div className="opacity-100 transition-opacity">
          {imgSrc ? (
            <img 
              src={imgSrc} 
              alt={title} 
              className="w-full h-full object-contain transition-all duration-500 brightness-0 invert opacity-20 group-hover:opacity-100 protocol-row-img"
              style={{ 
                width: '100%',
                height: '100%',
                '--desktop-scale': scale,
                '--desktop-x': `${x}px`,
                '--desktop-y': `${y}px`,
                '--mobile-scale': finalMobileScale,
                '--mobile-x': `${finalMobileX}px`,
                '--mobile-y': `${finalMobileY}px`,
              } as any}
            />
          ) : (
            <div 
              className="opacity-10 group-hover:opacity-20 transition-opacity mix-blend-luminosity group-hover:mix-blend-normal protocol-row-img"
              style={{ 
                '--desktop-scale': scale,
                '--desktop-x': `${x}px`,
                '--desktop-y': `${y}px`,
                '--mobile-scale': finalMobileScale,
                '--mobile-x': `${finalMobileX}px`,
                '--mobile-y': `${finalMobileY}px`,
              } as any}
            >
              <GOTIcon type="targaryen" size={200} />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .protocol-row-img {
          transform: scale(var(--desktop-scale)) translateX(var(--desktop-x)) translateY(var(--desktop-y));
        }
        @media (max-width: 768px) {
          .protocol-row-img {
            transform: scale(var(--mobile-scale)) translateX(var(--mobile-x)) translateY(var(--mobile-y));
          }
        }
      `}</style>

      <div className="relative z-[10] flex flex-col md:flex-row md:items-center justify-between w-full px-12">
        <div className="space-y-3">
          <h3 className="text-xl md:text-3xl font-black text-white tracking-widest uppercase transition-colors group-hover:text-black">
            {title}
          </h3>
          <p className="text-[10px] tracking-[0.15em] font-black uppercase text-white/15 group-hover:text-black/70 transition-colors">{desc}</p>
        </div>
      </div>
    </div>
  );
}

import { GOTIcon } from '../icons/GOTIcon';

interface SectorCardProps {
  num?: string;
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

export default function SectorCard({ 
  num, 
  title, 
  desc, 
  scale = 1.6, 
  x = 0, 
  y = 0, 
  mobileScale,
  mobileX,
  mobileY,
  imgSrc 
}: SectorCardProps) {
  const finalMobileScale = mobileScale ?? scale;
  const finalMobileX = mobileX ?? x;
  const finalMobileY = mobileY ?? y;

  return (
    <div className="group bg-black text-white border border-white/10 p-0 flex flex-col justify-between min-h-[300px] cursor-pointer relative overflow-hidden rounded-[2.5rem] transition-all duration-300">
      {/* Hover Background Overlay */}
      <div className="absolute inset-0 bg-[#E81414] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

      {/* Top Layer Image (Behind wordings) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-100 group-hover:opacity-100 transition-opacity duration-500 z-[1] flex items-center justify-center">
        <div className="opacity-100 transition-opacity">
          {imgSrc ? (
            <img 
              src={imgSrc} 
              alt={title} 
              className="w-full h-full object-contain transition-all duration-500 sector-card-img"
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
              className="opacity-10 group-hover:opacity-20 transition-opacity mix-blend-luminosity group-hover:mix-blend-normal sector-card-img"
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
        .sector-card-img {
          transform: scale(var(--desktop-scale)) translateX(var(--desktop-x)) translateY(var(--desktop-y));
        }
        @media (max-width: 768px) {
          .sector-card-img {
            transform: scale(var(--mobile-scale)) translateX(var(--mobile-x)) translateY(var(--mobile-y));
          }
        }
      `}</style>

      {/* Wordings Layer */}
      <div className="relative z-[10] h-full flex flex-col items-center md:items-start text-center md:text-left justify-start p-8 pt-4 gap-3">
        <span className="text-[9px] tracking-[0.4em] font-black text-white/20 group-hover:text-black transition-colors uppercase">{num}</span>

        <div className="space-y-1">
          <h4 className="text-lg font-black tracking-tighter uppercase  group-hover:text-black transition-colors">
            {title}
          </h4>
          <p className="text-[10px] tracking-widest text-white/30 group-hover:text-black/70 leading-relaxed transition-colors">
            {desc}
          </p>
        </div>

      </div>
    </div>
  );
}

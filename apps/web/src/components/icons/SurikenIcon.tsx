'use client';

interface SurikenIconProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  glow?: boolean;
  opacity?: string;
  variant?: 'white' | 'black' | 'none';
  scale?: number;
  x?: number;
  y?: number;
}

export const SurikenIcon = ({ 
  className = '', 
  size = 'md',
  glow = false,
  opacity = '',
  variant = 'white',
  scale = 1.6,
  x = 0,
  y = 0
}: SurikenIconProps) => {
  const sizes = {
    xs: 'w-10 h-10',
    sm: 'w-14 h-14',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28'
  };

  const getFilter = () => {
    if (variant === 'white') return 'brightness(0) invert(1)';
    if (variant === 'black') return 'brightness(0)';
    return 'none';
  };

  return (
    <div className={`relative shrink-0 ${opacity} ${className}`}>
      {glow && (
        <div className="absolute inset-0 bg-[#E81414]/20 blur-sm rounded-full animate-pulse" />
      )}
      <img 
        src="/logo.png" 
        alt="Zapsters Logo" 
        className={`${sizes[size]} object-contain relative z-10 transition-transform`}
        style={{ 
          transform: `scale(${scale}) translate(${x}px, ${y}px)`,
          filter: getFilter()
        }}
      />
    </div>
  );
};

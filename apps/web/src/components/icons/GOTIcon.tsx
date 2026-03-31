import React from 'react';

export type GOTIconType = 'trophy' | 'shield' | 'zap' | 'lock' | 'bell' | 'eye' | 'globe' | 'hand' | 'targaryen' | 'wolf' | 'dragon' | 'rose' | 'lion' | 'kraken' | 'sun' | string;

export type GOTIconProps = {
  type?: GOTIconType;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  variant?: 'white' | 'black' | 'none';
  scale?: number;
  x?: number;
  y?: number;
  [key: string]: any;
};

const sizeMap: Record<string, number> = {
  xs: 40,
  sm: 56,
  md: 72,
  lg: 96,
  xl: 128,
};

export function GOTIcon({ 
  type, 
  size = 'md', 
  className = '', 
  variant = 'white',
  scale = 1.6,
  x = 0,
  y = 0,
  ...props 
}: GOTIconProps) {
  const src = '/logo.png';
  const dimension = typeof size === 'number' ? size : (sizeMap[size as string] ?? 36);

  const getFilter = () => {
    if (variant === 'white') return 'brightness(0) invert(1)';
    if (variant === 'black') return 'brightness(0)';
    return 'none';
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 overflow-visible ${className}`}
      style={{ width: dimension, height: dimension, minWidth: dimension, minHeight: dimension }}
      {...props}
    >
      <img
        src={src}
        alt="Zapsters Logo"
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'contain', 
          transform: `scale(${scale}) translate(${x}px, ${y}px)`,
          filter: getFilter()
        }}
      />
    </div>
  );
}

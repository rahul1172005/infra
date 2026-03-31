'use client';

import { useEffect } from 'react';
import { useMusicStore } from '@/lib/store/useMusicStore';
import { MusicPlayer } from '@/components/ui/MusicPlayer';

export function MusicProvider() {
  const { isPlaying, setPlaying } = useMusicStore();

  useEffect(() => {
    const handleFirstInteraction = () => {
      // Use the latest state from setPlaying's callback if needed, 
      // but just firing play once is enough for autoplay policy.
      setPlaying(true);
      
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [setPlaying]);

  return (
    <>
      <MusicPlayer />
      <style jsx global>{`
        @keyframes music-bar {
          0%, 100% { height: 4px; }
          50% { height: 12px; }
        }
      `}</style>
    </>
  );
}

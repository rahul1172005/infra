'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Repeat, Music, X, Volume2, Repeat1, ListMusic } from 'lucide-react';
import { useMusicStore, PLAYLIST } from '@/lib/store/useMusicStore';

export function MusicPlayer() {
  const { 
    isOpen, toggleOpen, isPlaying, setPlaying, 
    currentSongIndex, setSong, nextSong, prevSong, 
    loopMode, setLoopMode, volume, setVolume 
  } = useMusicStore();
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const handleEnded = () => {
    if (loopMode === 'single') {
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => setPlaying(false));
      }
    } else if (loopMode === 'playlist') {
      nextSong();
    } else {
      setPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  // Sync state with audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      // Small timeout to ensure src is updated and element is ready
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          if (err.name !== 'AbortError') {
            setPlaying(false);
          }
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSongIndex]);

  // Apply volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newProgress = Number(e.target.value);
    audio.currentTime = (newProgress / 100) * audio.duration;
    setProgress(newProgress);
  };

  const currentSong = PLAYLIST[currentSongIndex];

  return (
    <>
      <audio
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={handleTimeUpdate}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-8 w-80 max-h-[min(650px,calc(100vh-140px))] bg-black/90 border border-white/10 p-6 z-[1000] rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                  <img src="/logo.png" alt="" className="w-full h-full object-contain brightness-0 invert" />
                </div>
                <span className="text-[10px] tracking-[0.4em] font-black uppercase text-white/50">SONIC CORE</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  className={`p-2 transition-colors rounded-lg ${showPlaylist ? 'bg-white/10 text-white' : 'text-white/20 hover:text-white'}`}
                  title="Playlist"
                >
                  <ListMusic size={18} />
                </button>
                <button 
                  onClick={toggleOpen}
                  className="p-2 text-white/20 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Content Area (Main vs Playlist) */}
            <div className="flex-1 min-h-0 relative">
              <AnimatePresence mode="wait">
                {!showPlaylist ? (
                  <motion.div
                    key="player"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-8"
                  >
                    {/* Song Info (Expanded) */}
                    <div>
                      <div className="w-full aspect-square bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[#E81414]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className={`w-16 h-16 flex items-center justify-center rounded-full border border-white/10 bg-black/50 ${isPlaying ? 'animate-pulse' : ''}`}>
                           <img src="/logo.png" alt="" className="w-10 h-10 object-contain brightness-0 invert" />
                        </div>
                        {/* Status Label */}
                        <div className="absolute bottom-4 left-4">
                          <span className="text-[8px] tracking-[0.3em] font-black uppercase text-white/20">REALM AUDIO</span>
                        </div>
                      </div>
                      <h3 className="text-sm font-black uppercase tracking-[0.1em] text-white truncate mb-1">
                        {currentSong.title}
                      </h3>
                      <p className="text-[10px] tracking-[0.2em] font-black uppercase text-white/30">
                        ZAPSTERS SOUNDSCAPE
                      </p>
                    </div>
                  </motion.div>
                ) : (
                    <motion.div
                      key="playlist"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="h-[320px] overflow-y-scroll flex flex-col gap-2 pb-6 pl-1 pr-2 playlist-scroll"
                    >
                    <div className="mb-4">
                      <span className="text-[10px] tracking-[0.3em] font-black uppercase text-white/30">CURRENT PLAYLIST</span>
                    </div>
                    {PLAYLIST.map((song, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSong(index);
                        }}
                        className={`w-full p-4 rounded-xl text-left border transition-all flex items-center gap-4 group ${index === currentSongIndex ? 'bg-white/10 border-white/20' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${index === currentSongIndex ? 'bg-[#E81414] border-[#E81414]' : 'bg-white/5 border-white/10'}`}>
                          {index === currentSongIndex && isPlaying ? (
                             <div className="flex gap-0.5 items-end h-3">
                                <div className="w-0.5 bg-white animate-[music-bar_0.8s_ease-in-out_infinite]" />
                                <div className="w-0.5 bg-white animate-[music-bar_1.2s_ease-in-out_infinite]" />
                                <div className="w-0.5 bg-white animate-[music-bar_1.0s_ease-in-out_infinite]" />
                             </div>
                          ) : (
                             <img 
                               src="/logo.png" 
                               alt="" 
                               className={`w-7 h-7 object-contain brightness-0 invert transition-opacity ${index === currentSongIndex ? 'opacity-100' : 'opacity-20 group-hover:opacity-60'}`} 
                             />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`text-[10px] font-black uppercase truncate tracking-[0.05em] ${index === currentSongIndex ? 'text-white' : 'text-white/40 group-hover:text-white/60'}`}>
                            {song.title}
                          </p>
                          <p className="text-[8px] font-black uppercase tracking-[0.1em] text-white/20">
                            ZAPSTERS TRACK {index + 1}
                          </p>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Universal Footer Controls (Always Visible) */}
            <div className="mt-8 space-y-6 pt-6 border-t border-white/5">
              {/* Progress */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleProgressChange}
                  className="w-full h-1 rounded-full appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#E81414] [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#E81414]"
                  style={{
                    background: `linear-gradient(to right, white ${progress}%, rgba(255, 255, 255, 0.1) ${progress}%)`
                  }}
                />
                <div className="flex justify-between text-[8px] tracking-[0.1em] font-black text-white/20 uppercase">
                  <span>{audioRef.current ? Math.floor(audioRef.current.currentTime / 60) + ':' + String(Math.floor(audioRef.current.currentTime % 60)).padStart(2, '0') : '0:00'}</span>
                  <span>{audioRef.current?.duration ? Math.floor(audioRef.current.duration / 60) + ':' + String(Math.floor(audioRef.current.duration % 60)).padStart(2, '0') : '0:00'}</span>
                </div>
              </div>

              {/* Main Controls */}
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => {
                    if (loopMode === 'none') setLoopMode('playlist');
                    else if (loopMode === 'playlist') setLoopMode('single');
                    else setLoopMode('none');
                  }}
                  className={`p-2 transition-all rounded-full ${loopMode !== 'none' ? 'text-[#E81414]' : 'text-white/40 hover:text-white'}`}
                  title={`Loop: ${loopMode}`}
                >
                  {loopMode === 'single' ? <Repeat1 size={18} /> : <Repeat size={18} />}
                </button>

                <div className="flex items-center gap-4">
                  <button 
                    onClick={prevSong}
                    className="p-2 text-white/40 hover:text-white transition-all transform hover:scale-110"
                  >
                    <SkipBack size={20} fill="currentColor" />
                  </button>
                  <button 
                    onClick={() => setPlaying(!isPlaying)}
                    className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-[#E81414] hover:text-white transition-all transform hover:scale-105 active:scale-95 group shadow-xl"
                  >
                    {isPlaying ? (
                      <Pause size={20} fill="currentColor" />
                    ) : (
                      <Play size={20} fill="currentColor" className="ml-1" />
                    )}
                  </button>
                  <button 
                    onClick={nextSong}
                    className="p-2 text-white/40 hover:text-white transition-all transform hover:scale-110"
                  >
                    <SkipForward size={20} fill="currentColor" />
                  </button>
                </div>

                <div className="group/volume relative">
                  <button className="p-2 text-white/40 hover:text-white transition-all">
                    <Volume2 size={18} />
                  </button>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-3 bg-black border border-white/10 rounded-full h-32 opacity-0 invisible group-hover/volume:opacity-100 group-hover/volume:visible transition-all">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="h-full w-1 accent-[#E81414] rotate-180"
                      style={{ writingMode: 'vertical-lr' } as any}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


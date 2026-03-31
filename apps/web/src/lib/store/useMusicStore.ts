import { create } from 'zustand';

export type LoopMode = 'none' | 'single' | 'playlist';

interface Song {
  title: string;
  url: string;
}

export const PLAYLIST: Song[] = [
  { title: 'Rise of the Zapsters', url: '/Rise of the Zapsters.mp3' },
  { title: 'Legend of the Tech Empire', url: '/Legend of the Tech Empire.mp3' },
  { title: 'Celestial Coronation', url: '/Celestial Coronation.mp3' },
  { title: 'Crown of Shadows', url: '/Crown of Shadows.mp3' },
  { title: 'Dawn over the Citadel', url: '/Dawn over the Citadel.mp3' },
  { title: 'Elysian Fields of the Kingdom', url: '/Elysian Fields of the Kingdom.mp3' },
  { title: 'The Gilded Realm', url: '/The Gilded Realm.mp3' },
  { title: 'The Iron Throne\'s Burden', url: '/The Iron Throne\'s Burden.mp3' },
  { title: 'Valor of the Iron King', url: '/Valor of the Iron King.mp3' },
];

interface MusicState {
  isOpen: boolean;
  isPlaying: boolean;
  currentSongIndex: number;
  loopMode: LoopMode;
  volume: number;
  
  toggleOpen: () => void;
  setPlaying: (playing: boolean) => void;
  nextSong: () => void;
  prevSong: () => void;
  setSong: (index: number) => void;
  setLoopMode: (mode: LoopMode) => void;
  setVolume: (vol: number) => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  isOpen: false,
  isPlaying: false,
  currentSongIndex: 0,
  loopMode: 'playlist',
  volume: 0.5,

  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setPlaying: (playing) => set({ isPlaying: playing }),
  nextSong: () => set((state) => ({
    currentSongIndex: (state.currentSongIndex + 1) % PLAYLIST.length,
    isPlaying: true
  })),
  prevSong: () => set((state) => ({
    currentSongIndex: (state.currentSongIndex - 1 + PLAYLIST.length) % PLAYLIST.length,
    isPlaying: true
  })),
  setSong: (index) => set({ currentSongIndex: index, isPlaying: true }),
  setLoopMode: (mode) => set({ loopMode: mode }),
  setVolume: (vol) => set({ volume: vol }),
}));

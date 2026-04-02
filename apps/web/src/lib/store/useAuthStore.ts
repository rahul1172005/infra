import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    email: string;
    name?: string;
    nickname?: string;
    fullName?: string;
    house?: string;
    picture?: string;
    teamId?: string;
    role: string;
    xp?: number;
    level?: number;
    mmr?: number;
    _count?: {
        matchParticipations: number;
        matchesWon: number;
        submissions: number;
    };
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            login: (user, token) => set({ user, token, isAuthenticated: true }),
            logout: () => {
                if (typeof window !== 'undefined') {
                    window.localStorage.clear();
                    window.sessionStorage.clear();
                }
                set({ user: null, token: null, isAuthenticated: false });
            },
        }),
        {
            name: 'zapsters-auth-storage',
        }
    )
);

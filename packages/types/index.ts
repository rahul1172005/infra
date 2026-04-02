export interface User {
    id: string;
    email: string;
    name: string;
    teamId?: string;
    role: 'SUPER_ADMIN' | 'MENTOR' | 'STUDENT' | 'ADMIN' | 'PLAYER';
    xpPoints: number;
    level: number;
    rankTier: string;
}

export interface Team {
    id: string;
    name: string;
    description?: string;
    logoUrl?: string;
}

export interface Contest {
    id: string;
    title: string;
    description: string;
    domain: string;
    isLive: boolean;
    startTime: Date;
    endTime: Date;
}

export interface ScoreUpdate {
    teamId?: string;
    userId?: string;
    contestId: string;
    points: number;
    type: 'ADD' | 'SUBTRACT' | 'SET';
}

export interface LeaderboardEntry {
    rank: number;
    id: string; // userId or teamId
    name: string;
    score: number;
    logoUrl?: string;
}

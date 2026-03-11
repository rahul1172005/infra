import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class LeaderboardService implements OnModuleInit, OnModuleDestroy {
    public redis: Redis | null = null;

    onModuleInit() {
        try {
            this.redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
                retryStrategy: () => null // Prevent crash spam if docker is off locally
            });
        } catch (e) {
            console.error('Redis initialization failed', e);
        }
    }

    onModuleDestroy() {
        this.redis.disconnect();
    }

    async updateScore(teamId: string, score: number) {
        if (!this.redis || this.redis.status !== 'ready') return;
        await this.redis.zincrby('leaderboard', score, teamId);
    }

    async getTopTeams(limit = 10) {
        if (!this.redis || this.redis.status !== 'ready') return [];
        return await this.redis.zrevrange('leaderboard', 0, limit - 1, 'WITHSCORES');
    }
}

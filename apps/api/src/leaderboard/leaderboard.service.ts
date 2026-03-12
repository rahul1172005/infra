import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class LeaderboardService implements OnModuleInit, OnModuleDestroy {
    public redis!: Redis;
    private isInitialized = false;

    onModuleInit() {
        try {
            this.redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
                retryStrategy: (times) => {
                    if (times > 3) return null;
                    return Math.min(times * 50, 2000);
                }
            });
            this.isInitialized = true;
        } catch (e) {
            console.error('Redis initialization failed', e);
            this.isInitialized = false;
        }
    }

    onModuleDestroy() {
        if (this.redis) {
            this.redis.disconnect();
        }
    }

    async updateScore(teamId: string, score: number) {
        if (!this.isInitialized || !this.redis || this.redis.status !== 'ready') return;
        await this.redis.zincrby('leaderboard', score, teamId);
    }

    async getTopTeams(limit = 10) {
        if (!this.isInitialized || !this.redis || this.redis.status !== 'ready') return [];
        return await this.redis.zrevrange('leaderboard', 0, limit - 1, 'WITHSCORES');
    }
}

import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeaderboardService implements OnModuleInit, OnModuleDestroy {
    public redis: Redis | undefined;
    private isInitialized = false;

    constructor(private prisma: PrismaService) {}

    onModuleInit() {
        try {
            if (process.env.REDIS_URL) {
                this.redis = new Redis(process.env.REDIS_URL, {
                    maxRetriesPerRequest: 0, // Fail fast for local development
                    retryStrategy: (times) => {
                        if (times > 1) return null; // Don't keep retrying if it's a placeholder
                        return null;
                    }
                });

                this.redis.on('error', (err) => {
                    // Suppress excessive error logging for placeholder URLs
                    if (err.message.includes('ENOTFOUND') || err.message.includes('ETIMEDOUT')) {
                        this.isInitialized = false;
                    } else {
                        console.error('Redis Error:', err.message);
                    }
                });

                this.isInitialized = true;
            }
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

    async getTeamLeaderboard() {
        return this.prisma.team.findMany({
            orderBy: { score: 'desc' },
            include: {
                owner: {
                    select: { name: true, picture: true }
                },
                _count: {
                    select: { members: true }
                }
            }
        });
    }

    async getTopTeams() {
        return this.getTeamLeaderboard();
    }

    async getPlayerLeaderboard() {
        return this.prisma.user.findMany({
            orderBy: { xp: 'desc' },
            take: 50,
            select: {
                id: true,
                name: true,
                nickname: true,
                picture: true,
                xp: true,
                level: true,
                mmr: true
            }
        });
    }

    async updateScore(teamId: string, score: number) {
        if (!this.isInitialized || !this.redis) return;
        try {
            await this.redis.zincrby('leaderboard', score, teamId);
        } catch (e) {
            console.warn('Silent Redis Failure:', e);
        }
    }
}


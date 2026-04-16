import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScoreboardService {
    constructor(private prisma: PrismaService) { }

    /**
     * ATOMIC TRANSACTION: Core Scoring Engine
     * Updates User Score + Team Score + History in one transaction (SSOT)
     */
    async addScore(userId: string, points: number, actionType: string) {
        return this.prisma.$transaction(async (tx) => {
            // 1. Fetch User Context (and verify existence)
            const user = await tx.user.findUnique({
                where: { id: userId },
                select: { teamId: true, xp: true }
            });

            if (!user) throw new NotFoundException('User not found');

            // 2. Track History (Mutable Log)
            await tx.submission.create({ // Using Submission model as scoring history substitute for now
                data: {
                    userId,
                    challengeId: 'system_action', // Placeholder for general action
                    score: points,
                }
            });

            // 3. Update User Aggregate
            const updatedUser = await tx.user.update({
                where: { id: userId },
                data: { 
                    xp: { increment: points },
                    // Simplified level logic: leveling up every 1000 xp
                    level: Math.floor((user.xp + points) / 1000) + 1
                }
            });

            // 4. Update Team Aggregate (if user belongs to a team)
            if (user.teamId) {
                await tx.team.update({
                    where: { id: user.teamId },
                    data: { score: { increment: points } }
                });
            }

            return updatedUser;
        });
    }

    /**
     * GLOBAL LEADERBOARD: User Rankings
     * Optimized for minimal joins
     */
    async getUserLeaderboard(limit = 100, page = 1) {
        return this.prisma.user.findMany({
            where: { role: 'PLAYER' }, // Only rank players
            select: {
                id: true,
                name: true,
                email: true,
                picture: true,
                xp: true,
                level: true,
                currentTeam: {
                    select: { name: true }
                }
            },
            orderBy: { xp: 'desc' },
            take: limit,
            skip: (page - 1) * limit
        });
    }

    /**
     * GLOBAL LEADERBOARD: Team Rankings
     */
    async getTeamLeaderboard(limit = 20) {
        return this.prisma.team.findMany({
            include: {
                _count: {
                    select: { members: true }
                }
            },
            orderBy: { score: 'desc' },
            take: limit
        });
    }

    /**
     * ADMINISTRATIVE: Reset Season Logic
     * Audit log recommended before execution
     */
    async resetSeason() {
        return this.prisma.$transaction([
            this.prisma.user.updateMany({ data: { xp: 0, level: 1 } }),
            this.prisma.team.updateMany({ data: { score: 0 } }),
            this.prisma.submission.deleteMany(), // Clear history for reset
        ]);
    }

    /**
     * MONITORING: Real-time system activity
     */
    async getMonitoringData() {
        const [activeSessions, latestCompletions, onlineCount] = await Promise.all([
            this.prisma.activeSession.findMany({
                include: {
                    user: { select: { name: true, picture: true, status: true } },
                    team: { select: { name: true } },
                    challenge: { select: { title: true } }
                },
                orderBy: { joinedAt: 'desc' }
            }),
            this.prisma.challengeCompletion.findMany({
                take: 10,
                include: {
                    team: { select: { name: true } },
                    user: { select: { name: true } },
                    challenge: { select: { title: true } }
                },
                orderBy: { completedAt: 'desc' }
            }),
            this.prisma.user.count({
                where: {
                    lastActionAt: { gte: new Date(Date.now() - 5 * 60 * 1000) }
                }
            })
        ]);

        return {
            activeSessions,
            latestCompletions,
            onlineCount
        };
    }
}

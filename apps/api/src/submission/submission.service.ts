import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LeaderboardService } from '../leaderboard/leaderboard.service';
import { ScoreGateway } from '../socket/score.gateway';

@Injectable()
export class SubmissionService {
    constructor(
        private prisma: PrismaService,
        private leaderboardService: LeaderboardService,
        private scoreGateway: ScoreGateway
    ) { }

    async submitSolution(userId: string, challengeId: string, score: number) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { currentTeam: true }
        });

        if (!user || !user.teamId) throw new Error("No team found for user");

        const teamId = user.teamId;

        // Check if team already solved this
        const alreadySolved = await this.prisma.challengeCompletion.findUnique({
            where: { teamId_challengeId: { teamId, challengeId } }
        });

        if (alreadySolved) throw new Error("Team already completed this challenge");

        // Save submission as log
        const submission = await this.prisma.submission.create({
            data: { userId, challengeId, score }
        });

        // 1. Mark challenge completed for the team
        await this.prisma.challengeCompletion.create({
            data: {
                teamId,
                challengeId,
                userId,
                pointsEarned: score,
                timeTaken: 0, // In standard implementation, calc from session start
            }
        });

        // 2. Update scores in DB
        await this.prisma.team.update({
            where: { id: teamId },
            data: { score: { increment: score } }
        });

        await this.prisma.user.update({
            where: { id: userId },
            data: {
                xp: { increment: score },
                pointsContributed: { increment: score }
            }
        });

        // 3. Global update
        await this.leaderboardService.updateScore(teamId, score);
        await this.scoreGateway.broadcastLeaderboard();

        // 4. Real-time broadcast to team (for lock)
        this.scoreGateway.server.to(teamId).emit('challenge_completed_by_teammate', {
            challengeId,
            userName: user.name,
            points: score
        });

        // 5. Real-time broadcast to admin
        this.scoreGateway.server.emit('system_stats_update');

        return submission;
    }
}

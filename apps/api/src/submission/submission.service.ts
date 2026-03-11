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
        const submission = await this.prisma.submission.create({
            data: { userId, challengeId, score }
        });

        const user = await this.prisma.user.findUnique({ where: { id: userId } });

        if (user && user.teamId) {
            await this.leaderboardService.updateScore(user.teamId, score);
            // Trigger live UI update automatically
            await this.scoreGateway.broadcastLeaderboard();
        }

        return submission;
    }
}

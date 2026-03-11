import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LeaderboardService } from '../leaderboard/leaderboard.service';
import { ScoreGateway } from '../socket/score.gateway';

@Injectable()
export class CtfService {
    private readonly logger = new Logger(CtfService.name);

    // Mocks CTFd concepts like flagging, hints, dynamic scoring
    constructor(
        private prisma: PrismaService,
        private leaderboard: LeaderboardService,
        private socket: ScoreGateway
    ) { }

    /**
     * Evaluates if a submitted flag matches a CTF challenge
     * and mitigates replay attacks.
     */
    async submitFlag(challengeId: string, userId: string, submittedFlag: string) {
        // Basic CTFd flag validation
        const flagDef = await this.prisma.ctfFlag.findFirst({
            where: { challengeId, flag: submittedFlag }
        });

        if (!flagDef) return { status: 'INCORRECT' };

        // Anti-replay check
        const existingCapture = await this.prisma.flagCapture.findFirst({
            where: { flagId: flagDef.id, userId } // Prevent double scoring
        });

        if (existingCapture) return { status: 'ALREADY_CAPTURED' };

        // Record capture
        const capture = await this.prisma.flagCapture.create({
            data: {
                flagId: flagDef.id,
                userId,
                teamId: (await this.prisma.user.findUnique({ where: { id: userId } }))?.teamId || null
            }
        });

        // Handle dynamic scoring (the more people capture it, the lower the score gets)
        // For now we just implement static basic points
        const pointsGained = flagDef.isDynamic ? this.calculateDynamicScore(flagDef.points, 1) : flagDef.points; // 1 = count mock

        this.logger.log(`Flag [${submittedFlag}] captured by ${userId} for ${pointsGained} points!`);

        // Award Points via Leaderboard
        if (capture.teamId) {
            await this.leaderboard.updateScore(capture.teamId, pointsGained);
            await this.socket.broadcastLeaderboard();
        }

        return { status: 'CORRECT', points: pointsGained };
    }

    calculateDynamicScore(initial: number, solveCount: number) {
        // Common CTFd formula: Decay curve
        // Max score drops as solve counts increase
        const minimum = 50;
        const decay = 10;   // Drops 10 points per solve
        return Math.max(minimum, initial - (solveCount * decay));
    }
}

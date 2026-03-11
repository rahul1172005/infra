import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MatchmakingService {
    private readonly logger = new Logger(MatchmakingService.name);

    // MMR / Elo System ported from GameMatchmaker algorithms
    constructor(private prisma: PrismaService) { }

    /**
     * Puts a user or team in an asynchronous "queue" for matching based on MMR
     */
    async joinQueue(userId: string, teamId: string | null = null, gameMode: string = '1V1') {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error('User missing');

        const mmr = teamId ? (await this.prisma.team.findUnique({ where: { id: teamId } }))?.mmr : user.mmr;

        // Check if already in queue
        const existing = await this.prisma.matchmakingQueue.findFirst({
            where: { userId, status: 'SEARCHING' }
        });

        if (existing) return existing;

        const queueEntry = await this.prisma.matchmakingQueue.create({
            data: {
                userId,
                teamId,
                mmr: mmr || 1000,
                gameMode,
                status: 'SEARCHING'
            }
        });

        // Run matchmaking pass asynchronously (Elixir/OTP MatchmakingEx style pass)
        setTimeout(() => this.runMatchmaker(gameMode), 100);

        return queueEntry;
    }

    // Periodic polling match loop
    private async runMatchmaker(gameMode: string) {
        const players = await this.prisma.matchmakingQueue.findMany({
            where: { gameMode, status: 'SEARCHING' },
            orderBy: { queuedAt: 'asc' } // Oldest in queue first
        });

        if (players.length < 2) return; // not enough players for 1v1

        // Simple MMR matching (within 100 Elo points range)
        for (let i = 0; i < players.length; i++) {
            for (let j = i + 1; j < players.length; j++) {
                const p1 = players[i];
                const p2 = players[j];

                if (p1.status !== 'SEARCHING' || p2.status !== 'SEARCHING') continue;

                const mmrDiff = Math.abs(p1.mmr - p2.mmr);
                // Time in queue expands search radius (50 MMR per 10 seconds)
                const timeDiff = Math.abs(p1.queuedAt.getTime() - new Date().getTime());
                const expandedRange = 100 + (Math.floor(timeDiff / 10000) * 50);

                if (mmrDiff <= expandedRange) {
                    // MATCH FOUND!
                    p1.status = 'MATCHED';
                    p2.status = 'MATCHED';

                    await this.prisma.matchmakingQueue.updateMany({
                        where: { id: { in: [p1.id, p2.id] } },
                        data: { status: 'MATCHED' }
                    });

                    this.logger.log(`Match Found: ${p1.userId} vs ${p2.userId} in ${gameMode}`);
                    // In prod, fire websockets + create BattleMatch record here
                    break;
                }
            }
        }
    }

    /**
     * Calculate Elo adjustment post-match
     * kFactor determines how volatile the rank represents
     */
    calculateElo(winnerMmr: number, loserMmr: number, kFactor = 32) {
        const expectedWinner = 1 / (1 + Math.pow(10, (loserMmr - winnerMmr) / 400));
        const expectedLoser = 1 / (1 + Math.pow(10, (winnerMmr - loserMmr) / 400));

        return {
            newWinnerMmr: Math.round(winnerMmr + kFactor * (1 - expectedWinner)),
            newLoserMmr: Math.round(loserMmr + kFactor * (0 - expectedLoser))
        };
    }
}

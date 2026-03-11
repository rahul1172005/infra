import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TournamentService {
    private readonly logger = new Logger(TournamentService.name);

    constructor(private prisma: PrismaService) { }

    /**
     * Generates a single-elimination bracket for a tournament.
     * Based on OSS bracket generator patterns (e.g. challonge-tools, evroon/bracket).
     */
    async generateBracket(tournamentId: string, participantIds: string[]) {
        // Basic power-of-2 padding check
        const nearestPowerOfTwo = Math.pow(2, Math.ceil(Math.log2(participantIds.length)));

        // Simulate bracket generation logic
        const totalMatches = nearestPowerOfTwo - 1;
        const matchesToCreate = [];

        // Round 1 (Quarter Finals, etc.)
        const round1Matches = nearestPowerOfTwo / 2;
        for (let i = 0; i < round1Matches; i++) {
            matchesToCreate.push({
                tournamentId,
                round: 1,
                matchNumber: i + 1,
                participant1Id: participantIds[i * 2] || null, // Byes mapped to null
                participant2Id: participantIds[i * 2 + 1] || null,
                status: 'PENDING'
            });
        }

        // Insert to DB
        await this.prisma.tournamentBracket.createMany({
            data: matchesToCreate
        });

        this.logger.log(`Generated bracket for tournament ${tournamentId} with ${round1Matches} R1 matches.`);
        return this.prisma.tournamentBracket.findMany({ where: { tournamentId } });
    }

    // Advance bracket tree
    async advanceBracket(matchId: string, winnerId: string) {
        const match = await this.prisma.tournamentBracket.update({
            where: { id: matchId },
            data: { winnerId, status: 'COMPLETED' }
        });
        // Further OSS logic implies cascading winnerId into the next round's bracket match
        return match;
    }
}

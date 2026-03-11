import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ScoreGateway } from '../socket/score.gateway';

@Injectable()
export class BattleService {
    constructor(
        private prisma: PrismaService,
        private socket: ScoreGateway
    ) { }

    async createMatch(challengeId: string, player1Id: string, player2Id: string) {
        const match = await this.prisma.battleMatch.create({
            data: {
                challengeId,
                participants: {
                    create: [{ userId: player1Id }, { userId: player2Id }]
                }
            },
            include: { participants: true }
        });

        this.socket.server.emit(`match_start_${match.id}`, { match });
        return match;
    }

    // Deduct health on test failure
    async recordTestFailure(participantId: string, dmg: number) {
        const p = await this.prisma.matchParticipant.update({
            where: { id: participantId },
            data: { health: { decrement: dmg } },
            include: { match: { include: { participants: true } } }
        });

        if (p.health <= 0) {
            await this.prisma.matchParticipant.update({
                where: { id: p.id },
                data: { status: 'ELIMINATED', health: 0 }
            });
            // Find winner
            const winner = p.match.participants.find(x => x.id !== p.id);
            if (winner) {
                await this.prisma.battleMatch.update({
                    where: { id: p.match.id },
                    data: { status: 'FINISHED', winnerId: winner.userId }
                });
            }
        }
        this.socket.server.emit(`match_update_${p.matchId}`, { affected: p });
    }
}

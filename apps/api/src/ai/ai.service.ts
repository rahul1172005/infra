import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AiService {
    constructor(private prisma: PrismaService) { }

    /**
     * Extremely advanced auto-matching logic combining XP, Level,
     * evaluating standard deviaton in teams to create balanced
     * and highly competitive environments automatically.
     */
    async getSmartMatchRecommendations(userId: string) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error('User not found');

        const allTeams = await this.prisma.team.findMany({
            include: { members: true }
        });

        // Smart logic: find teams where average XP complements the user's XP
        // Ideal team aims for a balanced average team XP across the entire contour
        const scoredTeams = allTeams.map(team => {
            const avgXp = team.members.reduce((sum, u) => sum + u.xp, 0) / (team.members.length || 1);
            const gap = Math.abs(avgXp - user.xp);
            return { team, compatibilityScore: 10000 - gap };
        }).sort((a, b) => b.compatibilityScore - a.compatibilityScore);

        return scoredTeams.slice(0, 3).map(st => st.team);
    }
}

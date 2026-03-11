import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GamificationService {
    private readonly logger = new Logger(GamificationService.name);

    constructor(private prisma: PrismaService) { }

    /**
     * Complex Progression Formula: 
     * Level = Math.floor(Math.sqrt(XP / 50))
     * Or purely exponential: Needed XP = Level^2 * 50
     */
    async addUserXp(userId: string, xpGain: number) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) return;

        const newXp = user.xp + xpGain;
        const newLevel = Math.max(1, Math.floor(Math.sqrt(newXp / 50)));

        if (newLevel > user.level) {
            this.logger.log(`User ${user.email} leveled up to ${newLevel}!`);
            // Fire level_up socket event here via injected Gateway
        }

        return this.prisma.user.update({
            where: { id: userId },
            data: { xp: newXp, level: newLevel }
        });
    }
}

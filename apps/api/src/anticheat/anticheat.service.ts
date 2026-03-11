import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AntiCheatService {
    private readonly logger = new Logger(AntiCheatService.name);
    constructor(private prisma: PrismaService) { }

    async logSuspiciousActivity(userId: string, action: string, details: string, severity: 'LOW' | 'MEDIUM' | 'HIGH') {
        this.logger.warn(`CHEATING SUSPECTED | [${severity}] ${userId} - ${action}: ${details}`);

        return this.prisma.cheatLog.create({
            data: {
                userId,
                action,
                details,
                severity
            }
        });
    }

    async getPlayerCheatingScore(userId: string) {
        const logs = await this.prisma.cheatLog.findMany({ where: { userId } });
        let risk = 0;
        logs.forEach(l => {
            if (l.severity === 'LOW') risk += 1;
            if (l.severity === 'MEDIUM') risk += 3;
            if (l.severity === 'HIGH') risk += 10;
        });
        return risk; // Returns an anti-cheat risk percentage
    }
}

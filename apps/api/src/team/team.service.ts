import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamService {
    constructor(private prisma: PrismaService) { }

    async autoAssignTeams() {
        const students = await this.prisma.user.findMany({
            where: { role: "STUDENT" },
            orderBy: { xp: "desc" }
        });

        const teams = await this.prisma.team.findMany();
        if (teams.length === 0) return;

        let i = 0;
        for (const student of students) {
            const team = teams[i % teams.length];
            await this.prisma.user.update({
                where: { id: student.id },
                data: { teamId: team.id }
            });
            i++;
        }
    }
}

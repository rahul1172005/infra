import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamService {
    constructor(private prisma: PrismaService) { }

    async getTeams() {
        return this.prisma.team.findMany({
            include: {
                _count: {
                    select: { members: true }
                }
            },
            orderBy: { score: 'desc' }
        });
    }

    async createTeam(name: string) {
        return this.prisma.team.create({
            data: { name, score: 0, mmr: 1000 }
        });
    }

    async deleteTeam(id: string) {
        return this.prisma.team.delete({
            where: { id }
        });
    }

    async updatePoints(id: string, points: number) {
        return this.prisma.team.update({
            where: { id },
            data: { score: { increment: points } }
        });
    }

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

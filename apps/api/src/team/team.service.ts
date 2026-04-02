import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@zapsters/database';

@Injectable()
export class TeamService {
    constructor(private prisma: PrismaService) { }

    async getTeams() {
        return this.prisma.team.findMany({
            include: {
                owner: {
                    select: { id: true, name: true, email: true, picture: true }
                },
                _count: {
                    select: { members: true }
                }
            },
            orderBy: { score: 'desc' }
        });
    }

    async getTeamById(id: string) {
        const team = await this.prisma.team.findUnique({
            where: { id },
            include: {
                owner: true,
                members: {
                    include: {
                        user: {
                            select: { id: true, name: true, email: true, picture: true, role: true }
                        }
                    }
                }
            }
        });
        if (!team) throw new NotFoundException('Team not found');
        return team;
    }

    async createTeamOfPlayer(ownerId: string, name: string, image?: string, maxMembers: number = 10) {
        // Enforce: one team per owner
        const existingOwned = await this.prisma.team.findUnique({ where: { ownerId } });
        if (existingOwned) {
            throw new BadRequestException('You already own a team. Delete it to create a new one.');
        }

        // Check if name taken
        const existingName = await this.prisma.team.findUnique({ where: { name } });
        if (existingName) {
            throw new BadRequestException('Team name already exists.');
        }

        const newTeam = await this.prisma.team.create({
            data: {
                name,
                image,
                ownerId,
                maxMembers,
                score: 0,
                // Add owner as first member
                members: {
                    create: {
                        userId: ownerId
                    }
                }
            }
        });

        // Set owner's teamId
        await this.prisma.user.update({
            where: { id: ownerId },
            data: { teamId: newTeam.id }
        });

        return newTeam;
    }

    async updateTeamProfile(teamId: string, userId: string, userRole: UserRole, data: { name?: string; image?: string; maxMembers?: number }) {
        const team = await this.prisma.team.findUnique({ where: { id: teamId } });
        if (!team) throw new NotFoundException('Team not found');

        // Permission check: owner or admin
        if (team.ownerId !== userId && userRole !== UserRole.ADMIN) {
            throw new ForbiddenException('You do not have permission to edit this team');
        }

        // Admins can override maxMembers, players cannot if they are not owner? 
        // Actually player owner can edit their own team size according to requirements.
        
        return this.prisma.team.update({
            where: { id: teamId },
            data: {
                name: data.name,
                image: data.image,
                maxMembers: data.maxMembers
            }
        });
    }

    async deleteTeam(teamId: string, userId: string, userRole: UserRole) {
        const team = await this.prisma.team.findUnique({ where: { id: teamId } });
        if (!team) throw new NotFoundException('Team not found');

        if (team.ownerId !== userId && userRole !== UserRole.ADMIN) {
            throw new ForbiddenException('You do not have permission to delete this team');
        }

        // Clear teamId for all members
        await this.prisma.user.updateMany({
            where: { teamId: teamId },
            data: { teamId: null }
        });

        return this.prisma.team.delete({ where: { id: teamId } });
    }

    // Admin-only score management
    async adjustScore(teamId: string, amount: number) {
        return this.prisma.team.update({
            where: { id: teamId },
            data: { score: { increment: amount } }
        });
    }

    async setScore(teamId: string, score: number) {
        return this.prisma.team.update({
            where: { id: teamId },
            data: { score: score }
        });
    }

    async resetScore(teamId: string) {
        return this.prisma.team.update({
            where: { id: teamId },
            data: { score: 0 }
        });
    }

    async joinTeam(teamId: string, userId: string) {
        const team = await this.prisma.team.findUnique({
            where: { id: teamId },
            include: { _count: { select: { members: true } } }
        });

        if (!team) throw new NotFoundException('Team not found');
        if (team._count.members >= team.maxMembers) {
            throw new BadRequestException('Team is full');
        }

        // Check if already in a team
        const existingMember = await this.prisma.teamMember.findFirst({
            where: { userId }
        });
        if (existingMember) {
            throw new BadRequestException('You are already a member of a team. Leave it first.');
        }

        const membership = await this.prisma.teamMember.create({
            data: { teamId, userId }
        });

        // Update user's active teamId
        await this.prisma.user.update({
            where: { id: userId },
            data: { teamId: teamId }
        });

        return membership;
    }

    async leaveTeam(teamId: string, userId: string) {
        const team = await this.prisma.team.findUnique({ where: { id: teamId } });
        if (!team) throw new NotFoundException('Team not found');

        // Cannot leave if you are the owner (must delete or transfer)
        if (team.ownerId === userId) {
            throw new BadRequestException('Owner cannot leave team. Delete the team or transfer ownership.');
        }

        const result = await this.prisma.teamMember.delete({
            where: { teamId_userId: { teamId, userId } }
        });

        // Clear user's active teamId
        await this.prisma.user.update({
            where: { id: userId },
            data: { teamId: null }
        });

        return result;
    }
}


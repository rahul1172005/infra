import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@zapsters/database';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class TeamService {
    constructor(
        private prisma: PrismaService,
        private notificationService: NotificationService
    ) { }

    async getTeams() {
        return this.prisma.team.findMany({
            include: {
                owner: {
                    select: { id: true, name: true, email: true, picture: true }
                },
                members: {
                    include: {
                        user: {
                            select: { id: true, name: true, email: true, picture: true, xp: true }
                        }
                    }
                },
                _count: {
                    select: { members: true }
                }
            },
            orderBy: { score: 'desc' }
        });
    }

    async getTeamsDetailed() {
        return this.prisma.team.findMany({
            include: {
                members: {
                    include: {
                        user: {
                            select: { id: true, name: true, email: true, picture: true, xp: true, role: true }
                        }
                    }
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
        const existingOwned = await this.prisma.team.findFirst({ where: { ownerId } });
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

        return this.prisma.$transaction(async (tx) => {
            // 1. Clear teamId for all users who consider this their current team
            await tx.user.updateMany({
                where: { teamId: teamId },
                data: { teamId: null }
            });

            // 2. Delete all Join Requests
            await tx.teamJoinRequest.deleteMany({ where: { teamId } });

            // 3. Delete all Active Sessions
            await tx.activeSession.deleteMany({ where: { teamId } });

            // 4. Delete all Challenge Completions
            await tx.challengeCompletion.deleteMany({ where: { teamId } });

            // 5. Delete all Team Members
            await tx.teamMember.deleteMany({ where: { teamId } });

            // 6. Finally delete the team
            return tx.team.delete({ where: { id: teamId } });
        });
    }

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

        const existingMember = await this.prisma.teamMember.findFirst({
            where: { userId }
        });
        if (existingMember) {
            throw new BadRequestException('You are already a member of a team. Leave it first.');
        }

        const membership = await this.prisma.teamMember.create({
            data: { teamId, userId }
        });

        await this.prisma.user.update({
            where: { id: userId },
            data: { teamId: teamId }
        });

        return membership;
    }

    async leaveTeam(teamId: string, userId: string) {
        const team = await this.prisma.team.findUnique({ where: { id: teamId } });
        if (!team) throw new NotFoundException('Team not found');

        if (team.ownerId === userId) {
            throw new BadRequestException('Owner cannot leave team. Delete the team or transfer ownership.');
        }

        const result = await this.prisma.teamMember.delete({
            where: { teamId_userId: { teamId, userId } }
        });

        await this.prisma.user.update({
            where: { id: userId },
            data: { teamId: null }
        });

        return result;
    }

    async requestToJoin(teamId: string, userId: string) {
        const team = await this.prisma.team.findUnique({
            where: { id: teamId },
            include: { _count: { select: { members: true } } }
        });

        if (!team) throw new NotFoundException('Team not found');
        if (team._count.members >= team.maxMembers) {
            throw new BadRequestException('Team is full');
        }

        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (user?.teamId) {
            throw new BadRequestException('You are already in a team');
        }

        const request = await this.prisma.teamJoinRequest.upsert({
            where: { teamId_userId: { teamId, userId } },
            update: { status: 'PENDING', createdAt: new Date() },
            create: { teamId, userId }
        });

        await this.notificationService.create(
            team.ownerId,
            'TEAM_JOIN_REQUEST',
            'NEW RECRUIT REQUEST',
            `${user?.name || 'A player'} wants to join your ranks.`,
            { teamId, userId, requestId: request.id }
        );

        return request;
    }

    async getJoinRequestsForTeam(teamId: string, userId: string) {
        const team = await this.prisma.team.findUnique({ where: { id: teamId } });
        if (!team) throw new NotFoundException('Team not found');

        if (team.ownerId !== userId) {
            throw new ForbiddenException('Only team leaders can see join requests');
        }

        return this.prisma.teamJoinRequest.findMany({
            where: { teamId, status: 'PENDING' },
            include: { user: { select: { id: true, name: true, nickname: true, picture: true, xp: true, level: true } } }
        });
    }

    async respondToJoinRequest(requestId: string, teamLeaderId: string, accept: boolean) {
        const request = await this.prisma.teamJoinRequest.findUnique({
            where: { id: requestId },
            include: { team: true, user: true }
        });

        if (!request) throw new NotFoundException('Request not found');
        if (request.team.ownerId !== teamLeaderId) {
            throw new ForbiddenException('Only team leaders can respond to requests');
        }

        if (accept) {
            const memberCount = await this.prisma.teamMember.count({ where: { teamId: request.teamId } });
            if (memberCount >= request.team.maxMembers) {
                throw new BadRequestException('Team is full');
            }

            await this.prisma.teamMember.create({
                data: { teamId: request.teamId, userId: request.userId }
            });

            await this.prisma.user.update({
                where: { id: request.userId },
                data: { teamId: request.teamId }
            });

            await this.prisma.teamJoinRequest.update({
                where: { id: requestId },
                data: { status: 'ACCEPTED' }
            });

            await this.notificationService.create(
                request.userId,
                'TEAM_JOIN_ACCEPTED',
                'ENLISTMENT CONFIRMED',
                `You have been accepted into House ${request.team.name}.`,
                { teamId: request.teamId }
            );
        } else {
            await this.prisma.teamJoinRequest.update({
                where: { id: requestId },
                data: { status: 'REJECTED' }
            });

            await this.notificationService.create(
                request.userId,
                'TEAM_JOIN_REJECTED',
                'ENLISTMENT DECLINED',
                `Your request to join House ${request.team.name} was declined.`,
                { teamId: request.teamId }
            );
        }

        return { success: true };
    }
}

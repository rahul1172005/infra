import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamOwnerGuard implements CanActivate {
    constructor(private prisma: PrismaService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const teamId = request.params.id || request.body.teamId;

        if (!user) return false;
        if (user.role === 'ADMIN') return true; // Admins can bypass ownership

        if (!teamId) return true; // If no teamId provided, we can't check ownership here; delegate to specific logic

        const team = await this.prisma.team.findUnique({
            where: { id: teamId },
            select: { ownerId: true }
        });

        if (!team) return false;
        
        if (team.ownerId !== user.sub) {
            throw new ForbiddenException('You do not own this team');
        }

        return true;
    }
}

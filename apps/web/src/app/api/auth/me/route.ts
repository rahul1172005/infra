import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from '@/lib/auth-server';

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(req);

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: session.sub || (session as any).email },
            include: {
                currentTeam: true,
                _count: {
                    select: {
                        submissions: true,
                        matchesWon: true,
                        matchParticipations: true
                    }
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Auth check failed:', error);
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const session = await getServerSession(req);

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { name, nickname, picture, house } = body;

        let teamIdToSet = undefined;
        if (house && typeof house === 'string' && house.trim() !== '') {
            const teamNameStr = house.trim().toUpperCase();
            // find or create
            let team = await prisma.team.findUnique({ where: { name: teamNameStr } });
            if (!team) {
                const userId = session.sub;
                team = await prisma.team.create({ data: { name: teamNameStr, ownerId: userId } });
            }
            teamIdToSet = team.id;
        } else if (house === '') {
             // Handle leaving a house if they send empty string
             teamIdToSet = null;
        }

        const updatedUser = await prisma.user.update({
            where: { id: session.sub },
            data: {
                ...(name && { name }),
                ...(nickname !== undefined && { nickname }),
                ...(picture !== undefined && { picture }),
                ...(teamIdToSet !== undefined && { teamId: teamIdToSet })
            },
            include: {
                currentTeam: true,
                _count: {
                    select: {
                        submissions: true,
                        matchesWon: true,
                        matchParticipations: true
                    }
                }
            }
        });

        await prisma.auditLog.create({
            data: {
                userId: session.sub,
                action: 'PROFILE_UPDATE',
                entityType: 'USER',
                entityId: session.sub,
                description: `User ${session.email} updated their profile.`,
                metadata: { updatedFields: Object.keys(body) },
                severity: 'INFO'
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Profile update failed:', error);
        return NextResponse.json({ error: 'Update failed' }, { status: 400 });
    }
}

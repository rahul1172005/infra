import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('Authorization');
        const token = authHeader?.split(' ')[1];

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_zapsters';
        const decoded = jwt.verify(token, jwtSecret) as { sub: string; email: string };

        const user = await prisma.user.findUnique({
            where: { id: decoded.sub || decoded.email }, // Fallback if sub is missing but email exists
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
        const authHeader = req.headers.get('Authorization');
        const token = authHeader?.split(' ')[1];

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_zapsters';
        const decoded = jwt.verify(token, jwtSecret) as { sub: string; email: string };

        const body = await req.json();
        const { name, nickname, picture, house } = body;

        let teamIdToSet = undefined;
        if (house && typeof house === 'string' && house.trim() !== '') {
            const teamNameStr = house.trim().toUpperCase();
            // find or create
            let team = await prisma.team.findUnique({ where: { name: teamNameStr } });
            if (!team) {
                const userId = decoded.sub || decoded.email;
                team = await prisma.team.create({ data: { name: teamNameStr, ownerId: userId } });
            }
            teamIdToSet = team.id;
        } else if (house === '') {
             // Handle leaving a house if they send empty string
             teamIdToSet = null;
        }

        const updatedUser = await prisma.user.update({
            where: { id: decoded.sub || decoded.email },
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

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Profile update failed:', error);
        return NextResponse.json({ error: 'Update failed' }, { status: 400 });
    }
}

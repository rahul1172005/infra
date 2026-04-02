import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function GET() {
    try {
        const teams = await prisma.team.findMany({
            orderBy: {
                score: 'desc'
            },
            include: {
                owner: {
                    select: { id: true, name: true, picture: true }
                },
                _count: {
                    select: { members: true }
                }
            }
        });

        return NextResponse.json(teams);
    } catch (error: any) {
        console.error('Failed to fetch teams:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('Authorization');
    try {
        if (!authHeader) {
            return NextResponse.json({ message: 'Authorization header missing' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return NextResponse.json({ message: 'Token missing' }, { status: 401 });
        }

        const jwtSecret = process.env.JWT_SECRET || 'zapsters_super_secret_jwt';
        let decoded: any;
        
        try {
            decoded = jwt.verify(token, jwtSecret);
        } catch (e) {
            return NextResponse.json({ message: 'Invalid or expired token. Please log in again.' }, { status: 401 });
        }

        const userId = decoded.sub || decoded.userId || decoded.id;
        if (!userId) {
            return NextResponse.json({ message: 'Invalid token payload: user ID not found' }, { status: 401 });
        }

        const body = await req.json();
        const { name, maxMembers } = body;

        // 1. Validation
        if (!name || name.trim().length === 0) {
            return NextResponse.json({ message: 'House name is required' }, { status: 400 });
        }

        const membersLimit = parseInt(maxMembers);
        if (isNaN(membersLimit) || membersLimit <= 0) {
            return NextResponse.json({ message: 'Max members must be greater than 0' }, { status: 400 });
        }

        // 2. Ensure User Exists (Critical after db push --force-reset)
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return NextResponse.json({ message: 'User not found in database. Please log out and log in again.' }, { status: 401 });
        }

        // 3. Check for existing team with same name
        const existingName = await prisma.team.findUnique({ where: { name } });
        if (existingName) {
            return NextResponse.json({ message: 'A house with this name already exists' }, { status: 400 });
        }

        // 4. One team per user check (Task 7 requirement)
        const existingOwned = await prisma.team.findFirst({ where: { ownerId: userId } });
        if (existingOwned) {
            return NextResponse.json({ message: 'You already own a house. Delete it first to create a new one.' }, { status: 400 });
        }

        // 5. Create the team AND add owner as first member (Nested Create)
        const team = await prisma.team.create({
            data: {
                name,
                maxMembers: membersLimit,
                ownerId: userId,
                members: {
                    create: {
                        userId: userId
                    }
                }
            }
        });

        // 6. Update user's active teamId
        await prisma.user.update({
            where: { id: userId },
            data: { teamId: team.id }
        });

        return NextResponse.json({
            success: true,
            team
        });
    } catch (error: any) {
        console.error('Failed to create team:', error);
        return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
    }
}

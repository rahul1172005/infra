import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const [totalUsers, totalTeams, activeQuests, teams] = await Promise.all([
            prisma.user.count(),
            prisma.team.count(),
            prisma.challenge.count(),
            prisma.team.findMany({
                take: 10,
                orderBy: {
                    score: 'desc'
                },
                include: {
                    _count: {
                        select: { members: true }
                    }
                }
            })
        ]);

        return NextResponse.json({
            stats: {
                totalUsers,
                totalTeams,
                activeQuests
            },
            teams
        });
    } catch (error: any) {
        console.error('Failed to fetch stats:', error);
        return NextResponse.json({ 
            error: 'Failed to fetch stats',
            message: error.message 
        }, { status: 500 });
    }
}

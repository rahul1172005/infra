import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const [activeSessions, latestCompletions, onlineCount] = await Promise.all([
            prisma.activeSession.findMany({
                include: {
                    user: { select: { name: true, picture: true, status: true } },
                    team: { select: { name: true } },
                    challenge: { select: { title: true } }
                },
                orderBy: { joinedAt: 'desc' }
            }),
            prisma.challengeCompletion.findMany({
                take: 10,
                include: {
                    team: { select: { name: true } },
                    user: { select: { name: true } },
                    challenge: { select: { title: true } }
                },
                orderBy: { completedAt: 'desc' }
            }),
            prisma.user.count({
                where: {
                    lastActionAt: { gte: new Date(Date.now() - 30 * 60 * 1000) } // 30 minute window
                }
            })
        ]);

        return NextResponse.json({
            activeSessions,
            latestCompletions,
            onlineCount
        });
    } catch (error: any) {
        console.error('Failed to fetch monitoring data:', error);
        return NextResponse.json({ 
            error: 'Failed to fetch monitoring data',
            message: error.message 
        }, { status: 500 });
    }
}

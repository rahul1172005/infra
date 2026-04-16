import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from '@/lib/auth-server';

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(req);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const challengeId = searchParams.get('challengeId');

        if (!challengeId) {
            return NextResponse.json({ error: 'Missing challengeId' }, { status: 400 });
        }

        const attemptCount = await prisma.cheatLog.count({
            where: {
                userId: session.sub,
                challengeId,
                action: 'PROCTOR_VIOLATION',
                severity: 'HIGH'
            }
        });

        return NextResponse.json({ attempts: attemptCount });
    } catch (error) {
        console.error('Proctor Status API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

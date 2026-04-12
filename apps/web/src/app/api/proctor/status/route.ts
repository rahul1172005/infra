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

        const jwtSecret = process.env.JWT_SECRET || 'zapsters_super_secret_jwt';
        const decoded = jwt.verify(token, jwtSecret) as { sub: string; email: string };
        const userId = decoded.sub || decoded.email;

        const { searchParams } = new URL(req.url);
        const challengeId = searchParams.get('challengeId');

        if (!challengeId) {
            return NextResponse.json({ error: 'Missing challengeId' }, { status: 400 });
        }

        const attemptCount = await prisma.cheatLog.count({
            where: {
                userId,
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

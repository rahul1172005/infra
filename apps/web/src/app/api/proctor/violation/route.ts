import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get('Authorization');
        const token = authHeader?.split(' ')[1];

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const jwtSecret = process.env.JWT_SECRET || 'zapsters_super_secret_jwt';
        const decoded = jwt.verify(token, jwtSecret) as { sub: string; email: string };
        const userId = decoded.sub || decoded.email;

        const { challengeId, type, snapshot } = await req.json();

        if (!challengeId || !type) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Store the violation as a CheatLog
        const violation = await prisma.cheatLog.create({
            data: {
                userId,
                challengeId,
                action: 'PROCTOR_VIOLATION',
                details: JSON.stringify({ type, snapshot, timestamp: new Date().toISOString() }),
                severity: 'HIGH' 
            }
        });

        // Count how many unresolved violations this user has for this challenge
        const attemptCount = await prisma.cheatLog.count({
            where: {
                userId,
                challengeId,
                action: 'PROCTOR_VIOLATION',
                severity: 'HIGH'
            }
        });

        return NextResponse.json({ success: true, attempts: attemptCount, violation });
    } catch (error) {
        console.error('Proctor Violation API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

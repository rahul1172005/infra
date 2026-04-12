import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('Authorization');
        const token = authHeader?.split(' ')[1];

        if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const jwtSecret = process.env.JWT_SECRET || 'zapsters_super_secret_jwt';
        const decoded = jwt.verify(token, jwtSecret) as { sub: string; email: string };
        const userId = decoded.sub || decoded.email;

        // Note: Prisma might crash here on some setups if the ID is malformed, but this matches the standard auth schema.
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user || user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const rawLogs = await prisma.cheatLog.findMany({
            where: {
                action: 'PROCTOR_VIOLATION',
                severity: 'HIGH'
            },
            include: {
                user: {
                    select: { name: true, picture: true }
                }
            },
            orderBy: { createdAt: 'desc' },
        });

        const groups: Record<string, any> = {};

        for (const log of rawLogs) {
            const key = log.userId + '_' + log.challengeId;
            if (!groups[key]) {
                const details = log.details ? JSON.parse(log.details) : {};
                groups[key] = {
                    id: log.id,
                    userId: log.userId,
                    challengeId: log.challengeId,
                    user: { name: log.user.name, pic: log.user.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${log.userId}` },
                    challenge: log.challengeId || 'UNKNOWN TIER',
                    type: details.type || 'NO_FACE',
                    timestamp: new Date(log.createdAt).toLocaleTimeString(),
                    snapshot: details.snapshot || 'https://via.placeholder.com/400x200?text=No+Snapshot',
                    attempts: 0,
                    locked: false
                };
            }
            groups[key].attempts += 1;
        }

        const violations = Object.values(groups).map((v: any) => ({
            ...v,
            locked: v.attempts >= 7
        }));

        return NextResponse.json({ violations });
    } catch (error) {
        console.error('Admin Proctor GET Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get('Authorization');
        const token = authHeader?.split(' ')[1];

        if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const jwtSecret = process.env.JWT_SECRET || 'zapsters_super_secret_jwt';
        const decoded = jwt.verify(token, jwtSecret) as { sub: string; email: string };
        const adminUserId = decoded.sub || decoded.email;

        const adminUser = await prisma.user.findUnique({ where: { id: adminUserId } });

        if (!adminUser || adminUser.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const { action, userId, challengeId, removeCount } = await req.json();

        if (action === 'UNLOCK') {
            await prisma.cheatLog.updateMany({
                where: {
                    userId,
                    challengeId,
                    action: 'PROCTOR_VIOLATION',
                    severity: 'HIGH'
                },
                data: {
                    severity: 'RESOLVED'
                }
            });
        } else if (action === 'GRANT_ATTEMPTS' && removeCount) {
            const logsToResolve = await prisma.cheatLog.findMany({
                where: {
                    userId,
                    challengeId,
                    action: 'PROCTOR_VIOLATION',
                    severity: 'HIGH'
                },
                orderBy: { createdAt: 'desc' },
                take: removeCount
            });

            const ids = logsToResolve.map((l: any) => l.id);
            await prisma.cheatLog.updateMany({
                where: { id: { in: ids } },
                data: { severity: 'RESOLVED' }
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Admin Proctor POST Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

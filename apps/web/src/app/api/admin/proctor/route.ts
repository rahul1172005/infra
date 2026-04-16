import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession, auditAction } from '@/lib/auth-server';

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(req);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const user = await prisma.user.findUnique({ where: { id: session.sub } });
        if (!user || user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const rawLogs = await prisma.cheatLog.findMany({
            where: { action: 'PROCTOR_VIOLATION', severity: 'HIGH' },
            include: { user: { select: { name: true, picture: true } } },
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
        const session = await getServerSession(req);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const adminUser = await prisma.user.findUnique({ where: { id: session.sub } });
        if (!adminUser || adminUser.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const { action, userId, challengeId, removeCount } = await req.json();

        if (action === 'UNLOCK') {
            await prisma.cheatLog.updateMany({
                where: { userId, challengeId, action: 'PROCTOR_VIOLATION', severity: 'HIGH' },
                data: { severity: 'RESOLVED' }
            });

            await auditAction({
                userId: session.sub,
                action: 'PROCTOR_UNLOCK',
                entityType: 'USER',
                entityId: userId,
                description: `Admin ${session.email} unlocked proctoring for user ${userId} on challenge ${challengeId}`,
                severity: 'WARNING'
            });
        } else if (action === 'GRANT_ATTEMPTS' && removeCount) {
            const logsToResolve = await prisma.cheatLog.findMany({
                where: { userId, challengeId, action: 'PROCTOR_VIOLATION', severity: 'HIGH' },
                orderBy: { createdAt: 'desc' },
                take: removeCount
            });

            const ids = logsToResolve.map((l: any) => l.id);
            await prisma.cheatLog.updateMany({
                where: { id: { in: ids } },
                data: { severity: 'RESOLVED' }
            });

            await auditAction({
                userId: session.sub,
                action: 'PROCTOR_GRANT_ATTEMPTS',
                entityType: 'USER',
                entityId: userId,
                description: `Admin ${session.email} granted ${removeCount} attempts back to user ${userId} on challenge ${challengeId}`,
                metadata: { removeCount },
                severity: 'WARNING'
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Admin Proctor POST Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

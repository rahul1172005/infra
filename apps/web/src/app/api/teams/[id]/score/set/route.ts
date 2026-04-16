import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { score } = await req.json();
    const authHeader = req.headers.get('Authorization');

    try {
        if (!authHeader) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) throw new Error('JWT_SECRET not configured');
        
        const decoded: any = jwt.verify(token, jwtSecret);

        if (decoded.role !== 'ADMIN') {
            return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
        }

        const oldTeam = await prisma.team.findUnique({ where: { id } });
        const updated = await prisma.team.update({
            where: { id },
            data: { score: parseInt(score) || 0 }
        });

        await prisma.auditLog.create({
            data: {
                userId: decoded.sub,
                action: 'TEAM_SCORE_SET',
                entityType: 'TEAM',
                entityId: id,
                description: `Admin ${decoded.email} set score for team ${updated.name} from ${oldTeam?.score} to ${updated.score}`,
                metadata: { oldScore: oldTeam?.score, newScore: updated.score },
                severity: 'INFO'
            }
        });

        return NextResponse.json(updated);
    } catch (error: any) {
        console.error('Failed to set score:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

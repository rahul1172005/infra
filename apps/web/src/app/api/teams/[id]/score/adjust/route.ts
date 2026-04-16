import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession, auditAction } from '@/lib/auth-server';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        const session = await getServerSession(req);
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        if (session.role !== 'ADMIN') {
            return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
        }

        const { amount } = await req.json();

        const team = await prisma.team.findUnique({ where: { id } });
        if (!team) return NextResponse.json({ message: 'Team not found' }, { status: 404 });

        const newScore = (team.score || 0) + (parseInt(amount) || 0);
        const updated = await prisma.team.update({
            where: { id },
            data: { score: newScore }
        });

        await auditAction({
            userId: session.sub,
            action: 'TEAM_SCORE_ADJUST',
            entityType: 'TEAM',
            entityId: id,
            description: `Admin ${session.email} adjusted score for team "${team.name}" by ${amount} → new score: ${newScore}`,
            metadata: { oldScore: team.score, adjustment: parseInt(amount), newScore },
            severity: 'INFO'
        });

        return NextResponse.json(updated);
    } catch (error: any) {
        console.error('Failed to adjust score:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

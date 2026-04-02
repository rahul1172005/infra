import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { amount } = await req.json();
    const authHeader = req.headers.get('Authorization');

    try {
        if (!authHeader) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const jwtSecret = process.env.JWT_SECRET || 'zapsters_super_secret_jwt';
        const decoded: any = jwt.verify(token, jwtSecret);

        if (decoded.role !== 'ADMIN') {
            return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
        }

        const team = await prisma.team.findUnique({ where: { id } });
        if (!team) return NextResponse.json({ message: 'Team not found' }, { status: 404 });

        const updated = await prisma.team.update({
            where: { id },
            data: { score: (team.score || 0) + (parseInt(amount) || 0) }
        });

        return NextResponse.json(updated);
    } catch (error: any) {
        console.error('Failed to adjust score:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

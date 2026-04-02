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
        const jwtSecret = process.env.JWT_SECRET || 'zapsters_super_secret_jwt';
        const decoded: any = jwt.verify(token, jwtSecret);

        if (decoded.role !== 'ADMIN') {
            return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
        }

        const updated = await prisma.team.update({
            where: { id },
            data: { score: parseInt(score) || 0 }
        });

        return NextResponse.json(updated);
    } catch (error: any) {
        console.error('Failed to set score:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

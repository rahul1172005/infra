import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

export interface AuthSession {
    sub: string;
    email: string;
    role: string;
}

export async function getServerSession(req: NextRequest): Promise<AuthSession | null> {
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) return null;

    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error('CRITICAL: JWT_SECRET not configured');
            return null;
        }

        const decoded = jwt.verify(token, jwtSecret) as AuthSession;
        return decoded;
    } catch (error) {
        console.error('JWT Verification failed:', error);
        return null;
    }
}

export async function auditAction(data: {
    userId?: string;
    action: string;
    entityType?: string;
    entityId?: string;
    description: string;
    metadata?: any;
    severity?: 'INFO' | 'WARNING' | 'CRITICAL';
}) {
    return prisma.auditLog.create({
        data: {
            ...data,
            metadata: data.metadata || {},
            severity: data.severity || 'INFO',
        }
    }).catch(err => console.error('Audit Logging failed:', err));
}

import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const { email, password, name } = await req.json();

        if (!email || !password || !name) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        const hashedPassword = await hash(password, 10);
        
        // Deterministic roles for admins
        const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
        const role = adminEmails.includes(email.toLowerCase()) ? 'ADMIN' : 'PLAYER';

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: role as any,
                xp: 0,
                level: 1,
                mmr: 1000
            }
        });

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) throw new Error('JWT_SECRET is not configured');
        const sessionToken = jwt.sign(
            { sub: user.id, email: user.email, role: user.role },
            jwtSecret,
            { expiresIn: '7d' }
        );

        const isProd = process.env.NODE_ENV === 'production';
        const cookie = serialize('session', sessionToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: 'lax',
            path: '/',
            maxAge: 7 * 24 * 60 * 60,
        });

        const res = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            access_token: sessionToken
        });

        res.headers.append('Set-Cookie', cookie);
        return res;

    } catch (err: any) {
        console.error('Registration API error:', err);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

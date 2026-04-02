import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || !user.password) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_zapsters';
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
                role: user.role,
                picture: user.picture
            },
            access_token: sessionToken
        });

        res.headers.append('Set-Cookie', cookie);
        return res;

    } catch (err: any) {
        console.error('Login API error:', err);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

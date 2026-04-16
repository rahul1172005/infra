import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { prisma } from '@/lib/prisma';
import { auditAction } from '@/lib/auth-server';

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(req: NextRequest) {
    console.log('--- AUTH: GOOGLE LOGIN INITIATED ---');
    try {
        const { token } = await req.json();

        if (!token) {
            console.error('ERROR: No token provided in body');
            return NextResponse.json({
                success: false,
                error: 'TOKEN_MISSING',
                message: 'Google token is required'
            }, { status: 400 });
        }

        console.log('DEBUG: Received Google token, starting verification...');

        let payload: any;
        try {
            // First attempt: ID Token verification
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            });
            payload = ticket.getPayload();
            console.log('DEBUG: Google ID Token verified successfully for:', payload?.email);
        } catch (idError) {
            console.warn('WARN: ID Token verification failed, attempting Access Token fallback...', idError);
            
            // Fallback: Use userinfo endpoint (common for access_tokens provided by @react-oauth/google)
            console.log('DEBUG: Attempting to fetch userinfo from Google with access token...');
            const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
            const responseText = await response.text();
            console.log('DEBUG: Google UserInfo Raw Response:', response.status, responseText);
            
            if (!response.ok) {
                console.error('ERROR: Google Access Token verification failed with status:', response.status);
                throw new Error(`Google token verification failed: ${responseText}`);
            }
            
            payload = JSON.parse(responseText);
            console.log('DEBUG: Google Access Token verified manually via UserInfo endpoint for:', payload?.email, 'full payload:', JSON.stringify(payload));
        }

        if (!payload || !payload.email || !payload.sub) {
            console.error('ERROR: Could not extract user info from Google payload. Payload:', JSON.stringify(payload));
            return NextResponse.json({
                success: false,
                error: 'TOKEN_INVALID',
                message: 'Invalid Google token response: Missing sub or email'
            }, { status: 401 });
        }

        const { email, name, sub: googleId, picture } = payload;


        // Determine deterministic roles for admins matching the register route
        const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
        const computedRole = adminEmails.includes(email.toLowerCase()) ? 'ADMIN' : 'PLAYER';

        // Requirement 5 & 10: PostgreSQL User Upsert via Prisma
        console.log(`DEBUG: Executing PostgreSQL Upsert for user: ${email}`);
        const user = await prisma.user.upsert({
            where: { email },
            update: {
                googleId,
                picture,
                lastActionAt: new Date(),
            },
            create: {
                email,
                name: name || email.split('@')[0],
                googleId,
                picture,
                role: computedRole === 'ADMIN' ? 'ADMIN' : 'PLAYER',
                xp: 0,
                level: 1,
                mmr: 1000,
            },
        });

        console.log('DEBUG: MySQL User persistence successful, ID:', user.id);

        // Requirement 8: Session Handling via httpOnly Cookie
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) throw new Error('JWT_SECRET is not configured');
        const sessionToken = jwt.sign(
            { sub: user.id, email: user.email, role: user.role },
            jwtSecret,
            { expiresIn: '7d' }
        );

        // Requirement 11: Production-ready cookie settings
        const isProd = process.env.NODE_ENV === 'production';
        const cookie = serialize('session', sessionToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: 'lax',
            path: '/',
            maxAge: 7 * 24 * 60 * 60, // 7 days
        });

        console.log('SUCCESS: Google login complete. Redirecting client.');

        const res = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                picture: user.picture,
                role: user.role
            },
            access_token: sessionToken // Also return for non-cookie fallback clients
        });

        await auditAction({
            userId: user.id,
            action: 'GOOGLE_LOGIN',
            entityType: 'USER',
            entityId: user.id,
            description: `User ${user.email} logged in via Google OAuth`,
        });

        res.headers.append('Set-Cookie', cookie);
        return res;

    } catch (err: any) {
        console.error('CRITICAL: Server Error in Google Auth API:', err);
        return NextResponse.json({
            success: false,
            error: 'INTERNAL_ERROR',
            message: err.message || 'An unexpected error occurred during authentication'
        }, { status: 500 });
    }
}

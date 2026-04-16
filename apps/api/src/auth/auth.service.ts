import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { OAuth2Client } from 'google-auth-library';
import { UserRole } from '@zapsters/database';
import { compare, hash } from 'bcrypt';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class AuthService {
    private googleClient: OAuth2Client;

    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService,
        private audit: AuditService
    ) {
        this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    }

    private getRoleForEmail(email: string): UserRole {
        const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
        return adminEmails.includes(email.toLowerCase()) ? UserRole.ADMIN : UserRole.PLAYER;
    }

    async login(user: any, ip?: string, userAgent?: string) {
        if (!user.isActive) {
            throw new UnauthorizedException('Account is inactive. Please contact support.');
        }

        if (user.role === UserRole.ADMIN && user.allowedIps?.length > 0 && ip) {
            if (!user.allowedIps.includes(ip)) {
                await this.audit.log({
                    userId: user.id,
                    action: 'LOGIN_FAILURE',
                    description: `Admin login attempt from unauthorized IP: ${ip}`,
                    severity: 'CRITICAL',
                    ipAddress: ip,
                    userAgent
                });
                throw new UnauthorizedException('Login restricted from this IP address.');
            }
        }

        await this.prisma.user.update({
            where: { id: user.id },
            data: { 
                lastLoginAt: new Date(),
                failedLoginAttempts: 0,
                lockedUntil: null
            }
        });

        await this.audit.log({
            userId: user.id,
            action: 'USER_LOGIN',
            description: `User logged in successfully: ${user.email}`,
            ipAddress: ip,
            userAgent
        });

        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                nickname: user.nickname,
                fullName: user.fullName,
                house: user.house,
                picture: user.picture,
                teamId: user.teamId,
                role: user.role,
                xp: user.xp,
                level: user.level,
                mmr: user.mmr
            }
        };
    }

    async googleLogin(token: string) {
        try {
            let email: string | undefined;
            let googleId: string | undefined;
            let name: string | undefined;
            let picture: string | undefined;

            // Try to verify as ID Token first
            try {
                const ticket = await this.googleClient.verifyIdToken({
                    idToken: token,
                    audience: process.env.GOOGLE_CLIENT_ID,
                });
                const payload = ticket.getPayload();
                if (payload) {
                    email = payload.email;
                    googleId = payload.sub;
                    name = payload.name;
                    picture = payload.picture;
                }
            } catch (idTokenError) {
                // If ID Token verification fails, try as Access Token
                const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
                const payload = await response.json();
                if (payload && !payload.error) {
                    email = payload.email;
                    googleId = payload.sub;
                    name = payload.name;
                    picture = payload.picture;
                } else {
                    throw new UnauthorizedException('Invalid Google token');
                }
            }

            if (!email) throw new UnauthorizedException('Could not retrieve email from Google');

            let user = await this.prisma.user.findUnique({
                where: { email },
            });

            const targetRole = this.getRoleForEmail(email);

            if (!user) {
                user = await this.prisma.user.create({
                    data: {
                        email: email,
                        name: name || email.split('@')[0],
                        googleId,
                        picture,
                        role: targetRole,
                        xp: 0,
                        level: 1,
                        mmr: 1000
                    },
                });
            } else {
                // Keep role synced if in list or if user is admin
                const data: any = { googleId, picture };
                if (targetRole === UserRole.ADMIN && user.role !== UserRole.ADMIN) {
                    data.role = UserRole.ADMIN;
                }
                user = await this.prisma.user.update({
                    where: { email },
                    data,
                });
            }

            return this.login(user, undefined, 'Google OAuth');
        } catch (error) {
            console.error('Google Auth Error:', error);
            throw new UnauthorizedException('Google authentication failed');
        }
    }

    async loginWithCredentials(email: string, pass: string, ip?: string, userAgent?: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user || !user.password) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (user.lockedUntil && user.lockedUntil > new Date()) {
            throw new UnauthorizedException(`Account is locked until ${user.lockedUntil.toISOString()}`);
        }

        const isMatch = await compare(pass, user.password);
        if (!isMatch) {
            const failedAttempts = user.failedLoginAttempts + 1;
            const data: any = { failedLoginAttempts: failedAttempts };
            
            if (failedAttempts >= 5) {
                data.lockedUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 min lock
                await this.audit.log({
                    userId: user.id,
                    action: 'ACCOUNT_LOCKED',
                    description: `Account locked due to multiple failed login attempts.`,
                    severity: 'WARNING',
                    ipAddress: ip,
                    userAgent
                });
            }

            await this.prisma.user.update({
                where: { id: user.id },
                data
            });

            await this.audit.log({
                userId: user.id,
                action: 'LOGIN_FAILURE',
                description: `Failed login attempt for ${email}`,
                severity: 'WARNING',
                ipAddress: ip,
                userAgent
            });

            throw new UnauthorizedException('Invalid credentials');
        }

        return this.login(user, ip, userAgent);
    }

    async register(email: string, pass: string, name: string) {
        const existing = await this.prisma.user.findUnique({ where: { email } });
        if (existing) throw new BadRequestException('User already exists');

        const hashedPassword = await hash(pass, 10);
        const targetRole = this.getRoleForEmail(email);

        const user = await this.prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: targetRole,
                xp: 0,
                level: 1,
                mmr: 1000
            }
        });

        return this.login(user);
    }

    async getUserProfile(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                teamOwned: true,
                teamMemberships: {
                    include: {
                        team: true
                    }
                },
                _count: {
                    select: {
                        matchParticipations: true,
                        matchesWon: true,
                        submissions: true
                    }
                }
            }
        });
        if (!user) throw new UnauthorizedException('User not found');
        return user;
    }

    async updateProfile(userId: string, data: { name?: string; nickname?: string; fullName?: string; house?: string; picture?: string }) {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: {
                name: data.name,
                nickname: data.nickname,
                fullName: data.fullName,
                house: data.house,
                picture: data.picture,
                teamId: (data as any).teamId
            } as any,
            include: {
                teamOwned: true,
                teamMemberships: {
                    include: {
                        team: true
                    }
                },
                _count: {
                    select: {
                        matchParticipations: true,
                        matchesWon: true,
                        submissions: true
                    }
                }
            }
        });
        return user;
    }
}

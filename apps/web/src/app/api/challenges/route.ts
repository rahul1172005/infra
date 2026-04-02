import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const [challenges, totalUsers, totalSubmissions] = await Promise.all([
            prisma.challenge.findMany({
                where: { isActive: true },
                include: {
                    contest: {
                        select: {
                            title: true,
                            tag: true
                        }
                    },
                    _count: {
                        select: {
                            submissions: true
                        }
                    }
                }
            }),
            prisma.user.count(),
            prisma.submission.count()
        ]);

        return NextResponse.json({
            challenges,
            stats: {
                trialsCompleted: totalSubmissions,
                successRate: totalUsers > 0 ? `${((totalSubmissions / totalUsers) * 100).toFixed(1)}%` : "0%",
                globalRank: "TOP 5%", // Dynamic logic can be added later
                totalXp: "48,200" // Placeholder mapping
            }
        });
    } catch (error: any) {
        console.error('Failed to fetch challenges:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

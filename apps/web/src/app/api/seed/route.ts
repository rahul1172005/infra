import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        console.log('--- SEEDING SYSTEM: CORE INFR — START ---');
        
        // 1. Create Core Teams (Houses)
        const houses = [
            { name: 'TARGARYEN', score: 24500 },
            { name: 'STARK', score: 18200 },
            { name: 'LANNISTER', score: 15600 },
            { name: 'BARATHEON', score: 12400 },
            { name: 'GREYJOY', score: 9800 }
        ];

        for (const house of houses) {
            console.log(`DEBUG: Upserting team: ${house.name}`);
            await prisma.team.upsert({
                where: { name: house.name },
                update: { score: house.score },
                create: { name: house.name, score: house.score }
            });
        }

        // 2. Create Global Contest
        const contest = await prisma.contest.upsert({
            where: { id: 'GLOBAL_SEASON_1' },
            update: { isLive: true },
            create: {
                id: 'GLOBAL_SEASON_1',
                title: 'ROYAL DEPLOYMENT: SEASON 1',
                domain: 'GLOBAL',
                startTime: new Date(),
                endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
                isLive: true,
                tag: 'ELITE ARENA',
                description: 'The first major battle for the Iron Throne of Infrastructure.'
            }
        });

        // 3. Create Key Challenges (from the UI list)
        const challenges = [
            { 
                id: 'ai-quiz', 
                title: 'AI QUIZ', 
                description: 'Neural Network Architectures and ML Ethics.', 
                category: 'AI', 
                difficulty: 'HARD', 
                icon: 'wolf', 
                maxScore: 1000 
            },
            { 
                id: 'coding-challenge', 
                title: 'CODING CHALLENGE', 
                description: 'Algorithmic trials in high-performance environments.', 
                category: 'CODING', 
                difficulty: 'EXTREME', 
                icon: 'dragon', 
                maxScore: 2500 
            },
            { 
                id: 'ui-ux', 
                title: 'UI/UX DESIGN', 
                description: 'Crafting premium interactive experiences.', 
                category: 'UIUX', 
                difficulty: 'MEDIUM', 
                icon: 'rose', 
                maxScore: 800 
            },
            { 
                id: 'cybersecurity', 
                title: 'CYBERSECURITY', 
                description: 'Penetration testing and exploit research.', 
                category: 'CYBER', 
                difficulty: 'EXTREME', 
                icon: 'kraken', 
                maxScore: 3000 
            }
        ];

        for (const ch of challenges) {
            await prisma.challenge.upsert({
                where: { id: ch.id },
                update: { ...ch, contestId: contest.id },
                create: { ...ch, contestId: contest.id }
            });
        }

        console.log('--- SEEDING SYSTEM: COMPLETE — NEON SYNCED ---');
        return NextResponse.json({ success: true, message: 'Infrastructure initialized successfully.' });
    } catch (error: any) {
        console.error('CRITICAL: Seeding failed:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const email = "test@gmail.com";
  const name = "Test User";
  const googleId = "1234567890";
  const picture = "http://example.com/pic.png";
  const computedRole = "PLAYER";

  console.log("Upserting user...");
  const user = await prisma.user.upsert({
            where: { email },
            update: {
                googleId,
                picture,
                lastActionAt: new Date(),
            },
            create: {
                email,
                name,
                googleId,
                picture,
                role: computedRole === 'ADMIN' ? 'ADMIN' : 'PLAYER',
                xp: 0,
                level: 1,
                mmr: 1000,
            },
        });
  console.log("User upserted!", user);
}
main().catch(console.error).finally(() => prisma.$disconnect());

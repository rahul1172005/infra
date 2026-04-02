const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('Zapsters1169@', 10);
    const user = await prisma.user.upsert({
        where: { email: 'Zapsters123@' },
        update: { password: hashedPassword, role: 'ADMIN' },
        create: { 
            email: 'Zapsters123@', 
            name: 'ZAPSTERS ADMIN', 
            password: hashedPassword, 
            role: 'ADMIN', 
            xp: 9999, 
            level: 99, 
            mmr: 9999 
        }
    });
    console.log('Admin user successfully injected:', user.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

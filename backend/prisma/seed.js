import { PrismaClient } from '@prisma/client'
import 'dotenv/config';

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // Example: Create an admin user
    await prisma.user.create({
        data: {
            email: 'admin@example.com',
            password: 'securepassword', // Hash passwords in real applications
            fullName: 'Admin User',
            isVerified: true,
            role: 'ADMIN',
        },
    })

    // Example: Create additional users
    await prisma.user.createMany({
        data: [
            {
                email: 'user1@example.com',
                password: 'password1',
                fullName: 'User One',
                isVerified: true,
                role: 'USER',
            },
            {
                email: 'user2@example.com',
                password: 'password2',
                fullName: 'User Two',
                isVerified: false,
                role: 'USER',
            },
        ],
    })

    console.log('Database seeded successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

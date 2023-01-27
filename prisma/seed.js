const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'admin',
      password: '$2b$10$XJLRZ8HtxnvtYZQoUNEdpuEQ7CDEzl5ks3LbZ0y3JqM7lDolcZ1wW', //'password'
      role: 'EMPLOYER',
      },
    },
  )
  const example_user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'example_user',
      password: '$2b$10$XJLRZ8HtxnvtYZQoUNEdpuEQ7CDEzl5ks3LbZ0y3JqM7lDolcZ1wW' //'password'
     },
  })
  console.log({ admin, example_user })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

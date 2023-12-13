import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

const saltRounds = Number(process.env.SALT);
const seed = {
  users: [
    {
      username: 'zezinho',
      password: '1234',
    },
    {
      username: 'guiguinha',
      password: '123456',
    },
  ],
};

async function main() {
  for (const user of seed.users) {
    const hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash;
    await prisma.user.create({ data: user });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
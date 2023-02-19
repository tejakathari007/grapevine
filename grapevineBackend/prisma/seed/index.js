const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

const Users = require('../data/users');

async function runSeeders() {
  // Users
  await Promise.all(
    Users.map(async (user) => {
      const data = await prisma.login.findFirst({
        where: {
          email: user.email,
        },
      });
      console.log(data, 'data', user.fname);
      if (!data) {
        return await prisma.login.create({
          data: {
            uuid: uuidv4(),
            email: user.email,
            password: user.password,
            user: {
              create: {
                uuid: uuidv4(),
                dob: '1997-07-16T19:20:30.451Z',
                username: user.username,
                fname: user.fname,
                lname: user.lname,
                intrests: user.intrests,
                engagement_type: user.account_type,
              },
            },
          },
        });
      }
    })
  );
  await Promise.all(
    Users.map(async (user) => {
      const data = await prisma.login.findFirst({
        where: {
          email: user.email,
        },
      });
      console.log(data, 'data', user.fname);
      if (!data) {
        return await prisma.userprofile.create({
          username: user.username,
          fname: user.fname,
          lname: user.lname,
          intrests: user.intrests,
          account_type: user.account_type,
        });
      }
    })
  );
}

runSeeders()
  .catch((e) => {
    console.error(`There was an error while seeding: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Successfully seeded database. Closing connection.');
    await prisma.$disconnect();
  });

const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

const Branddata = [
  {
    uuid: '596cfdfa-33a1-4966-99bf-88b14f6fdda7',
    name: 'Agency',
  },
  {
    uuid: '8e4fcef0-976a-4160-82cd-5a1ff847d315',
    name: 'Apparel & Clothing',
  },
  {
    uuid: 'd9127adc-b6b9-4a55-9880-fdf4710d8bff',
    name: 'Accessories',
  },
  {
    uuid: 'e33efc5b-a0bc-424e-bd12-3ee6164414e3',
    name: 'Beauty & Cosmetics',
  },
  {
    uuid: '1930eff9-bf79-449a-a624-021abfaf5b17',
    name: 'Fashion',
  },
  { uuid: '5e9690c4-a48c-4fca-8ddb-8902dce982fe', name: 'Food & Beverage' },
  { uuid: 'cffa11d8-4181-44c2-9bea-16bf1191e90c', name: 'Lifestyle' },
  { uuid: '03d76aee-2a8f-4d7d-b65a-e790595ab09f', name: 'Sport & Fitness' },
  { uuid: '849936a2-5faf-4887-b8be-d1fc9c9ec1e3', name: 'Wellbeing' },
];

const CreatorData = [
  {
    uuid: '596cfdfa-33a1-4966-99bf-88b14f6fdda7',
    name: 'Actor/Actress',
  },
  {
    uuid: '8e4fcef0-976a-4160-82cd-5a1ff847d315',
    name: 'Artist',
  },
  {
    uuid: 'd9127adc-b6b9-4a55-9880-fdf4710d8bff',
    name: 'Band',
  },
  {
    uuid: 'e33efc5b-a0bc-424e-bd12-3ee6164414e3',
    name: 'Blogger',
  },
  {
    uuid: '1930eff9-bf79-449a-a624-021abfaf5b17',
    name: 'Content Creator',
  },
  { uuid: '5e9690c4-a48c-4fca-8ddb-8902dce982fe', name: 'Comedian' },
  {
    uuid: 'cffa11d8-4181-44c2-9bea-16bf1191e90c',
    name: 'Creative',
  },
  {
    uuid: '03d76aee-2a8f-4d7d-b65a-e790595ab09f',
    name: 'Designer',
  },
];

async function runSeeders() {
  // Users
  await Promise.all(
    Branddata.map(async (desc) =>
      prisma.brandDescription.upsert({
        where: { uuid: desc.uuid },
        update: {},
        create: desc,
      })
    ),
    CreatorData.map(async (creator) =>
      prisma.describesYou.upsert({
        where: { uuid: creator.uuid },
        update: {},
        create: creator,
      })
    )
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

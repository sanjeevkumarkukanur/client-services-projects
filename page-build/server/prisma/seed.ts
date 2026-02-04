import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
  log: ['error', 'warn'],
});

async function main() {
  console.log('🌱 Seeding master data...');

  // Clear old data (DEV only)
  await prisma.field.deleteMany();
  await prisma.section.deleteMany();
  await prisma.page.deleteMany();

  // 1️⃣ Create Page
  const page = await prisma.page.create({
    data: {
      key: 'registration',
      name: 'Registration',
      description: 'User registration page',
    },
  });

  // 2️⃣ Create Sections
  const personalSection = await prisma.section.create({
    data: {
      pageId: page.id,
      key: 'personal_info',
      title: 'Personal Info',
      order: 1,
      layoutJson: { columns: 2, gap: 16 },
      stylesJson: { padding: '16px' },
    },
  });

  const accountSection = await prisma.section.create({
    data: {
      pageId: page.id,
      key: 'account_info',
      title: 'Account Info',
      order: 2,
      layoutJson: { columns: 1, gap: 12 },
      stylesJson: { padding: '16px', background: '#f5f5f5' },
    },
  });

  // 3️⃣ Create Fields
  await prisma.field.create({
    data: {
      sectionId: personalSection.id,
      key: 'first_name',
      label: 'First Name',
      type: 'text',
      order: 1,
      uiJson: { placeholder: 'First name' },
      stylesJson: { width: '100%' },
      validationJson: { required: true, minLength: 2 },
    },
  });

  await prisma.field.create({
    data: {
      sectionId: personalSection.id,
      key: 'last_name',
      label: 'Last Name',
      type: 'text',
      order: 2,
      uiJson: { placeholder: 'Last name' },
      stylesJson: { width: '100%' },
      validationJson: { required: true },
    },
  });

  await prisma.field.create({
    data: {
      sectionId: accountSection.id,
      key: 'email',
      label: 'Email',
      type: 'email',
      order: 1,
      uiJson: { placeholder: 'Enter email' },
      stylesJson: { width: '100%' },
      validationJson: { required: true, format: 'email' },
    },
  });

  await prisma.field.create({
    data: {
      sectionId: accountSection.id,
      key: 'password',
      label: 'Password',
      type: 'password',
      order: 2,
      uiJson: { placeholder: 'Enter password' },
      stylesJson: { width: '100%' },
      validationJson: { required: true, minLength: 8 },
    },
  });

  console.log('🌱 Seeding completed');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

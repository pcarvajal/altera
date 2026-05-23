import dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });

import { DataSource } from 'typeorm';

const ds = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
  database: process.env.DATABASE_NAME ?? 'cobros',
  username: process.env.DATABASE_USER ?? 'cobros',
  password: process.env.DATABASE_PASSWORD ?? 'cobros_dev',
  synchronize: false,
  logging: false
});

async function clean() {
  await ds.initialize();

  await ds.query('TRUNCATE TABLE charges, clients, users RESTART IDENTITY CASCADE');
  console.log('Clean database (charges, clients, users)');

  await ds.destroy();
}

clean().catch((err) => {
  console.error(err);
  process.exit(1);
});

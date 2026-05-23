import dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });

import { randomUUID } from 'crypto';
import { DataSource } from 'typeorm';
import bcrypt from 'bcrypt';

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

// ── Users ────────────────────────────────────────────────────────────────────

const USERS = [
  { id: randomUUID(), name: 'Admin',    email: 'admin@altera.cl',    plainPassword: 'admin',    role: 'ADMIN' },
  { id: randomUUID(), name: 'Operator', email: 'operator@altera.cl', plainPassword: 'operator', role: 'OPERATOR' }
];

// ── Clients ──────────────────────────────────────────────────────────────────

const CLIENT_A = randomUUID();
const CLIENT_B = randomUUID();

const CLIENTS = [
  { id: CLIENT_A, name: 'Empresa Constructora Norte S.A.' },
  { id: CLIENT_B, name: 'Comercial del Sur Ltda.' }
];

// ── Charges ──────────────────────────────────────────────────────────────────

function daysAgo(n: number): Date {
  const d = new Date('2026-05-23');
  d.setDate(d.getDate() - n);
  return d;
}

type ChargeRow = {
  id: string;
  reference: string;
  clientId: string;
  generationDate: Date;
  amount: number;
  state: string;
  rejectDetails: string;
  createdAt: Date;
  updatedAt: Date;
};

const CHARGES: ChargeRow[] = [
  // Cliente A — 15 cobros
  { id: randomUUID(), reference: 'REF-A-001', clientId: CLIENT_A, generationDate: daysAgo(170), amount: 1250000, state: 'CONFIRMED', rejectDetails: '',                              createdAt: daysAgo(170), updatedAt: daysAgo(155) },
  { id: randomUUID(), reference: 'REF-A-002', clientId: CLIENT_A, generationDate: daysAgo(155), amount:  380000, state: 'CONFIRMED', rejectDetails: '',                              createdAt: daysAgo(155), updatedAt: daysAgo(140) },
  { id: randomUUID(), reference: 'REF-A-003', clientId: CLIENT_A, generationDate: daysAgo(140), amount: 2100000, state: 'REJECTED',  rejectDetails: 'Documento tributario inválido', createdAt: daysAgo(140), updatedAt: daysAgo(130) },
  { id: randomUUID(), reference: 'REF-A-004', clientId: CLIENT_A, generationDate: daysAgo(120), amount:  750000, state: 'CONFIRMED', rejectDetails: '',                              createdAt: daysAgo(120), updatedAt: daysAgo(108) },
  { id: randomUUID(), reference: 'REF-A-005', clientId: CLIENT_A, generationDate: daysAgo(110), amount:  490000, state: 'REJECTED',  rejectDetails: 'RUT del receptor no coincide',  createdAt: daysAgo(110), updatedAt: daysAgo(100) },
  { id: randomUUID(), reference: 'REF-A-006', clientId: CLIENT_A, generationDate: daysAgo(95),  amount: 3200000, state: 'CONFIRMED', rejectDetails: '',                              createdAt: daysAgo(95),  updatedAt: daysAgo(80)  },
  { id: randomUUID(), reference: 'REF-A-007', clientId: CLIENT_A, generationDate: daysAgo(80),  amount:  620000, state: 'REVIEWED',  rejectDetails: '',                              createdAt: daysAgo(80),  updatedAt: daysAgo(75)  },
  { id: randomUUID(), reference: 'REF-A-008', clientId: CLIENT_A, generationDate: daysAgo(65),  amount: 1800000, state: 'REVIEWED',  rejectDetails: '',                              createdAt: daysAgo(65),  updatedAt: daysAgo(60)  },
  { id: randomUUID(), reference: 'REF-A-009', clientId: CLIENT_A, generationDate: daysAgo(50),  amount:  945000, state: 'REVIEWED',  rejectDetails: '',                              createdAt: daysAgo(50),  updatedAt: daysAgo(47)  },
  { id: randomUUID(), reference: 'REF-A-010', clientId: CLIENT_A, generationDate: daysAgo(40),  amount:  275000, state: 'PENDING',   rejectDetails: '',                              createdAt: daysAgo(40),  updatedAt: daysAgo(40)  },
  { id: randomUUID(), reference: 'REF-A-011', clientId: CLIENT_A, generationDate: daysAgo(30),  amount: 4500000, state: 'PENDING',   rejectDetails: '',                              createdAt: daysAgo(30),  updatedAt: daysAgo(30)  },
  { id: randomUUID(), reference: 'REF-A-012', clientId: CLIENT_A, generationDate: daysAgo(20),  amount:  130000, state: 'PENDING',   rejectDetails: '',                              createdAt: daysAgo(20),  updatedAt: daysAgo(20)  },
  { id: randomUUID(), reference: 'REF-A-013', clientId: CLIENT_A, generationDate: daysAgo(14),  amount: 1050000, state: 'PENDING',   rejectDetails: '',                              createdAt: daysAgo(14),  updatedAt: daysAgo(14)  },
  { id: randomUUID(), reference: 'REF-A-014', clientId: CLIENT_A, generationDate: daysAgo(7),   amount:  560000, state: 'PENDING',   rejectDetails: '',                              createdAt: daysAgo(7),   updatedAt: daysAgo(7)   },
  { id: randomUUID(), reference: 'REF-A-015', clientId: CLIENT_A, generationDate: daysAgo(2),   amount:  890000, state: 'PENDING',   rejectDetails: '',                              createdAt: daysAgo(2),   updatedAt: daysAgo(2)   },

  // Cliente B — 15 cobros
  { id: randomUUID(), reference: 'REF-B-001', clientId: CLIENT_B, generationDate: daysAgo(165), amount: 2750000, state: 'CONFIRMED', rejectDetails: '',                                  createdAt: daysAgo(165), updatedAt: daysAgo(150) },
  { id: randomUUID(), reference: 'REF-B-002', clientId: CLIENT_B, generationDate: daysAgo(148), amount:  410000, state: 'CONFIRMED', rejectDetails: '',                                  createdAt: daysAgo(148), updatedAt: daysAgo(135) },
  { id: randomUUID(), reference: 'REF-B-003', clientId: CLIENT_B, generationDate: daysAgo(130), amount: 1680000, state: 'REJECTED',  rejectDetails: 'Monto no corresponde a contrato',   createdAt: daysAgo(130), updatedAt: daysAgo(120) },
  { id: randomUUID(), reference: 'REF-B-004', clientId: CLIENT_B, generationDate: daysAgo(115), amount:  920000, state: 'CONFIRMED', rejectDetails: '',                                  createdAt: daysAgo(115), updatedAt: daysAgo(100) },
  { id: randomUUID(), reference: 'REF-B-005', clientId: CLIENT_B, generationDate: daysAgo(100), amount: 3400000, state: 'CONFIRMED', rejectDetails: '',                                  createdAt: daysAgo(100), updatedAt: daysAgo(85)  },
  { id: randomUUID(), reference: 'REF-B-006', clientId: CLIENT_B, generationDate: daysAgo(88),  amount:  215000, state: 'REJECTED',  rejectDetails: 'Período de cobro duplicado',        createdAt: daysAgo(88),  updatedAt: daysAgo(78)  },
  { id: randomUUID(), reference: 'REF-B-007', clientId: CLIENT_B, generationDate: daysAgo(74),  amount: 1120000, state: 'REVIEWED',  rejectDetails: '',                                  createdAt: daysAgo(74),  updatedAt: daysAgo(70)  },
  { id: randomUUID(), reference: 'REF-B-008', clientId: CLIENT_B, generationDate: daysAgo(60),  amount:  670000, state: 'REVIEWED',  rejectDetails: '',                                  createdAt: daysAgo(60),  updatedAt: daysAgo(55)  },
  { id: randomUUID(), reference: 'REF-B-009', clientId: CLIENT_B, generationDate: daysAgo(48),  amount: 2300000, state: 'REVIEWED',  rejectDetails: '',                                  createdAt: daysAgo(48),  updatedAt: daysAgo(44)  },
  { id: randomUUID(), reference: 'REF-B-010', clientId: CLIENT_B, generationDate: daysAgo(38),  amount:  480000, state: 'REVIEWED',  rejectDetails: '',                                  createdAt: daysAgo(38),  updatedAt: daysAgo(35)  },
  { id: randomUUID(), reference: 'REF-B-011', clientId: CLIENT_B, generationDate: daysAgo(28),  amount: 1560000, state: 'PENDING',   rejectDetails: '',                                  createdAt: daysAgo(28),  updatedAt: daysAgo(28)  },
  { id: randomUUID(), reference: 'REF-B-012', clientId: CLIENT_B, generationDate: daysAgo(18),  amount:  330000, state: 'PENDING',   rejectDetails: '',                                  createdAt: daysAgo(18),  updatedAt: daysAgo(18)  },
  { id: randomUUID(), reference: 'REF-B-013', clientId: CLIENT_B, generationDate: daysAgo(10),  amount: 5100000, state: 'PENDING',   rejectDetails: '',                                  createdAt: daysAgo(10),  updatedAt: daysAgo(10)  },
  { id: randomUUID(), reference: 'REF-B-014', clientId: CLIENT_B, generationDate: daysAgo(5),   amount:  740000, state: 'PENDING',   rejectDetails: '',                                  createdAt: daysAgo(5),   updatedAt: daysAgo(5)   },
  { id: randomUUID(), reference: 'REF-B-015', clientId: CLIENT_B, generationDate: daysAgo(1),   amount: 1990000, state: 'PENDING',   rejectDetails: '',                                  createdAt: daysAgo(1),   updatedAt: daysAgo(1)   }
];

// ── Runner ────────────────────────────────────────────────────────────────────

async function seed() {
  await ds.initialize();

  for (const user of USERS) {
    const password = await bcrypt.hash(user.plainPassword, 10);
    await ds.query(
      `INSERT INTO users (id, name, email, password, role)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password, role = EXCLUDED.role`,
      [user.id, user.name, user.email, password, user.role]
    );
    console.log(`✓ ${user.role}: ${user.email} / ${user.plainPassword}`);
  }

  for (const client of CLIENTS) {
    await ds.query(
      `INSERT INTO clients (id, name) VALUES ($1, $2)`,
      [client.id, client.name]
    );
    console.log(`✓ Cliente: ${client.name}`);
  }

  for (const charge of CHARGES) {
    await ds.query(
      `INSERT INTO charges (id, reference, client_id, generation_date, amount, state, reject_details, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [charge.id, charge.reference, charge.clientId, charge.generationDate, charge.amount, charge.state, charge.rejectDetails, charge.createdAt, charge.updatedAt]
    );
  }
  console.log(`✓ ${CHARGES.length} cobros insertados`);

  await ds.destroy();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

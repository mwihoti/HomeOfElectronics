import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not defined');
}

const sql = neon(process.env.DATABASE_URL);

let initialized = false;

export const initDb = async () => {
  if (initialized) return;

  await sql`
    CREATE TABLE IF NOT EXISTS auth_users (
      id SERIAL PRIMARY KEY,
      firstname VARCHAR(255) NOT NULL,
      lastname VARCHAR(255) NOT NULL,
      username VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS staff_users (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(255),
      tel_number VARCHAR(50) NOT NULL,
      description TEXT NOT NULL,
      images TEXT[] NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      images TEXT[] NOT NULL,
      category VARCHAR(255) NOT NULL,
      price VARCHAR(50) NOT NULL,
      description TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS payments (
      id SERIAL PRIMARY KEY,
      account VARCHAR(255) NOT NULL,
      api_ref VARCHAR(255),
      charges NUMERIC(12,2) NOT NULL,
      created_at TIMESTAMPTZ,
      currency VARCHAR(10) NOT NULL,
      failed_code VARCHAR(50),
      failed_reason TEXT,
      host VARCHAR(255) NOT NULL,
      identitier VARCHAR(255) NOT NULL,
      meta JSONB NOT NULL,
      net_amount NUMERIC(12,2) NOT NULL,
      provider VARCHAR(100) NOT NULL,
      state VARCHAR(50) NOT NULL,
      tracking_id VARCHAR(255) NOT NULL,
      updated_at TIMESTAMPTZ,
      value NUMERIC(12,2) NOT NULL,
      record_created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  initialized = true;
};

export { sql };

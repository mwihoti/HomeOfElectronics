import { sql, initDb } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await initDb();
    const result = await sql`SELECT NOW() AS now, current_database() AS db`;
    return res.status(200).json({
      message: 'PostgreSQL connection successful',
      timestamp: result[0].now,
      database: result[0].db,
    });
  } catch (error) {
    console.error('PostgreSQL connection test failed:', error);
    const payload = { message: 'PostgreSQL connection failed' };
    if (process.env.NODE_ENV !== 'production') {
      payload.error = error?.message;
    }
    return res.status(500).json(payload);
  }
}

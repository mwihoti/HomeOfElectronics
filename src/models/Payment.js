import { sql, initDb } from '@/lib/db';

const Payment = {
  async create(data) {
    await initDb();
    const {
      account, api_ref, charges, created_at, currency,
      failed_code, failed_reason, host, identitier, meta,
      net_amount, provider, state, tracking_id, updated_at, value,
    } = data;
    const rows = await sql`
      INSERT INTO payments (
        account, api_ref, charges, created_at, currency,
        failed_code, failed_reason, host, identitier, meta,
        net_amount, provider, state, tracking_id, updated_at, value
      ) VALUES (
        ${account}, ${api_ref ?? null}, ${charges}, ${created_at ?? null}, ${currency},
        ${failed_code ?? null}, ${failed_reason ?? null}, ${host}, ${identitier}, ${meta},
        ${net_amount}, ${provider}, ${state}, ${tracking_id}, ${updated_at ?? null}, ${value}
      )
      RETURNING *
    `;
    return rows[0];
  },

  async find() {
    await initDb();
    const rows = await sql`SELECT * FROM payments ORDER BY record_created_at DESC`;
    return rows;
  },
};

export default Payment;

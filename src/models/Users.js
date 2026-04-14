import { sql, initDb } from '@/lib/db';

const Users = {
  async create({ firstName, telNumber, description, images }) {
    await initDb();
    const rows = await sql`
      INSERT INTO staff_users (first_name, tel_number, description, images)
      VALUES (${firstName}, ${telNumber}, ${description}, ${images})
      RETURNING *
    `;
    return rows[0];
  },

  async find() {
    await initDb();
    const rows = await sql`SELECT * FROM staff_users ORDER BY created_at DESC`;
    return rows;
  },
};

export default Users;

import { sql, initDb } from '@/lib/db';
import bcrypt from 'bcryptjs';

const UserModel = {
  async findOne(conditions) {
    await initDb();
    if (conditions.$or) {
      const clauses = conditions.$or;
      const email = clauses.find((c) => c.email)?.email;
      const username = clauses.find((c) => c.username)?.username;
      if (email && username) {
        const rows = await sql`
          SELECT * FROM auth_users
          WHERE email = ${email} OR username = ${username}
          LIMIT 1
        `;
        return rows[0] || null;
      }
      if (username) {
        const rows = await sql`
          SELECT * FROM auth_users WHERE username = ${username} LIMIT 1
        `;
        return rows[0] || null;
      }
      if (email) {
        const rows = await sql`
          SELECT * FROM auth_users WHERE email = ${email} LIMIT 1
        `;
        return rows[0] || null;
      }
    }
    if (conditions.username) {
      const rows = await sql`
        SELECT * FROM auth_users WHERE username = ${conditions.username} LIMIT 1
      `;
      return rows[0] || null;
    }
    if (conditions.email) {
      const rows = await sql`
        SELECT * FROM auth_users WHERE email = ${conditions.email} LIMIT 1
      `;
      return rows[0] || null;
    }
    return null;
  },

  async create({ firstname, lastname, username, email, password }) {
    await initDb();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const rows = await sql`
      INSERT INTO auth_users (firstname, lastname, username, email, password)
      VALUES (${firstname}, ${lastname}, ${username}, ${email}, ${hashedPassword})
      RETURNING *
    `;
    return rows[0];
  },
};

export default UserModel;

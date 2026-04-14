import { sql, initDb } from '@/lib/db';

const Product = {
  async create({ name, images, category, price, description, quantity }) {
    await initDb();
    const rows = await sql`
      INSERT INTO products (name, images, category, price, description, quantity)
      VALUES (${name}, ${images}, ${category}, ${price}, ${description}, ${quantity})
      RETURNING *
    `;
    return rows[0];
  },

  async find() {
    await initDb();
    const rows = await sql`SELECT * FROM products ORDER BY created_at DESC`;
    return rows;
  },

  async findById(id) {
    await initDb();
    const rows = await sql`SELECT * FROM products WHERE id = ${id} LIMIT 1`;
    return rows[0] || null;
  },
};

export default Product;

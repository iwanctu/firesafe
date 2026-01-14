const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || null;

if (!connectionString) {
    console.warn('DATABASE_URL not set — database-postgres.js will not connect. Set DATABASE_URL to use Postgres.');
}

const pool = connectionString ? new Pool({ connectionString }) : null;

const database = {
    getAllProducts: async () => {
        const res = await pool.query('SELECT * FROM products ORDER BY id');
        return res.rows;
    },

    getProductById: async (id) => {
        const res = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        return res.rows[0];
    },

    createProduct: async (product) => {
        const { name, price, image, category, featured, discount, stock, specs } = product;
        const res = await pool.query(
            `INSERT INTO products (name, price, image, category, featured, discount, stock, specs)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
            [name, price, image, category, featured ? true : false, discount || 0, stock || 0, specs || null]
        );
        return res.rows[0];
    },

    updateProduct: async (id, product) => {
        const { name, price, image, category, featured, discount, stock, specs } = product;
        const res = await pool.query(
            `UPDATE products SET name=$1, price=$2, image=$3, category=$4, featured=$5, discount=$6, stock=$7, specs=$8, updated_at=NOW() WHERE id=$9 RETURNING *`,
            [name, price, image, category, featured ? true : false, discount || 0, stock || 0, specs || null, id]
        );
        return { changes: res.rowCount };
    },

    deleteProduct: async (id) => {
        const res = await pool.query('DELETE FROM products WHERE id=$1', [id]);
        return { changes: res.rowCount };
    },

    // Categories
    getAllCategories: async () => {
        const res = await pool.query('SELECT * FROM categories ORDER BY id');
        return res.rows;
    },

    createCategory: async (category) => {
        const { name, icon, color } = category;
        const res = await pool.query(
            'INSERT INTO categories (name, icon, color) VALUES ($1,$2,$3) RETURNING *',
            [name, icon || 'layers', color || 'bg-orange-500/10']
        );
        return res.rows[0];
    },

    updateCategory: async (id, category) => {
        const { name, icon, color } = category;
        const res = await pool.query('UPDATE categories SET name=$1, icon=$2, color=$3 WHERE id=$4', [name, icon, color, id]);
        return { changes: res.rowCount };
    },

    deleteCategory: async (id) => {
        const res = await pool.query('DELETE FROM categories WHERE id=$1', [id]);
        return { changes: res.rowCount };
    },

    // Layout config
    getLayoutConfig: async () => {
        const res = await pool.query('SELECT * FROM layout_config ORDER BY position');
        return res.rows;
    },

    updateLayoutConfig: async (configs) => {
        await pool.query('BEGIN');
        try {
            for (const cfg of configs) {
                await pool.query('UPDATE layout_config SET title=$1, visible=$2, position=$3 WHERE id=$4', [cfg.title, cfg.visible ? true : false, cfg.position, cfg.id]);
            }
            await pool.query('COMMIT');
            return { success: true };
        } catch (err) {
            await pool.query('ROLLBACK');
            throw err;
        }
    },

    // Users / auth
    authenticateUser: async (email) => {
        const res = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
        if (res.rows[0]) return res.rows[0];
        const name = email.split('@')[0];
        const role = email.toLowerCase().includes('admin') ? 'admin' : 'public';
        const ins = await pool.query('INSERT INTO users (email, name, role) VALUES ($1,$2,$3) RETURNING *', [email, name, role]);
        return ins.rows[0];
    }
};

database.ready = async () => {
    if (!pool) return Promise.resolve();
    // Simple readiness check
    await pool.query('SELECT 1');
};

module.exports = database;

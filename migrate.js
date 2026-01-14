const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const sqlPath = path.join(__dirname, 'migrations', '001_init.sql');
if (!fs.existsSync(sqlPath)) {
    console.error('Migration file not found:', sqlPath);
    process.exit(1);
}

const sql = fs.readFileSync(sqlPath, 'utf8');
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('Please set DATABASE_URL environment variable (e.g. postgres://user:pass@host:5432/db)');
    process.exit(1);
}

async function run() {
    const pool = new Pool({ connectionString });
    try {
        console.log('Running migration...');
        await pool.query(sql);
        console.log('Migration completed.');
        await pool.end();
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

run();

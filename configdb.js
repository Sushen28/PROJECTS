const { Pool } = require('pg');
require('dotenv').config();  // ✅ Ensure this is here

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,  // ✅ This must be `skill_job_portal`
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.connect()
    .then(() => console.log(`🟢 Connected to PostgreSQL: ${process.env.DB_NAME}`))
    .catch(err => console.error("❌ PostgreSQL Connection Error:", err));

module.exports = pool;

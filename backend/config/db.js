// // const mysql = require('mysql2/promise');
// // const path = require('path');
// // require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// // const pool = mysql.createPool({
// //   host: (process.env.DB_HOST || 'localhost').replace(/[^a-zA-Z0-9.]/g, ''), // Aggressively clean hostname
// //   port: (process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306),
// //   user: (process.env.DB_USER || 'root').replace(/[^a-zA-Z0-9]/g, ''), // Aggressively clean user
// //   password: (process.env.DB_PASSWORD || '123').replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/g, '123'), // Aggressively clean password allowing common special chars
// //   database: 'innovationjscoe',
// //   waitForConnections: true,
// //   connectionLimit: 10
// // });

// // module.exports = pool;

// // module.exports = pool;

// const mysql = require('mysql2/promise');
// const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// const pool = mysql.createPool({
//   host: (process.env.DB_HOST || 'localhost').replace(/[^a-zA-Z0-9.]/g, ''), // Aggressively clean hostname
//   port: (process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306),
//   user: (process.env.DB_USER || 'root').replace(/[^a-zA-Z0-9]/g, ''), // Aggressively clean user
//   password: (process.env.DB_PASSWORD || '123').replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/g, '123'), // Aggressively clean password allowing common special chars
//   database: 'innovationjscoe',
//   waitForConnections: true,
//   connectionLimit: 10
// });

// module.exports = pool;

// module.exports = pool;

const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

/**
 * IMPORTANT:
 * This pool MUST be used by:
 * - create_test_admin.js
 * - server.js / APIs
 * - all models
 *
 * Database is FIXED to: innovationjscoe
 */

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '123',
  database: 'innovationjscoe', // ✅ SINGLE SOURCE OF TRUTH
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 🔍 Dev-only sanity log (safe, no secrets)
pool.getConnection()
  .then(conn => {
    console.log('✅ MySQL connected');
    console.log('📦 Database in use:', conn.config.database);
    conn.release();
  })
  .catch(err => {
    console.error('❌ MySQL connection failed:', err.message);
  });

module.exports = pool;

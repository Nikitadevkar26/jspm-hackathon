const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const pool = mysql.createPool({
  host: (process.env.DB_HOST || 'localhost').replace(/[^a-zA-Z0-9.]/g, ''), // Aggressively clean hostname
  port: (process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306),
  user: (process.env.DB_USER || 'root').replace(/[^a-zA-Z0-9]/g, ''), // Aggressively clean user
  password: (process.env.DB_PASSWORD || 'root').replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/g, '123'), // Aggressively clean password allowing common special chars
  database: 'innovationjscoe_new',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;

module.exports = pool;
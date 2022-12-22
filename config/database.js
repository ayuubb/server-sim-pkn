const { createPool } = require("mysql");

const pool = createPool({
  host: process.env.DB_HOST || '192.168.1.32',
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  // connectionLimit: 10
});

module.exports = pool;

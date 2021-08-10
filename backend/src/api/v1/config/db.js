const mysql = require('mysql2');
const config = require('config');

const pool = mysql.createPool({
  host: config.get('DB_HOST'),
  port: config.get('DB_PORT'),
  user: config.get('DB_USERNAME'),
  password: config.get('DB_PASSWORD'),
  database: config.get('DB_NAME'),
  waitForConnections: true,
});

module.exports = pool.promise();

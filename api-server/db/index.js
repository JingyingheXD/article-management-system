const mysql = require("mysql2");

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "Admin123",
  database: "my_db_01",
});

module.exports = db;

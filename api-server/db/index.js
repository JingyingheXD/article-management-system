const mysql = require("mysql2");

exports.db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "Admin123",
  database: "my_db_01",
});

exports.db_test = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "Admin123",
  database: "my_db_01_test",
});


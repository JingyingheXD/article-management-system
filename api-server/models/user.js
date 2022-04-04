const db = require("../db/index");
const db_current = process.env.NODE_ENV === "test" ? db.db_test : db.db;

exports.read = (username, process) => {
  const sql = `SELECT * FROM ev_users WHERE username=?`;
  db_current.query(sql, username, (err, results) => {
    process(err, results);
  });
};

exports.insert = (username, password, process) => {
  const sql = `INSERT INTO ev_users SET ?`;
  db_current.query(
    sql,
    { username: username, password: password },
    (err, results) => {
      process(err, results);
    }
  );
};

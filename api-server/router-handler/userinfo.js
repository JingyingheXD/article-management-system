const db = require("../db/index");
const db_current = process.env.NODE_ENV === "test" ? db.db_test : db.db;

exports.getUserInfo = (req, res) => {
  const sql = `SELECT id, username, nickname, email, user_pic FROM ev_users WHERE id=?`;
  db_current.query(sql, req.user.id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("Get user information failed.");

    res.send({
      status: 0,
      message: "Get user information successfully.",
      data: results[0],
    });
  });
};

exports.updateUserInfo = (req, res) => {
  res.send("OK");
};

const db = require("../db/index");
const db_current = process.env.NODE_ENV === "test" ? db.db_test : db.db;
const bcrypt = require("bcryptjs");

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
  const sql = `UPDATE ev_users SET ? WHERE id=?`;
  db_current.query(sql, [req.body, req.body.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1)
      return res.cc("Update user information failed.");

    res.cc("Update user information successfully.", 0);
  });
};

exports.updatePassword = (req, res) => {
  const sql = `SELECT * FROM ev_users WHERE id=?`;
  db_current.query(sql, req.user.id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("User not exist.");

    const compareResult = bcrypt.compareSync(
      req.body.oldPwd,
      results[0].password
    );
    if (!compareResult) return res.cc("The old password is wrong.");

    const sqlUpdatePwd = `UPDATE ev_users SET password=? WHERE id=?`;
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
    db_current.query(sqlUpdatePwd, [newPwd, req.user.id], (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) return res.cc("Update password failed.");
      res.cc("Update password successfully.", 0);
    });
  });
};

exports.updateAvatar = (req, res) => {
  const sql = `UPDATE ev_users SET user_pic=? WHERE id=?`;
  db_current.query(sql, [req.body.avatar, req.user.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("Update avatar failed.");
    res.cc("Update avatar successfully.", 0);
  });
};

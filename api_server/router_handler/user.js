const db = require("../db/index");
const bcrypt = require("bcryptjs");
const { use } = require("../router/user");

exports.register = (req, res) => {
  const userinfo = req.body;
  if (!userinfo.username || !userinfo.password) {
    return res.send({
      status: 1,
      message: "Username or Password should not be null",
    });
  }

  const sqlStr = `SELECT * FROM ev_users WHERE username=?`;
  db.query(sqlStr, userinfo.username, (err, results) => {
    if (err) {
      return res.cc(err);
    }

    if (results.length > 0) {
      return res.cc("This usernmae exists, please change another one.");
    }

    userinfo.password = bcrypt.hashSync(userinfo.password, 10);

    const sqlInsert = `INSERT into ev_users set ?`;
    db.query(
      sqlInsert,
      {
        username: userinfo.username,
        password: userinfo.password,
      },
      (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1)
          return res.cc("Register failed, please try it later.");
        return res.cc('Register successfully', 0)
      }
    );
  });
};

exports.login = (req, res) => {
  res.send("login OK");
};

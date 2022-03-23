const db = require("../db/index");
const bcrypt = require("bcryptjs");
const { use } = require("../router/user");
const jwt = require("jsonwebtoken");
const config = require("../config");

exports.register = (req, res) => {
  const userinfo = req.body;

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
        return res.cc("Register successfully", 0);
      }
    );
  });
};

exports.login = (req, res) => {
  const userinfo = req.body;
  const sql = `SELECT * FROM ev_users WHERE username=?`;

  db.query(sql, userinfo.username, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("Login failed.");

    const compareResult = bcrypt.compareSync(
      userinfo.password,
      results[0].password
    );
    if (!compareResult) return res.cc("Wrong password.");

    // remove private information when generating Token
    const user = { ...results[0], password: "", user_pic: "" };
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.expireIn,
    });

    res.send({
      status: 0,
      message: "Login successfully.",
      token: "Bearer " + tokenStr,
    });
  });
};

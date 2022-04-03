const db = require("../db/index");
const db_current = process.env.NODE_ENV === "test" ? db.db_test : db.db;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

exports.register = (req, res) => {
  const userinfo = req.body;

  const sqlStr = `SELECT * FROM ev_users WHERE username=?`;
  db_current.query(sqlStr, userinfo.username, (err, results) => {
    if (err) {
      return res.cc(err);
    }

    if (results.length > 0) {
      return res.cc("This username exists, please change another one.");
    }

    userinfo.password = bcrypt.hashSync(userinfo.password, 10);

    const sqlInsert = `INSERT INTO ev_users SET ?`;
    db_current.query(
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

  db_current.query(sql, userinfo.username, (err, results) => {
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

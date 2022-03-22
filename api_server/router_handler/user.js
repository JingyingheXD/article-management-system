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
      return res.send({ status: 1, message: err.message });
    }

    if (results.length > 0) {
      return res.send({
        status: 1,
        message: "This usernmae exists, please change another one.",
      });
    }

    userinfo.password = bcrypt.hashSync(userinfo.password, 10);
    console.log(userinfo);
  });
};

exports.login = (req, res) => {
  res.send("login OK");
};

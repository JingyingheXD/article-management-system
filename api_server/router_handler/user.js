const db = require("../db/index");

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
    // TODO: username can be used
  });

  res.send("register OK");
};

exports.login = (req, res) => {
  res.send("login OK");
};

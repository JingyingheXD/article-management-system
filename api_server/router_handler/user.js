exports.register = (req, res) => {
  const userinfo = req.body;
  if (!userinfo.username || !userinfo.password) {
    return res.send({
      status: 1,
      message: "Username or Password should not be null",
    });
  }

  res.send("register OK");
};

exports.login = (req, res) => {
  res.send("login OK");
};

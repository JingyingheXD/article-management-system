const db = require("../db/index");
const db_current = process.env.NODE_ENV === "test" ? db.db_test : db.db;

exports.addArticle = (req, res) => {
  res.send("OK");
};

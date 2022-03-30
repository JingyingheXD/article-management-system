const db = require("../db/index");
const db_current = process.env.NODE_ENV === "test" ? db.db_test : db.db;

exports.getArtCates = (req, res) => {
  const sql = `SELECT * FROM ev_article_cate WHERE is_delete=0 ORDER BY id ASC`;
  db_current.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: "Get article categories data successfully.",
      data: results,
    });
  });
};

exports.addArticleCates = (req, res) => {
  res.send("OK");
};
  
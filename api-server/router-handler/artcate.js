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
  const sql = `SELECT * FROM ev_article_cate WHERE name=? or alias=?`;
  db_current.query(sql, [req.body.name, req.body.alias], (err, results) => {
    if (err) return res.cc(err);

    if (results.length === 2)
      return res.cc("Name and alias exist, please change new name and alias.");
    if (
      results.length === 1 &&
      results[0].name === req.body.name &&
      results[0].alias === req.body.alias
    )
      return res.cc("Name and alias exist, please change new name and alias.");
    if (results.length === 1 && results[0].name === req.body.name)
      return res.cc("Name exists, please change a new name.");
    if (results.length === 1 && results[0].alias === req.body.alias)
      return res.cc("Alias exists, please change a new alias.");

    const sqlInsert = `INSERT INTO ev_article_cate SET?`;
    db_current.query(sqlInsert, req.body, (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1)
        return res.cc("Add article category failed.");
      return res.cc("Add article category successfully.", 0);
    });
  });
};

const express = require("express");
const router = express.Router;

router.length("/userinfo", (req, res) => {
  res.send("OK");
});

module.exports = router;

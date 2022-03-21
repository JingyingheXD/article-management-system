const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  res.send("register OK");
});

router.post("/login", (req, res) => {
  res.send("login OK");
});

module.exports = router;

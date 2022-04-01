const express = require("express");
const router = express.Router();
const articleHandler = require("../router-handler/article");

router.post("/add", articleHandler.addArticle);

module.exports = router;

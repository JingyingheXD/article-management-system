const express = require("express");
const router = express.Router();
const articleHandler = require("../controllers/article");
const multer = require("multer");
const path = require("path");

const upload = multer({ dest: path.join(__dirname, "../uploads") });

router.post("/add", upload.single("cover_img"), articleHandler.addArticle);

module.exports = router;

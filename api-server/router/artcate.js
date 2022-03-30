const express = require("express");
const router = express.Router();
const artCateHandler = require("../router-handler/artcate");

router.get("/cates", artCateHandler.getArtCates);
router.post('/addcates', artCateHandler.addArticleCates)

module.exports = router;
 
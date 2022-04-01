const express = require("express");
const router = express.Router();
const expressJoi = require("@escook/express-joi");
const artCateHandler = require("../router-handler/artcate");
const { add_cate_schema } = require("../schema/artcate");

router.get("/cates", artCateHandler.getArtCates);

router.post(
  "/addcates",
  expressJoi(add_cate_schema),
  artCateHandler.addArticleCates
);

router.get('/deletecate/:id', artCateHandler.deleteCateById)

module.exports = router;

const express = require("express");
const router = express.Router();
const expressJoi = require("@escook/express-joi");
const artCateHandler = require("../router-handler/artcate");
const {
  add_cate_schema,
  delete_cate_schema,
  get_cate_schema,
  update_cate_schema,
} = require("../schema/artcate");

router.get("/cates", artCateHandler.getArtCates);

router.post(
  "/addcates",
  expressJoi(add_cate_schema),
  artCateHandler.addArticleCates
);

router.get(
  "/deletecate/:id",
  expressJoi(delete_cate_schema),
  artCateHandler.deleteCateById
);

router.get(
  "/cate/:id",
  expressJoi(get_cate_schema),
  artCateHandler.getArtCateById
);

router.post(
  "/updatecate",
  expressJoi(update_cate_schema),
  artCateHandler.updateCateById
);

module.exports = router;

const express = require("express");
const router = express.Router();
const userinfoHandler = require("../router-handler/userinfo");
const expressJoi = require("@escook/express-joi");
const {
  update_userinfo_schema,
  update_password_schema,
} = require("../schema/user");

router.get(
  "/userinfo",
  expressJoi(update_userinfo_schema),
  userinfoHandler.getUserInfo
);

router.post(
  "/userinfo",
  expressJoi(update_userinfo_schema),
  userinfoHandler.updateUserInfo
);

router.post(
  "/updatepwd",
  expressJoi(update_password_schema),
  userinfoHandler.updatePassword
);

module.exports = router;

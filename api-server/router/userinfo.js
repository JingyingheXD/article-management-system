const express = require("express");
const router = express.Router();
const userinfoHandler = require("../router-handler/userinfo");

router.get("/userinfo", userinfoHandler.getUserInfo);
router.post("/userinfo", userinfoHandler.updateUserInfo);

module.exports = router;

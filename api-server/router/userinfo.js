const express = require("express");
const router = express.Router();
const userinfoHandler = require("../router-handler/userinfo");


router.get("/userinfo", userinfoHandler.getUserInfo);

module.exports = router;

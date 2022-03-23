const express = require("express");
const router = express.Router();

const userHandler = require("../router_handler/user");

const expressJoi = require("@escook/express-joi");
const { reg_login_schema } = require("../schema/user");

router.post("/register", expressJoi(reg_login_schema), userHandler.register);
router.post("/login", userHandler.login);

module.exports = router;

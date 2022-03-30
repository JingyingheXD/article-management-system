const joi = require("joi");

const username = joi.string().alphanum().min(3).max(10).required();
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required();

const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email().required();

exports.reg_login_schema = {
  body: {
    username,
    password,
  },
};

exports.update_userinfo_schema = {
  body: {
    id,
    nickname,
    email,
  },
};

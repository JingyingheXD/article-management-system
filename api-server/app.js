const express = require("express");
const app = express();
const cors = require("cors");
const joi = require("joi");
const expressJWT = require("express-jwt");
const config = require("./config");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

// have to config decoded token middleware before router
app.use(
  expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] })
);

const userRouter = require("./router/user");
app.use("/api", userRouter);

const userinfoRouter = require("./router/userinfo");
app.use("/my", userinfoRouter);

const artCateRouter = require("./router/artcate");
app.use("/my/article", artCateRouter);

app.use((err, req, res, next) => {
  if (err instanceof joi.ValidationError) return res.cc(err);
  if (err.name === "UnauthorizedError") return res.cc("Authorize failed.");
  return res.cc(err);
});

app.listen(3007, () => {
  console.log("api server running at http://127.0.0.1:3007");
});

module.exports = app;

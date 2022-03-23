const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./router/user");
const joi = require("joi");

app.use(cors());
app.use(express.urlencoded({ extended: false }));

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
const expressJWT = require("express-jwt");
const config = require("./config");
app.use(
  expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] })
);

app.use("/api", userRouter);

app.use((err, req, res, next) => {
  if (err instanceof joi.ValidationError) return res.cc(err);
  if (err.name === "UnauthorizedError") return res.cc("Authentication failed.");
  return res.cc(err);
});

app.listen(3007, () => {
  console.log("api server running at http://127.0.0.1:3007");
});

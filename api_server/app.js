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

app.use("/api", userRouter);

app.use((err, req, res, next) => {
  if (err instanceof joi.ValidationError) return res.cc(err);
  return res.cc(err);
});

app.listen(3007, () => {
  console.log("api server running at http://127.0.0.1:3007");
});

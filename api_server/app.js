const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require()

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.listen(3007, () => {
  console.log("api server running at http://127.0.0.1:3007");
});

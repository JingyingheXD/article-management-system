const express = require("express");
const app = express();

app.listen(3007, () => {
  console.log("api server running at http://127.0.0.1:3007");
});
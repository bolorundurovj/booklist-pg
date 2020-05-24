const express = require("express");
const mustacheExpress = require("mustache-express");
require("dotenv").config();

const app = express();

const mustache = mustacheExpress();
mustache.cache = null;
app.engine("mustache", mustache);
app.set("view engine", "mustache");

let PORT = process.env.PORT;

app.use(express.static("public"));

app.get("/list", (req, res) => {
  res.render("list");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

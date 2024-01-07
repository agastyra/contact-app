const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.use(expressLayouts);

app.get("/", (req, res) => {
  res.render("home", {
    layout: "layouts/app",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

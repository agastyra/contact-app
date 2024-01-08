const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const dotenv = require("dotenv");
const { appInit, loadContacts, addContact } = require("./contact");

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.urlencoded());

app.use((req, res, next) => {
  appInit();
  next();
});

app.get("/", (req, res) => {
  const contacts = loadContacts();

  res.render("home", {
    layout: "layouts/app",
    contacts,
  });
});

app.get("/add", (req, res) => {
  res.render("add-contact", {
    layout: "layouts/app",
  });
});

app.post("/add", (req, res) => {
  addContact(req.body);
  res.redirect("/");
});

app.use((req, res) => {
  res.status(404);
  res.send(`Url '${req.url}' is not found! Please type correct url!`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

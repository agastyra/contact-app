const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const dotenv = require("dotenv");
const { validationResult, matchedData } = require("express-validator");
const {
  appInit,
  loadContacts,
  addContact,
  deleteContact,
} = require("./utils/contact");
const {
  validateEmail,
  validatePhone,
  validateName,
  showErrorMessage,
  isInputError,
} = require("./utils/validator");

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  appInit();
  next();
});

app.get("/", async (req, res) => {
  res.render("home", {
    layout: "layouts/app",
  });
});

app.get("/add", (req, res) => {
  res.render("add-contact", {
    layout: "layouts/app",
    errors: [],
    data: [],
    showErrorMessage,
    isInputError,
  });
});

app.post(
  "/add",
  [validateName("name"), validateEmail("email"), validatePhone("phone")],
  (req, res) => {
    const result = validationResult(req);
    const data = matchedData(req, {
      onlyValidData: false,
      includeOptionals: true,
    });
    if (!result.isEmpty()) {
      res.render("add-contact", {
        layout: "layouts/app",
        errors: result.array(),
        data,
        showErrorMessage,
        isInputError,
      });
      return false;
    }

    addContact(req.body);
    res.redirect("/");
  }
);

app.delete("/delete/:name", (req, res) => {
  try {
    deleteContact(req.params.name);
    res.status(200).json({ message: `${req.params.name} has been deleted.` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
});

app.get("/contacts", async (req, res) => {
  try {
    const contacts = await loadContacts();

    res.status(200).json({ data: contacts });
  } catch (error) {
    res.status(500).json({ error: "Failed to load contacts" });
  }
});

app.use((req, res) => {
  res.status(404);
  res.send(`Url '${req.url}' is not found! Please type correct url!`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

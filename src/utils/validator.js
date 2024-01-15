const { body } = require("express-validator");
const { loadContacts } = require("./contact");

const validateEmail = (email) =>
  body(email, "Email address is not valid")
    .optional({ values: "falsy" })
    .isEmail()
    .isLength({ min: 6, max: 100 })
    .withMessage("The number of characters should be between 6 - 100")
    .trim()
    .escape();

const validatePhone = (phone) =>
  body(phone, "Phone number is not valid")
    .isMobilePhone("id-ID")
    .withMessage("The telephone number is not from Indonesia")
    .isLength({ min: 12, max: 13 })
    .withMessage("The number of characters should be between 12 - 13")
    .trim()
    .escape();

const validateName = (name) =>
  body(name)
    .custom(async (value, { req }) => {
      const contacts = await loadContacts();
      const duplicated = contacts.find((contact) => {
        return contact.name == value;
      });

      if (!duplicated || duplicated.name == req.body.name) {
        return true;
      }
      
      throw new Error("Name is already in use");
    })
    .isLength({ min: 3, max: 50 })
    .withMessage("The number of characters should be between 3 - 50");

const isInputError = (field = "", errors = []) => {
  let isError = false;
  if (errors) {
    errors.forEach((error) => {
      if (error.path == field) {
        isError = true;
      }
    });
  }
  return isError;
};

const showErrorMessage = (field = "", errors = []) => {
  let errorMessage = "";
  if (errors) {
    errors.forEach((error) => {
      if (error.path == field) {
        errorMessage = error.msg;
      }
    });
  }
  return errorMessage;
};

module.exports = {
  validateEmail,
  validatePhone,
  validateName,
  showErrorMessage,
  isInputError,
};

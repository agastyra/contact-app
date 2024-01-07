const fs = require("fs");
const dirPath = "./src/data";
const filePath = "./src/data/contacts.json";

const appInit = () => {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "[]", "utf-8");
};

const loadContacts = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
};

module.exports = { appInit, loadContacts };

const fs = require("fs");
const dirPath = "./src/data";
const filePath = "./src/data/contacts.json";

const appInit = () => {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "[]", "utf-8");
};

const loadContacts = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) reject(err.message);
      const contacts = JSON.parse(data);
      resolve(contacts);
    });
  });
};

const findContact = async (name) => {
  const contacts = await loadContacts();
  const contact = contacts.find((contact) => contact.name === name);

  const index = contacts.indexOf(contact);
  return contacts[index];
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await loadContacts();
  contacts.push({
    name,
    email,
    phone,
  });

  saveContacts(contacts);
};

const deleteContact = async (name) => {
  const contacts = await loadContacts();
  const contact = contacts.find((contact) => contact.name === name);

  const index = contacts.indexOf(contact);
  contacts.splice(index, 1);
  saveContacts(contacts);
};

const updateContact = async ({ name, email, phone }) => {
  const contacts = await loadContacts();
  const contact = contacts.find((contact) => contact.name === name);
  const updatedContact = { name, email, phone };

  const index = contacts.indexOf(contact);
  contacts[index] = updatedContact;
  saveContacts(contacts);
};

const saveContacts = (contacts = []) => {
  fs.writeFileSync(filePath, JSON.stringify(contacts), "utf-8");
};

module.exports = {
  appInit,
  loadContacts,
  addContact,
  deleteContact,
  findContact,
  updateContact,
};

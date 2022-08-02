const { v4: uuidv4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");

// // TODO: задокументировать каждую функцию
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const products = JSON.parse(data);
  return products;
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const result = await allContacts.find(
    (e) => e.id.toString() === contactId.toString()
  );
  if (!result) return null;
  return result;
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath);
  const products = JSON.parse(data);
  const result = await products.find(
    (e) => e.id.toString() === contactId.toString()
  );

  if (!result) {
    return null;
  } else {
    const delContacts = products.filter(
      (e) => e.id.toString() !== contactId.toString()
    );
    await fs.writeFile(contactsPath, JSON.stringify(delContacts));
    return delContacts;
  }
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = { name, email, phone, id: uuidv4() };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
}

module.exports = { listContacts, getContactById, addContact, removeContact };

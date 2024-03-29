const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");


const contactsPath = path.join(__dirname, "./db/contacts.json");


async function listContacts() {
   
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
   
  return JSON.parse(data);
}





async function getContactById(contactId) {
    const allContacts = await listContacts();
    const contact = allContacts.find((contact) => contact.id === contactId);
    return contact;
}



async function removeContact(contactId) {
    const allContacts = await listContacts();
    const index = allContacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
        return undefined;
    }
    
    const deleteContact = allContacts[index];
    allContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return deleteContact;
     
}



async function addContact(name, email, phone) {
    const allContacts = await listContacts();
    const newContact = { id: crypto.randomUUID(), name, email, phone };
    allContacts.push(newContact);
    await fs.writeFile(contactsPath,  JSON.stringify(allContacts, null, 2));
    return newContact;
}



module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const { requestToBodyStream } = require("next/dist/server/body-streams");

const contactsPath = path.join(__dirname, "contacts.json");


async function listContacts() {
   
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    console.log(data, typeof data)
  return JSON.parse(data);
}





async function getContactById(contactId) {
    const allContacts = await listContacts();
    const contact = allContacts.find((contact) => contact.contactId === contactId);
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
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
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
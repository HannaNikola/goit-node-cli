const { program } = require("commander");


program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

const argContacts = require("./db/contacts.json");

const contacts = require("./contacts.js");


// // TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
      case "list":
    
      const contactsList = await contacts.listContacts();
      console.table(contactsList);
      break;

    case "get":
     
      const getContact = await contacts.getContactById(id);
      console.log(getContact);
      break;

    case "add":
     
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact)
      break;

    case "remove":
     
      const removeId = await contacts.removeContact(id);
      console.log(removeId);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}


invokeAction(options)
  .then(console.log)
  .catch(console.error); 
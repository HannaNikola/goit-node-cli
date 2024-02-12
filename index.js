const { program } = require("commander");


program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();
const contacts = require("./db/contacts.json");


contacts.listContacts().then().catch();
contacts.getContactById().then().catch();
contacts.addContact().then().catch();
contacts.removeContact().then().catch();

// // TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
      case "list":
    
      const contacts = await contacts.getAll();
      console.log(contacts);
      break;

    case "get":
     
      const contact = await contacts.getAll(id);
      console.log(contact)
      break;

    case "add":
     
      const newContact = await contacts.create({ name, email, phone });
      console.log(newContact)
      break;

    case "remove":
     
      const removeContact = await removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}


invokeAction(options)
  .then(console.log)
  .catch(console.error); 
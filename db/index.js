const { program } = require("commander");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();
const contacts = require("./contacts");


contacts.listContacts().then().catch();
contacts.getContactById().then().catch();
contacts.addContact().then().catch();
contacts.removeContact().then().catch();

// // TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
      case "list":
    
      const contacts = await contacts.getAll();
     
      break;

    case "get":
     
      const contact = await contacts.getAll(id);
      
      break;

    case "add":
     
      const newContact = await contacts.create({ name, email, phone });
      
      break;

    case "remove":
      // ... id
      const removeContact = await removeContact(id);
    
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}


invokeAction(options)
  .then(console.log)
  .catch(console.error); 
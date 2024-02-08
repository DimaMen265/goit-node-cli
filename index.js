const { program } = require("commander");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

const { listContacts, getContactById, removeContact, addContact } = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts()
        .then(data => console.table(data))
        .catch(error => console.error(error));
      break;

    case "get":
      getContactById(id)
        .then(data => console.table(data))
        .catch(error => console.error(error));
      break;

    case "add":
      addContact(name, email, phone)
        .then(data => console.table(data))
        .catch(error => console.error(error));
      break;

    case "remove":
      removeContact(id)
        .then(data => console.table(data))
        .catch(error => console.error(error));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);

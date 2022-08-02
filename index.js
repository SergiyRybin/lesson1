const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const products = await listContacts();
      console.table(products);
      break;
    case "get":
      const productById = await getContactById(id);
      console.log(productById);
      if (!productById) {
        throw new Error(`Product with id=${id} not found `);
      }
      break;
    case "add":
      const addProducts = await addContact(name, email, phone);
      console.log(addProducts);
      break;
    case "remove":
      
        const removeById = await removeContact(id);
        console.log(removeById);
        if (!removeById) {
          throw new Error(`Product with id=${id} not found `);
        }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

const name = "Mary";
const email = "facke";
const phone = "(987) 654321";

invokeAction(argv);

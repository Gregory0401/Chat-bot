const mongoose = require("mongoose");
const app = require("./app");
const start = require("./bot");

const DB_HOST =
  "mongodb+srv://grigorios:fCpakA1rNEUQSEtO@cluster0.wvs7e2k.mongodb.net/chat?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(5000))
  .then(() => console.log("Database connect success"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

start();

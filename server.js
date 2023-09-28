const mongoose = require("mongoose");
const app = require("./app");
const start = require("./bot");

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(3000))
  .then(() => console.log("Database connect success"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

start();

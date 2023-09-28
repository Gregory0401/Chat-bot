const { Schema, model } = require("mongoose");

const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const handleSaveErrors = (error, data, next) => {
  const { code, name } = error;
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  next();
};

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleSaveErrors);

const User = model("user", userSchema);

module.exports = User;

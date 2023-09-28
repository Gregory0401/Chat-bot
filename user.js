const { Schema, model } = require("mongoose");

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

const User = require("./user");

const getAll = async (req, res) => {
  const result = await User.find();
  res.json(result);
};

const addUser = async (req, res) => {
  const result = await User.create(req.body);
  console.log(req.body);
  res.status(201).json(result);
};

module.exports = { addUser, getAll };

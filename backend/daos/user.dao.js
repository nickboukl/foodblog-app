const User = require("../models/user");

const createUser = (userData) => new User(userData).save();

const findUserByEmail = (email) => User.findOne({ email });

const findUserById = (id) => User.findById(id);

const findAllUsers = () => User.find();

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  findAllUsers,
};

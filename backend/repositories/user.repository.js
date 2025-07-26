const userDao = require("../daos/user.dao");

const createUser = async (userData) => {
  return await userDao.createUser(userData);
};

const getUserByEmail = async (email) => {
  return await userDao.findUserByEmail(email);
};

const getUserById = async (id) => {
  return await userDao.findUserById(id);
};

const getAllUsers = async () => {
  return await userDao.findAllUsers();
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getAllUsers,
};

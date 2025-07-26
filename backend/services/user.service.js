const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user.repository");
const { formatUserResponse } = require("../dtos/user.dto");
const User = require("../models/user");

const signUpUser = async ({ username, password, name, lastname, email }) => {
  const existingUser = await userRepository.getUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userRepository.createUser({
    username,
    password: hashedPassword,
    name,
    lastname,
    email,
  });

  const token = jwt.sign(
    { email, id: newUser._id, role: newUser.role },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );

  return { token, user: formatUserResponse(newUser) };
};

const loginUser = async ({ email, password }) => {
  const user = await userRepository.getUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid email or password.");
  }

  const token = jwt.sign(
    { email, id: user._id, role: user.role },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );

  return { token, user: formatUserResponse(user) };
};

const getUserById = async (id) => {
  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new Error("User not found.");
  }
  return formatUserResponse(user);
};

const getAllUsers = async () => {
  return await userRepository.getAllUsers();
};

const updateUser = async (id, updateData) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  
  if (!updateData.role) {
    throw new Error("Role is required");
  }

  Object.keys(updateData).forEach((key) => {
    user[key] = updateData[key];
  });

  await user.save();
  return user;
};

module.exports = {
  signUpUser,
  loginUser,
  getUserById,
  updateUser,
  getAllUsers,
};

const userService = require("../services/user.service");

const useSignUp = async (req, res) => {
  try {
    const result = await userService.signUpUser(req.body);
    res.status(200).json({ ...result, message: "User signed up successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const useLogin = async (req, res) => {
  try {
    const result = await userService.loginUser(req.body);
    res.status(200).json({ ...result, message: "User logged in successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      status: true,
      message: "Successfully retrieved all users",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.status(200).json({
      status: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Failed to update user",
      error: error.message,
    });
  }
};

module.exports = {
  useSignUp,
  useLogin,
  getUser,
  getAllUsers,
  updateUser,
};

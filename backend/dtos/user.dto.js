const formatUserResponse = (user) => ({
  id: user._id,
  username: user.username,
  name: user.name,
  lastname: user.lastname,
  email: user.email,
  role: user.role,
});

module.exports = { formatUserResponse };

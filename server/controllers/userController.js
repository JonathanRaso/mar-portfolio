const User = require('../models/user');

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;

  console.log(username, password);
  try {
    await User.exists({ username, password });
  } catch (err) {
    return next(new Error("Cannot find this user"));
  }

  res.status(200).json({ message: "Welcome Michel!" });
};

exports.userLogin = userLogin;
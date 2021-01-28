const User = require('../models/user');

const userLogin = async (req, res, next) => {
  console.log(req.body);
  const { username, password } = req.body;

  console.log(username, password);

  let user;
  try {
    user = await User.exists({ username, password });
  } catch (err) {
    return next(new Error("Login failed, try again"));
  }

  if (!user) {
    console.log("Credentials are wrong, try again");
    return next();
  }

  res.status(200).json({ message: "Welcome Michel!" });
};

exports.userLogin = userLogin;
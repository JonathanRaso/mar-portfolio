const User = require('../models/user');

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;

  let user;
  try {
    user = await User.exists({ username, password });
  } catch (err) {
    return next(new Error("Connexion échouée, recommencez."));
  }

  if (!user) {
    return next(new Error("Identifiants incorrects."));
  }

  res.status(200).json({ message: "Bienvenue Michel!" });
};

exports.userLogin = userLogin;
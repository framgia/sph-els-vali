const { User } = require("../models");
const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You are not authorized" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(id);
    req.user = user.id;
    req.isAdmin = user.admin;

    next();
  } catch (err) {
    res.status(401).json({ error: "You are not authorized" });
  }
};

module.exports = isAuth;

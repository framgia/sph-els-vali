const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { User } = require("../models");

const { createJWTToken } = require("./userAuthController");

// LOGIN
const login = async (req, res, next) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(422).json({ error: "Incorrect email or password" });
    }
    if (!user.admin) {
      return res.status(422).json({ error: "Incorrect email or password" });
    }

    const doMatch = await bcrypt.compare(password, user.password);

    if (!doMatch) {
      return res.status(422).json({ error: "Incorrect email or password" });
    }

    const token = createJWTToken(user.id);

    res.status(200).json({ id: user.id, token });
  } catch (err) {
    res.status(422).json({
      error: "Incorrect email or password",
    });
  }
};

module.exports = { login };

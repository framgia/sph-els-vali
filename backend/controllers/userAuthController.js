const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { User } = require("../models");

const signup = async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;
  const errors = validationResult(req);

  // check if there is any invalid inputs entered by user
  //if there is send an error message
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hash,
      avatar_url: "https://www.istockphoto.com/illustrations/avatar-icons",
    });

    // For now I'm sending back user to see if everything went through, but later I"ll send email and token
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { signup };

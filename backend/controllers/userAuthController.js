const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SEND_GRID_API_KEY,
    },
  })
);

const createJWTToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const sendEmailConfirmation = (userId, email) => {
  const emailConfirmationToken = createJWTToken(userId);
  const url = `${process.env.BACKEND_URL}/signup/confirmation/${emailConfirmationToken}`;

  return transporter.sendMail({
    to: email,
    from: "ruziboev.vali@sun-asterisk.com",
    subject: "E-Learning Account Verification",
    html: `
      <h1>You are almost there!!!</h1>
      <h2>Please take the next step and click on the link below to confirm your account:</h2>
      <a href="${url}">${url}</a>
      `,
  });
};

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
    });

    await sendEmailConfirmation(user.id, email);

    // For now I'm sending back user to see if everything went through, but later I"ll send email and token
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const confirmEmail = async (req, res) => {
  try {
    const { id } = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const user = await User.findByPk(id);
    user.verified = true;
    await user.save();
    res.redirect(`${process.env.FRONTEND_URL}/signup/verified`);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const resendConfirmation = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    await sendEmailConfirmation(user.id, req.body.email);
    res.status(200).json({ message: "email's send" });
  } catch (err) {
    res.status(400).json({
      error: "Could not resend the confirmation email, please try again later",
    });
  }
};

module.exports = { signup, confirmEmail, resendConfirmation };

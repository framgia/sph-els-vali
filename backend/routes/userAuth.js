const express = require("express");
const { body } = require("express-validator");
const {
  signup,
  confirmEmail,
  resendConfirmation,
  login,
} = require("../controllers/userAuthController");
const { User } = require("../models");

const router = express.Router();

// Signup route
router.post(
  "/signup",
  [
    body("email", "Please enter a valid email")
      .isEmail()
      .custom((value, { req }) => {
        return User.findOne({ where: { email: value } }).then((user) => {
          if (user) {
            return Promise.reject(
              "The Email is already exist, please try with another email"
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "Password should be at least 5 character long, please also make sure there is no white spaces"
    )
      .isLength({ min: 5 })
      .trim(),
    body("first_name", "Please enter valid first name")
      .trim()
      .isLength({ min: 1 }),
    body("last_name", "Please enter valid last name")
      .trim()
      .isLength({ min: 1 }),
  ],
  signup
);

router.get("/signup/confirmation/:token", confirmEmail);

router.post("/signup/resendconfirmation", resendConfirmation);

router.post(
  "/login",
  [
    body("email", "Incorrect email or password").isEmail().normalizeEmail(),
    body("password", "Incorrect email or password").isLength({ min: 5 }).trim(),
  ],
  login
);

module.exports = router;

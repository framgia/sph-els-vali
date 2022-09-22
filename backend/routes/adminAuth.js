const express = require("express");
const { body } = require("express-validator");
const { login } = require("../controllers/adminAuthController");

const router = express.Router();

router.post(
  "/admin/login",
  [
    body("email", "Incorrect email or password").isEmail().normalizeEmail(),
    body("password", "Incorrect email or password").isLength({ min: 5 }).trim(),
  ],
  login
);

module.exports = router;

const express = require("express");
const { getUserDashboard } = require("../controllers/feedController");

const router = express.Router();

router.get("/user/dashboard", getUserDashboard);

module.exports = router;

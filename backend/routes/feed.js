const express = require("express");
const {
  getActivity,
  getLearnigsCount,
  getUserInfo,
  getAllUsersInfo,
} = require("../controllers/feedController");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.use(isAuth);

router.get("/user/activity/:id", getActivity);

router.get("/user/learnings_count/:id", getLearnigsCount);

router.get("/user/info/:id", getUserInfo);

router.get("/users", getAllUsersInfo);

module.exports = router;

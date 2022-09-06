const express = require("express");
const {
  getActivity,
  getLearnigsCount,
  getUserInfo,
  getAllUsersInfo,
  postfollowAndUnfollow,
} = require("../controllers/feedController");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.use(isAuth);

router.get("/user/activity/:id", getActivity);

router.get("/user/learnings_count/:id", getLearnigsCount);

router.get("/user/info/:id", getUserInfo);

router.get("/users", getAllUsersInfo);

router.put("/user/follow_and_unfollow", postfollowAndUnfollow);

module.exports = router;

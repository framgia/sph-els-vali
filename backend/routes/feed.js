const express = require("express");
const {
  getActivity,
  getLearnigsCount,
  getUserInfo,
  getAllUsersInfo,
  putfollowAndUnfollow,
  getFollowsCount,
  getFollowing,
  getFollowers,
  editPersonalInfo,
  editEmail,
  editPassword,
  getCategories,
  getLesson,
  postAnswer,
  getAnswer,
  getResult,
} = require("../controllers/feedController");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.use(isAuth);

router.get("/user/activity/:id", getActivity);

router.get("/user/learnings_count/:id", getLearnigsCount);

router.get("/user/info/:id", getUserInfo);

router.get("/users", getAllUsersInfo);

router.put("/follows/:id", putfollowAndUnfollow);

router.get("/follows_count/:id", getFollowsCount);

router.get("/following/:id", getFollowing);

router.get("/followers/:id", getFollowers);

router.put("/edit_personal_info", editPersonalInfo);

router.put("/edit_email", editEmail);

router.put("/edit_password", editPassword);

router.get("/categories", getCategories);

router.get("/categories/:id", getLesson);

router.post("/save_answer", postAnswer);

router.get("/get_answer", getAnswer);

router.get("/get_result/:quiz_id", getResult);

module.exports = router;

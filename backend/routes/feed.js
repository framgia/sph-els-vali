const express = require("express");
const {
  getActivity,
  getLearnigsCount,
  getUserInfo,
  getAllUsersInfo,
  editPersonalInfo,
  editEmail,
  editPassword,
  getLearntWords,
} = require("../controllers/feedController");

const {
  toggleFollow,
  getFollowsCount,
  getFollowing,
  getFollowers,
} = require("../controllers/followController");

const {
  getCategories,
  getLesson,
  postAnswer,
  getAnswer,
  getResult,
  getQuestions,
} = require("../controllers/categoriesController");

const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.use(isAuth);

router.get("/user/activity/:id", getActivity);

router.get("/user/learnings_count/:id", getLearnigsCount);

router.get("/user/info/:id", getUserInfo);

router.get("/users", getAllUsersInfo);

router.put("/follows/:id", toggleFollow);

router.get("/follows_count/:id", getFollowsCount);

router.get("/following/:id", getFollowing);

router.get("/followers/:id", getFollowers);

router.put("/edit_personal_info", editPersonalInfo);

router.put("/edit_email", editEmail);

router.put("/edit_password", editPassword);

router.get("/categories", getCategories);

router.get("/categories/:id", getLesson);

router.get("/questions/:id", getQuestions);

router.post("/save_answer", postAnswer);

router.get("/get_answer", getAnswer);

router.get("/get_result/:quiz_id", getResult);

router.get("/learnt_words/:user_id", getLearntWords);

module.exports = router;

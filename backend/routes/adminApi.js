const express = require("express");
const { body } = require("express-validator");
const {
  deleteCategory,
  editCategory,
  getCategory,
  postCategory,
  postQuestion,
} = require("../controllers/adminApiController");

const router = express.Router();

router.delete("/admin/categories/delete/:id", deleteCategory);

router.put(
  "/admin/categories/edit/:id",
  [
    body("name", "Invalid name").trim().isLength({ min: 1 }),
    body("description", "Invalid description").trim().isLength({ min: 1 }),
  ],
  editCategory
);

router.get("/category/:id", getCategory);

router.post(
  "/admin/categories/add",
  [
    body("name", "Invalid name").trim().isLength({ min: 1 }),
    body("description", "Invalid description").trim().isLength({ min: 1 }),
  ],
  postCategory
);

router.post(
  "/admin/questions/add",
  [
    body("title", "Invalid title").trim().isLength({ min: 1 }),
    body("choice_1", "Invalid choice").trim().isLength({ min: 1 }),
    body("choice_2", "Invalid choice").trim().isLength({ min: 1 }),
    body("choice_3", "Invalid choice").trim().isLength({ min: 1 }),
    body("correct_answer", "Invalid answer").trim().isLength({ min: 1 }),
    body("quiz_id", "Invalid quiz id").trim().isLength({ min: 1 }),
  ],
  postQuestion
);

module.exports = router;

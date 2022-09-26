const express = require("express");
const { body } = require("express-validator");
const {
  deleteCategory,
  editCategory,
  getCategory,
  postCategory,
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

module.exports = router;

const express = require("express");
const { body } = require("express-validator");
const {
  deleteCategory,
  editCategory,
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

module.exports = router;

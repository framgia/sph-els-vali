const express = require("express");
const { deleteCategory } = require("../controllers/adminApiController");

const router = express.Router();

router.delete("/admin/categories/delete/:id", deleteCategory);

module.exports = router;

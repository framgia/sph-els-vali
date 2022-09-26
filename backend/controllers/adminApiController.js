const { validationResult } = require("express-validator");
const { Quiz } = require("../models");

const deleteCategory = async (req, res, next) => {
  const isAdmin = req.isAdmin;
  const { id } = req.params;

  try {
    if (!isAdmin) {
      return res.status(403).json({ error: "You are not an admin" });
    }

    await Quiz.destroy({ where: { id } });

    res.status(200).json({ message: "Quiz category was successfully deleted" });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const editCategory = async (req, res, next) => {
  const isAdmin = req.isAdmin;
  const { id } = req.params;
  const { name, description } = req.body;

  const errors = validationResult(req);

  try {
    if (!isAdmin) {
      return res.status(403).json({ error: "You are not an admin" });
    }

    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array()[0].msg });
    }

    await Quiz.update({ name, description }, { where: { id } });

    res.status(200).json({ message: "Quiz category was successfully updated" });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

module.exports = { deleteCategory, editCategory };

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

module.exports = { deleteCategory };

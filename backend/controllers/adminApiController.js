const { validationResult } = require("express-validator");
const { Quiz, Question } = require("../models");

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

const getCategory = async (req, res, next) => {
  const { id } = req.params;

  try {
    const quiz = await Quiz.findByPk(id);

    if (!quiz) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ name: quiz.name, description: quiz.description });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const postCategory = async (req, res, next) => {
  const isAdmin = req.isAdmin;
  const { name, description } = req.body;

  const errors = validationResult(req);

  try {
    if (!isAdmin) {
      return res.status(403).json({ error: "You are not an admin" });
    }

    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array()[0].msg });
    }

    const new_quiz = await Quiz.create({
      name,
      description,
    });

    res.status(200).json({ id: new_quiz.id });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const postQuestion = async (req, res, next) => {
  const isAdmin = req.isAdmin;
  const { title, choice_1, choice_2, choice_3, correct_answer, quiz_id } =
    req.body;

  const errors = validationResult(req);

  try {
    if (!isAdmin) {
      return res.status(403).json({ error: "You are not an admin" });
    }

    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array()[0].msg });
    }

    await Question.create({
      title,
      choice_1,
      choice_2,
      choice_3,
      correct_answer,
      quiz_id,
    });

    res.status(200).json({ message: "New question's successfully added" });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const deleteQuestion = async (req, res, next) => {
  const isAdmin = req.isAdmin;
  const { id } = req.params;

  try {
    if (!isAdmin) {
      return res.status(403).json({ error: "You are not an admin" });
    }

    await Question.destroy({ where: { id } });

    res.status(200).json({ message: "Question was successfully deleted" });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const editQuestion = async (req, res, next) => {
  const { id } = req.params;
  const isAdmin = req.isAdmin;
  const { title, choice_1, choice_2, choice_3, correct_answer } = req.body;

  const errors = validationResult(req);

  try {
    if (!isAdmin) {
      return res.status(403).json({ error: "You are not an admin" });
    }

    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array()[0].msg });
    }

    await Question.update(
      { title, choice_1, choice_2, choice_3, correct_answer },
      { where: { id } }
    );

    res.status(200).json({ message: "The question was successfully updated" });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

module.exports = {
  deleteCategory,
  editCategory,
  getCategory,
  postCategory,
  postQuestion,
  deleteQuestion,
  editQuestion,
};

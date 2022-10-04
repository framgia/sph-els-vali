const { Op } = require("sequelize");
const { Quiz, UserLesson, UserAnswer, Question } = require("../models");

const getCategories = async (req, res, next) => {
  const { search, orderBy } = req.query;
  const user_id = req.user;

  const searchQuery = {
    [Op.or]: {
      name: { [Op.like]: `%${search}%` },
      description: { [Op.like]: `%${search}%` },
    },
  };

  const orderByQuery = [["name", orderBy]];

  try {
    const result = await Quiz.getCategories(
      user_id,
      searchQuery,
      orderByQuery,
      search,
      orderBy
    );

    res.status(200).json({ categories: result });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const getLesson = async (req, res, next) => {
  const { id } = req.params;
  const user_id = req.user;

  try {
    const { result, name } = await Quiz.getLesson(id, user_id);

    res.status(200).json({ questions: result, name });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const getQuestions = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { name, Questions } = await Quiz.findByPk(id, {
      include: [Question],
      attributes: ["name"],
    });

    const result = [];

    Questions.map(
      ({
        id,
        title,
        choice_1,
        choice_2,
        choice_3,
        choice_4,
        correct_answer,
      }) => {
        result.push({
          id,
          title,
          choices: [choice_1, choice_2, choice_3, choice_4],
          correct_answer,
        });
      }
    );

    res.status(200).json({ questions: result, name });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const postAnswer = async (req, res, next) => {
  const user_id = req.user;
  const { question_id, user_answer, quiz_id } = req.body;

  try {
    const { isSame, received } = await UserAnswer.postAnswer(
      question_id,
      user_answer,
      quiz_id,
      user_id
    );

    if (isSame) {
      res.status(304).json({ error: "Answer exists!" });
    } else {
      return res.status(200).json({ message: "Answer updated!" });
    }

    if (received) {
      res.status(200).json({ message: "Answer received!" });
    }
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const getAnswer = async (req, res, next) => {
  const user_id = req.user;
  const { quiz_id } = req.query;

  try {
    const answers = await UserAnswer.findAll({
      where: { user_id, quiz_id },
      attributes: ["user_answer", "question_id", "quiz_id"],
    });

    res.status(200).json({ answers });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const getResult = async (req, res, next) => {
  const user_id = req.user;
  const { quiz_id } = req.params;

  try {
    const userlesson = await UserLesson.findOne({
      where: { quiz_id, user_id },
    });

    if (!userlesson) {
      return res.status(404).json({ error: "Quiz was not taken" });
    }

    const { resp, score, result } = await UserLesson.getResult(
      user_id,
      quiz_id
    );
    if (resp) {
      return res.status(200).json({ result, score });
    }

    if (userlesson !== score) {
      await userlesson.update({ score });
    }

    res.status(200).json({ result, score });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

module.exports = {
  getCategories,
  getLesson,
  postAnswer,
  getAnswer,
  getResult,
  getQuestions,
};

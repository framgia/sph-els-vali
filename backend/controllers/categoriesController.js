const { Op } = require("sequelize");
const {
  ActivityLog,
  Quiz,
  UserLesson,
  UserAnswer,
  Question,
} = require("../models");

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
    const lessons = await UserLesson.findAll({
      where: { user_id },
      attributes: ["quiz_id"],
    });

    const answers = await UserAnswer.findAll({
      where: { user_id, correct: true },
      include: [Question],
    });

    const takenLessonsList = [];
    lessons.map((lesson) => {
      takenLessonsList.push(lesson.quiz_id);
    });

    const categories = await Quiz.findAll({
      include: [Question],
      where: search ? searchQuery : { name: { [Op.ne]: null } },
      order: orderBy ? orderByQuery : [["id", "ASC"]],
    });
    const result = [];
    await Promise.all(
      categories.map(async ({ id, name, description, Questions }) => {
        if (takenLessonsList.includes(id)) {
          let score = 0;
          await Promise.all(
            answers
              .filter((answer) => answer.Question !== null)
              .map(async (answer) => {
                const correct_answer = await Question.findOne({
                  where: { id: answer.question_id },
                  attributes: [answer.Question.correct_answer],
                });
                if (
                  answer.quiz_id === id &&
                  answer.user_answer ===
                    correct_answer[answer.Question.correct_answer]
                ) {
                  score++;
                }
              })
          );
          result.push({
            id,
            name,
            description,
            wasTaken: true,
            score,
            questionsCount: Questions.length,
          });
        } else {
          result.push({
            id,
            name,
            description,
            wasTaken: false,
            score: null,
            questionsCount: Questions.length,
          });
        }
      })
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
    const userlesson = await UserLesson.findOne({
      where: { quiz_id: id, user_id },
    });
    const userAnwers = await UserAnswer.findAll({
      where: { quiz_id: id, user_id },
    });

    if (userAnwers.length > 0) {
      await UserAnswer.destroy({
        where: { quiz_id: id, user_id },
      });
    }

    if (!userlesson) {
      await UserLesson.create({
        user_id,
        quiz_id: id,
        score: 0,
      });
    } else {
      await userlesson.update({
        score: 0,
      });
    }

    await ActivityLog.create({
      relatable_id: id,
      relatable_type: "quizzes",
      user_id,
    });

    const { name, Questions } = await Quiz.findByPk(id, {
      include: [Question],
      attributes: ["name"],
    });

    const result = [];

    Questions.map(({ id, title, choice_1, choice_2, choice_3, choice_4 }) => {
      result.push({
        id,
        title,
        choices: [choice_1, choice_2, choice_3, choice_4],
      });
    });

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
    const answer = await UserAnswer.findOne({
      where: { user_id, question_id, quiz_id },
    });

    const question = await Question.findOne({
      where: { id: question_id, quiz_id },
    });

    const correct_answer = await Question.findOne({
      where: { id: question_id },
      attributes: [question.correct_answer],
    });

    if (answer) {
      if (answer.user_answer !== user_answer) {
        if (user_answer === correct_answer[question.correct_answer]) {
          await answer.update({
            user_answer,
            correct: true,
          });
        } else {
          await answer.update({
            user_answer,
            correct: false,
          });
        }

        return res.status(200).json({ message: "Answer updated!" });
      } else {
        return res.status(304).json({ error: "Answer exists!" });
      }
    } else {
      if (user_answer === correct_answer[question.correct_answer]) {
        await UserAnswer.create({
          user_id,
          question_id,
          user_answer,
          quiz_id,
          correct: true,
        });
      } else {
        await UserAnswer.create({
          user_id,
          question_id,
          user_answer,
          quiz_id,
          correct: false,
        });
      }

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

    const quiz = await Quiz.findByPk(quiz_id, {
      include: [
        { model: UserAnswer, where: { user_id } },
        { model: Question, where: { quiz_id } },
      ],
    });

    const result = [];
    let score = 0;

    if (userlesson && !quiz) {
      const questions = await Question.findAll({ where: { quiz_id } });
      await Promise.all(
        questions.map(async (question) => {
          const correct_answer = await Question.findOne({
            where: { id: question.id },
            attributes: [question.correct_answer],
          });

          result.push({
            question_id: question.id,
            correct: false,
            correct_answer: correct_answer[question.correct_answer],
            user_answer: null,
          });
        })
      );
      return res.status(200).json({ result, score });
    }

    const answeredQuestionIdList = [];
    quiz.UserAnswers.map((user_answer) => {
      answeredQuestionIdList.push(user_answer.question_id);
    });
    await Promise.all(
      quiz.Questions.map(async (question) => {
        const correct_answer = await Question.findOne({
          where: { id: question.id },
          attributes: [question.correct_answer],
        });
        if (!answeredQuestionIdList.includes(question.id)) {
          result.push({
            question_id: question.id,
            correct: false,
            correct_answer: correct_answer[question.correct_answer],
            user_answer: null,
          });
        }
        await quiz.UserAnswers.map((answer) => {
          if (
            answer.question_id === question.id &&
            answer.user_answer === correct_answer[question.correct_answer]
          ) {
            score += 1;
            result.push({
              question_id: question.id,
              correct: true,
              correct_answer: correct_answer[question.correct_answer],
              user_answer: answer.user_answer,
            });
          } else if (
            answer.question_id === question.id &&
            answer.user_answer !== correct_answer[question.correct_answer]
          ) {
            result.push({
              question_id: question.id,
              correct: false,
              correct_answer: correct_answer[question.correct_answer],
              user_answer: answer.user_answer,
            });
          }
        });
      })
    );

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

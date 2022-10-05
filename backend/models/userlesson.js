"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserLesson extends Model {
    static associate(models) {
      UserLesson.belongsTo(models.User, { foreignKey: "user_id" });
      UserLesson.belongsTo(models.Quiz, { foreignKey: "quiz_id" });
    }
  }
  UserLesson.init(
    {
      user_id: DataTypes.INTEGER,
      quiz_id: DataTypes.INTEGER,
      score: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserLesson",
    }
  );

  UserLesson.getLearntWordsAndLessons = async (targetUserId) => {
    try {
      let numberOfWords = 0;
      const user = await sequelize.models.User.findByPk(targetUserId, {
        include: [UserLesson],
      });
      const numberOfLessons = user.UserLessons.length;

      await Promise.all(
        user.UserLessons.map(async (lesson) => {
          await sequelize.models.UserAnswer.findAll({
            where: {
              quiz_id: lesson.quiz_id,
              correct: true,
              user_id: targetUserId,
            },
          }).then((answers) => {
            numberOfWords += answers.length;
          });
        })
      );

      return numberOfWords > 0
        ? {
            learntWordsResult: `Learnt ${numberOfWords} words`,
            learntLessonsResult: `Learnt ${numberOfLessons} lessons`,
          }
        : "No Learnings yet";
    } catch (err) {
      res
        .status(400)
        .json({ error: "Something went wrong, please try again later" });
    }
  };

  UserLesson.getLearntWords = async (user_id) => {
    const lessons = await UserLesson.findAll({
      where: { user_id },
      attributes: ["quiz_id"],
    });

    const lessons_array = [];

    if (lessons.length > 0) {
      lessons.map((lesson) => {
        if (!lessons_array.includes(lesson.quiz_id)) {
          lessons_array.push(lesson.quiz_id);
        }
      });
    }

    const result = [];

    const quizzes = await sequelize.models.Quiz.findAll({
      where: { id: lessons_array },
      attributes: ["name", "id"],
      include: [
        {
          model: sequelize.models.Question,
          attributes: ["correct_answer", "title", "id"],
          paranoid: false,
        },
        {
          model: sequelize.models.UserAnswer,
          where: { user_id, correct: true },
        },
      ],
      paranoid: false,
    });

    await Promise.all(
      quizzes.map(async (quiz) => {
        result.push({
          id: quiz.id,
          name: quiz.name,
          words: await Promise.all(
            quiz.UserAnswers.map(async (u) => {
              let word;
              await Promise.all(
                quiz.Questions.map(async (question) => {
                  const correct_answer =
                    await sequelize.models.Question.findOne({
                      where: { id: question.id },
                      attributes: [question.correct_answer],
                    });
                  if (
                    u.quiz_id === quiz.id &&
                    question.id === u.question_id &&
                    correct_answer[question.correct_answer] === u.user_answer
                  ) {
                    word = {
                      word: question.title,
                      answer: correct_answer[question.correct_answer],
                    };
                  }
                })
              );
              return word;
            })
          ),
        });
      })
    );

    return result;
  };

  UserLesson.getResult = async (user_id, quiz_id) => {
    let score = 0;
    let resp = false;
    const result = [];

    const shuffleArray = await sequelize.models.QuestionsShufflePattern.findOne(
      { where: { quiz_id, user_id } }
    );

    const userlesson = await sequelize.models.UserLesson.findOne({
      where: { quiz_id, user_id },
    });
    const quiz = await sequelize.models.Quiz.findByPk(quiz_id, {
      include: [
        { model: sequelize.models.UserAnswer, where: { user_id } },
        { model: sequelize.models.Question, where: { quiz_id } },
      ],
    });

    if (userlesson && !quiz) {
      const Questions = await sequelize.models.Question.findAll({
        where: { quiz_id },
      });

      let questions;
      if (shuffleArray) {
        questions = shuffleArray.questions_shuffle_array.map(
          (questionId) =>
            Questions.filter((question) => question.id === questionId)[0]
        );
      } else {
        questions = Questions;
      }

      await Promise.all(
        questions.map(async (question) => {
          const correct_answer = await sequelize.models.Question.findOne({
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

      resp = true;
      return { resp, score, result };
    }

    const answeredQuestionIdList = [];
    quiz.UserAnswers.map((user_answer) => {
      answeredQuestionIdList.push(user_answer.question_id);
    });

    let questions;
    if (shuffleArray) {
      questions = shuffleArray.questions_shuffle_array.map(
        (questionId) =>
          quiz.Questions.filter((question) => question.id === questionId)[0]
      );
    } else {
      questions = quiz.Questions;
    }

    await Promise.all(
      questions.map(async (question) => {
        const correct_answer = await sequelize.models.Question.findOne({
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
          if (answer.question_id === question.id) {
            if (
              answer.user_answer === correct_answer[question.correct_answer]
            ) {
              score += 1;
            }

            result.push({
              question_id: question.id,
              correct:
                answer.user_answer === correct_answer[question.correct_answer],
              correct_answer: correct_answer[question.correct_answer],
              user_answer: answer.user_answer,
            });
          }
        });
      })
    );

    return { resp, score, result };
  };

  return UserLesson;
};

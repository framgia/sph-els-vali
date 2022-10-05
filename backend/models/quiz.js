"use strict";
const { Op } = require("sequelize");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    static associate(models) {
      Quiz.hasMany(models.UserLesson, { foreignKey: "quiz_id" });
      Quiz.hasMany(models.Question, { foreignKey: "quiz_id" });
      Quiz.hasMany(models.UserAnswer, { foreignKey: "quiz_id" });
    }
  }
  Quiz.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Quiz",
      timestamps: true,
    }
  );

  Quiz.shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  Quiz.getLesson = async (id, user_id) => {
    const userlesson = await sequelize.models.UserLesson.findOne({
      where: { quiz_id: id, user_id },
    });
    const userAnwers = await sequelize.models.UserAnswer.findAll({
      where: { quiz_id: id, user_id },
    });

    if (userAnwers.length > 0) {
      await sequelize.models.UserAnswer.destroy({
        where: { quiz_id: id, user_id },
      });
    }

    if (!userlesson) {
      await sequelize.models.UserLesson.create({
        user_id,
        quiz_id: id,
        score: 0,
      });
    } else {
      await userlesson.update({
        score: 0,
      });
    }

    await sequelize.models.ActivityLog.create({
      relatable_id: id,
      relatable_type: "quizzes",
      user_id,
    });

    const { name, Questions } = await Quiz.findByPk(id, {
      include: [sequelize.models.Question],
      attributes: ["name"],
    });

    const result = [];
    const shuffledQuestions = Quiz.shuffle(Questions);
    const shuffledChoices = Quiz.shuffle([
      "choice_1",
      "choice_2",
      "choice_3",
      "choice_4",
    ]);

    const questoinsShuffleArray = shuffledQuestions.map(
      (question) => question.id
    );

    const shuffleArray = await sequelize.models.QuestionsShufflePattern.findOne(
      { where: { quiz_id: id, user_id } }
    );

    if (shuffleArray) {
      await shuffleArray.update({
        questions_shuffle_array: questoinsShuffleArray,
        choices_shuffle_array: shuffledChoices,
      });
    } else {
      await sequelize.models.QuestionsShufflePattern.create({
        quiz_id: id,
        user_id,
        questions_shuffle_array: questoinsShuffleArray,
        choices_shuffle_array: shuffledChoices,
      });
    }

    shuffledQuestions.map((question) => {
      result.push({
        id: question.id,
        title: question.title,
        choices: shuffledChoices.map((choice) => question[choice]),
      });
    });

    return { result, name };
  };

  Quiz.getCategories = async (
    user_id,
    searchQuery,
    orderByQuery,
    search,
    orderBy
  ) => {
    const lessons = await sequelize.models.UserLesson.findAll({
      where: { user_id },
      attributes: ["quiz_id"],
    });

    const answers = await sequelize.models.UserAnswer.findAll({
      where: { user_id, correct: true },
      include: [sequelize.models.Question],
    });

    const takenLessonsList = [];
    lessons.map((lesson) => {
      takenLessonsList.push(lesson.quiz_id);
    });

    const categories = await Quiz.findAll({
      include: [sequelize.models.Question],
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
                const correct_answer = await sequelize.models.Question.findOne({
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

    return result;
  };

  Quiz.getQuestions = async (id, user_id) => {
    const { name, Questions } = await Quiz.findByPk(id, {
      include: [sequelize.models.Question],
      attributes: ["name"],
    });

    const result = [];

    const shuffleArray = await sequelize.models.QuestionsShufflePattern.findOne(
      { where: { quiz_id: id, user_id } }
    );

    if (shuffleArray) {
      const questions = shuffleArray.questions_shuffle_array.map(
        (questionId) =>
          Questions.filter((question) => question.id === questionId)[0]
      );

      questions.map((question) => {
        result.push({
          id: question.id,
          title: question.title,
          choices: shuffleArray.choices_shuffle_array.map(
            (choice) => question[choice]
          ),
          correct_answer: question.correct_answer,
        });
      });
    } else {
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
    }

    return { result, name };
  };

  Quiz.adminGetQuestions = async (id) => {
    const { name, Questions } = await Quiz.findByPk(id, {
      include: [sequelize.models.Question],
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

    return { result, name };
  };

  return Quiz;
};

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
            where: { quiz_id: lesson.quiz_id, correct: true },
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

  return UserLesson;
};

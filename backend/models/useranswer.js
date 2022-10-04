"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserAnswer extends Model {
    static associate(models) {
      UserAnswer.belongsTo(models.User, { foreignKey: "user_id" });
      UserAnswer.belongsTo(models.Quiz, { foreignKey: "quiz_id" });
      UserAnswer.belongsTo(models.Question, { foreignKey: "question_id" });
    }
  }
  UserAnswer.init(
    {
      user_id: DataTypes.INTEGER,
      question_id: DataTypes.INTEGER,
      user_answer: DataTypes.STRING,
      quiz_id: DataTypes.INTEGER,
      correct: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "UserAnswer",
    }
  );

  UserAnswer.postAnswer = async (
    question_id,
    user_answer,
    quiz_id,
    user_id
  ) => {
    let isSame = false;
    let received = false;
    const answer = await UserAnswer.findOne({
      where: { user_id, question_id, quiz_id },
    });

    const question = await sequelize.models.Question.findOne({
      where: { id: question_id, quiz_id },
    });

    const correct_answer = await sequelize.models.Question.findOne({
      where: { id: question_id },
      attributes: [question.correct_answer],
    });

    if (answer) {
      if (answer.user_answer !== user_answer) {
        await answer.update({
          user_answer,
          correct: user_answer === correct_answer[question.correct_answer],
        });

        isSame = false;
      } else {
        isSame = true;
      }
    } else {
      await UserAnswer.create({
        user_id,
        question_id,
        user_answer,
        quiz_id,
        correct: user_answer === correct_answer[question.correct_answer],
      });

      received = true;
    }

    return { isSame, received };
  };

  return UserAnswer;
};

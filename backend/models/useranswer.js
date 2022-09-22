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
  return UserAnswer;
};

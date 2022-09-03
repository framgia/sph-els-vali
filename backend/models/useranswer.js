"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserAnswer extends Model {
    static associate(models) {}
  }
  UserAnswer.init(
    {
      user_id: DataTypes.INTEGER,
      question_id: DataTypes.INTEGER,
      user_answer: DataTypes.STRING,
      user_lesson_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserAnswer",
    }
  );
  return UserAnswer;
};

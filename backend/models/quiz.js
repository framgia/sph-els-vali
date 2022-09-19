"use strict";
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
      modelName: "Quiz",
    }
  );
  return Quiz;
};

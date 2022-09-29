"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      Question.belongsTo(models.Quiz, { foreignKey: "quiz_id" });
      Question.hasMany(models.UserAnswer, { foreignKey: "question_id" });
    }
  }
  Question.init(
    {
      title: DataTypes.STRING,
      choice_1: DataTypes.STRING,
      choice_2: DataTypes.STRING,
      choice_3: DataTypes.STRING,
      correct_answer: DataTypes.STRING,
      quiz_id: DataTypes.INTEGER,
      choice_4: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      modelName: "Question",
    }
  );
  return Question;
};

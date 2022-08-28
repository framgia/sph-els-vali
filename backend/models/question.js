"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
    },
    {
      sequelize,
      modelName: "Question",
    }
  );
  return Question;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QuestionsShufflePattern extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  QuestionsShufflePattern.init(
    {
      user_id: DataTypes.INTEGER,
      quiz_id: DataTypes.INTEGER,
      questions_shuffle_array: DataTypes.JSON,
      choices_shuffle_array: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "QuestionsShufflePattern",
    }
  );
  return QuestionsShufflePattern;
};

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
  return UserLesson;
};

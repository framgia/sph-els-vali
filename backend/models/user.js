"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.ActivityLog, { foreignKey: "user_id" });
      User.hasMany(models.Follow, { foreignKey: "following_id" });
      User.hasMany(models.Follow, { foreignKey: "follower_id" });
      User.hasMany(models.UserLesson, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar_url: DataTypes.STRING,
      verified: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    static associate(models) {
      Follow.belongsTo(models.User, { foreignKey: "following_id" });
      Follow.belongsTo(models.User, { foreignKey: "follower_id" });
    }
  }
  Follow.init(
    {
      follower_id: DataTypes.INTEGER,
      following_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Follow",
    }
  );
  return Follow;
};

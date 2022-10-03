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
      flag: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Follow",
    }
  );

  Follow.getFollowingIdLIst = async (user_id) => {
    const followingIdList = [];
    const following = await Follow.findAll({
      where: { follower_id: user_id, flag: true },
      attributes: ["following_id"],
    });

    if (following.length > 0) {
      following.map((m) => {
        followingIdList.push(m.following_id);
      });
    }
    return followingIdList;
  };
  return Follow;
};

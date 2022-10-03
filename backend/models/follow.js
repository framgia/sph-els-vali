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

  Follow.followerCount = async (id) => {
    const follower = await Follow.findAll({
      where: { following_id: id, flag: true },
    });
    let followerCount = 0;
    await Promise.all(
      follower.map(async ({ follower_id }) => {
        const user = await sequelize.models.User.findByPk(follower_id);
        if (user) {
          followerCount++;
        }
      })
    );

    return followerCount;
  };

  Follow.followingCount = async (id) => {
    const following = await Follow.findAll({
      where: { follower_id: id, flag: true },
    });
    let followingCount = 0;
    await Promise.all(
      following.map(async ({ following_id }) => {
        const user = await sequelize.models.User.findByPk(following_id);
        if (user) {
          followingCount++;
        }
      })
    );

    return followingCount;
  };
  return Follow;
};

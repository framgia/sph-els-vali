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

  Follow.toggleFollow = async (res, id, user_id) => {
    let follow = false;
    const check = await Follow.findOne({
      where: { follower_id: user_id, following_id: id },
      order: [["createdAt", "DESC"]],
    });

    if (check && check.flag) {
      await Follow.update({ flag: false }, { where: { id: check.id } });
      await sequelize.models.ActivityLog.create({
        relatable_id: check.id,
        relatable_type: "unfollows",
        user_id,
      });
      follow = false;
    } else if (check && check.flag === false) {
      await Follow.update({ flag: true }, { where: { id: check.id } });
      await sequelize.models.ActivityLog.create({
        relatable_id: check.id,
        relatable_type: "follows",
        user_id,
      });
      follow = true;
    } else {
      const follows = await Follow.create({
        follower_id: user_id,
        following_id: id,
        flag: true,
      });
      await sequelize.models.ActivityLog.create({
        relatable_id: follows.id,
        relatable_type: "follows",
        user_id: user_id,
      });
      follow = true;
    }

    return follow;
  };

  Follow.getFollowing = async (followingsList, followingIdList, id) => {
    const { Follows } = await sequelize.models.User.findByPk(id, {
      include: [{ model: Follow, attributes: ["following_id", "flag"] }],
    });

    await Promise.all(
      Follows.map(async (follow) => {
        if (follow.flag) {
          const { id, first_name, last_name, email, avatar_url, deletedAt } =
            await sequelize.models.User.findByPk(follow.following_id, {
              paranoid: false,
            });
          if (deletedAt) {
            return;
          }
          followingsList.push({
            id,
            first_name,
            last_name,
            email,
            avatar_url,
            follows: followingIdList.includes(id),
          });
        }
      })
    );
  };

  Follow.getFollowers = async (followersList, followingIdList, id) => {
    const follower = await Follow.findAll({
      where: { following_id: id, flag: true },
      attributes: ["follower_id"],
    });

    await Promise.all(
      follower.map(async (m) => {
        const { id, first_name, last_name, email, avatar_url } =
          await sequelize.models.User.findByPk(m.follower_id);
        followersList.push({
          id,
          first_name,
          last_name,
          email,
          avatar_url,
          follows: followingIdList.includes(id),
        });
      })
    );
  };

  return Follow;
};

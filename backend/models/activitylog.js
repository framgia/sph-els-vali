"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ActivityLog extends Model {
    static associate(models) {
      ActivityLog.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  ActivityLog.init(
    {
      relatable_id: DataTypes.INTEGER,
      relatable_type: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ActivityLog",
    }
  );

  ActivityLog.getActivities = async (currentUserId, targetUserId) => {
    try {
      let result = [];
      const user = await sequelize.models.User.findByPk(targetUserId, {
        include: [ActivityLog],
      });

      if (!user.ActivityLogs.length > 0) {
        result = "No Activities yet";
      }
      await Promise.all(
        user.ActivityLogs.map(async (activity) => {
          if (activity.relatable_type === "quizzes") {
            await sequelize.models.Quiz.findByPk(activity.relatable_id, {
              paranoid: false,
            }).then((quiz) => {
              if (currentUserId === targetUserId) {
                result = [
                  ...result,
                  {
                    activity: `You learnt ${quiz.name}`,
                    avatar_url: user.avatar_url,
                    timestamp: activity.updatedAt,
                  },
                ];
              } else {
                result = [
                  ...result,
                  {
                    activity: `${user.first_name} learnt ${quiz.name}`,
                    avatar_url: user.avatar_url,
                    timestamp: activity.updatedAt,
                  },
                ];
              }
            });
          } else if (activity.relatable_type === "follows") {
            const id = await sequelize.models.Follow.findByPk(
              activity.relatable_id,
              {
                attributes: ["following_id"],
              }
            );
            await sequelize.models.User.getUser(id.following_id).then(
              async (uInfo) => {
                if (currentUserId === targetUserId) {
                  result = [
                    ...result,
                    {
                      activity: `You followed ${uInfo.first_name}`,
                      avatar_url: user.avatar_url,
                      timestamp: activity.updatedAt,
                    },
                  ];
                } else {
                  result = [
                    ...result,
                    {
                      activity: `${user.first_name} followed ${uInfo.first_name}`,
                      avatar_url: user.avatar_url,
                      timestamp: activity.updatedAt,
                    },
                  ];
                }
              }
            );
          } else if (activity.relatable_type === "unfollows") {
            const id = await sequelize.models.Follow.findByPk(
              activity.relatable_id,
              {
                attributes: ["following_id"],
              }
            );
            await sequelize.models.User.getUser(id.following_id).then(
              async (uInfo) => {
                if (currentUserId === targetUserId) {
                  result = [
                    ...result,
                    {
                      activity: `You unfollowed ${uInfo.first_name}`,
                      avatar_url: user.avatar_url,
                      timestamp: activity.updatedAt,
                    },
                  ];
                } else {
                  result = [
                    ...result,
                    {
                      activity: `${user.first_name} unfollowed ${uInfo.first_name}`,
                      avatar_url: user.avatar_url,
                      timestamp: activity.updatedAt,
                    },
                  ];
                }
              }
            );
          }
        })
      );
      return result;
    } catch (err) {
      throw new Error({
        error: "Something went wrong, please try again later",
      });
    }
  };

  return ActivityLog;
};

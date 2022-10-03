const {
  User,
  ActivityLog,
  Quiz,
  UserLesson,
  UserAnswer,
  Follow,
} = require("../models");

const getUser = async (targetUserId) => {
  const { id, first_name, last_name, email, avatar_url } = await User.findByPk(
    targetUserId,
    { paranoid: false }
  );
  return { id, first_name, last_name, email, avatar_url };
};

const getActivities = async (currentUserId, targetUserId) => {
  try {
    let result = [];
    const user = await User.findByPk(targetUserId, { include: [ActivityLog] });
    if (!user.ActivityLogs.length > 0) {
      result = "No Activities yet";
    }
    await Promise.all(
      user.ActivityLogs.map(async (activity) => {
        if (activity.relatable_type === "quizzes") {
          await Quiz.findByPk(activity.relatable_id, { paranoid: false }).then(
            (quiz) => {
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
            }
          );
        } else if (activity.relatable_type === "follows") {
          const id = await Follow.findByPk(activity.relatable_id, {
            attributes: ["following_id"],
          });
          await getUser(id.following_id).then(async (uInfo) => {
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
          });
        } else if (activity.relatable_type === "unfollows") {
          const id = await Follow.findByPk(activity.relatable_id, {
            attributes: ["following_id"],
          });
          await getUser(id.following_id).then(async (uInfo) => {
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
          });
        }
      })
    );
    return result;
  } catch (err) {
    throw new Error({ error: "Something went wrong, please try again later" });
  }
};

const getLearntWordsAndLessons = async (targetUserId) => {
  try {
    let numberOfWords = 0;
    const user = await User.findByPk(targetUserId, { include: [UserLesson] });
    const numberOfLessons = user.UserLessons.length;

    await Promise.all(
      user.UserLessons.map(async (lesson) => {
        await UserAnswer.findAll({
          where: { quiz_id: lesson.quiz_id, correct: true },
        }).then((answers) => {
          numberOfWords += answers.length;
        });
      })
    );
    return numberOfWords > 0
      ? {
          learntWordsResult: `Learnt ${numberOfWords} words`,
          learntLessonsResult: `Learnt ${numberOfLessons} lessons`,
        }
      : "No Learnings yet";
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const getFollowingIdLIst = async (user_id) => {
  const followingIdList = [];
  const following = await Follow.findAll({
    where: { follower_id: user_id, flag: true },
    attributes: ["following_id"],
  });

  if (following.length > 0) {
    await following.map((m) => {
      followingIdList.push(m.following_id);
    });
  }
  return followingIdList;
};

module.exports = {
  getUser,
  getActivities,
  getLearntWordsAndLessons,
  getFollowingIdLIst,
};

const { Op } = require("sequelize");
const {
  User,
  ActivityLog,
  Quiz,
  UserLesson,
  Question,
  Follow,
} = require("../models");

const getUser = async (targetUserId) => {
  const { first_name, last_name, email, avatar_url } = await User.findByPk(
    targetUserId
  );
  return { first_name, last_name, email, avatar_url };
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
          await Quiz.findByPk(activity.relatable_id).then((quiz) => {
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
                  activity: `${user.name} followed ${uInfo.first_name}`,
                  avatar_url: uInfo.avatar_url,
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
                  activity: `${user.name} unfollowed ${uInfo.first_name}`,
                  avatar_url: uInfo.avatar_url,
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
        await Quiz.findByPk(lesson.quiz_id, { include: [Question] }).then(
          (quiz) => {
            numberOfWords += quiz.Questions.length;
          }
        );
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

const getActivity = async (req, res, next) => {
  let targetUserId;
  const user_id = req.user;
  const { id } = req.params;
  if (id !== "null") {
    targetUserId = Number(id);
  } else {
    targetUserId = user_id;
  }

  const activities = await getActivities(user_id, targetUserId);
  res.status(200).json({ activities });
  try {
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const getLearnigsCount = async (req, res, next) => {
  let targetUserId;
  const user_id = req.user;
  const { id } = req.params;
  if (id !== "null") {
    targetUserId = Number(id);
  } else {
    targetUserId = user_id;
  }

  try {
    const learntWordsAndLessons = await getLearntWordsAndLessons(targetUserId);
    res.status(200).json({ learntWordsAndLessons });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const getUserInfo = async (req, res, next) => {
  let targetUserId;
  const user_id = req.user;
  const { id } = req.params;
  if (id !== "null") {
    targetUserId = Number(id);
  } else {
    targetUserId = user_id;
  }

  try {
    const user = await getUser(targetUserId);
    res.status(200).json({ user });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const getAllUsersInfo = async (req, res, next) => {
  const { search, filter } = req.query;
  let searchQuery;
  let filterQuery;
  if (search.length > 0) {
    searchQuery = {
      [Op.or]: {
        first_name: { [Op.startsWith]: search },
        last_name: { [Op.startsWith]: search },
      },
    };
  } else {
    searchQuery = { first_name: { [Op.ne]: null } };
  }
  if (filter.length > 0) {
    filterQuery = [["first_name", filter]];
  } else {
    filterQuery = [["id", "ASC"]];
  }
  try {
    const user = await User.findAll({
      include: [
        {
          model: Follow,
          where: { flag: true, follower_id: req.user },
          attributes: ["following_id"],
        },
      ],
    });
    const followingIdList = [];
    if (user.length > 0) {
      await user[0].Follows.map((m) => {
        followingIdList.push(m.following_id);
      });
    }

    const usersList = [];
    const users = await User.findAll({
      where: searchQuery,
      order: filterQuery,
    });
    users.map(({ id, first_name, last_name, avatar_url }) => {
      if (followingIdList.includes(id)) {
        usersList.push({
          id,
          first_name,
          last_name,
          avatar_url,
          follows: true,
        });
      } else {
        usersList.push({
          id,
          first_name,
          last_name,
          avatar_url,
          follows: false,
        });
      }
    });
    res.status(200).json({ users: usersList });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const putfollowAndUnfollow = async (req, res, next) => {
  const { id } = req.params;
  const user_id = req.user;
  try {
    const check = await Follow.findOne({
      where: { follower_id: user_id, following_id: id },
      order: [["createdAt", "DESC"]],
    });

    if (check && check.flag) {
      await Follow.update({ flag: false }, { where: { id: check.id } });
      await ActivityLog.create({
        relatable_id: check.id,
        relatable_type: "unfollows",
        user_id,
      });
      res.status(200).json({ message: "Unfollow operation succeded" });
    } else if (check && check.flag === false) {
      await Follow.update({ flag: true }, { where: { id: check.id } });
      await ActivityLog.create({
        relatable_id: check.id,
        relatable_type: "follows",
        user_id,
      });
      res.status(200).json({ message: "Follow operation succeded" });
    } else {
      const follow = await Follow.create({
        follower_id: user_id,
        following_id: id,
        flag: true,
      });
      await ActivityLog.create({
        relatable_id: follow.id,
        relatable_type: "follows",
        user_id: user_id,
      });
      res.status(200).json({ message: "Follow operation succeded" });
    }
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

module.exports = {
  getActivity,
  getLearnigsCount,
  getUserInfo,
  getAllUsersInfo,
  putfollowAndUnfollow,
};

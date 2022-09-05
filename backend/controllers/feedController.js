const { User, ActivityLog, Quiz, UserLesson, Question } = require("../models");

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
          await getUser(activity.relatable_id).then((uInfo) => {
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
        }
      })
    );
    return result;
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
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
  try {
    const users = await User.findAll();
    const userList = [];
    await users.map(async ({ id, first_name, last_name, avatar_url }) => {
      userList.push({
        id,
        first_name,
        last_name,
        avatar_url,
      });
    });
    res.status(200).json({ users: userList });
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
};

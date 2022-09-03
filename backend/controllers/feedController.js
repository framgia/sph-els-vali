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
                  timestamp: activity.updatedAt,
                },
              ];
            } else {
              result = [
                ...result,
                {
                  activity: `${user.name} followed ${quiz.name}`,
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
                  timestamp: activity.updatedAt,
                },
              ];
            } else {
              result = [
                ...result,
                {
                  activity: `${user.name} followed ${uInfo.first_name}`,
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

const getUserDashboard = async (req, res, next) => {
  // for now I'll pass user id in query to send specific user's data but it is gonna change on frontend implementation, I'll pass the id to req.user in a middleware where I check if the user is authorized or not
  const user_id = req.body.user;
  try {
    const user = await getUser(user_id);
    const learntWordsAndLessons = await getLearntWordsAndLessons(user_id);
    const activity = await getActivities(user_id, user_id);
    res.status(200).json({
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        avatar_url: user.avatar_url,
      },
      activity,
      learntWordsAndLessons,
    });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

module.exports = { getUserDashboard };

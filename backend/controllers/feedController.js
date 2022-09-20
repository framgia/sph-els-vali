const fs = require("fs");
const bcrypt = require("bcrypt");
const path = require("path");
const { Op } = require("sequelize");
const {
  User,
  ActivityLog,
  Quiz,
  UserLesson,
  UserAnswer,
  Question,
  Follow,
} = require("../models");
const { sendEmailConfirmation } = require("./userAuthController");

// Functions

const getUser = async (targetUserId) => {
  const { id, first_name, last_name, email, avatar_url } = await User.findByPk(
    targetUserId
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

// Controllers

const getActivity = async (req, res, next) => {
  const user_id = req.user;
  const id = Number(req.params.id);

  const activities = await getActivities(user_id, id);
  res.status(200).json({ activities });
  try {
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const getLearnigsCount = async (req, res, next) => {
  const id = Number(req.params.id);

  try {
    const learntWordsAndLessons = await getLearntWordsAndLessons(id);
    res.status(200).json({ learntWordsAndLessons });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const getUserInfo = async (req, res, next) => {
  const id = Number(req.params.id);
  const user_id = req.user;

  try {
    let follows;
    const { Follows } = await User.findByPk(user_id, { include: [Follow] });
    const user = await getUser(id);
    const followingIdList = [];

    if (Follows.length > 0) {
      Follows.map((f) => {
        if (f.flag) {
          followingIdList.push(f.following_id);
        }
      });
    }

    if (followingIdList.includes(id)) {
      follows = true;
    } else {
      follows = false;
    }
    let userResult = { ...user, follows };
    res.status(200).json({ user: userResult });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const getAllUsersInfo = async (req, res, next) => {
  const { search, orderBy } = req.query;
  const user_id = req.user;

  const searchQuery = {
    [Op.or]: {
      first_name: { [Op.like]: `%${search}%` },
      last_name: { [Op.like]: `%${search}%` },
    },
  };

  const orderByQuery = [["first_name", orderBy]];

  try {
    const followingIdList = await getFollowingIdLIst(user_id);

    const usersList = [];
    const users = await User.findAll({
      where: search ? searchQuery : { first_name: { [Op.ne]: null } },
      order: orderBy ? orderByQuery : [["id", "ASC"]],
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

const getFollowsCount = async (req, res, next) => {
  const { id } = req.params;
  try {
    const followingCount = await Follow.findAll({
      where: { follower_id: id, flag: true },
    });
    const followerCount = await Follow.findAll({
      where: { following_id: id, flag: true },
    });

    res.status(200).json({
      followers: followerCount.length,
      following: followingCount.length,
    });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const getFollowing = async (req, res, next) => {
  const { id } = req.params;
  const user_id = req.user;
  const followingsList = [];

  try {
    const followingIdList = await getFollowingIdLIst(user_id);

    const { Follows } = await User.findByPk(id, {
      include: [{ model: Follow, attributes: ["following_id", "flag"] }],
    });

    if (Follows.length > 0) {
      await Promise.all(
        Follows.map(async (follow) => {
          if (follow.flag) {
            const { id, first_name, last_name, email, avatar_url } =
              await User.findByPk(follow.following_id);
            if (followingIdList.includes(id)) {
              followingsList.push({
                id,
                first_name,
                last_name,
                email,
                avatar_url,
                follows: true,
              });
            } else {
              followingsList.push({
                id,
                first_name,
                last_name,
                email,
                avatar_url,
                follows: false,
              });
            }
          }
        })
      );
    }

    res.status(200).json({ following: followingsList });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const getFollowers = async (req, res, next) => {
  const { id } = req.params;
  const user_id = req.user;
  const followersList = [];

  try {
    const followingIdList = await getFollowingIdLIst(user_id);

    const follower = await Follow.findAll({
      where: { following_id: id, flag: true },
      attributes: ["follower_id"],
    });

    if (follower.length > 0) {
      await Promise.all(
        follower.map(async (m) => {
          const { id, first_name, last_name, email, avatar_url } =
            await User.findByPk(m.follower_id);
          if (followingIdList.includes(id)) {
            followersList.push({
              id,
              first_name,
              last_name,
              email,
              avatar_url,
              follows: true,
            });
          } else {
            followersList.push({
              id,
              first_name,
              last_name,
              email,
              avatar_url,
              follows: false,
            });
          }
        })
      );
    }

    res.status(200).json({ followers: followersList });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const editPersonalInfo = async (req, res, next) => {
  const user_id = req.user;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  let avatar_url = req.body.avatar_url;
  const defaultAvatar = `${process.env.BACKEND_URL}/images/default-icon.webp`;

  try {
    const user = await User.findByPk(user_id, { attributes: ["avatar_url"] });

    if (
      (user.avatar_url !== defaultAvatar && avatar_url === defaultAvatar) ||
      (req.file && user.avatar_url !== defaultAvatar)
    ) {
      const PATH = path.join(
        __dirname,
        "..",
        "public/" + user.avatar_url.split(`${process.env.BACKEND_URL}/`)[1]
      );
      fs.unlink(PATH, (err) => {
        if (err) {
          res.status(400).json({ error: "Unable to delete the image" });
        }
      });
    }

    if (req.file) {
      avatar_url =
        process.env.BACKEND_URL +
        "/" +
        req.file.path.replace(/\\/g, "/").split("/").slice(1).join("/");
    }
    await User.update(
      { first_name, last_name, avatar_url },
      { where: { id: user_id } }
    );

    res
      .status(200)
      .json({ message: "User information was successfully updated!" });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const editEmail = async (req, res, next) => {
  const user_id = req.user;
  const { email } = req.body;
  try {
    const user = await User.findByPk(user_id, { attributes: ["email"] });
    if (email === user.email) {
      return res.status(400).json({
        error: "The same email is used, please choose a different email",
      });
    }

    await User.update({ email, verified: false }, { where: { id: user_id } });
    await sendEmailConfirmation(user_id, email);

    res.status(200).json({ message: "Email was successfully updated" });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const editPassword = async (req, res, next) => {
  const user_id = req.user;
  const { old_password, new_password } = req.body;
  try {
    const user = await User.findByPk(user_id, { attributes: ["password"] });
    const doMatch = await bcrypt.compare(old_password, user.password);

    if (!doMatch) {
      return res.status(400).json({ error: "Old password is incorrect" });
    }
    if (old_password === new_password) {
      return res
        .status(400)
        .json({ error: "Old password and new password cannot be the same" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(new_password, salt);
    await User.update({ password: hash }, { where: { id: user_id } });

    res.status(200).json({ message: "Password was successfully changed" });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const getCategories = async (req, res, next) => {
  const user_id = req.user;

  try {
    const lessons = await UserLesson.findAll({
      where: { user_id },
      attributes: ["quiz_id"],
    });

    const takenLessonsList = [];
    lessons.map((lesson) => {
      takenLessonsList.push(lesson.quiz_id);
    });

    const categories = await Quiz.findAll();
    const result = [];

    categories.map(({ id, name, description }) => {
      if (takenLessonsList.includes(id)) {
        result.push({
          id,
          name,
          description,
          wasTaken: true,
        });
      } else {
        result.push({
          id,
          name,
          description,
          wasTaken: false,
        });
      }
    });

    res.status(200).json({ categories: result });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const getLesson = async (req, res, next) => {
  const { id } = req.params;
  const user_id = req.user;

  try {
    const userlesson = await UserLesson.findOne({
      where: { quiz_id: id, user_id },
    });
    const quizzActivity = await ActivityLog.findOne({
      where: { relatable_id: id, relatable_type: "quizzes", user_id },
    });

    if (!userlesson) {
      await UserLesson.create({
        user_id,
        quiz_id: id,
        score: 0,
      });
    }
    if (!quizzActivity) {
      await ActivityLog.create({
        relatable_id: id,
        relatable_type: "quizzes",
        user_id,
      });
    }

    const { name, Questions } = await Quiz.findByPk(id, {
      include: [Question],
      attributes: ["name"],
    });

    const result = [];

    Questions.map(
      ({ id, title, choice_1, choice_2, choice_3, correct_answer }) => {
        result.push({
          id,
          title,
          choices: [choice_1, choice_2, choice_3, correct_answer],
        });
      }
    );

    res.status(200).json({ questions: result, name });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const postAnswer = async (req, res, next) => {
  const user_id = req.user;
  const { question_id, user_answer, quiz_id } = req.body;

  try {
    const answer = await UserAnswer.findOne({
      where: { user_id, question_id, quiz_id },
    });

    if (answer) {
      if (answer.user_answer !== user_answer) {
        await answer.update({
          user_answer,
        });

        return res.status(200).json({ message: "Answer updated!" });
      } else {
        return res.status(304).json({ error: "Answer exists!" });
      }
    } else {
      await UserAnswer.create({
        user_id,
        question_id,
        user_answer,
        quiz_id,
      });

      res.status(200).json({ message: "Answer received!" });
    }
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const getAnswer = async (req, res, next) => {
  const user_id = req.user;
  const { quiz_id } = req.query;

  try {
    const answers = await UserAnswer.findAll({
      where: { user_id, quiz_id },
      attributes: ["user_answer", "question_id", "quiz_id"],
    });

    res.status(200).json({ answers });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const getResult = async (req, res, next) => {
  const user_id = req.user;
  const { quiz_id } = req.params;

  try {
    const userlesson = await UserLesson.findOne({
      where: { quiz_id, user_id },
    });

    if (!userlesson) {
      return res.status(404).json({ error: "Quiz was not taken" });
    }

    const quiz = await Quiz.findByPk(quiz_id, {
      include: [
        { model: UserAnswer, where: { user_id } },
        { model: Question, where: { quiz_id } },
      ],
    });

    const result = [];
    let score = 0;

    if (userlesson && !quiz) {
      const questions = await Question.findAll({ where: { quiz_id } });
      questions.map((question) => {
        result.push({
          question_id: question.id,
          correct: false,
          correct_answer: question.correct_answer,
          user_answer: null,
        });
      });
      return res.status(404).json({ result, score });
    }

    const answeredQuestionIdList = [];
    quiz.UserAnswers.map((user_answer) => {
      answeredQuestionIdList.push(user_answer.question_id);
    });

    quiz.Questions.map((question) => {
      if (!answeredQuestionIdList.includes(question.id)) {
        result.push({
          question_id: question.id,
          correct: false,
          correct_answer: question.correct_answer,
          user_answer: null,
        });
      }
      quiz.UserAnswers.map((answer) => {
        if (
          answer.question_id === question.id &&
          answer.user_answer === question.correct_answer
        ) {
          score += 1;
          result.push({
            question_id: question.id,
            correct: true,
            correct_answer: question.correct_answer,
            user_answer: answer.user_answer,
          });
        } else if (
          answer.question_id === question.id &&
          answer.user_answer !== question.correct_answer
        ) {
          result.push({
            question_id: question.id,
            correct: false,
            correct_answer: question.correct_answer,
            user_answer: answer.user_answer,
          });
        }
      });
    });

    if (userlesson !== score) {
      await userlesson.update({ score });
    }

    res.status(200).json({ result, score });
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
  getFollowsCount,
  getFollowing,
  getFollowers,
  editPersonalInfo,
  editEmail,
  editPassword,
  getCategories,
  getLesson,
  postAnswer,
  getAnswer,
  getResult,
};

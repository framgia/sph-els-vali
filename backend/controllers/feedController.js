const fs = require("fs");
const bcrypt = require("bcrypt");
const path = require("path");
const { Op } = require("sequelize");
const {
  User,
  Quiz,
  UserLesson,
  UserAnswer,
  Question,
  Follow,
  ActivityLog,
} = require("../models");

const { sendEmailConfirmation } = require("./userAuthController");

// Controllers

const getActivity = async (req, res, next) => {
  const user_id = req.user;
  const id = Number(req.params.id);

  const activities = await ActivityLog.getActivities(user_id, id);
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
    const learntWordsAndLessons = await UserLesson.getLearntWordsAndLessons(id);
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
    const user = await User.getUser(id);
    const followingIdList = [];

    if (Follows.length > 0) {
      Follows.map((f) => {
        if (f.flag) {
          followingIdList.push(f.following_id);
        }
      });
    }

    follows = followingIdList.includes(id);

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
    const followingIdList = await Follow.getFollowingIdLIst(user_id);

    const usersList = [];
    const users = await User.findAll({
      where: search ? searchQuery : { first_name: { [Op.ne]: null } },
      order: orderBy ? orderByQuery : [["id", "ASC"]],
    });
    users.map(({ id, first_name, last_name, avatar_url, admin }) => {
      usersList.push({
        id,
        first_name,
        last_name,
        avatar_url,
        admin,
        follows: followingIdList.includes(id),
      });
    });
    res.status(200).json({ users: usersList });
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

const getLearntWords = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    const lessons = await UserLesson.findAll({
      where: { user_id },
      attributes: ["quiz_id"],
    });

    const lessons_array = [];

    if (lessons.length > 0) {
      lessons.map((lesson) => {
        if (!lessons_array.includes(lesson.quiz_id)) {
          lessons_array.push(lesson.quiz_id);
        }
      });
    }

    const result = [];

    const quizzes = await Quiz.findAll({
      where: { id: lessons_array },
      attributes: ["name", "id"],
      include: [
        {
          model: Question,
          attributes: ["correct_answer", "title", "id"],
          paranoid: false,
        },
        { model: UserAnswer, where: { user_id, correct: true } },
      ],
      paranoid: false,
    });

    await Promise.all(
      quizzes.map(async (quiz) => {
        result.push({
          id: quiz.id,
          name: quiz.name,
          words: await Promise.all(
            quiz.UserAnswers.map(async (u) => {
              let word;
              await Promise.all(
                quiz.Questions.map(async (question) => {
                  const correct_answer = await Question.findOne({
                    where: { id: question.id },
                    attributes: [question.correct_answer],
                  });
                  if (
                    u.quiz_id === quiz.id &&
                    question.id === u.question_id &&
                    correct_answer[question.correct_answer] === u.user_answer
                  ) {
                    word = {
                      word: question.title,
                      answer: correct_answer[question.correct_answer],
                    };
                  }
                })
              );
              return word;
            })
          ),
        });
      })
    );

    res.status(200).json({ result });
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
  editPersonalInfo,
  editEmail,
  editPassword,
  getLearntWords,
};

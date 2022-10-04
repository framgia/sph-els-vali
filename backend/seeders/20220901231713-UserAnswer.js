"use strict";

const { UserAnswer } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        id: 1,
        user_id: 1,
        question_id: 1,
        user_answer: "Yes",
        quiz_id: 1,
        correct: true,
        createdAt: new Date("2022 02 01 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 02 01 13:01:00 GMT+00:00"),
      },
      {
        id: 2,
        user_id: 1,
        question_id: 2,
        user_answer: "Please",
        quiz_id: 1,
        correct: false,
        createdAt: new Date("2022 02 01 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 02 01 13:01:00 GMT+00:00"),
      },
      {
        id: 3,
        user_id: 1,
        question_id: 3,
        user_answer: "Please",
        quiz_id: 1,
        correct: true,
        createdAt: new Date("2022 02 01 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 02 01 13:01:00 GMT+00:00"),
      },
      {
        id: 4,
        user_id: 1,
        question_id: 4,
        user_answer: "Thank you",
        quiz_id: 1,
        correct: true,
        createdAt: new Date("2022 02 01 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 02 01 13:01:00 GMT+00:00"),
      },
    ];
    return UserAnswer.bulkCreate(data, {
      updateOnDuplicate: Object.keys(UserAnswer.getAttributes()),
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("UserAnswers", null, {});
  },
};

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("UserAnswers", [
      {
        id: 1,
        user_id: 1,
        question_id: 1,
        user_answer: "Yes",
        user_lesson_id: 1,
        createdAt: new Date("2022 02 01 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 02 01 13:01:00 GMT+00:00"),
      },
      {
        id: 2,
        user_id: 1,
        question_id: 1,
        user_answer: "Please",
        user_lesson_id: 1,
        createdAt: new Date("2022 02 01 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 02 01 13:01:00 GMT+00:00"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("UserAnswers", null, {});
  },
};

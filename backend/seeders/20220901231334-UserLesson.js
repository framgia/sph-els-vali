"use strict";

const { UserLesson } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        id: 1,
        user_id: 1,
        quiz_id: 1,
        score: 3,
        createdAt: new Date("2022 02 01 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 02 01 13:01:00 GMT+00:00"),
      },
    ];
    return await UserLesson.bulkCreate(data, {
      updateOnDuplicate: Object.keys(UserLesson.getAttributes()),
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("UserLessons", null, {});
  },
};

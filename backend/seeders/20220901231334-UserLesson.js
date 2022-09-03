"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("UserLessons", [
      {
        id: 1,
        user_id: 1,
        quiz_id: 1,
        score: 3,
        createdAt: new Date("2022 02 01 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 02 01 13:01:00 GMT+00:00"),
      },
      {
        id: 2,
        user_id: 2,
        quiz_id: 2,
        score: 4,
        createdAt: new Date("2022 02 02 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 02 02 13:01:00 GMT+00:00"),
      },
      {
        id: 3,
        user_id: 3,
        quiz_id: 3,
        score: 5,
        createdAt: new Date("2022 02 03 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 02 03 13:01:00 GMT+00:00"),
      },
      {
        id: 4,
        user_id: 4,
        quiz_id: 1,
        score: 2,
        createdAt: new Date("2022 02 04 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 02 04 13:01:00 GMT+00:00"),
      },
      {
        id: 5,
        user_id: 1,
        quiz_id: 2,
        score: 5,
        createdAt: new Date("2022 02 05 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 02 05 13:01:00 GMT+00:00"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("UserLessons", null, {});
  },
};

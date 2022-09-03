"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("ActivityLogs", [
      {
        id: 1,
        relatable_id: 1,
        relatable_type: "quizzes",
        user_id: 1,
        createdAt: new Date("2022 02 01 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 02 01 13:01:00 GMT+00:00"),
      },
      {
        id: 2,
        relatable_id: 2,
        relatable_type: "quizzes",
        user_id: 2,
        createdAt: new Date("2022 02 02 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 02 02 13:01:00 GMT+00:00"),
      },
      {
        id: 3,
        relatable_id: 3,
        relatable_type: "quizzes",
        user_id: 3,
        createdAt: new Date("2022 02 03 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 02 03 13:01:00 GMT+00:00"),
      },
      {
        id: 4,
        relatable_id: 1,
        relatable_type: "quizzes",
        user_id: 4,
        createdAt: new Date("2022 02 04 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 02 04 13:01:00 GMT+00:00"),
      },
      {
        id: 5,
        relatable_id: 3,
        relatable_type: "follows",
        user_id: 1,
        createdAt: new Date("2022 01 05 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 01 07 13:01:00 GMT+00:00"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("ActivityLogs", null, {});
  },
};

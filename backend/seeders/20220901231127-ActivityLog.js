"use strict";

const { ActivityLog } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        id: 1,
        relatable_id: 1,
        relatable_type: "quizzes",
        user_id: 1,
        createdAt: new Date("2022 02 01 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 02 01 13:01:00 GMT+00:00"),
      },
      {
        id: 5,
        relatable_id: 3,
        relatable_type: "follows",
        user_id: 1,
        createdAt: new Date("2022 01 05 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 01 05 13:01:00 GMT+00:00"),
      },
      {
        id: 7,
        relatable_id: 2,
        relatable_type: "follows",
        user_id: 1,
        createdAt: new Date("2022 01 07 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 01 07 13:01:00 GMT+00:00"),
      },
      {
        id: 8,
        relatable_id: 4,
        relatable_type: "follows",
        user_id: 1,
        createdAt: new Date("2022 01 08 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 01 08 13:01:00 GMT+00:00"),
      },
    ];
    return await ActivityLog.bulkCreate(data, {
      updateOnDuplicate: Object.keys(ActivityLog.getAttributes()),
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("ActivityLogs", null, {});
  },
};

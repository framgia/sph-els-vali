"use strict";

const { Follow } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        id: 1,
        follower_id: 1,
        following_id: 3,
        flag: true,
        createdAt: new Date("2022 01 05 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 01 07 13:01:00 GMT+00:00"),
      },
      {
        id: 2,
        follower_id: 1,
        following_id: 2,
        flag: true,
        createdAt: new Date("2022 01 05 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 01 07 13:01:00 GMT+00:00"),
      },
      {
        id: 3,
        follower_id: 1,
        following_id: 4,
        flag: true,
        createdAt: new Date("2022 01 05 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 01 07 13:01:00 GMT+00:00"),
      },
      {
        id: 4,
        follower_id: 1,
        following_id: 5,
        flag: true,
        createdAt: new Date("2022 01 05 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 01 07 13:01:00 GMT+00:00"),
      },
    ];
    return await Follow.bulkCreate(data, {
      updateOnDuplicate: Object.keys(Follow.getAttributes()),
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Follows", null, {});
  },
};

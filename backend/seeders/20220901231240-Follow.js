"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Follows", [
      {
        id: 1,
        follower_id: 1,
        following_id: 3,
        createdAt: new Date("2022 01 05 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 01 07 13:01:00 GMT+00:00"),
      },
      {
        id: 2,
        follower_id: 1,
        following_id: 2,
        createdAt: new Date("2022 01 05 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 01 07 13:01:00 GMT+00:00"),
      },
      {
        id: 3,
        follower_id: 1,
        following_id: 4,
        createdAt: new Date("2022 01 05 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 01 07 13:01:00 GMT+00:00"),
      },
      {
        id: 4,
        follower_id: 1,
        following_id: 5,
        createdAt: new Date("2022 01 05 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 01 07 13:01:00 GMT+00:00"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Follows", null, {});
  },
};

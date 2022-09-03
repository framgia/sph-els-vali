"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Quizzes", [
      {
        id: 1,
        name: "Basic 500",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, sapiente? Non at debitis doloribus placeat porro modi dignissimos voluptas a!",
        createdAt: new Date("2022 01 01 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 01 01 13:01:00 GMT+00:00"),
      },
      {
        id: 2,
        name: "In a restaurant",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, sapiente? Non at debitis doloribus placeat porro modi dignissimos voluptas a!",
        createdAt: new Date("2022 01 01 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 01 01 13:01:00 GMT+00:00"),
      },
      {
        id: 3,
        name: "On a trip",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, sapiente? Non at debitis doloribus placeat porro modi dignissimos voluptas a!",
        createdAt: new Date("2022 01 01 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 01 01 13:01:00 GMT+00:00"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Quizzes", null, {});
  },
};

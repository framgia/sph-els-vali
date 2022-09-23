"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Quizzes", "deletedAt", {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn("Questions", "deletedAt", {
      type: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Quizzes", "deletedAt");
    await queryInterface.removeColumn("Questions", "deletedAt");
  },
};

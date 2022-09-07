"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.addColumn(
        "Follows",
        "flag",
        {
          type: Sequelize.BOOLEAN,
        },
        { transaction: t }
      );
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(
      async (t) => {
        await queryInterface.removeColumn("Follows", "flag", { transaction: t });
      }
    );
  },
};

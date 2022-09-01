"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "verified", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.changeColumn("Users", "avatar_url", {
      type: Sequelize.STRING,
      defaultValue:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "verified");
    await queryInterface.removeColumn("Users", "avatar_url");
  },
};

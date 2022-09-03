"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Follows", {
      fields: ["follower_id"],
      type: "foreign key",
      name: "user_follower_association",
      references: {
        table: "Users",
        field: "id",
      },
    });
    await queryInterface.addConstraint("Follows", {
      fields: ["following_id"],
      type: "foreign key",
      name: "user_following_association",
      references: {
        table: "Users",
        field: "id",
      },
    });
    await queryInterface.changeColumn("Follows", "follower_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.changeColumn("Follows", "following_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Follows", "follower_id");
    await queryInterface.removeColumn("Follows", "following_id");
  },
};

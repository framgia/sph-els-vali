"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("ActivityLogs", "user_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addConstraint("ActivityLogs", {
      fields: ["user_id"],
      type: "foreign key",
      name: "user_acitvitylog_association",
      references: {
        table: "Users",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "ActivityLogs",
      "user_acitvitylog_association"
    );
    await queryInterface.removeColumn("ActivityLogs", "user_id");
  },
};

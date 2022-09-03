"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("UserLessons", {
      fields: ["user_id"],
      type: "foreign key",
      name: "user_lessons-user-association",
      references: {
        table: "Users",
        field: "id",
      },
    });
    await queryInterface.addConstraint("UserLessons", {
      fields: ["quiz_id"],
      type: "foreign key",
      name: "user_lessons-quiz_association",
      references: {
        table: "Quizzes",
        field: "id",
      },
    });
    await queryInterface.changeColumn("UserLessons", "user_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.changeColumn("UserLessons", "quiz_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("UserLessons", "user_id");
    await queryInterface.removeColumn("UserLessons", "quiz_id");
  },
};

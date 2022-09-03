"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Questions", "quiz_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addConstraint("Questions", {
      fields: ["quiz_id"],
      type: "foreign key",
      name: "quiz-question-association",
      references: {
        table: "Quizzes",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Questions", "quiz_id");
  },
};

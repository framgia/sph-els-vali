"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "UserAnswers",
      "user_lesson_id",
      "quiz_id"
    );

    await queryInterface.addConstraint("UserAnswers", {
      fields: ["user_id"],
      type: "foreign key",
      name: "user-answer-association",
      references: {
        table: "Users",
        field: "id",
      },
    });

    await queryInterface.addConstraint("UserAnswers", {
      fields: ["question_id"],
      type: "foreign key",
      name: "question-answer-association",
      references: {
        table: "Questions",
        field: "id",
      },
    });

    await queryInterface.addConstraint("UserAnswers", {
      fields: ["quiz_id"],
      type: "foreign key",
      name: "quiz-answer-association",
      references: {
        table: "Quizzes",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("UserAnswers", "quiz_id");
    await queryInterface.removeColumn("UserAnswers", "question_id");
    await queryInterface.removeColumn("UserAnswers", "user_id");
  },
};

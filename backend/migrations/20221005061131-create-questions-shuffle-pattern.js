"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("QuestionsShufflePatterns", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          field: "id",
        },
      },
      quiz_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Quizzes",
          field: "id",
        },
      },
      questions_shuffle_array: {
        type: Sequelize.JSON,
      },
      choices_shuffle_array: {
        type: Sequelize.JSON,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("QuestionsShufflePatterns");
  },
};

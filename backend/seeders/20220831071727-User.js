"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        first_name: "John",
        last_name: "Doe",
        email: "example@example.com",
        password:
          "$2b$10$ZYP5a8PkVzuU439ZQpd0r.inRmj6Teax/.tzy.pQOTkyU1SqJcEc.",
        avatar_url: "https://www.istockphoto.com/illustrations/avatar-icons",
        verified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: "Josh",
        last_name: "Donny",
        email: "check@check.com",
        password:
          "$2b$10$jkzAan4N6DmF.XxTpkeZu.MXwnB7YzFg.yuKtD8t8UcAjygIVtdu2",
        avatar_url: "https://www.istockphoto.com/illustrations/avatar-icons",
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};

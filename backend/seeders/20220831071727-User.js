"use strict";

const { User } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    return await User.bulkCreate([
      {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        email: "example@example.com",
        password:
          "$2b$10$ZYP5a8PkVzuU439ZQpd0r.inRmj6Teax/.tzy.pQOTkyU1SqJcEc.",
        avatar_url: `${process.env.BACKEND_URL}/images/default-icon.webp`,
        verified: true,
        admin: true,
        createdAt: new Date("2022 01 01 13:01:00 GMT+00:00"),
        updatedAt: new Date("2022 01 01 13:01:00 GMT+00:00"),
      },
      {
        id: 2,
        first_name: "Josh",
        last_name: "Donny",
        email: "check@check.com",
        password:
          "$2b$10$jkzAan4N6DmF.XxTpkeZu.MXwnB7YzFg.yuKtD8t8UcAjygIVtdu2",
        avatar_url: `${process.env.BACKEND_URL}/images/default-icon.webp`,
        verified: true,
        admin: false,
        createdAt: new Date("2022 01 02 14:05:00 GMT+00:00"),
        updatedAt: new Date("2022 01 02 14:05:00 GMT+00:00"),
      },
      {
        id: 3,
        first_name: "David",
        last_name: "Atkins",
        email: "user@user.com",
        password:
          "$2b$10$OtQ1/fb1yBD9YdU5G75/du9IvY7wuRGbqf687deuDLmxKTJlNyHqC",
        avatar_url: `${process.env.BACKEND_URL}/images/default-icon.webp`,
        verified: true,
        admin: false,
        createdAt: new Date("2022 01 03 14:05:00 GMT+00:00"),
        updatedAt: new Date("2022 01 03 14:05:00 GMT+00:00"),
      },
      {
        id: 4,
        first_name: "Jake",
        last_name: "Jones",
        email: "user1@user.com",
        password:
          "$2b$10$RcGbGZXnKe5DZozG6A1gpuiD2Feq6r3qJGBc4K0hcUWayfvKVu8LS",
        avatar_url: `${process.env.BACKEND_URL}/images/default-icon.webp`,
        verified: true,
        admin: false,
        createdAt: new Date("2022 01 04 14:05:00 GMT+00:00"),
        updatedAt: new Date("2022 01 04 14:05:00 GMT+00:00"),
      },
      {
        id: 5,
        first_name: "Peter",
        last_name: "Emerson",
        email: "user2@user.com",
        password:
          "$2b$10$MWuR3qLM1PV.0rNNrBblgeZ9rBAk5HU1jzpkW8MmZSmC0dVnAdxUu",
        avatar_url: `${process.env.BACKEND_URL}/images/default-icon.webp`,
        verified: true,
        admin: false,
        createdAt: new Date("2022 01 05 14:05:00 GMT+00:00"),
        updatedAt: new Date("2022 01 05 14:05:00 GMT+00:00"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};

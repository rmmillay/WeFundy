"use strict";

const { category } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await donation.bulkCreate(
      [
        {
          fundraiserId: 1,
          categoryName: 'Causes',
        },
        {
          fundraiserId: 2,
            categoryName: 'Education',
        },
        {
          fundraiserId: 3,
          categoryName: 'Entrepreneur',
        },
        {
          fundraiserId: 4,
          categoryName: 'Experiences',
        },
        {
          fundraiserId: 5,
          categoryName: 'Travel',
        },
        {
          fundraiserId: 6,
          categoryName: 'Urgent',
        },
        {
          fundraiserId: 3,
          categoryName: 'General',
        },

      ],
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "categories"; 
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  },
};

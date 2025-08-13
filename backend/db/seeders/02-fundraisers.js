'use strict';

const { fundraiser } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await fundraiser.bulkCreate([
      {
        userId: 1,
        // donationId: 1,
        country: "USA", 
        fundName: "Water Voyage",
        description: "Drip, water, splash",
        goal: 55.00,
        goalProgress: 5.00,
      },
      {
        userId: 2,
        // donationId: 1,
        country: "USA", 
        fundName: "Safari",
        description: "Lions and tigers, oh my!",
        goal: 800.00,
        goalProgress: 100.00,
      },
            {
        userId: 3,
        // donationId: 1,
        country: "France", 
        fundName: "Clothing line",
        description: "Entrepreneurship",
        goal: 10000.00,
        goalProgress: 300.00,
      },
            {
        userId: 4,
        // donationId: 1,
        country: "USA", 
        fundName: "College journey",
        description: "Masters degree",
        goal: 5500.00,
        goalProgress: 20.00,
      },
            {
        userId: 5,
        // donationId: 1,
        country: "Japan", 
        fundName: "Self discovery journey",
        description: "Eat, pray, love",
        goal: 2000.00,
        goalProgress: 75.00,
      },
            {
        userId: 1,
        // donationId: 1,
        country: "Africa", 
        fundName: "Starvin Marvin",
        description: "Pot pie", 
        goal: 80.00,
        goalProgress: 70.00,
      },
            {
        userId: 2,
        // donationId: 1,
        country: "England", 
        fundName: "Oxford",
        description: "Dorms n stuff",
        goal: 900.00,
        goalProgress: 45.00,
      },
      

    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'fundraiser';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    }, {});
  }
};
'use strict';

const { Fundraiser } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Fundraiser.bulkCreate([
      // return queryInterface.bulkInsert('Fundraisers', [

      {
        ownerId: 1,
        categoryId: 1,
        country: "USA",  
        fundName: "Water Voyage",
        description: "Drip, water, splash",
        goal: 55.00,
        //goalProgress: 5.00,
        startDate: '2025-01-10',
        endDate: '2025-01-15'
      },
      {
        ownerId: 2,
        categoryId: 2,
        country: "USA", 
        fundName: "Safari",
        description: "Lions and tigers, oh my!",
        goal: 800.00,
        //goalProgress: 100.00,
        startDate: '2024-02-11',
        endDate: '2024-02-15'
      },
      {
        ownerId: 3,
        categoryId: 3,
        country: "France", 
        fundName: "Clothing line",
        description: "Entrepreneurship",
        goal: 10000.00,
        //goalProgress: 300.00,
        startDate: '2023-03-09',
        endDate: '2023-03-15'
      },
      {
        ownerId: 4,
        categoryId: 4,
        country: "USA", 
        fundName: "College journey",
        description: "Masters degree",
        goal: 5500.00,
        //goalProgress: 20.00,
        startDate: '2022-05-30',
        endDate: '2022-06-04'
      },
      {
        ownerId: 5,
        categoryId: 5,
        country: "Japan", 
        fundName: "Self discovery journey",
        description: "Eat, pray, love",
        goal: 2000.00,
        //goalProgress: 75.00,
        startDate: '2024-07-30',
        endDate: '2024-08-03'
      },
      {
        ownerId: 1,
        categoryId: 6,
        country: "Africa", 
        fundName: "Starvin Marvin",
        description: "Pot pie", 
        goal: 80.00,
        //goalProgress: 70.00,
        startDate: '2025-05-20',
        endDate: '2025-06-11'
      },
      {
        ownerId: 2,
        categoryId: 7,
        country: "England", 
        fundName: "Oxford",
        description: "Dorms n stuff",
        goal: 900.00,
        //goalProgress: 45.00,
        startDate: '2025-08-05',
        endDate: '2025-08-12'
      },
       

    ], 
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Fundraisers';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    }, {});
  }
};
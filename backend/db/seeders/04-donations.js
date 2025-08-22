"use strict";

const { Donation } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await Donation.bulkCreate(
      [
        {
          donorId: 1,
          fundraiserId: 1, 
          donationAmount: 50.00,
          message: "Here ya go",
          //created_at: "2025-02-11",
          //updated_at: "2025-02-11"
        },
        { 
          donorId: 2,
          fundraiserId: 2,
          donationAmount: 20.00,
          message: "Best wishes",
          //created_at: "2025-02-15",
          //updated_at: "2025-02-15"
        },
        {  
          donorId: 3,
          fundraiserId: 3,
          donationAmount: 100.00,
          message: "Good luck",
          //created_at: "2025-02-18",
          //updated_at: "2025-02-18"
        },
        { 
          donorId: 4,
          fundraiserId: 4,
          donationAmount: 35.00,
          message: "Hope this helps",
          //created_at: "2025-02-21",
          //updated_at: "2025-02-22"
        },
        {
          donorId: 5,
          fundraiserId: 5,
          donationAmount: 15.00,
          message: "Great cause!",
          //created_at: "2025-02-25",
          //updated_at: "2025-02-28"
        }, 
        {
          donorId: 6,
          fundraiserId: 6,
          donationAmount: 200.00,
          message: "Good ideas!",
          //created_at: "2025-03-01",
          //updated_at: "2025-03-01"
        },
        {
          donorId: 7,
          fundraiserId: 7,
          donationAmount: 10.00,
          message: "I support that",
          //created_at: "2025-03-05",
          //updated_at: "2025-03-05"
        },

      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Donations";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  },
};

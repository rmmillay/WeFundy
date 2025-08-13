"use strict";

const { comment } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await comment.bulkCreate(
      [
        {
          fundraiserId: 1,
          userId: 1,
          comment: "Where is this located?",
          created_at: "2025-02-11",
          updated_at: "2025-02-11"
        },
        {
          fundraiserId: 2,
          userId: 2,
          comment: "I have a boat too!",
          created_at: "2025-02-15",
          updated_at: "2025-02-15"
        },
        {
          fundraiserId: 3,
          userId: 3,
          comment: "Yea thats a good trip idea, I did that too",
          created_at: "2025-02-18",
          updated_at: "2025-02-18"
        },
        {
          fundraiserId: 4,
          userId: 4,
          comment: "This cause is what we need!",
          created_at: "2025-02-21",
          updated_at: "2025-02-22"
        },
        {
          fundraiserId: 5,
          userId: 5,
          comment: "How many donations do you have?",
          created_at: "2025-02-25",
          updated_at: "2025-02-28"
        },
        {
          fundraiserId: 6,
          userId: 1,
          comment: "Anyone else do this same thing?",
          created_at: "2025-03-01",
          updated_at: "2025-03-01"
        },
        {
          fundraiserId: 3,
          userId: 4,
          comment: "Tell us more!",
          created_at: "2025-03-05",
          updated_at: "2025-03-05"
        },

      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "comments";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  },
};

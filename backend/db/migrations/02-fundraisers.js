"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Fundraisers",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        ownerId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        categoryId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Categories",
            key: "id",
          },
          onDelete: "CASCADE",
        },

        country: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        fundName: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
        description: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
        goal: {
          type: Sequelize.DECIMAL(100, 2),
          allowNull: false,
        },
        // goalProgress: {
        //   type: Sequelize.DECIMAL(100, 2),
        //   allowNull: false,
        // },
        startDate: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        endDate: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Fundraisers");
  },
};

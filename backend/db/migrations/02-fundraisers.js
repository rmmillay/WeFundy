'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
 
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('fundraisers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      categoryId: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      country: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      fundName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      goal: {
        type: Sequelize.DECIMAL(100, 2),
        allowNull: false,
      },
      goalProgress: {
        type: Sequelize.DECIMAL(100, 2),
        allowNull: false,
      },
      startDate: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      endDate: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },

    }, options);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('fundraisers');
  }
};
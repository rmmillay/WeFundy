'use strict';


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {

      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      fundraiserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "fundraisers",
          key: "id"
        },

      },
      donorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        },
      },

    }, options); 
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
  }
};
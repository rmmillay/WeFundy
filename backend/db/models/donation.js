'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Donation extends Model {
    static associate(models) {
      // define association here


      Donation.belongsTo(models.User, {
        foreignKey: 'donorId', as: 'Donor',
        onDelete: "CASCADE",
        hooks: true
      });
      Donation.belongsTo(models.Fundraiser, {
        foreignKey: "fundraiserId",
        onDelete: "CASCADE",
        hooks: true 
      });
    };
  };

  Donation.init(
    {

      donorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }, 
      fundraiserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      donationAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: { 
          isDecimal: true
        }
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 1000]
        }
      },
    },
    
    {
      sequelize,
      modelName: 'Donation',
      // defaultScope: {
      //   attributes: {
      //     exclude: ['createdAt', 'updatedAt'],
      //   },
      // },
    }
  );

  return Donation;
};
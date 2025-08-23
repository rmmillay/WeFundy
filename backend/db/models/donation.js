'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
    static associate(models) {
      // define association here


      Donation.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: "CASCADE",
        hooks: true
      });
      Donation.belongsTo(models.Fundraiser, {
        foreignKey: "fundraiserId",
        onDelete: "CASCADE",
        hooks: true 
      });
    }
  }

  Donation.init(
    {

      userId: {
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
      createdAt: {
        type: DataTypes.DATE,
      },

      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    
    {
      sequelize,
      modelName: 'Donation',
      defaultScope: {
        attributes: {
      //     exclude: ['createdAt', 'updatedAt'],
        },
      },
    }
  );

  return Donation;
};
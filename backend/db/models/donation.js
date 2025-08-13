'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Donation extends Model {
    static associate(models) {
      // define association here


      Donation.belongsTo(models.user, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true
      });
      Donation.belongsTo(models.fundraiser, {
        foreignKey: "fundraiserId",
        onDelete: "CASCADE",
        hooks: true 
      });
      // Donation.hasMany(models.fundraiser, {
      //   foreignKey: "donationId",
      //   onDelete: "CASCADE",
      //   hooks: true
      // });

      Donation.hasOne(models.user, {
        foreignKey: "donationId",
        onDelete: "CASCADE",
        hooks: true
      });
      Donation.hasOne(models.fundraiser, {
        foreignKey: "donationId",
        onDelete: "CASCADE",
        hooks: true 
      });
      

    };
  };

  Donation.init(
    {
      fundraiserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
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
      modelName: 'donation',
    }
  );

  return Donation;
};
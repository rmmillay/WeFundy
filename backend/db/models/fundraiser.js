'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Fundraiser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here


      Fundraiser.belongsTo(models.User, {
        foreignKey: 'ownerId', as: 'Owner',
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true
      });
      Fundraiser.belongsTo(models.Category, {
        foreignKey: "categoryId",
        onDelete: "CASCADE",
        hooks: true
      });

      Fundraiser.hasMany(models.Donation, {
        foreignKey: "fundraiserId", 
        onDelete: "CASCADE",
        hooks: true
      });
      Fundraiser.hasMany(models.Comment, {
        foreignKey: "fundraiserId",
        onDelete: "CASCADE",
        hooks: true
      });

    }
  }

  Fundraiser.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
      },

      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256]
        },
      },

      fundName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256]
        },
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 1000]
        }
      },

      goal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: true
        }
      },

      // goalProgress: {
      //   type: DataTypes.DECIMAL(10, 2),
      //   allowNull: false,
      //   validate: {
      //     isDecimal: true
      //   }
      // },
      
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },

      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
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
      modelName: 'Fundraiser',
      defaultScope: {
        attributes: {
          // exclude: ['createdAt', 'updatedAt'],
        },
      }, 
    }
  );
  return Fundraiser;
};
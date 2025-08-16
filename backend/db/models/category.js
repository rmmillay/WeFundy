'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Category extends Model {
    static associate(models) {
      // define association here

      Category.hasMany(models.Fundraiser, {
        foreignKey: "categoryId",
        onDelete: "CASCADE",
        hooks: true
      });
    };
  };

  Category.init(
    {

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fundraiserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      
      categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: 'Category',
    }
  );

  return Category;
};
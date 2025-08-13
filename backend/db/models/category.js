'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Category extends Model {
    static associate(models) {
      // define association here
 

      Category.belongsTo(models.fundraiser, {
        foreignKey: "fundraiserId",
        onDelete: "CASCADE",
        hooks: true
      });

      Category.hasMany(models.fundraiser, {
        foreignKey: "categoryId",
        onDelete: "CASCADE",
        hooks: true
      });
    };
  };

  Category.init(
    {
      fundraiserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    
    {
      sequelize,
      modelName: 'category',
    }
  );

  return Category;
};
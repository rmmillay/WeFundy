'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Comment extends Model {
    static associate(models) {
      // define association here

      Comment.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true
      });
      Comment.belongsTo(models.Fundraiser, {
        foreignKey: "fundraiserId",
        onDelete: "CASCADE",
        hooks: true 
      });
    };
  };


  Comment.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fundraiserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      modelName: 'Comment',
    }
  );

  return Comment;
};
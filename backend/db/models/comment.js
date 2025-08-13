'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Comment extends Model {
    static associate(models) {
      // define association here

      Comment.belongsTo(models.user, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true
      });
      Comment.belongsTo(models.donation, {
        foreignKey: "donationId",
        onDelete: "CASCADE",
        hooks: true
      }); 
      Comment.belongsTo(models.fundraiser, {
        foreignKey: "fundraiserId",
        onDelete: "CASCADE",
        hooks: true 
      });

      Comment.hasMany(models.user, {
        foreignKey: "commentId",
        onDelete: "CASCADE",
        hooks: true
      });
    };
  };


  Comment.init(
    {
      fundraiserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      donorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    

    {
      sequelize,
      modelName: 'comment',
    }
  );

  return Comment;
};
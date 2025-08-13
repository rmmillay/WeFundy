'use strict';
const {
  Model,
  Validator
} = Require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here\ 

      // User.belongsTo(models.fundraiser, {
      //   foreignKey: "fundraiserId",
      //   onDelete: "CASCADE",
      //   hooks: true
      // });
      // User.belongsTo(models.donation, {
      //   foreignKey: "donationId",
      //   onDelete: "CASCADE",
      //   hooks: true
      // });

      User.hasMany(models.donation, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true
      });
      User.hasMany(models.fundraiser, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true
      });
      User.hasMany(models.comments, {
        foreignKey: "userId", 
        onDelete: "CASCADE",
        hooks: true
      });
    }

  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    profileImg: {
      type: DataTypes.STRING,
      defaultValue: ''
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    }
  });
  return User;
};

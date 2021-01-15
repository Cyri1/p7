'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {

      models.User.hasMany(models.Post, {
        allowNull: false,
        foreignKey: 'userId'
      });

      models.User.hasMany(models.Comment, {
        allowNull: false,
        foreignKey: 'userId'
      });

      models.User.hasMany(models.Like, {
        allowNull: false,
        foreignKey: 'userId'
      });

    }
  };
  User.init({
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    bio: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    imageUrl: DataTypes.STRING,
    username: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      models.Like.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      
      models.Like.belongsTo(models.Post, {
        foreignKey: 'postId'
      });
    }
  };
  Like.init({
    likeId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};


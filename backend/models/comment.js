'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      models.Comment.belongsTo(models.User, {
        foreignKey: 'userId'
      });

      models.Comment.belongsTo(models.Post, {
        foreignKey: 'postId'
      });
    }
  };
  Comment.init({
    commentId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    commentContent: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
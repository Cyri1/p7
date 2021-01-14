'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      models.Post.belongsTo(models.User, {
        foreignKey: 'userId'
      });

      models.Post.hasMany(models.Comment, {
        allowNull:false,
        foreignKey: 'postId'
      });

      models.Post.hasMany(models.Like, {
        allowNull:false,
        foreignKey: 'postId'
      });
    }
  };
  Post.init({
    userId: DataTypes.INTEGER,
    postTitle: DataTypes.STRING,
    postContent: DataTypes.STRING,
    postImageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};

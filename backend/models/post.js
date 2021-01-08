'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull:false
        }
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
    postContent: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
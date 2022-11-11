'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, ServerComment, UserComment}) {
      // define association here
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.hasMany(ServerComment, { foreignKey: 'comment_id' });
      this.hasMany(UserComment, { foreignKey: 'comment_id' });
    }
  }
  Comment.init({
    user_id: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Comment}) {
      // define association here
      this.belongsTo(User, { foreignKey: 'server_id' });
      this.belongsTo(Comment, { foreignKey: 'comment_id' });
    }
  }
  UserComment.init({
    comment_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserComment',
  });
  return UserComment;
};

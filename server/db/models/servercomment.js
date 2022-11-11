'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServerComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ServerVPN, Comment}) {
      // define association here
      this.belongsTo(ServerVPN, { foreignKey: 'server_id' });
      this.belongsTo(Comment, { foreignKey: 'comment_id' });
    }
  }
  ServerComment.init({
    comment_id: DataTypes.INTEGER,
    server_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ServerComment',
  });
  return ServerComment;
};

'use strict';
const {
  Model
} = require('sequelize');
const server = require('./server');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, ServerVPN}) {
      // define association here
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(ServerVPN, { foreignKey: 'server_id' });
    }
  }
  File.init({
    user_id: DataTypes.INTEGER,
    config_path: DataTypes.STRING,
    server_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'File',
  });
  return File;
};

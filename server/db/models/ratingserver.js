'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RatingServer extends Model {
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
  RatingServer.init({
    user_id: DataTypes.INTEGER,
    server_id: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RatingServer',
  });
  return RatingServer;
};

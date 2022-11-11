'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServerVPN extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, File, ServerComment, RatingServer}) {
      // define association here
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.hasMany(File, { foreignKey: 'server_id' });
      this.hasMany(ServerComment, { foreignKey: 'server_id' });
      this.hasMany(RatingServer, { foreignKey: 'server_id' });
    }
  }
  ServerVPN.init({
    ip: DataTypes.STRING,
    location: DataTypes.STRING,
    protocol: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ServerVPN',
  });
  return ServerVPN;
};

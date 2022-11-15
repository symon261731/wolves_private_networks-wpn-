'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Order}) {
      // define association here
      this.belongsTo(User, { foreignKey: 'creator' });
      this.belongsTo(User, { foreignKey: 'worker' });
      this.belongsTo(Order, { foreignKey: 'order_id' });
    }
  }
  OrderUser.init({
    order_id: DataTypes.INTEGER,
    creator: DataTypes.INTEGER,
    worker: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OrderUser',
  });
  return OrderUser;
};

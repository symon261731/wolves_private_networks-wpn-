'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, OrderUser}) {
      // define association here
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.hasMany(OrderUser, { foreignKey: 'order_id' });
    }
  }
  Order.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    location: DataTypes.STRING,
    protocol: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};

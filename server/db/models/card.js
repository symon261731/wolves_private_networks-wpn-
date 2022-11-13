'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Transaction}) {
      // define association here
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.hasMany(Transaction, { foreignKey: 'card_id' });
    }
  }
  Card.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    card_number: DataTypes.STRING,
    expire_date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};

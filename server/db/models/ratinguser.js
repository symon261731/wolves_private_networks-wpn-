'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RatingUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User, { foreignKey: 'author' });
      this.belongsTo(User, { foreignKey: 'user_id' });
    }
  }
  RatingUser.init({
    author: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RatingUser',
  });
  return RatingUser;
};

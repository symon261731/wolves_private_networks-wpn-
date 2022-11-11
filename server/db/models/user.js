'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ServerVPN, File, Comment, UserComment, RatingServer, RatingUser}) {
      // define association here
      this.hasMany(ServerVPN, { foreignKey: 'user_id' });
      this.hasMany(File, { foreignKey: 'user_id' });
      this.hasMany(Comment, { foreignKey: 'user_id' });
      this.hasMany(UserComment, { foreignKey: 'user_id' });
      this.hasMany(RatingServer, { foreignKey: 'user_id' });
      this.hasMany(RatingUser, { foreignKey: 'user_id' });
      this.hasMany(RatingUser, { foreignKey: 'author' });
    }
  }
  User.init({
    login: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    pocket: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

const { faker } = require('@faker-js/faker');
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    //User
    const users = [];
    for (let i = 0; i < 20; i += 1) {
      users.push({
    //     login: DataTypes.STRING,
    // email: DataTypes.STRING,
    // password: DataTypes.STRING,
    // name: DataTypes.STRING,
    // pocket: DataTypes.INTEGER,
    // rating: DataTypes.INTEGER,
    // img: DataTypes.STRING
        login: 
      })
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

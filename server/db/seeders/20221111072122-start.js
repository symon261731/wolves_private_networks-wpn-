const { faker } = require('@faker-js/faker');
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
const bcrypt = require('bcrypt');

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
    // pocket: DataTypes.INTEGER,
    // rating: DataTypes.INTEGER,
    // img: DataTypes.STRING
        login: uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] }),
        email: faker.internet.email(),
        password: faker.music.songName(),
        pocket: Math.floor(Math.random() * 1000000),
        rating: Math.floor(Math.random() * 1000),
        img: '/img/avatar.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    for (const user of users) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    await queryInterface.bulkInsert('Users', users, {});
    // ServerVPN
    const vpns = [];
    for (let i = 0; i < 40; i += 1) {
      vpns.push({
    //         ip: DataTypes.STRING,
    // location: DataTypes.STRING,
    // protocol: DataTypes.STRING,
    // rating: DataTypes.INTEGER,
    // user_id: DataTypes.INTEGER,
    // price: DataTypes.INTEGER
        ip: faker.internet.ipv4(),
        location: faker.address.country(),
        protocol: 'very secure swear to God',
        rating: Math.floor(Math.random() * 1000),
        user_id: Math.floor(Math.random() * 19 + 1),
        price: Math.floor(Math.random() * 1000000),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    await queryInterface.bulkInsert('ServerVPNs', vpns, {});
    // File 
    const files = [];
    for (let i = 0; i < 40; i += 1) {
      files.push({
    //     user_id: DataTypes.INTEGER,
    // config_path: DataTypes.STRING,
    // server_id: DataTypes.INTEGER
        user_id: Math.floor(Math.random() * 19 + 1),
        server_id: Math.floor(Math.random() * 39 + 1),
        config_path: '/very/secure/path',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    await queryInterface.bulkInsert('Files', files, {});

    const comments = [];
    for (let i = 0; i < 100; i += 1) {
    //   user_id: DataTypes.INTEGER,
    // content: DataTypes.TEXT
      comments.push({
        user_id: Math.floor(Math.random() * 19 + 1),
        content: faker.commerce.productDescription(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    await queryInterface.bulkInsert('Comments', comments, {});

    const orders = [];
    for (let i = 0; i < 50; i += 1) {
    //   user_id: DataTypes.INTEGER,
    // title: DataTypes.STRING,
    // price: DataTypes.INTEGER,
    // location: DataTypes.STRING,
    // protocol: DataTypes.STRING
      orders.push({
        user_id: Math.floor(Math.random() * 19 + 1),
        title: faker.commerce.productName(),
        price: Math.floor(Math.random() * 1000000),
        location: faker.address.country(),
        protocol: 'very secure swear to God',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    await queryInterface.bulkInsert('Orders', orders, {});

    // ServerComment
    const temp = [];
    for (let i = 0; i < 50; i += 1) {
    //   comment_id: DataTypes.INTEGER,
    // server_id: DataTypes.INTEGER
      temp.push({
        server_id: Math.floor(Math.random() * 39 + 1),
        comment_id: Math.floor(Math.random() * 99 + 1),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    await queryInterface.bulkInsert('ServerComments', temp, {});

    // UserComment
    const temp2 = [];
    for (let i = 0; i < 50; i += 1) {
    //   comment_id: DataTypes.INTEGER,
    // user_id: DataTypes.INTEGER
      temp2.push({
        comment_id: Math.floor(Math.random() * 99 + 1),
        user_id: Math.floor(Math.random() * 19 + 1),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    await queryInterface.bulkInsert('UserComments', temp2, {});

    //OrderUser
    const temp3 = [];
    for (let i = 0; i < 20; i += 1) {
    //   order_id: DataTypes.INTEGER,
    // creator: DataTypes.INTEGER,
    // worker: DataTypes.INTEGER
      temp3.push({
        order_id: i,
        creator: orders[i]['user_id'],
        worker: Math.floor(Math.random() * 19 + 1),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    await queryInterface.bulkInsert('OrderUsers', temp3, {});
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

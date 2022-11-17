const { faker } = require('@faker-js/faker');
const {
  uniqueNamesGenerator, adjectives, colors, animals,
} = require('unique-names-generator');
const bcrypt = require('bcrypt');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    // User
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
        password: '123',
        pocket: Math.floor(Math.random() * 1000000),
        rating: Math.floor(Math.random() * 1000),
        img: '/img/avatar.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    for (const user of users) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    await queryInterface.bulkInsert('Users', users, {});
    // ServerVPN
    const vpns = [];
    const protocols =['WireGuard', 'OpenVPN', 'L2TP/IPsec']
    for (let i = 0; i < 30; i += 1) {
      vpns.push({
        ip: faker.internet.ipv4(),
        location: faker.address.country(),
        protocol: protocols[Math.floor(Math.random() * 3)],
        rating: Math.floor(Math.random() * 10000),
        user_id: Math.floor(Math.random() * 20 + 1),
        price: Math.floor(Math.random() * 10000),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('ServerVPNs', vpns, {});
    // File
    // const files = [];
    // for (let i = 0; i < 40; i += 1) {
    //   files.push({
    //     //     user_id: DataTypes.INTEGER,
    //     // config_path: DataTypes.STRING,
    //     // server_id: DataTypes.INTEGER
    //     user_id: Math.floor(Math.random() * 19 + 1),
    //     server_id: Math.floor(Math.random() * 5 + 1),
    //     config_path: '/very/secure/path',
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   });
    // }
    //await queryInterface.bulkInsert('Files', files, {});

    const comments = [];
    const text = [
      // блок про сервера
      'Found out today what this VPN had security breach and have poor PKI management. Attacker got access to one of the servers. That\'s enough to say goodbye. They can put millions in ads, but don\'t put money in security.',
      'Good service! Recommend for all!',
      'Great VPN service for reasonable price',
      'Overpriced, IMHO',
      'NC, the worst VPN in my life',
      'First comment ever!',
      'This server is the best answer your prayer. Anything else is a compromise. It\'s a bit pricier than other options. But it\'s solid AF. And it never take your information. Heck you could even pay by cash in an envelope with no return address. 100% most trustworthy.',
      'VPN is very cheap, and does the job well for me',
      'Works great for me',
      'the worst purchase in my life!!!!! Don\'t use it!!! Seriously!!!!',
      // блок про юзера
      'Great guy! Khow him in person!',
      'Made an order for me: fast, cheap and VPN is really working! Highly recommend!',
      'I made an order for him and he didn\'t approve it! Where is my money, Lebovski?!!!!',
      'Provide great service',
      'You think you block me everywhere, asshole?! I find you! Don\'t trust this guy - take an order and do nothing in return!',
      'Nice guy',
      'The best VPN owner ever! His mom.'
    ]
    for (let i = 0; i < 17; i += 1) {
    //   user_id: DataTypes.INTEGER,
    // content: DataTypes.TEXT
      comments.push({
        user_id: Math.floor(Math.random() * 20 + 1),
        content: text[i],
        rating: Math.floor(Math.random() * 10000),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('Comments', comments, {});

    const orders = [];
    const titles = [
      'need fast',
      'URGENT!!!!',
      'ready for price negotiation',
      'pls',
      'help me!',
    ]
    for (let i = 0; i < 5; i += 1) {
      const country = faker.address.country();
      orders.push({
        user_id: Math.floor(Math.random() * 20 + 1),
        title: `${country.toUpperCase()} ${titles[Math.floor(Math.random() * 4)]}`,
        price: Math.floor(Math.random() * 1000000),
        location: country,
        protocol: protocols[Math.floor(Math.random() * 3)],
        status: 'in progress',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    for (let i = 0; i < 10; i += 1) {
      const country = faker.address.country();
      orders.push({
        user_id: Math.floor(Math.random() * 20 + 1),
        title: `${country.toUpperCase()} ${titles[Math.floor(Math.random() * 4)]}`,
        price: Math.floor(Math.random() * 1000000),
        location: country,
        protocol: protocols[Math.floor(Math.random() * 3)],
        status: 'open',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('Orders', orders, {});

    // ServerComment
    const temp = [];
    for (let i = 0; i < 50; i += 1) {
      temp.push({
        server_id: Math.floor(Math.random() * 30 + 1),
        comment_id: Math.floor(Math.random() * 10 + 1),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('ServerComments', temp, {});

    // UserComment
    const temp2 = [];
    for (let i = 0; i < 50; i += 1) {
    //   comment_id: DataTypes.INTEGER,
    // user_id: DataTypes.INTEGER
      temp2.push({
        comment_id: Math.floor(Math.random() * 7 + 10),
        user_id: Math.floor(Math.random() * 20 + 1),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('UserComments', temp2, {});

    // OrderUser
    const temp3 = [];
    for (let i = 0; i < 5; i += 1) {
    //   order_id: DataTypes.INTEGER,
    // creator: DataTypes.INTEGER,
    // worker: DataTypes.INTEGER
      temp3.push({
        order_id: i + 1,
        creator: orders[i]['user_id'],
        worker: Math.floor(Math.random() * 20 + 1),
        status: 'open',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('OrderUsers', temp3, {});

    // Purchase
    const purchases = [];
    for (let i = 0; i < 30; i += 1) {
      purchases.push({
        user_id: Math.floor(Math.random() * 20 + 1),
        server_id: Math.floor(Math.random() * 30 + 1),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('Purchases', purchases, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Purchases', null, {});
    await queryInterface.bulkDelete('OrderUsers', null, {});
    await queryInterface.bulkDelete('UserComments', null, {});
    await queryInterface.bulkDelete('ServerComments', null, {});
    await queryInterface.bulkDelete('Orders', null, {});
    await queryInterface.bulkDelete('Comments', null, {});
    await queryInterface.bulkDelete('Files', null, {});
    await queryInterface.bulkDelete('ServerVPNs', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};

const express = require('express');
const { Op } = require('sequelize');
const { ServerVPN, Purchase, User } = require('../db/models');

const router = express.Router();

// /api/server/all - получить все впн
router.get('/all', async (req, res) => {
  try {
    const vpns = await ServerVPN.findAll({
      include: {
        model: User,
        required: true,
      },
    });
    return res.json(vpns);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' });
  }
});

router.post('/filter', async (req, res) => {
  let options = req.body?.input;
  // eslint-disable-next-line no-unused-expressions
  !options ? options = {
    location: '',
    protocol: ['WireGuard', 'OpenVPN', 'L2TP/IPsec'],
    from: 0,
    to: 1000000000,
    ownerName: '',
    ratingValue: 0,
  } : options;
  console.log({ options }, '------');
  try {
    const vpns = await ServerVPN.findAll({
      where: {
        location: {
          [Op.iLike]: `%${options.location}%`,
        },
        protocol: {
          [Op.in]: options.protocol,
        },
        price: {
          [Op.between]: [options.from, options.to],
        },
        rating: {
          [Op.gte]: Number(options.ratingValue),
        },
      },
      include: {
        model: User,
        required: true,
        where: {
          login: { [Op.iLike]: `%${options.ownerName}%` },
        },
      },
    });
    return res.json(vpns);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500).json({ message: 'You broke my perfect database. Again.' });
  }
});

// /api/server/new/:userId - создать новый впн
// для проверки thunderclient
// {
//     "ip": "asdasdasd",
//     "location": "hell",
//     "protocol": "otsosi",
//     "price": 2
// }
router.post('/new/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      ip, location, protocol, price,
    } = req.body;
    const newVpn = await ServerVPN.create({
      ip, location, protocol, price, rating: 0, user_id: userId,
    });
    return res.json(newVpn);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' });
  }
});

/// api/server/user/:userId/purchase - получить все подписки на сервера по номеру id
router.get('/user/:userId/purchase', async (req, res) => {
  try {
    const { userId } = req.params;
    const purchases = await Purchase.findAll({ where: { user_id: userId }, include: [ServerVPN] });
    const vpns = purchases.map((el) => el.ServerVPN);
    return res.json(vpns);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' });
  }
});

/// api/server/user/:userId - получить все сервера, которые создал юзер по его id
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const vpns = await ServerVPN.findAll({ where: { user_id: userId } });
    return res.json(vpns);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' });
  }
});

/// api/server/:serverId - получить сервер по его id
router.get('/:serverId', async (req, res) => {
  try {
    const { serverId } = req.params;
    const vpn = await ServerVPN.findByPk(serverId);
    if (!vpn) return res.json({ message: 'VPN with this number doesn\'t exist' });
    return res.json(vpn);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' });
  }
});
module.exports = router;

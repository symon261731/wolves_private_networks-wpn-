const express = require('express');
const { ServerVPN, Purchase, RatingServer } = require('../db/models');

const router = express.Router();

// /api/server/all - получить все впн
router.get('/all', async (req, res) => {
  try {
    const vpns = await ServerVPN.findAll();
    req.session.user = { id: 1 };
    if (!req.session.user) return res.json(vpns);
    for (const server of vpns) {
      const likeStatus = await RatingServer.findOne({ where: { user_id: req.session.user.id, server_id: server.id } });
      if (likeStatus) {
        server.dataValues.likeStatus = true;
      } else {
        server.dataValues.likeStatus = false;
      }
    }
    return res.json(vpns);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: 'You broke my perfect database. Again.'})
  }
})

// /api/server/new/:userId - создать новый впн
router.post('/new/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { ip, location, protocol, price } = req.body;
    const newVpn = await ServerVPN.create({ ip, location, protocol, price, rating: 0, user_id: userId });
    return res.json(newVpn);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: 'You broke my perfect database. Again.'})
  }
})

///api/server/user/:userId/purchase - получить все подписки на сервера по номеру id
router.get('/user/:userId/purchase', async (req, res) => {
  try {
    const { userId } = req.params;
    const purchases = await Purchase.findAll({ where: { user_id: userId }, include: [ServerVPN] });
    const vpns = purchases.map((el) => el.ServerVPN);
    for (const server of vpns) {
      const likeStatus = await RatingServer.findOne({ where: { user_id: req.session.user.id, server_id: server.id } });
      if (likeStatus) {
        server.dataValues.likeStatus = true;
      } else {
        server.dataValues.likeStatus = false;
      }
    }
    return res.json(vpns);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: 'You broke my perfect database. Again.'})
  }
})

///api/server/user/:userId - получить все сервера, которые создал юзер по его id
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const vpns = await ServerVPN.findAll({ where: { user_id: userId } });
    for (const server of vpns) {
      const likeStatus = await RatingServer.findOne({ where: { user_id: req.session.user.id, server_id: server.id } });
      if (likeStatus) {
        server.dataValues.likeStatus = true;
      } else {
        server.dataValues.likeStatus = false;
      }
    }
    return res.json(vpns);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: 'You broke my perfect database. Again.'})
  }
})

///api/server/:serverId - получить сервер по его id
router.get('/:serverId', async (req, res) => {
  try {
    const { serverId } = req.params;
    const vpn = await ServerVPN.findByPk(serverId);
    if (!vpn) return res.json({ message: 'VPN with this number doesn\'t exist' });
    const likeStatus = await RatingServer.findOne({ where: { user_id: req.session.user.id, server_id: vpn.id } });
      if (likeStatus) {
        vpn.dataValues.likeStatus = true;
      } else {
        vpn.dataValues.likeStatus = false;
      }
    return res.json(vpn);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: 'You broke my perfect database. Again.'})
  }
})
module.exports = router;

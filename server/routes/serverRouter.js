const express = require('express');
const { Op } = require('sequelize');
const path = require('path');
const process = require('process');
const authCheck = require('../middlewares/authUser');
const {
  ServerVPN, Purchase, RatingServer, User, File, ServerComment
} = require('../db/models');

const router = express.Router();

// выплевывание файла на фронт
router.get('/config/:id', (req, res) => {
  const options = {
    root: path.join(process.cwd(), 'configs/'),
    // root: path.join(process.cwd(), 'configs/'),

  };
  const fileName = 'test.ovpn';
  res.sendFile(fileName, options, (err) => {
    if (err) {
      console.log(err);// (err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});

// /api/server/max-rate - получить значение наибольшего рейтинга среди серверов
router.get('/max-rate', async (req, res) => {
  try {
    const vpns = await ServerVPN.findAll({ order: [['rating', 'DESC']] });
    return res.status(200).json(vpns[0].rating);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' });
  }
});

// /api/server/all - получить все впн
router.get('/all', async (req, res) => {
  try {
    const vpns = await ServerVPN.findAll({
      include: {
        model: User,
        required: true,
      },
    });
    const allPurchase = await Purchase.findAll({ include: [User] });
    for (let i = 0; i < vpns.length; i += 1) {
      vpns[i].dataValues.subscribedUsers = [];
      for (let j = 0; j < allPurchase.length; j += 1) {
        if (vpns[i].dataValues.id === allPurchase[j].dataValues.server_id) {
          vpns[i].dataValues.subscribedUsers.push(allPurchase[j].User);
          allPurchase.splice(j, 1);
        }
      }
    }
    if (!req.session.user) return res.json(vpns);
    const likes = await RatingServer.findAll({ where: { user_id: req.session.user.id } });
    for (let i = 0; i < vpns.length; i += 1) {
      vpns[i].dataValues.likeStatus = false;
      for (let j = 0; j < likes.length; j += 1) {
        if (vpns[i].dataValues.id === likes[j].dataValues.server_id) {
          vpns[i].dataValues.likeStatus = true;
          break;
        }
      }
    }
    const subscribed = await Purchase.findAll({ where: { user_id: req.session.user.id } });
    for (let i = 0; i < vpns.length; i += 1) {
      vpns[i].dataValues.subscribeStatus = false;
      for (let j = 0; j < subscribed.length; j += 1) {
        if (vpns[i].dataValues.id === subscribed[j].dataValues.server_id) {
          vpns[i].dataValues.subscribeStatus = true;
          break;
        }
      }
    }
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
    // console.log(vpns.length);
    const allPurchase = await Purchase.findAll({ include: [User] });
    for (let i = 0; i < vpns.length; i += 1) {
      vpns[i].dataValues.subscribedUsers = [];
      for (let j = 0; j < allPurchase.length; j += 1) {
        if (vpns[i].dataValues.id === allPurchase[j].dataValues.server_id) {
          vpns[i].dataValues.subscribedUsers.push(allPurchase[j].User);
          allPurchase.splice(j, 1);
        }
      }
    }
    if (!req.session.user) return res.json(vpns);
    const likes = await RatingServer.findAll({ where: { user_id: req.session.user.id } });
    for (let i = 0; i < vpns.length; i += 1) {
      vpns[i].dataValues.likeStatus = false;
      for (let j = 0; j < likes.length; j += 1) {
        if (vpns[i].dataValues.id === likes[j].server_id) {
          vpns[i].dataValues.likeStatus = true;
          break;
        }
      }
    }
    const subscribed = await Purchase.findAll({ where: { user_id: req.session.user.id } });
    for (let i = 0; i < vpns.length; i += 1) {
      vpns[i].dataValues.subscribeStatus = false;
      for (let j = 0; j < subscribed.length; j += 1) {
        if (vpns[i].dataValues.id === subscribed[j].dataValues.server_id) {
          vpns[i].dataValues.subscribeStatus = true;
          break;
        }
      }
    }
    // console.log(vpns.length);

    return res.json(vpns);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500).json({ message: 'You broke my perfect database. Again.' });
  }
});

// /api/server/new/:userId - создать новый впн
router.post('/new/:userId', authCheck, async (req, res) => {
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
router.get('/user/:userId/purchase', authCheck, async (req, res) => {
  try {
    const { userId } = req.params;
    const allPurchase = await Purchase.findAll({ include: [User, ServerVPN] });
    const purchases = allPurchase.filter((el) => el.dataValues.user_id === Number(userId));
    const vpns = purchases.map((el) => el.ServerVPN);
    for (let i = 0; i < vpns.length; i += 1) {
      vpns[i].dataValues.subscribedUsers = [];
      for (let j = 0; j < allPurchase.length; j += 1) {
        if (vpns[i].dataValues.id === allPurchase[j].dataValues.server_id) {
          vpns[i].dataValues.subscribedUsers.push(allPurchase[j].User);
          allPurchase.splice(j, 1);
        }
      }
    }
    const likes = await RatingServer.findAll({ where: { user_id: req.session.user.id } });
    for (let i = 0; i < vpns.length; i += 1) {
      vpns[i].dataValues.subscribeStatus = true;
      vpns[i].dataValues.likeStatus = false;
      for (let j = 0; j < likes.length; j += 1) {
        if (vpns[i].dataValues.id === likes[j].server_id) {
          vpns[i].dataValues.likeStatus = true;
          break;
        }
      }
    }
    return res.json(vpns);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' });
  }
});

/// api/server/user/:userId - получить все сервера, которые создал юзер по его id
router.get('/user/:userId', authCheck, async (req, res) => {
  try {
    const { userId } = req.params;
    const vpns = await ServerVPN.findAll({ where: { user_id: userId } });
    const allPurchase = await Purchase.findAll({ include: [User] });
    for (let i = 0; i < vpns.length; i += 1) {
      vpns[i].dataValues.subscribedUsers = [];
      vpns[i].dataValues.likeStatus = false;
      vpns[i].dataValues.subscribeStatus = false;
      for (let j = 0; j < allPurchase.length; j += 1) {
        if (vpns[i].dataValues.id === allPurchase[j].dataValues.server_id) {
          vpns[i].dataValues.subscribedUsers.push(allPurchase[j].User);
          allPurchase.splice(j, 1);
        }
      }
    }
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
    const subscribedUsers = (await Purchase.findAll({ where: { server_id: serverId }, include: [User] })).map((el) => el.User);
    vpn.dataValues.subscribedUsers = subscribedUsers;
    if (!req.session.user) return req.json(vpn);
    const likeStatus = await RatingServer.findOne({ where: { user_id: req.session.user.id, server_id: vpn.id } });
    if (likeStatus) {
      vpn.dataValues.likeStatus = true;
    } else {
      vpn.dataValues.likeStatus = false;
    }
    return res.json(vpn);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' });
  }
});


// /api/server/:serverId - удалить сервер отовсюду
router.delete('/:serverId', async (req, res) => {
  try {
    const { serverId } = req.params;
    await Purchase.destroy({ where: { server_id: serverId } });
    await RatingServer.destroy({ where: { server_id: serverId } });
    await File.destroy({ where: { server_id: serverId } });
    await ServerComment.destroy({ where: { server_id: serverId } });
    await ServerVPN.destroy({ where: { id: serverId } });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' });
  }
})

module.exports = router;

const express = require('express');
const { Purchase, User, ServerVPN } = require('../db/models');

const router = express.Router();

// /api/purchase/new/:serverId - подписаться на новый впн(если деньги есть - ок, если ты уже подписан или не хватает денег - вернется message)
router.get('/new/:serverId', async (req, res) => {
  const { serverId } = req.params;
  req.session.user = { id: 1 };
  const user = await User.findByPk(req.session.user.id);
  const server = await ServerVPN.findByPk(serverId);
  const purchases = await Purchase.findAll({ where: { user_id: user.id } });
  const subscribed = purchases.filter((el) => el['server_id'] === Number(serverId));
  if (user.pocket >= server.price && subscribed.length === 0) {
    const purchase = await Purchase.create({ user_id: user.id, server_id: serverId });
    const newMoney = user.pocket - server.price;
    await User.update({ pocket: newMoney }, { where: { id: user.id } });
    return res.sendStatus(200);
  } else if (subscribed.length !== 0) {
    return res.status(200).json({ message: 'You\'re already subscribed!' })
  } else {
    return res.json({ message: 'You\'re too poor to be protected :(' }).status(200);
  }
});

module.exports = router;

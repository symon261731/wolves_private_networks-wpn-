const express = require('express');
const { Purchase, User, ServerVPN } = require('../db/models');
const authCheck = require('../middlewares/authUser');

const router = express.Router();

// /api/purchase/new/:serverId - подписаться на новый впн(если деньги есть - ок, если ты уже подписан или не хватает денег - вернется message)
router.get('/new/:serverId', authCheck, async (req, res) => {
  try {
    const { serverId } = req.params;
    const user = await User.findByPk(req.session.user.id);
    const server = await ServerVPN.findByPk(serverId);
    if(server['user_id'] === req.session.user.id) return res.json({message: 'You can\'t subscribe - it\'s your VPN!'})
    const purchases = await Purchase.findAll({ where: { user_id: user.id } });
    const subscribed = purchases.filter((el) => el['server_id'] === Number(serverId));
    // console.log({purchases, subscribed});
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: 'You broke my perfect database. Again.'})
  }
});

// /api/purchase/unsubscribe/:serverId - отписаться от впн сервера
router.delete('/unsubscribe/:serverId', authCheck, async (req, res) => {
  try {
    const { serverId } = req.params;
    req.session.user.id = 9;
    const findPurchase = await Purchase.findOne({ where: { server_id: serverId, user_id: req.session.user.id } });
    if (!findPurchase) return res.json({ message: 'You can\'t unsubscribed, because you are not subscribed!' });
    await Purchase.destroy({ where: { id: findPurchase.id } });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: 'You broke my perfect database. Again.'})
  }
});

router.get('/info/:serverId', authCheck, async (req, res) => {
  try {
    const { serverId } = req.params;
    const user = await User.findByPk(req.session.user.id);
    const purchases = await Purchase.findAll({ where: { user_id: user.id } });
    const subscribed = purchases.filter((el) => el['server_id'] === Number(serverId));
    console.log({purchases, subscribed});
    return res.json(subscribed);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: 'You broke my perfect database. Again.'})
  }
});

module.exports = router;

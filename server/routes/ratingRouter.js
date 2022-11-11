const express = require('express');
const { ServerVPN, RatingServer, User, RatingUser } = require('../db/models');

const router = express.Router();


// /api/rating/server/:serverId - поставить лайк серверу по его id
router.get('/server/:serverId', async (req, res) => {
  try {
    const { serverId } = req.params;
    const findServer = await ServerVPN.findOne({ where: { id: serverId } });
    let liked = await RatingServer.findAll({ where: { user_id: req.session.user.id } });
    liked = liked.filter((el) => el['server_id'] === Number(serverId));
    if (liked.length === 0) {
      await findServer.increment('rating', { by: 1 });
      await RatingServer.create({ user_id: req.session.user.id, server_id: serverId });
    } else {
      await RatingServer.destroy({ where: { user_id: req.session.user.id, server_id: serverId } });
      await findServer.decrement('rating', { by: 1 });
    }
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' });
  }
})

// /api/rating/user/:userId - поставить лайк юзеру по его id
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    if(Number(userId) === Number(req.session.user.id)) return res.json({message: 'Of course you can like yourself but not in my shift!'})
    const findUser = await User.findOne({ where: { id: userId } });
    let liked = await RatingUser.findAll({ where: { author: req.session.user.id } });
    liked = liked.filter((el) => el['user_id'] === Number(userId));
    if (liked.length === 0) {
      await findUser.increment('rating', { by: 1 });
      await RatingUser.create({ author: req.session.user.id, user_id: userId });
    } else {
      await RatingUser.destroy({ where: { author: req.session.user.id, user_id: userId } });
      await findUser.decrement('rating', { by: 1 });
    }
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' });
  }
})

module.exports = router;

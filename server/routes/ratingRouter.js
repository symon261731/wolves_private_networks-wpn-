const express = require('express');
const {
  ServerVPN, RatingServer, User, RatingUser, Comment, RatingComment
} = require('../db/models');
const authCheck = require('../middlewares/authUser');

const router = express.Router();

// /api/rating/server/:serverId - поставить лайк серверу по его id
router.get('/server/:serverId', authCheck, async (req, res) => {
  try {
    const { serverId } = req.params;
    const findServer = await ServerVPN.findOne({ where: { id: serverId } });
    // if (findServer.user_id === req.session.user.id) return res.json({ message: 'You can\'t rate your own service' });
    let liked = await RatingServer.findAll({ where: { user_id: req.session.user.id } });
    liked = liked.filter((el) => el.server_id === Number(serverId));
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
});

// /api/rating/comment/:commentId -  поставить лайк комменту по его id
router.get('/comment/:commentId', authCheck, async (req, res) => {
  try {
    const { commentId } = req.params;
    const findComment = await Comment.findOne({ where: { id: commentId } });
    if (findComment.user_id === req.session.user.id) return res.json({ message: 'You can\'t rate your own comment' });
    let liked = await RatingComment.findAll({ where: { user_id: req.session.user.id, comment_id: commentId } });
    if (liked.length === 0) {
      await findComment.increment('rating', { by: 1 });
      await RatingComment.create({ user_id: req.session.user.id, comment_id: commentId });
    } else {
      await RatingComment.destroy({ where: { user_id: req.session.user.id, comment_id: commentId } });
      await findComment.decrement('rating', { by: 1 });
    }
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' });
  }
});

// /api/rating/user/:userId - поставить лайк юзеру по его id
router.get('/user/:userId', authCheck, async (req, res) => {
  try {
    const { userId } = req.params;
    if (Number(userId) === Number(req.session.user.id)) return res.json({ message: 'Of course you can like yourself but not in my shift!' });
    const findUser = await User.findOne({ where: { id: userId } });
    let liked = await RatingUser.findAll({ where: { author: req.session.user.id } });
    liked = liked.filter((el) => el.user_id === Number(userId));
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
});

// /api/rating/check/user/:userId - проверить статус лайка юзера по номеру юзера
router.get('/check/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const status = await RatingUser.findOne({ where: { author: req.session.user.id, user_id: userId } });
    if (status) {
      return res.json(true);
    }
    return res.json(false);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' });
  }
});

// /api/rating/check/server/:serverId - проверить статус лайка сервера по номеру сервера
router.get('/check/server/:serverId', async (req, res) => {
  try {
    const { serverId } = req.params;
    const status = await RatingServer.findOne({ where: { user_id: req.session.user.id, server_id: serverId } });
    if (status) {
      return res.json(true);
    }
    return res.json(false);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' });
  }
});

// /api/rating/check/comment/:commentId - проверить статус лайка комментария по номеру комментария
router.get('/check/server/:serverId', async (req, res) => {
  try {
    const { commentId } = req.params;
    const status = await RatingComment.findOne({ where: { user_id: req.session.user.id, comment_id: commentId } });
    if (status) {
      return res.json(true);
    }
    return res.json(false);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' });
  }
});
module.exports = router;

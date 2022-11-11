const express = require('express');
const { Comment, UserComment, ServerComment, User } = require('../db/models');

const router = express.Router();

// /api/comment/user/all/:userId - получить все комментарии о юзере по его id
router.get('/user/all/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const comments = await UserComment.findAll({ where: { user_id: userId }, include: { model: Comment, include: [User] } });
    const commentsText = comments.map((el) => {
      return { comment: el.Comment.content, login: el.Comment.User.login }
    });
    return res.json(commentsText);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' })
  }
});

// /api/comment/user/new/:userId - добавить комментарий о юзере (юзер id - это тот человек, на которого мы пишем коммент)
router.post('/user/new/:userId', async (req, res) => {
  try {
    // console.log(req.body);
    const { userId } = req.params;
    const  content = req.body.input;

    console.log({content});
    const newComment = await Comment.create({ content, user_id: req.session.user.id });
    await UserComment.create({ user_id: userId, comment_id: newComment.id });
    const comment = { comment: newComment.content, login: req.session.user.login };
    return res.json(comment);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' })
  }
});

// /api/comment/server/all/:serverId - получить все комментарии о сервере по его id
router.get('/server/all/:serverId', async (req, res) => {
  try {
    const { serverId } = req.params;
    const comments = await ServerComment.findAll({ where: { server_id: serverId }, include: { model: Comment, include: [User] } });
    const commentsText = comments.map((el) => {
      return { comment: el.Comment.content, login: el.Comment.User.login }
    });
    return res.json(commentsText);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' })
  }
});

// /api/comment/server/new/:serverId - добавить комментарий о сервере по сервер id
router.post('/server/new/:serverId', async (req, res) => {
  try {
    const { serverId } = req.params;
    const { content } = req.body;
    const newComment = await Comment.create({ content, user_id: req.session.user.id });
    await ServerComment.create({ server_id: serverId, comment_id: newComment.id });
    const comment = { comment: newComment.content, login: req.session.user.login };
    return res.json(comment);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' })
  }
});
module.exports = router;

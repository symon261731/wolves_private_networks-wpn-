const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const {
    login, email, password, img,
  } = req.body.inputs;
  if (login && email && password) {
    try {
      // if (!img) img = '/img/avatar.jpg';
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          login, password: await bcrypt.hash(password, 10), img, pocket: 0,
        },
      });
      if (created) {
        const sessionUser = JSON.parse(JSON.stringify(user));
        delete sessionUser.password;
        req.session.user = sessionUser;
        return res.json(sessionUser);
      }
      return res.sendStatus(401);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(500);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body.inputs;
  if (email && password) {
    try {
      const user = await User.findOne({
        where: { email },
      });
      if (await bcrypt.compare(password, user.password)) {
        const sessionUser = JSON.parse(JSON.stringify(user));
        delete sessionUser.password;
        req.session.user = sessionUser;
        return res.json(sessionUser);
      }
      return res.sendStatus(401);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(500);
});

router.post('/check', async (req, res) => {
  console.log(req.session.user);
  if (req.session.user) {
    const user = await User.findOne({
      attributes: ['id', 'login', 'email', 'pocket', 'rating', 'img'],
      where: { id: Number(req.session.user.id) },
    });
    console.log({ user });
    return res.json(user);
  }
  return res.sendStatus(401);
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sid').sendStatus(200);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log({ id });
  const user = await User.findByPk(id);
  res.json(user);
});

module.exports = router;

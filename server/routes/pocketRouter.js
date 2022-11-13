/* eslint-disable camelcase */
const express = require('express');
const { User, Card, Transaction } = require('../db/models');
const authCheck = require('../middlewares/authUser');

const router = express.Router();

// /api/pocket/refill - положить деньги на кошелек
router.post('/refill', authCheck, async (req, res) => {
  try {
    const {
      amount, name, number, expiry,
    } = req.body.param;
    const [card, created] = await Card.findOrCreate({
      where: { user_id: req.session.user.id, card_number: number },
      defaults: { expire_date: expiry, name },
    });
    await Transaction.create({ amount, user_id: req.session.user.id, card_id: card.id });
    const user = await User.findByPk(req.session.user.id);
    const newAmount = user.pocket + Number(amount);
    await User.update({ pocket: newAmount }, { where: { id: user.id } });
    // const updateUser = await User.findByPk(user.id);
    // return res.json(updateUser);
    return res.json(amount);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' });
  }
});

// /api/pocket/check - вернуть количество денег у юзера
router.get('/check', authCheck, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user.id);
    // return res.status(200).json(user);
    return res.status(200).json(user.pocket);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: 'You broke my perfect database. Again.'})
  }
})

module.exports = router;

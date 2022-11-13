/* eslint-disable camelcase */
const express = require('express');
const { User, Card, Transaction } = require('../db/models');

const router = express.Router();

// /api/pocket/refill - положить деньги на кошелек
router.post('/refill', async (req, res) => {
  try {
    const {
      amount, name, card_number, expire_date,
    } = req.body;
    const [card, created] = await Card.findOrCreate({
      where: { user_id: req.session.user.id, card_number },
      defaults: { expire_date, name },
    });
    await Transaction.create({ amount, user_id: req.session.user.id, card_id: card.id });
    const user = await User.findByPk(req.session.user.id);
    const newAmount = user.pocket + Number(amount);
    await User.update({ pocket: newAmount }, { where: { id: user.id } });
    const updateUser = await User.findByPk(user.id);
    return res.json(updateUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' });
  }
});

module.exports = router;

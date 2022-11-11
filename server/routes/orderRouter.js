const express = require('express');
const { Order, OrderUser, User } = require('../db/models');

const router = express.Router();

// /api/order/all - получить все заказы
router.get('/all', async (req, res) => {
  try {
    const data = await Order.findAll({where: {status: 'open'}});
    res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' })
  }
});

// /api/order/new - создать новый заказ
router.post('/new', async (req, res) => {
  // console.log('order', req.body.order);
  try {
    const { title, protocol, price, location } = req.body.order;
    const newOrder = await Order.create({
      user_id: req.session.user.id,
      title,
      protocol,
      price: Number(price),
      location,
      status: 'open'
    });
    res.json(newOrder);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' })
  };
});

// /api/order/myorders - получить все заказы, которые юзер создал
router.get('/myorders', async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { user_id: req.session.user.id }, include: { model: Order, include: [User] } });
    const data = orders.map((el) => el.Order);
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500).json({ message: 'You broke my perfect database. Again.' })
  };
})

// /api/order/mywork - получить все заказы, которые юзер выполняет
router.get('/mywork', async (req, res) => {
  try {
    const orders = await OrderUser.findAll({ where: { worker: req.session.user.id }, include: { model: Order, include: [User] } });
    const data = orders.map((el) => el.Order);
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500).json({ message: 'You broke my perfect database. Again.' })
  };
});

// /api/order/newjob/:orderId - откликнуться на заказ по номеру заказа
router.get('/newjob/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    await Order.update({ status: 'in progress' }, { where: { id: orderId } });
    const findOrder = await Order.findByPk(orderId);
    const newConnection = await OrderUser.create({ creator: findOrder['user_id'], worker: req.session.user.id, order_id: findOrder.id })
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500).json({ message: 'You broke my perfect database. Again.' })
  };
});

// /api/order/closejob - пометить заказ выполненным по номеру заказа
router.get('/closejob/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    await Order.update({ status: 'closed' }, { where: { id: orderId } });
    const findOrder = await Order.findByPk(orderId);
    const findCon = await OrderUser.findOne({ where: { order_id: orderId } });
    const user = await User.findOne({ where: { id: findCon.worker } });
    const money = user.pocket + findOrder.price;
    await User.update({ pocket: money }, { where: { id: user.id } });
    const newConnection = await OrderUser.destroy({ where: { order_id: orderId } });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500).json({ message: 'You broke my perfect database. Again.' })
  };
})

module.exports = router;

/* eslint-disable max-len */
const express = require('express');
const { Order, OrderUser, User } = require('../db/models');
const authCheck = require('../middlewares/authUser');
const authCloseOrder = require('../middlewares/authCloseOrder');
const authCloseOrderWorker = require('../middlewares/authCloseOrderWorker');

const router = express.Router();

// /api/order/all - получить все заказы
router.get('/all', async (req, res) => {
  try {
    const data = await Order.findAll({ where: { status: 'open' } });
    res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' });
  }
});

// /api/order/new - создать новый заказ
router.post('/new', authCheck, async (req, res) => {
  // console.log('order', req.body.order);
  try {
    const {
      title, protocol, price, location,
    } = req.body.order;
    const user = await User.findByPk(req.session.user.id);
    if (user.pocket < Number(price)) return res.json({ message: 'You don\'t have enough money to pay for this order' });
    const newOrder = await Order.create({
      user_id: req.session.user.id,
      title,
      protocol,
      price: Number(price),
      location,
      status: 'open',
    });
    res.json(newOrder);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' });
  }
});

// /api/order/myorders - получить все заказы, которые юзер создал
router.get('/myorders', authCheck, async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { user_id: req.session.user.id } });
    return res.json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' });
  }
});

// /api/order/mywork - получить все заказы, которые юзер выполняет
router.get('/mywork', authCheck, async (req, res) => {
  try {
    const orders = await OrderUser.findAll({ where: { worker: req.session.user.id }, include: { model: Order, include: [User] } });
    const data = orders.map((el) => el.Order);
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' });
  }
});

// /api/order/newjob/:orderId - откликнуться на заказ по номеру заказа
router.get('/newjob/:orderId', authCheck, async (req, res) => {
  try {
    const { orderId } = req.params;
    await Order.update({ status: 'in progress' }, { where: { id: orderId } });
    const findOrder = await Order.findByPk(orderId);
    const newConnection = await OrderUser.create({ creator: findOrder.user_id, worker: req.session.user.id, order_id: findOrder.id, status: 'open'});
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' });
  }
});

// /api/order/job/done-by-user/:userId - вернуть все заказы, которые выполнил юзер
router.get('/job/done-by-user', authCheck, async (req, res) => {
  try {
    const { userId } = req.params;
    const closedOrders = await OrderUser.findAll({ where: { worker: userId, status: 'closed' }, include: [Order] });
    const data = closedOrders.map((el) => el.Order);
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' });
  }
});

// /api/order/validate/worker/:orderId -  пометить заказ выполненным со стороны исполнителя
router.get('/validate/worker/:orderId', authCheck, authCloseOrderWorker, async (req, res) => {
  try {
    const { orderId } = req.params;
    await Order.update({ status: 'need validation' }, { where: { id: orderId } });
    const order = await Order.findByPk(orderId);
    return res.json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' });
  }
})

// /api/order/closejob/:orderId - пометить заказ выполненным по номеру заказа
router.get('/closejob/:orderId', authCheck, authCloseOrder, async (req, res) => {
  console.log('param', req.params);
  try {
    const { orderId } = req.params;
    if ((await Order.findByPk(orderId)).status === 'need validation') {
      await Order.update({ status: 'closed' }, { where: { id: orderId } });
      const findOrder = await Order.findByPk(orderId);
      const findCon = await OrderUser.findOne({ where: { order_id: orderId } });
      const user = await User.findOne({ where: { id: findCon.worker } });
      const money = user.pocket + findOrder.price;
      const owner = await User.findByPk(req.session.user.id);
      const moneyOwner = owner.pocket - findOrder.price;
      await User.update({ pocket: money }, { where: { id: user.id } });
      await User.update({ pocket: moneyOwner }, { where: { id: owner.id } });
      await OrderUser.update({ status: 'closed' }, { where: { order_id: orderId } });
      return res.json(findOrder);
    } else {
      return res.status(400).json({ message: 'You can\'t close this order' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' });
  }
});

// /api/order/:orderId - возвращает информацию о заказе по его номеру
router.get('/:orderId', async (req, res) => {
  try {
    console.log(req.params);
    const { orderId } = req.params;
    const order = await Order.findOne({ where: { id: orderId }, include: [User] });
    if (order.status !== 'open') {
      const worker = await OrderUser.findOne({ where: { order_id: orderId }, include: [User] });
      order.dataValues.worker = worker.User;
    }
    return res.json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'You broke my perfect database. Again.' });
  }
});
module.exports = router;

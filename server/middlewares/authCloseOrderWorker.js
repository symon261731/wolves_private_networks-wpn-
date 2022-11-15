const { OrderUser } = require('../db/models');

async function authCloseOrderWorker(req, res, next) {
  const { orderId } = req.params;
  const order = await OrderUser.findOne({ where: { order_id: orderId } });
  if (order.worker === req.session.user.id) {
    next();
  } else {
    return res.status(401).json({ message: 'You can\'t close this order' });
  }
}

module.exports = authCloseOrderWorker;

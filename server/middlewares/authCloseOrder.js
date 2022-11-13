const { Order } = require('../db/models');

async function authCloseOrder(req, res, next) {
  const { orderId } = req.params;
  const order = await Order.findByPk(orderId);
  if (order['user_id'] === req.session.user.id) {
    next();
  } else {
    return res.status(401).json({ message: 'You can\'t close this order' });
  }
}

module.exports = authCloseOrder;


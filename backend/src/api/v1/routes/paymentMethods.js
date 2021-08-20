const router = require('express').Router();
const { protect, admin } = require('../middlewares');
const { getPaymentMethods, createPaymentMethod } =
  require('../controllers').paymentMethods;

router
  .get('/paymentMethods', protect, admin, getPaymentMethods)
  .post('/createPaymentMethod', protect, admin, createPaymentMethod);

module.exports = router;

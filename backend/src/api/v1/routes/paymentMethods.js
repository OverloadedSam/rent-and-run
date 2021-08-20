const router = require('express').Router();
const { protect, admin } = require('../middlewares');
const { getPaymentMethods, createPaymentMethod, updatePaymentMethod } =
  require('../controllers').paymentMethods;

router
  .get('/paymentMethods', protect, admin, getPaymentMethods)
  .post('/createPaymentMethod', protect, admin, createPaymentMethod)
  .put('/updatePaymentMethod', protect, admin, updatePaymentMethod);

module.exports = router;

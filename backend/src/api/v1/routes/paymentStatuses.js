const router = require('express').Router();
const { protect, admin } = require('../middlewares');
const { getPaymentStatuses, createPaymentStatus, updatePaymentStatus } =
  require('../controllers').paymentStatuses;

router
  .get('/paymentStatuses', protect, admin, getPaymentStatuses)
  .post('/createPaymentStatus', protect, admin, createPaymentStatus)
  .put('/updatePaymentStatus', protect, admin, updatePaymentStatus);

module.exports = router;

const router = require('express').Router();
const { protect, verifyId } = require('../middlewares');
const { createOrder, createPayment } = require('../controllers').payments;

router
  .route('/payment/:rental_id')
  .post(verifyId('rental_id'), protect, createPayment);
router.post(
  '/createRazorpayOrder/:rental_id',
  verifyId('rental_id'),
  protect,
  createOrder
);

module.exports = router;

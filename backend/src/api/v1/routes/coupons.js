const router = require('express').Router();
const { protect, admin } = require('../middlewares');
const { getCoupons, createCoupon, updateCoupon } =
  require('../controllers').coupons;

router
  .get('/coupons', protect, admin, getCoupons)
  .post('/createCoupon', protect, admin, createCoupon)
  .put('/updateCoupon/:coupon_id', protect, admin, updateCoupon);

module.exports = router;

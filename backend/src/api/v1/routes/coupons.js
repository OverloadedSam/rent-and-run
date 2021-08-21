const router = require('express').Router();
const { protect, admin } = require('../middlewares');
const { getCoupons, createCoupon } =
  require('../controllers').coupons;

router
  .get('/coupons', protect, admin, getCoupons)
  .post('/createCoupon', protect, admin, createCoupon);

module.exports = router;

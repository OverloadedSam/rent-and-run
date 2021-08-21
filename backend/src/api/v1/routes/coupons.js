const router = require('express').Router();
const { protect, admin } = require('../middlewares');
const { getCoupons } = require('../controllers').coupons;

router.get('/coupons', protect, admin, getCoupons);

module.exports = router;

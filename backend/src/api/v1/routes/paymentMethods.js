const router = require('express').Router();
const { protect, admin } = require('../middlewares');
const { getPaymentMethods } = require('../controllers').paymentMethods;

router.get('/paymentMethods', protect, admin, getPaymentMethods);

module.exports = router;

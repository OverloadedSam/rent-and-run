const router = require('express').Router();
const { protect, admin } = require('../middlewares');
const { getPaymentStatuses } = require('../controllers').paymentStatuses;

router.get('/paymentStatuses', protect, admin, getPaymentStatuses);

module.exports = router;

const router = require('express').Router();
const { protect } = require('../middlewares');
const { getRentals } = require('../controllers').rentals;

router.get('/rentals', protect, getRentals);

module.exports = router;

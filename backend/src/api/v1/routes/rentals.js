const router = require('express').Router();
const { protect } = require('../middlewares');
const { getRentals, getUserRentals } = require('../controllers').rentals;

router
  .get('/rentals', protect, getRentals)
  .get('/myRentals', protect, getUserRentals);

module.exports = router;

const router = require('express').Router();
const { protect, verifyId } = require('../middlewares');
const {
  getRentals,
  getUserRentals,
  getRentalById
} = require('../controllers').rentals;

router
  .get('/rentals', protect, getRentals)
  .get('/myRentals', protect, getUserRentals)
  .get('/rental/:rental_id', verifyId('rental_id'), protect, getRentalById);

module.exports = router;

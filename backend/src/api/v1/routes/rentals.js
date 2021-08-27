const router = require('express').Router();
const { protect, verifyId } = require('../middlewares');
const {
  getRentals,
  getUserRentals,
  getRentalById,
  createRental,
  applyCoupon,
} = require('../controllers').rentals;

router
  .get('/rentals', protect, getRentals)
  .get('/myRentals', protect, getUserRentals)
  .get('/rental/:rental_id', verifyId('rental_id'), protect, getRentalById)
  .put('/applyCoupon/:rental_id', protect, verifyId('rental_id'), applyCoupon)
  .post('/createRental/:vehicle_id', verifyId('vehicle_id'), protect, createRental);

module.exports = router;

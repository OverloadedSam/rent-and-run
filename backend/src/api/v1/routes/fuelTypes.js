const router = require('express').Router();
const { protect, admin } = require('../middlewares');
const { getFuelTypes, createFuelType } = require('../controllers').fuelTypes;

router
  .get('/fuelTypes', getFuelTypes)
  .post('/createFuelType', protect, admin, createFuelType);

module.exports = router;

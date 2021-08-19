const router = require('express').Router();
const { protect, admin } = require('../middlewares');
const { getFuelTypes, createFuelType, updateFuelType } =
  require('../controllers').fuelTypes;

router
  .get('/fuelTypes', getFuelTypes)
  .post('/createFuelType', protect, admin, createFuelType)
  .put('/updateFuelType', protect, admin, updateFuelType);

module.exports = router;

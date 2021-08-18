const router = require('express').Router();
const { protect, admin } = require('../middlewares');
const { getVehicleTypes, createVehicleType } =
  require('../controllers').vehicleTypes;

router.get('/vehicleTypes', getVehicleTypes);
router.post('/createVehicleType', protect, admin, createVehicleType);

module.exports = router;

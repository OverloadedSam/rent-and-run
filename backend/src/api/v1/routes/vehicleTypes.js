const router = require('express').Router();
const { protect, admin } = require('../middlewares');
const { getVehicleTypes, createVehicleType, updateVehicleType } =
  require('../controllers').vehicleTypes;

router.get('/vehicleTypes', getVehicleTypes);
router.post('/createVehicleType', protect, admin, createVehicleType);
router.put('/updateVehicleType', protect, admin, updateVehicleType);

module.exports = router;

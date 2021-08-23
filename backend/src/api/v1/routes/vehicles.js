const router = require('express').Router();
const { protect, admin, verifyId } = require('../middlewares');
const {
  getVehicles,
  getVehicleWithDetails,
  createVehicle,
  updateVehicle,
} = require('../controllers').vehicles;

router
  .get('/vehicles', getVehicles)
  .post('/createVehicle', protect, admin, createVehicle);
router
  .route('/vehicle/:vehicle_id')
  .get(verifyId('vehicle_id'), getVehicleWithDetails)
  .put(verifyId('vehicle_id'), protect, admin, updateVehicle);

module.exports = router;

const router = require('express').Router();
const { verifyId } = require('../middlewares');
const { getVehicles, getVehicleWithDetails } =
  require('../controllers').vehicles;

router.get('/vehicles', getVehicles);
router
  .route('/vehicle/:vehicle_id')
  .get(verifyId('vehicle_id'), getVehicleWithDetails);

module.exports = router;

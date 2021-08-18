const router = require('express').Router();
const { getVehicleTypes } = require('../controllers').vehicleTypes;

router.get('/vehicleTypes', getVehicleTypes);

module.exports = router;

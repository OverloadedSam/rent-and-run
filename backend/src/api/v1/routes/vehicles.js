const router = require('express').Router();
const { getVehicles } = require('../controllers').vehicles;

router.get('/vehicles', getVehicles);

module.exports = router;

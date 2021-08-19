const router = require('express').Router();
const { getFuelTypes } = require('../controllers').fuelTypes;

router.get('/fuelTypes', getFuelTypes);

module.exports = router;

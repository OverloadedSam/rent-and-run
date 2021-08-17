const router = require('express').Router();
const { protect, admin } = require('../middlewares');
const { getRoles } = require('../controllers').roles;

router.get('/roles', protect, admin, getRoles);

module.exports = router;

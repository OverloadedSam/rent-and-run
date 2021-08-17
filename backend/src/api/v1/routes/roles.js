const router = require('express').Router();
const { protect, admin } = require('../middlewares');
const { getRoles, createRole } = require('../controllers').roles;

router
  .get('/roles', protect, admin, getRoles)
  .post('/createRole', protect, admin, createRole);

module.exports = router;

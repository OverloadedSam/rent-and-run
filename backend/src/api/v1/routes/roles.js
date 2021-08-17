const router = require('express').Router();
const { protect, admin } = require('../middlewares');
const { getRoles, createRole, updateRole } = require('../controllers').roles;

router
  .get('/roles', protect, admin, getRoles)
  .post('/createRole', protect, admin, createRole)
  .put('/updateRole', protect, admin, updateRole);

module.exports = router;

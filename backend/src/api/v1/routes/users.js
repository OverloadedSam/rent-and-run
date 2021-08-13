const router = require('express').Router();
const { protect, admin } = require('../middlewares');
const {
  getMyAccount,
  getUser,
  registerUser,
} = require('../controllers').users;

router.route('/me').get(protect, getMyAccount);
router.route('/user/:id').get(protect, admin, getUser);
router.post('/register', registerUser);

module.exports = router;

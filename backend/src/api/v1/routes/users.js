const router = require('express').Router();
const { protect, admin } = require('../middlewares');
const {
  getMyAccount,
  getUser,
  registerUser,
  updateUser,
  loginUser,
} = require('../controllers').users;

router.route('/me').get(protect, getMyAccount).put(protect, updateUser);
router.route('/user/:id').get(protect, admin, getUser);
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;

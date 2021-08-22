const router = require('express').Router();
const { protect, admin, verifyId } = require('../middlewares');
const {
  getMyAccount,
  getUser,
  registerUser,
  updateUser,
  loginUser,
} = require('../controllers').users;

router.route('/me').get(protect, getMyAccount).put(protect, updateUser);
router
  .route('/user/:user_id')
  .get(verifyId('user_id'), protect, admin, getUser);
router.post('/register', registerUser).post('/login', loginUser);

module.exports = router;

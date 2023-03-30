const router = require('express').Router();
const { validationUpdateUserProfile } = require('../middlewares/validation');
const {
  updateUserInfo,
  getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch(
  '/me',
  validationUpdateUserProfile,
  updateUserInfo
);

module.exports = router;

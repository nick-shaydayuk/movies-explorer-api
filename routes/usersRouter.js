const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const { validationUpdateUserProfile } = require('../middlewares/validation');

const {
  createUser,
  updateUserInfo,
  getCurrentUser,
  getUserById,
} = require('../controllers/users');

router.get('/users/me', getCurrentUser);
router.get(
  '/:userId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      userId: Joi.string().required().length(24).hex(),
    }),
  }),
  getUserById
);
router.post('/', createUser);
router.patch(
  '/users/me',
  validationUpdateUserProfile,
  updateUserInfo
);

module.exports = router;

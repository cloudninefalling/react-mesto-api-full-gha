const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');
const { linkRegex } = require('../constants/regex');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string()
        .alphanum()
        .length(24)
        .hex(),
    }),
  }),
  getUserById,
);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string()
        .min(2)
        .max(30),
      about: Joi.string()
        .min(2)
        .max(30),
    }),
  }),
  updateUser,
);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(new RegExp(linkRegex)),
    }),
  }),
  updateUserAvatar,
);

module.exports = router;

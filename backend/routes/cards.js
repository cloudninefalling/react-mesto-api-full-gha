const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createCard,
  getCards,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { linkRegex } = require('../constants/regex');

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      link: Joi.string()
        .required()
        .regex(new RegExp(linkRegex)),
    }),
  }),
  createCard,
);
router.get('/', getCards);
router.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string()
        .length(24)
        .hex(),
    }),
  }),
  deleteCardById,
);
router.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string()
        .alphanum()
        .length(24)
        .hex(),
    }),
  }),
  likeCard,
);
router.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string()
        .alphanum()
        .length(24)
        .hex(),
    }),
  }),
  dislikeCard,
);

module.exports = router;

/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const user = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new AuthError('Authorization required'));
    return;
  }

  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    next(new AuthError('Authorization required'));
  }

  // eslint-disable-next-line arrow-parens
  user.findById(payload._id).then(data => {
    req.user = data;
    next();
  });
};

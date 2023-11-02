const StatusCodes = require('../errors/StatusCodes');

module.exports.errorHandler = (err, req, res, next) => {
  const { statusCode = StatusCodes.SERVER_ERROR, message } = err;
  res.status(err.statusCode).send({
    message:
      statusCode === StatusCodes.SERVER_ERROR ? 'Internal error' : message,
  });
  next();
};

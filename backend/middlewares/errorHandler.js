const StatusCodes = require('../errors/StatusCodes');

module.exports.errorHandler = (err, req, res, next) => {
  const { statusCode = StatusCodes.SERVER_ERROR, message } = err;
  console.log(err);
  res.status(statusCode).send({
    message:
      statusCode === StatusCodes.SERVER_ERROR ? 'Internal error' : message,
  });
  next();
};

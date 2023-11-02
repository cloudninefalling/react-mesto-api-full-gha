const StatusCodes = require('./StatusCodes');

class NotUniqueError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;
  }
}

module.exports = NotUniqueError;

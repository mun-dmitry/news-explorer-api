const { messages } = require('../constants');
const BadRequestError = require('./errors/BadRequestError');
const ConflictError = require('./errors/ConflictError');
const ForbiddenError = require('./errors/ForbiddenError');
const NotFoundError = require('./errors/NotFoundError');
const UnauthorizedError = require('./errors/UnauthorizedError');

const errorsProcessor = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? messages.internalError
      : message,
  });
  next();
};

errorsProcessor.classes = {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
};

module.exports = errorsProcessor;

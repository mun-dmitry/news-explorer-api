const jwt = require('jsonwebtoken');
const errorExtenders = require('../helpers/errorsProcessor').classes;
const { devKey } = require('../appconfig');
const { messages } = require('../constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new errorExtenders.UnauthorizedError(messages.unauthorized));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token,
      NODE_ENV === 'production' ? JWT_SECRET : devKey);
  } catch (err) {
    return next(new errorExtenders.UnauthorizedError(messages.unauthorized));
  }
  req.user = payload;
  return next();
};

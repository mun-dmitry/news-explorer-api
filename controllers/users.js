const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');

const { JWT_SECRET = 'dev-key' } = process.env;

const sendUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports = sendUser;

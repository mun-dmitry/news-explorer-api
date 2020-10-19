const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { devKey } = require('../appconfig');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const errorExtenders = require('../helpers/errorsProcessor').classes;
const { messages, regExps } = require('../constants');

const sendUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new errorExtenders.NotFoundError(messages.userNotFound);
      }
      res.send({
        data: {
          name: user.name,
          email: user.email,
        },
      });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  return User.checkDuplicatingFields(email)
    .then(() => {
      bcrypt.hash(password, 10)
        .then((hash) => {
          if (!regExps.password.test(password)) {
            throw new errorExtenders.BadRequestError(messages.passwordValidationRules);
          }
          return User.create({
            name,
            email,
            password: hash,
          });
        })
        .then((user) => {
          User.findById(user._id)
            .then((createdUser) => res.send({
              data:
              {
                name: createdUser.name,
                email: createdUser.email,
              },
            }))
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : devKey,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 7 * 24 * 3600000,
        httpOnly: false,
      })
        .end();
    })
    .catch(next);
};

module.exports = {
  sendUser,
  createUser,
  login,
};

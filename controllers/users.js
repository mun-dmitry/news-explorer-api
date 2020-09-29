const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'dev-key' } = process.env;
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

const sendUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
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

const validatePassword = (password) => {
  const passwordRegExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
  return passwordRegExp.test(password);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  return User.checkDuplicatingFields(email)
    .then(() => {
      bcrypt.hash(password, 10)
        .then((hash) => {
          if (!validatePassword(password)) {
            throw new BadRequestError('Пароль должен содержать не менее 8 символов, включая по меньшей мере 1 цифру, 1 букву нижнего регистра и 1 букву верхнего регистра. Пароль может состоять только из цифр и букв латинского алфавита');
          }
          return User.create({
            name,
            email,
            password: hash,
          });
        })
        .then((user) => {
          User.findById(user._id)
            .then((createdUser) => res.send({ data:
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
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 7 * 24 * 3600000,
        httpOnly: true,
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

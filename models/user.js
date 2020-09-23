const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const bcrypt = require('bcryptjs');

const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');

const emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'supposed to get a valid E-mail',
  }),
];

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: emailValidator,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password, next) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      const error = new UnauthorizedError('Wrong email or password');
      if (!user) {
        throw error;
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw error;
          }
          return user;
        });
    })
    .catch(next);
};

// eslint-disable-next-line func-names
userSchema.statics.checkDuplicatingFields = function (email, next) {
  return this.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(`Пользователь с почтовым адресом '${user.email}' уже зарегистрирован. Пожалуйста, введите другой адрес электронной почты`);
      }
    })
    .catch(next);
};

module.exports = mongoose.model('user', userSchema);

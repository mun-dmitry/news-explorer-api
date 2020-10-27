const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const bcrypt = require('bcryptjs');

const errorExtenders = require('../helpers/errorsProcessor').classes;
const { messages } = require('../constants');

const emailValidator = [
  validate({
    validator: 'isEmail',
    message: messages.invalidEmail,
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
      const error = new errorExtenders.UnauthorizedError(messages.wrongCredentials);
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
        throw new errorExtenders.ConflictError(messages.duplicatingEmail);
      }
    })
    .catch(next);
};

module.exports = mongoose.model('user', userSchema);

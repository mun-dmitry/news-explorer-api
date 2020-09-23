const mongoose = require('mongoose');
const validate = require('mongoose-validator');

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

module.exports = mongoose.model('user', userSchema);

const { regExps } = require('../constants');

const urlValidationHelper = (value, helpers) => {
  if (regExps.url.test(value)) {
    return value;
  }
  return helpers.error('any.invalid');
};

module.exports = urlValidationHelper;

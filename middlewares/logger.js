const winston = require('winston');
const expressWinston = require('express-winston');
const fs = require('fs');
const path = require('path');
const { dirs } = require('../constants');

if (!fs.existsSync(dirs.log)) {
  fs.mkdirSync(dirs.log);
}

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: path.join(dirs.log, '/request.log'),
    }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(dirs.log, 'error.log'),
    }),
  ],
});

module.exports = {
  requestLogger,
  errorLogger,
};

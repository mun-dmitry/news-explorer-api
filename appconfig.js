const rateLimit = require('express-rate-limit');

const mongoAddress = 'mongodb://localhost:27017/news-explorer-db';
const devKey = '03263301ea9a6a06e29a05a47d076495678089c1b6c26e12f21e4c492022e42d';
const limiter = rateLimit({
  windowsMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = { mongoAddress, devKey, limiter };

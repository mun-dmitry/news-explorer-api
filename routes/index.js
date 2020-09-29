const router = require('express').Router();

const articles = require('./articles');
const users = require('./users');

router.use('/', articles);
router.use('/', users);

module.exports = router;

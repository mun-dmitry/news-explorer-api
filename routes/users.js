const users = require('express').Router();
const { sendUser } = require('../controllers/users');

users.get('/users/me', sendUser);

module.exports = users;

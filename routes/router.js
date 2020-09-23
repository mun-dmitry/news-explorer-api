const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const sendUser = require('../controllers/users');
const { sendArticles, createArticle, deleteArticle } = require('../controllers/articles');

router.get('/users/me', sendUser);
router.get('/articles', sendArticles);
router.post('/articles', createArticle);
router.delete('/articles/:articleId', deleteArticle);

module.exports = router;

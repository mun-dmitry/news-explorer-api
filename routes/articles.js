const articles = require('express').Router();

const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const { sendArticles, createArticle, deleteArticle } = require('../controllers/articles');
const urlValidationHelper = require('../helpers/urlValidationHelper');

articles.get('/articles', sendArticles);
articles.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().uri().custom(urlValidationHelper, 'custom URL validation'),
    image: Joi.string().required().uri().custom(urlValidationHelper, 'custom URL validation'),
  }),
}), createArticle);
articles.delete('/articles/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.objectId(),
  }),
}), deleteArticle);

module.exports = articles;

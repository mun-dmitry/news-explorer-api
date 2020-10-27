const Article = require('../models/article');
const errorExtenders = require('../helpers/errorsProcessor').classes;
const { messages } = require('../constants');

const sendArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new errorExtenders.BadRequestError(err.message));
      }
      next(err);
    });
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .then((article) => {
      if (!article) {
        throw new errorExtenders.NotFoundError(messages.articleNotFound);
      } if (article.owner.toString() === req.user._id) {
        Article.findByIdAndRemove(req.params.articleId)
          .then((removedCard) => res.send({ data: removedCard }))
          .catch(next);
      } else {
        throw new errorExtenders.ForbiddenError(messages.articleDeleteForbidden);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new errorExtenders.BadRequestError(messages.invalidObjectId));
      }
      next(err);
    });
};

module.exports = {
  sendArticles,
  createArticle,
  deleteArticle,
};

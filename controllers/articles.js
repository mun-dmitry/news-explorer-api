const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const sendArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.send({ data: articles}))
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
    // Check for 'ValidationError' -------------------!!!!!!!
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Article not found');
      } if (article.owner === req.user._id) {
        Article.findByIdAndRemove(req.params.articleId)
          .then((removedCard) => res.send({ data: removedCard }))
          .catch(next);
      } else {
        throw new ForbiddenError('Only owner can delete article');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`${err.value} is not a valid ObjectId`));
      }
      next(err);
    });
};

module.exports = {
  sendArticles,
  createArticle,
  deleteArticle,
};

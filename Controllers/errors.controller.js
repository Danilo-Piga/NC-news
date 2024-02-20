const { getArticle } = require("./getArticleId.controller");

exports.errorHandler = (err, req, res, next) => {
  const status = err.status || 404;
  const message = err.message || `Not found: ${err}`;
  res.status(status).json({ message });
};

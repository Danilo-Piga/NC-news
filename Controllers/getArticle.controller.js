const { getArticlesWithComments, getArticleById } = require("../Models/getArticle.model");

exports.getArticleId = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const article = await getArticleById(article_id);

    if (!article) {
      const error = new Error(`Article with ID ${article_id} not found.`);
      error.status = 404;
      throw error;
    }

    res.status(200).json({ article });
  } catch (error) {
    next(error);
  }
};

exports.getArticles = async (req, res, next) => {
  try {
      const articles = await getArticlesWithComments();
      articles.sort((a, b) => b.created_at - a.created_at);
      articles.forEach(article => delete article.body);
      res.status(200).json({ articles });
    } catch (error) {
      next(error);
    }
  };

 
  
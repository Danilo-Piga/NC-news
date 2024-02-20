const { getArticleById } = require("../Models/getArticleById.model");

exports.getArticle = async (req, res, next) => {
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

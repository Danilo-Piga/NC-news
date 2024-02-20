const { getArticleById } = require("../Models/getArticleById.model");

exports.getArticle = async (req, res) => {
  try {
    const { article_id } = req.params;
    const article = await getArticleById(article_id);
    res.status(200).json({ article });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const { updateArticleById } = require("../Models/updateArticle.model");

exports.updateArticle = async (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  if (inc_votes === undefined) {
    return res.status(400).json({ error: "inc_votes parameter is required" });
  }

  try {
    const updatedArticle = await updateArticleById(article_id, inc_votes);
    res.status(200).json(updatedArticle);
  } catch (error) {
    next(error);
  }
};

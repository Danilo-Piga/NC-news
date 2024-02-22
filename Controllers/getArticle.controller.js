const {
  getArticlesCommentCount,
  getArticleById,
  getAllComments,
  addCommentToArticle
} = require("../Models/getArticle.model");

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
    const articles = await getArticlesCommentCount();
    articles.sort((a, b) => b.created_at - a.created_at);
    articles.forEach((article) => delete article.body);
    res.status(200).json({ articles });
  } catch (error) {
    next(error);
  }
};

exports.getArticleComments = async (req, res, next) => {
  const { article_id } = req.params;
  try {
    const article = await getArticleById(article_id);
    if (!article) {
      res.status(404).json({ msg: "Article not found" });
    } else {
      const comments = await getAllComments(article_id);
      res.status(200).send({ comments });
    }
  } catch (error) {
    res.status(404).json({ msg: "Article not found" });
  }
};

exports.addOneCommentToArticle = async (req, res, next) => {
  const { article_id } = req.params;
  try {
    const { username, body } = req.body;
    if (!username || !body) {
      return res.status(400).json({ error: "Username and body are required" });
    }
    const article = await getArticleById(article_id);
    if (!article) {
      return res.status(404).json({ msg: "Article not found" });
    }
    const comment = await addCommentToArticle(article_id, username, body);
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }  
};


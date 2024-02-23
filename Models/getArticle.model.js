const db = require("../db/connection");

exports.getArticlesCommentCount = async () => {
  try {
    const articles = await db.query(`
    SELECT articles.author, 
             articles.title, 
             articles.article_id, 
             articles.topic, 
             articles.created_at, 
             articles.votes, 
             articles.article_img_url, 
             COUNT(comments.comment_id)::INT AS comment_count 
      FROM articles 
      LEFT JOIN comments ON articles.article_id = comments.article_id 
      GROUP BY articles.article_id 
      ORDER BY articles.created_at DESC
    `);
    return articles.rows;
  } catch (error) {
    throw error;
  }
};

exports.getArticleById = async (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          message: `Article with ID ${article_id} not found.`,
        });
      }
      return result.rows[0];
    });
};

exports.getAllComments = async (articleId) => {
  try {
    const comments = await db.query(
      "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC",
      [articleId]
    );
    return comments.rows;
  } catch (error) {
    throw error;
  }
};

exports.addCommentToArticle = async (article_id, username, body) => {
  try {
    const result = await db.query(
      "INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *",
      [article_id, username, body]
    );
    if (result.rows.length === 0) {
      throw { status: 500, message: "Failed to add comment to article" };
    }
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

exports.getArticlesByTopic = async (topic) => {
  try {
    const articles = await db.query(`
      SELECT * FROM articles
      WHERE topic = $1
    `, [topic]);
    return articles.rows;
  } catch (error) {
    throw error;
  }
};
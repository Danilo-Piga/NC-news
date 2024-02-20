const db = require("../db/connection");

exports.getArticleById = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then((result) => {
      if (result.rows.length === 0) {
        throw new Error(`Article with ID ${article_id} not found.`);
      }
      return result.rows[0];
    });
};

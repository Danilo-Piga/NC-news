const db = require("../db/connection");

exports.updateArticleById = async (article_id, inc_votes) => {
  const result = await db.query(
    `
      UPDATE articles
      SET votes = votes + $1
      WHERE article_id = $2
      RETURNING *
    `,
    [inc_votes, article_id]
  );

  if (result.rows.length === 0) {
    throw { status: 404, message: `Article with ID ${article_id} not found.` };
  }

  return result.rows[0];
};

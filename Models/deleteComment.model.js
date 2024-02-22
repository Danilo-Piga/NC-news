const db = require("../db/connection");

exports.deleteCommentById = async (commentId) => {
  try {
    const result = await db.query(
      "DELETE FROM comments WHERE comment_id = $1",
      [commentId]
    );

    if (result.rowCount === 0) {
      throw { status: 404, message: "Comment not found" };
    }
  } catch (error) {
    throw error;
  }
};

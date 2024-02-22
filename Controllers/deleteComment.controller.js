const { deleteCommentById } = require("../Models/deleteComment.model");

exports.deleteComment = async (req, res, next) => {
  const { comment_id } = req.params;

  try {
    await deleteCommentById(comment_id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

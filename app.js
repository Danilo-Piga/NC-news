const express = require("express");
const { getTopics } = require("./Controllers/getTopics.controller");
const { getEndPoints } = require("./Controllers/getEndpoint.controller");
const {
  getArticles,
  getArticleId,
  getArticleComments,
  addOneCommentToArticle,
} = require("./Controllers/getArticle.controller");
const { updateArticle } = require("./Controllers/updateArticle.controller");
const { deleteComment } =require("./Controllers/deleteComment.controller")

const { errorHandler } = require("./Controllers/errors.controller");

const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api", getEndPoints);
app.get("/api/articles/:article_id", getArticleId);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getArticleComments);
app.post("/api/articles/:article_id/comments", addOneCommentToArticle);
app.patch("/api/articles/:article_id", updateArticle);
app.delete("/api/comments/:comment_id", deleteComment)

app.use(errorHandler);

module.exports = app;

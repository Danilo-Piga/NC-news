const express = require("express");
const { getTopics } = require("./Controllers/getTopics.controller");
const { getEndPoints } = require("./Controllers/getEndpoint.controller");
const { getArticle } = require("./Controllers/getArticleId.controller");
const { errorHandler } = require("./Controllers/errors.controller");

const app = express();

app.get("/api/topics", getTopics);
app.get("/api", getEndPoints);
app.get("/api/articles/:article_id", getArticle);

app.use(errorHandler);

module.exports = app;

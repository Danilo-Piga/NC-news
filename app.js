const express = require("express");
const { getTopics } = require("./Controllers/getTopics.controller");
const { getEndPoints } = require("./Controllers/getEndpoint.controller");
const { getArticle } = require("./Controllers/getArticleId.controller");

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api", getEndPoints);
app.get("/api/articles/:article_id", getArticle);

module.exports = app;

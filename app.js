const express = require("express");
const { getTopics, getEndPoints } = require("./controller");

const app = express();

app.use(express.json())

app.get("/api/topics", getTopics);
app.get("/api", getEndPoints)

module.exports = app;

const { topics } = require("./model");
const endpoint =require("./endpoints.json") 

function getTopics(req, res) {
  return topics().then((topicsData) => {
    res.status(200).send(topicsData);
  });
}

function getEndPoints(req, res) {
    res.status(200).json(endpoint)
}

module.exports = { getTopics, getEndPoints };

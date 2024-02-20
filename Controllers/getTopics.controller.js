const { topics } = require("../Models/getTopics.model");

function getTopics(req, res) {
    return topics().then((topicsData) => {
      res.status(200).send(topicsData);
    });
  }

  module.exports = { getTopics };
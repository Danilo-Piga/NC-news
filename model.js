const db = require("./db/connection");
const path = require("path");

exports.topics = () => {
  return db.query("SELECT * FROM topics").then((result) => {
    return result.rows;
  });
};

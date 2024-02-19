const db = require("./db/connection")

exports.topics = () => {
    return db.query("SELECT * FROM topics").then((result) => {
        return result.rows
    })
}
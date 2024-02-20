const endpoint =require("../endpoints.json") 

function getEndPoints(req, res) {
    res.status(200).json(endpoint)
}

module.exports = { getEndPoints };
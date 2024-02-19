const topicsModel =require('./model')

function getTopics(req, res) {
    const endpoint = req.params
    res.status(200).send() 
}

module.exports = { getTopics }
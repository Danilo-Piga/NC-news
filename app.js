const express = require('express')
const app = express()

app.use(express.json())

app.get('/api/topics', (req, res) => {
    res.status(200).send([])
});


  app.listen(9090, () => {
    console.log("Server is listening on port 9090...")
}) 

module.exports = app
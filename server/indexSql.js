const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3002
const HOST = 'localhost'
const bodyParser = require("body-parser");
const path = require('path');
const db = require("../db/configSql.js")
// const data = require("./makeReviews.js")
// const compression = require('compression')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(compression())

app.use(express.static('client/dist'));

app.get('/id/:id', (req,res) => {
    const productId = req.params.id
    //getById is promisified, no return statemenet necessary
    db.getById(productId)
    .then((result) => {
        res.send(result.rows[0])
    })
    .catch(console.log)
})





app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
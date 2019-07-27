require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001
const HOST = 'localhost'
const bodyParser = require("body-parser");
const path = require('path');
const monDB = require("../db/configDB.js")
// const data = require("./makeReviews.js")
// const compression = require('compression')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(compression())

app.use(express.static('client/dist'));


app.get('/id/:id', function (req, res) {
    let idNum = req.params.id
    monDB.getByIdFast(idNum)
    .then((result) => {
      console.log(typeof result._id)
      res.send(result)
    })
    .catch(console.log)
})
  


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)

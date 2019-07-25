require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.SERVER_PORT
const HOST = process.env.SERVER_HOST
const bodyParser = require("body-parser");
const path = require('path');
const db = require("../db/configDB.js")
// const data = require("./makeReviews.js")
// const compression = require('compression')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(compression())

app.use(express.static('client/dist'));


app.get('/id/:id', function (req, res) {
    let idNum = parseInt(req.params.id)
    db.getById(idNum, (err, result) => {
      if (err) {
        res.send(`couldn't get`)
        console.log(`we didn't get it`)
      } else {
        // console.log(req)
        console.log('we got it')
        res.send(result)
      }
    })
  })
  


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

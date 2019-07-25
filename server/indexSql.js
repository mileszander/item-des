const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.SERVER_PORT
const HOST = process.env.SERVER_HOST
const bodyParser = require("body-parser");
const path = require('path');
// const db = require("../db/configDB.js")
// const data = require("./makeReviews.js")
// const compression = require('compression')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(compression())

app.use(express.static('client/dist'));



app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
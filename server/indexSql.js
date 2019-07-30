const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3002
const HOST = 'localhost'
const bodyParser = require("body-parser");
const path = require('path');
const db = require("../db/configSql.js")
const http = require('http');
const cluster = require('cluster');
// const data = require("./makeReviews.js")
// const compression = require('compression')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(compression())

app.use(express.static('client/dist'));

//SETING UP CLUSTERS
if(cluster.isMaster) {
    var numWorkers = 4
  
    console.log('Master cluster setting up ' + numWorkers + ' workers...');
  
    for(var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }
  
    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });
  
    cluster.on('exit', function(worker, code, signal) {
        // console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        // console.log('Starting a new worker');
        cluster.fork();
    });
  } else {
    // var app = require('express')();
    // app.all('/*', function(req, res) {res.send('process ' + process.pid + ' says hello!').end();})
    app.get('/id/:id', (req,res) => {
        const productId = req.params.id
        //getById is promisified, no return statemenet necessary
        db.getById(productId)
        .then((result) => {
            res.send(result.rows[0])
        })
        .catch(console.log)
    })
    var server = app.listen(3002, function() {
        console.log('Process ' + process.pid + ' is listening to all incoming requests');
    });
  }
  




app.get('/id/:id', (req,res) => {
    const productId = req.params.id
    //getById is promisified, no return statemenet necessary
    db.getById(productId)
    .then((result) => {
        res.send(result.rows[0])
    })
    .catch(console.log)
})





// app.listen(PORT, HOST);
// console.log(`Running on http://${HOST}:${PORT}`);
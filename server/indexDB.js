require('dotenv').config();

const express = require('express');
const cluster = require('cluster');
const cors = require('cors');
const app = express();
const PORT = 3001
const HOST = 'localhost'
const bodyParser = require("body-parser");
const path = require('path');
const monDB = require("../db/configDB.js")
// const data = require("./makeReviews.js")
// const compression = require('compression')
const http = require('http');

//maximum number of CPUs
// const numCPUs = require('os').cpus().length;
const numCPUs = 4

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(compression())

app.use(express.static('client'))

//tells you amount of CPUS on pc
// console.log(numCPUs)

// if (cluster.isMaster) {
//   console.log(`Master ${process.pid} is running`);
// }


// //SETING UP CLUSTERS
// if(cluster.isMaster) {
//   var numWorkers = 4

//   console.log('Master cluster setting up ' + numWorkers + ' workers...');

//   for(var i = 0; i < numWorkers; i++) {
//       cluster.fork();
//   }

//   cluster.on('online', function(worker) {
//       console.log('Worker ' + worker.process.pid + ' is online');
//   });

//   cluster.on('exit', function(worker, code, signal) {
//       // console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
//       // console.log('Starting a new worker');
//       cluster.fork();
//   });
// } else {
//   // var app = require('express')();
//   // app.all('/*', function(req, res) {res.send('process ' + process.pid + ' says hello!').end();})
//   app.get('/id/:id', function (req, res) {
//     let idNum = req.params.id
//     monDB.getByIdFast(idNum)
//     .then((result) => {
//       res.send(result).end()
//     })
//     .catch(console.log)
//   })
//   var server = app.listen(3001, function() {
//       console.log('Process ' + process.pid + ' is listening to all incoming requests');
//   });
// }


//SERVER ROUTES

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

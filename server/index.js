const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const {PORT,HOST} = require('../config.js')
const port = PORT || 3022;
const host = HOST || '0.0.0.0'
 app.use(cors())
 app.use(express.static('public'))
 
app.get('/', function (req, res) {
  res.send('in the server')
})
 
app.listen(port,host,()=>console.log('listning on host: '+host+' port: '+port))
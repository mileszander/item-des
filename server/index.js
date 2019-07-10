const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const {PORT,HOST} = require('../config.js')
const port = PORT || 3000;
const host = HOST || '0.0.0.0'
 app.use(cors())
 app.use(express.static('client'))
 

 
app.listen(3000,()=>console.log('listning on host: '+host+' port: '+port))
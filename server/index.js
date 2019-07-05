const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
 app.use(cors())
 app.use(express.static('public'))
 
app.get('/', function (req, res) {
  res.send('in the server')
})
 
app.listen(3022,console.log('listning on port: 3022'))
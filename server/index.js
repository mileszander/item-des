const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
// const s3Images = require('./services/multer_s3.js')
const db = require('../DataBase/index.js')
const {PORT,HOST} = require('../config.js')
const port = PORT || 3000;
const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('client'))

app.get('/items',(req,res)=>{
  console.log(req.headers.id)
  
  db.getOneItemInfo(Number(req.headers.id),(err,respons)=>{
    if(err){
      res.send(err)
    }else{
      res.send(respons)
    }
  })
}) 

app.get('/',(req,res)=>{
  res.send('hi')
})
//  app.post('/gg', (req, res) => {
//    console.log(req.body)
//    const imagesArray =[]
//    for(let i =0 ; i< s3Images.length ;i++){
//      const obj ={}
//      obj['img_id']=Number(s3Images[i].slice(46,55))
//      obj['img_src']= s3Images[i]
//      imagesArray.push(obj)
//    }
//    console.log(imagesArray)
//    db.addAllImages(null,imagesArray);
//   res.send('HEY!')
// })
 
app.listen(3000,()=>console.log('listning on host: '+' port: '+port))
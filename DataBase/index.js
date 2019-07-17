const mysql      = require('mysql');
const allItems = require('./allItems.js')
const connection = mysql.createConnection({
  host     : 'sql9.freemysqlhosting.net',
  user     : 'sql9298716',
  password : 'fSESbX7EzN',
  database : 'sql9298716',
  Port: 3306
});
 
connection.connect();
 
const getOneItemInfo = function(id,cb) {
  const oneItemData =[];
  connection.query(`select * from itemDescription WHERE itemDescription.id = ${id}`, function (error, results, fields) {
    if (error){
      cb(error)
    }else{
      oneItemData.push(results)
    }  
  });
  connection.query(`select * from itemImages WHERE itemImages.img_id = ${id}`, function (error, results, fields) {
    if (error){
      cb(error)
    }else{
      oneItemData.push(results)
      cb(null,oneItemData)
    }
  });
}


// function addAllImages(err,imagesArray){
//   if(err){
//     throw err
//   }else{
//     for(let i =0 ;i<imagesArray.length;i++){
//       connection.query(`INSERT INTO itemImages (img_id, img_src) VALUES (${imagesArray[i].img_id}, '${imagesArray[i].img_src}');`, function (error, results, fields) {
//         if (error) throw error;
        
//       });
//     }
//   }
// }

// function addAllItems(){
//   for(let i =0 ;i<allItems.length;i++){
//     connection.query(`INSERT INTO itemDescription VALUES (${allItems[i].id}, '${allItems[i].name}', "${allItems[i].description}", ${allItems[i].price},'${allItems[i].brand}');`, function (error, results, fields) {
//       if (error) throw error;
      
//     });
//   }
// }
// addAllItems()

module.exports={getOneItemInfo}
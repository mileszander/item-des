const { Pool } = require('pg')
const faker = require('faker');

const pool = new Pool({
  host     : 'localhost',
  database : 'casa'
});

//get ALLL 
const getAll  = () => {
  return pool.query('SELECT * FROM items')
    .then((res) => {
      console.log(res.rows)
    })
    .then(() => {
      pool.end()
    })
    
  }
//don't EXECUTE

//Add One
const addOne  = (arr) => {
  return pool.query('INSERT INTO items(itemname, catagory, price) VALUES ($1, $2, $3)', arr)
    .then((res) => {
    })
    .catch(console.error)
  }

//Execute ADD ONE
// addOne(arr)

//REFACTORED BATCH INSERT TO BE QUICKER
const makeDataArr = () => {
  const result = []
  for (let i=0; i < 10; i++) {
    let hold = []
    hold.push(faker.company.bsNoun());
    hold.push(faker.company.bsNoun());
    hold.push(Math.round(Math.random()*2000))
    result.push(hold)
  }
  return result
}

const addManyFaster = () => {
  let items
  makeDataArr((err, result) => {
    items = result
  })
  let sql = "INSERT INTO itemsFast (itemname, catagory, price) VALUES ?";
  pool.query(sql, [items], function(err) {
    if (err) throw err;
    pool.end();
    })
  }
//discarded code for MAKING FASTER SEEDED DB
  // addManyFaster()
  
//   return addOne(item)
//   .then(()=> {
//     dataLimit++
//     if (dataLimit < 10000000) {
//       addMany()
//     } else {
//       pool.end()
//       console.timeEnd('makeMany')
//       return;
//     }
  
//   })
//   .catch(console.log)
// }

// makeDataArr()


// INSERT INTO films (code, title, did, date_prod, kind) VALUES
//     ('B6717', 'Tampopo', 110, '1985-02-10', 'Comedy'),
//     ('HG120', 'The Dinner Game', 140, DEFAULT, 'Comedy');


//MAKE MANY 
const makeData = (callback) => {
  const data = []
  // for (let i=0; i < 10; i++) {
    let hold = []
    // idCounter++
    hold.push(faker.company.bsNoun());
    hold.push(faker.company.bsNoun());
    hold.push(Math.round(Math.random()*2000))
    // data.push(hold)
  // }
  callback(null, hold)
}




//ADD MANY
let dataLimit = 0
console.time('makeMany')
const addMany = () => {
  let item

  makeData((err, result) => {
    item = result
    // console.log(result)
  })
  return addOne(item)
  .then(()=> {
    dataLimit++
    if (dataLimit < 10000000) {
      addMany()
    } else {
      pool.end()
      console.timeEnd('makeMany')
      return;
    }
  
  })
  .catch(console.log)
}

//execute add many TAKES FOREVER
// addMany()


//find one will be a lot faster
const getById = (num) => {
  // console.time('findOne')
  //QUERY IS PROMISIFIED, NOW 
  return pool.query(`SELECT * FROM items WHERE id =${num}`)

}

//exectuion for testing
// getById(5000000)

module.exports = {
  getById
}










const psql = require ('../db/configSql.js')

//return an Object
test('expect ID pull to return an object', () => {
  return psql.getById(5).then(data => {
  expect(typeof data.rows[0]).toBe('object')
  })
});

//object length should equal four
test('expect object to have four values', () => {
  return psql.getById(5).then(data => {
    let numValues = Object.keys(data.rows[0]).length
    expect(numValues).toBe(4)
  })
});

// object id should be an int
test('expect object id to be an int', () => {
  return psql.getById(5).then(data => {
    let id = data.rows[0].id
    expect(typeof id).toBe('number')
  })
});

// //object name should be an string
test('expect object name should be an string', () => {
  return psql.getById(5).then(data => {
    let name = data.rows[0].itemname
    expect(typeof name).toBe('string')
  })
});

//object catagory should be an string
test('expect object to be a string', () => {
  return psql.getById(5).then(data => {
    let catagory = data.rows[0].catagory
    expect(typeof catagory).toBe('string')
  })
});


//object price should be an number
test('expect object price to be a numbers', () => {
  return psql.getById(5).then(data => {
    let price = data.rows[0].price
    expect(typeof price).toBe('number')
  })
});



//tear down function 
afterAll(() => monDB.db.close())
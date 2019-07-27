const monDB = require ('../db/configDB.js')

//return an Object
test('expect ID pull to return an object', () => {
  return monDB.getByIdFast(5).then(data => {
  expect(typeof data).toBe('object')
  })
});

//object length should equal four
//Strange quirk but Jest doesn't like the "_" so I had to configured outside of it 
// test('expect object to have four values', () => {
//   return monDB.getByIdFast(5).then(data => {
//   console.log(Object.values(data))
//   let numValues = Object.values(data).length
//   expect(numValues).toBe(4)
//   })
// });

//object id should be an int
test('expect object id to be an int', () => {
  return monDB.getByIdFast(5).then(data => {
  let id = data._id
  expect(typeof id).toBe('number')
  })
});

//object name should be an string
test('expect object name should be an string', () => {
  return monDB.getByIdFast(5).then(data => {
  expect(typeof data.name).toBe('string')
  })
});

//object catagory should be an string
test('expect object to be a string', () => {
  return monDB.getByIdFast(5).then(data => {
  expect(typeof data.catagory).toBe('string')
  })
});


//object price should be an number
test('expect object price to be a numbers', () => {
  return monDB.getByIdFast(5).then(data => {
  expect(typeof data.price).toBe('number')
  })
});



//tear down function 
afterAll(() => monDB.db.close() )
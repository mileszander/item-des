const faker = require('faker');
const express = require('express');

const data = []

const makeData = (callback) => {
  for (let i=0; i < 100000; i++) {
    let hold = {}
    hold["id"] = i
    hold["name"] = faker.company.bsNoun();
    hold["catagory"] = faker.company.bsNoun();
    hold["price"] = Math.round(Math.random()*2000)
    data.push(hold)
  }
  callback(null, data)
}



// module.exports = {
//     makeData
// }
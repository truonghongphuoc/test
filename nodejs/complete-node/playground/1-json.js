const fs = require('fs')

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday'
// }

// const bookJson = JSON.stringify(book)

// fs.writeFileSync('1-json.json', bookJson)

const dataBuffer = fs.readFileSync('1-json.json')
// console.log(JSON.parse(dataBuffer.toString()))
const jsonData = JSON.parse(dataBuffer.toString())
jsonData.name = 'Phuoc'
jsonData.age = 32

fs.writeFileSync('1-json.json', JSON.stringify(jsonData))
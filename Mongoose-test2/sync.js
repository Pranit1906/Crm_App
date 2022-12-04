const fs = require('fs');
console.log('start');

const data = fs.readFileSync('./file.txt', 'utf-8');

console.log(data)
console.log('ending process')
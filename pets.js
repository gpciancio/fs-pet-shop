const fs = require('fs');

var pets = JSON.parse(fs.readFileSync('pets.json', 'utf8'));

console.log(fs.readFile('pets.json', 'utf8'));

if (method !== 'read' && 'create' && 'update' && 'destroy'){
  console.error(new Error("Usage: node pets.js [read | create | update | destroy]"));
}
  var method = process.argv[2]
  var index = process.argv[3]

  // console.log(pets);
  console.log(pets[index]);

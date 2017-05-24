const fs = require('fs');

var pets = JSON.parse(fs.readFileSync('pets.json', 'utf8'));

var method = process.argv[2]
var index = process.argv[3]


if (method === 'read'){
  if (index>=0){
    console.log(pets[index]);
  }else{
    console.log(pets);
  }
} else {
  console.error(`Usage: node pets.js [read | create | update | destroy]`);
  process.exit(1);
}

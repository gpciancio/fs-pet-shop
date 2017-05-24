const fs = require('fs');

var pets = JSON.parse(fs.readFileSync('pets.json', 'utf8'));

var method = process.argv[2];


if (method === 'read'){
  var index = process.argv[3];
  if (index>=0){
    console.log(pets[index]);
  }else{
    console.log(pets);
  }
}
else if (method === 'create'){
  var age = process.argv[3];
  var kind = process.argv[4];
  var name = process.argv[5];
  if (!age || !kind || !name){
    console.error(`Usage: node pets.js create AGE KIND NAME`);
    process.exit(1);
  } else {
    var newPetObj = {};
    newPetObj.age = Number(age);
    newPetObj.kind = kind;
    newPetObj.name = name;
    pets.push(newPetObj);
    fs.writeFile('pets.json', JSON.stringify(pets), function (writeErr){
      if (writeErr){
        throw writeErr;
      }
        console.log(newPetObj);
    })
  }
}
else {
  console.error(`Usage: node pets.js [read | create | update | destroy]`);
  process.exit(1);
}

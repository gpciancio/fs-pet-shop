const express = require('express');
const router = express.Router();
const fs = require('fs');
var pets = fs.readFileSync('pets.json', 'utf8');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');


router.get('/',(req,res,next) => {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    var pets = JSON.parse(petsJSON);
    res.send(pets);
  });
});

router.get('/:id',(req,res,next) => {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON){
      if (err) {
        console.error(err.stack);
        return res.sendStatus(500);
      }
      var id = Number.parseInt(req.params.id);
      var pets = JSON.parse(petsJSON);

      if (id < 0 || id >= pets.length || Number.isNaN(id)) {
        return res.sendStatus(404);
      }
      res.send(pets[id]);
    });
});

router.post('/',(req,res,next) => {
  var age = req.param.age;
  var kind = req.param.kind;
  var name = req.param.name;
  if (!age || !kind || !name){
    res.sendStatus(400);
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
})

router.put('/:id',(req,res,next) => {
  res.send("UPDATE ONE NAMED " + req.params.id);
});

router.patch('/:id',(req,res,next) => {
  res.send("PARTIAL UPDATE ONE NAMED " + req.params.id);
});

router.delete('/:id',(req,res,next) => {
  res.send("DELETE ONE NAMED " + req.params.id);
});

module.exports = router;

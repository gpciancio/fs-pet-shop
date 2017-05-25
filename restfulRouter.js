const express = require('express');
const router = express.Router();
const fs = require('fs');
var pets = fs.readFileSync('pets.json', 'utf8');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())


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
  var age = req.body.age;
  var kind = req.body.kind;
  var name = req.body.name;
  if (!age || !kind || !name){
    res.sendStatus(400);
  } else {
    var petsArr = JSON.parse(fs.readFileSync('pets.json', 'utf8'));
    var newPetObj = {};
    newPetObj.age = Number(age);
    newPetObj.kind = kind;
    newPetObj.name = name;
    petsArr.push(newPetObj);
    fs.writeFile('pets.json', JSON.stringify(petsArr), function (writeErr){
      if (writeErr){
        throw writeErr;
      }
        res.send(petsArr[petsArr.length-1]);
    })
  }
})



router.patch('/:id',(req,res,next) => {
  var updates = Object.keys(req.body);
  var petsArr = JSON.parse(fs.readFileSync('pets.json', 'utf8'));
  for (let i = 0; i<updates.length; i++){
    petsArr[req.params.id][updates[i]] = req.body[updates[i]]
  }
    fs.writeFile('pets.json', JSON.stringify(petsArr), function (writeErr){
      if (writeErr){
        throw writeErr;
      }
        res.send(petsArr[req.params.id]);
    })
});

router.delete('/:id',(req,res,next) => {
  res.send("DELETE ONE NAMED " + req.params.id);
});

module.exports = router;

'use strict';
const restfulRouter = require('./restfulRouter');
var fs = require('fs');


var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.disable('x-powered-by');
app.use('/pets', restfulRouter);

module.exports = app;


//
// app.get('/pets/:id', function(req, res) {
//   fs.readFile(petsPath, 'utf8', function(err, petsJSON){
//     if (err) {
//       console.error(err.stack);
//       return res.sendStatus(500);
//     }
//
//     var id = Number.parseInt(req.params.id);
//     var pets = JSON.parse(petsJSON);
//
//     if (id < 0 || id >= pets.length || Number.isNaN(id)) {
//       return res.sendStatus(404);
//     }
//
//     res.send(pets[id]);
//   });
// });
//
// app.use(function(req, res) {
//   res.sendStatus(404);
// });
//
// app.listen(port, function() {
//   console.log('Listening on port', port);
// });

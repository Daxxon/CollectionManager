// const MongoClient = require('mongodb').MongoClient;
// const path = require('path');
// const express = require('express');
// const mustacheExpress = require('mustache-express');
// const session = require('express-session');
// const mongoose = require('mongoose');
// const newPlanetController = require('./newPlanet.js');
// const planetController = require('./planet.js');
// const uri = 'mongodb://localhost/planets';
// const app = express();
//
// // const Planet = require('../models/planet/Planets');
//
// let router = express.Router();
//
// router.get('/', (req, res) => {
//   MongoClient.connect(uri)
//     .then((db) => {
//       let collection = db.collection('planets');
//       console.log('CONNECTING...');
//       collection.find().toArray()
//     .then((planets) => {
//       console.log('RENDERING...');
//       res.render('index', {planets});
//       db.close();
//     })})
// });
//
//
// app.use('/newPlanet', newPlanetController);
// app.use('/planet', planetController);
// module.exports = router;

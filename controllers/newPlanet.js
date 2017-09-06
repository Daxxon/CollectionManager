// const MongoClient = require('mongodb').MongoClient;
// const path = require('path');
// const express = require('express');
// const mustacheExpress = require('mustache-express');
// const session = require('express-session');
// const mongoose = require('mongoose');
// const uri = 'mongodb://localhost/planets';
// const app = express();
//
// let router = express.Router();
//
// router.get('/newPlanet', (req, res) => {
//   console.log('test');
//   MongoClient.connect(uri)
//     .then((db) => {
//       let collection = db.collection('planets');
//       collection.find().toArray()
//     .then((planets) => {
//       res.render('index', {planets});
//       db.close();
//     })})
// });
//
// module.exports = router;

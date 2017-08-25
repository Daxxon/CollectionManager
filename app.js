const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const uri = 'mongodb://localhost/planets';
const mongoose = require('mongoose');
const Planet = require('./models/planet/Planet');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/planets');

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static('public'));

MongoClient.connect(uri)
.then((db) => {
  db.collection('planets').deleteMany({});
  console.log('CLEANSING DATABASE');
  db.close();
})

MongoClient.connect(uri)
  .then((db) => {
    console.log('CONNECTING?');
    db.close();
  });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('CONNECTED');
});

Planet.create({
  name: 'saturn',
  color: 'yellow',
  temperature: 105,
  composition: [{element: 'oxygen', percentage: 50}],
  hasLife: false
})
  .then((result) => {
    console.log(result);
  })

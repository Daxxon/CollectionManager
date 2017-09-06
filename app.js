const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const session = require('express-session');
const earl = 'mongodb://localhost/planets';
const mongoose = require('mongoose');
const Planet = require('./models/planet/Planets.js');
const routeController = require('./routeController.js');
const bodyParser = require('body-parser');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/planets');

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static('public'));
app.use(session({
  secret: 'party parrot',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

MongoClient.connect(earl)
.then((db) => {
  db.collection('planets').deleteMany({});
  console.log('CLEANSING DATABASE');
  addPlanet();
  addPlanet2();
  db.close();
})

MongoClient.connect(earl)
  .then((db) => {
    console.log('DATABASE AM EXIST');
    db.close();
  });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MONGOOSE CONNECTED');
});

addPlanet = () => {
  Planet.create({
    name: 'saturn',
    atmosphere: {color: 'yellow', temperature: 105, composition: [{element: 'oxygen', percentage: 50}, {element: 'nitrogen', percentage: 41}]},
    hasLife: false
  })
  .then((result) => {
    console.log(result);
  })
}

addPlanet2 = () => {
  Planet.create({
    name: 'jupey',
    atmosphere: {color: 'orange', temperature: 5, composition: [{element: 'oxygen', percentage: 50}, {element: 'nitrogen', percentage: 41}]},
    hasLife: true
  })
  .then((result) => {
    console.log(result);
  })
}

app.use(routeController);

app.listen(3000, () => console.log('SHOW ME WHAT YOU GOT'));

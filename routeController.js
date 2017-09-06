const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const earl = 'mongodb://localhost/planets';
const Planet = require('./models/planet/Planets.js');

router.get('/', (req, res) => {
  MongoClient.connect(earl)
    .then((db) => {
      let collection = db.collection('planets');
      console.log('CONNECTING TO INDEX');
      collection.find().toArray()
    .then((planets) => {
      console.log('RENDERING...');
      res.render('index', {planets});
      db.close();
    })})
});

router.get('/planet', (req, res) => {
  MongoClient.connect(earl)
    .then((db) => {
      let collection = db.collection('planets');
      console.log('CONNECTING To /PLANET');
      collection.find().toArray()
    .then((planets) => {
      console.log('RENDERING...');
      res.render('planet', {planets});
      db.close();
    })})
});

router.route('/newPlanet')
  .get((req, res) => {
    MongoClient.connect(earl)
      .then((db) => {
        let collection = db.collection('planets');
        console.log('CONNECTING TO /NEWPLANET');
        collection.find().toArray()
      .then((planets) => {
        console.log('RENDERING...');
        res.render('newPlanet', {planets});
        db.close();
      })})
  })
  .post((req, res) => {
    console.log(req.body);
    MongoClient.connect(earl)
      .then((db) => {
        Planet.create({
          name: req.body.planetName,
          atmosphere : {color: req.body.atmosphereColor, temperature: req.body.atmosphereTemperature, composition: [{element: req.body.atmosphereElement, percentage: req.body.elementPercentage}]},
          hasLife: req.body.hasLife
        })
      .then(() => {
        let collection = db.collection('planets');
        collection.find().toArray()
      .then((planets) => {
        res.render('index', {planets});
        db.close();
      })})})
  })

  router.route('/edit/:name')
    .get((req, res) => {
      console.log(req.params);
      MongoClient.connect(earl)
      .then((db) => {
        db.collection('planets').findOne({name: req.params.name})
      .then((planet) => {
        res.render('planet', planet);
        db.close();
      })})
    })
    .post((req, res) => {
      console.log(req.body);
      MongoClient.connect(earl)
      .then((db) => {
        db.collection('planets').updateOne(
          {'name': req.params.name},
          {$set: {'atmosphere.color': req.body.atmosphereColor,
            'atmosphere.temperature': req.body.atmosphereTemperature,
            'atmosphere.composition.0': {element: req.body.atmosphereElement[0], percentage: req.body.elementPercentage[0]},
            'atmosphere.composition.1': {element: req.body.atmosphereElement[1], percentage: req.body.elementPercentage[1]},
            'hasLife': req.body.hasLife}
        })
        db.collection('planets').find().toArray()
      .then((planets) => {
        res.redirect('/');
        db.close();
      })})
    })

  router.route('/remove/:name')
    .post((req, res) => {
      console.log(req.params);
      MongoClient.connect(earl)
      .then((db) => {
        db.collection('planets').deleteOne({name: req.params.name});
        db.collection('planets').find().toArray()
      .then((planets) => {
        res.redirect('/');
        db.close();
      })})
    })

module.exports = router;

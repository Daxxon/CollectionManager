const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  atmostphere: {
    color: {type: String, required: false},
    temperature: {type: Number},
    composition: [{
      element: {type: String, required: true, unique: true},
      percentage: {type: Number, required: true}
    }],
    hasLife: {type: Boolean}
  }
})

const Planet = mongoose.model('Planet', planetSchema);

module.exports = Planet;

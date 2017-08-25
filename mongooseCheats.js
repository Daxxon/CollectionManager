const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/test');

const recipeSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  prepTime: Number,
  cookTime: Number,
  ingredients: [{
    amount: {type: Number, required: true, default: 1},
    measure: {type: String, lowercase: true, trim: true},
    ingredient: {type: String, required: true}
  }]
  steps: [String],
  source: {type: String}
})

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;


///////////////////////////////


let recipe = new Recipe({name: 'pancakes'});
recipe.ingredients.push({ingredient: 'sugar', measure: 'Tbsp'});
console.log(recipe.toObject());

///////////////////////////////

Recipe.find({source: 'grandma'})
  .where('cookTime').lt('30')
  .where({ingredients: {
    $lt: {$size: 5}}})
  .limit(10)
  .skip(5)
  .sort('-cookTime')
  .select('name cookTime')

///////////////////////////////

At least one non-string field
An array
At least one nested object (can be in array)

const planetSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  atmostphere: {
    color: {type: String, required: false},
    temperature: {type: Number},
    composition: [{
      element: {type: String, required: true, unique: true},
      percentage: {type: Number, required: true}
    }]
    life: {type: Boolean}
  }
})

const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: String,
  steps: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'  // Reference to User model
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

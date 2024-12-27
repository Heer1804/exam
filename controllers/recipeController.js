const Recipe = require('../models/receipeSchema');
const User = require('../models/user');

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('author', 'username');
    res.render('pages/recipeList', { recipes });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes", details: error.toString() });
  }
};

exports.getUserRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ author: req.user.id });
    res.render('pages/myRecipes', { recipes });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user's recipes", details: error.toString() });
  }
};

exports.createRecipe = async (req, res) => {
  const { title, ingredients, steps } = req.body;

  try {
    const recipe = new Recipe({
      title,
      ingredients,
      steps,
      author: req.user.id,
    });

    await recipe.save();

    // Add recipe to user's list
    await User.findByIdAndUpdate(req.user.id, { $push: { recipes: recipe._id } });

    return res.redirect('/myRecipes');
  } catch (error) {
    return res.status(500).json({ error: "Failed to create recipe", details: error.toString() });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('author', 'username');
    res.render('pages/recipeDetails', { recipe });
  } catch (error) {
    res.status(404).json({ error: "Recipe not found", details: error.toString() });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect('/myRecipes');
  } catch (error) {
    res.status(500).json({ error: "Failed to delete recipe", details: error.toString() });
  }
};

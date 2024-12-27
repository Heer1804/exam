const express = require('express');
const router = express.Router();
const { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipeController');  // Correct destructuring of functions
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/authMiddleware');

router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);
router.post('/', authenticateToken, createRecipe);  
router.put('/updateRecipe/:id', authenticateToken, updateRecipe);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), deleteRecipe);

module.exports = router;

const express = require('express');
const authRouter = require('./authRouter');
const recipeRouter = require('./recipeRouter');
const commentRouter = require('./commentRouter'); // Correct import path

const router = express.Router();

router.use('/auth', authRouter);
router.use('/recipes', recipeRouter);
router.use('/comments', commentRouter); // Use the comment router

module.exports = router;

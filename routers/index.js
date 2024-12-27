const express = require('express');
const authRouter = require('./authRouter');
const recipeRouter = require('./recipeRouter');
const commentRouter = require('./commenRouter');
const router = express.Router();

router.use('/auth', authRouter);
router.use('/recipes', recipeRouter);
router.use('/comments', commentRouter);

module.exports = router;

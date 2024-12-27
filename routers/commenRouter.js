const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment'); // Assuming there's a Comment model
const { isAuthenticated } = require('../middlewares/authMiddleware'); // Authentication middleware

// Create a new comment
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { recipeId, content } = req.body;
    const comment = new Comment({
      recipe: recipeId,
      content,
      user: req.user.id, // Assuming user is attached to the request by middleware
    });
    await comment.save();
    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Get comments for a specific recipe
router.get('/:recipeId', async (req, res) => {
  try {
    const comments = await Comment.find({ recipe: req.params.recipeId }).populate('user', 'username');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

module.exports = router;

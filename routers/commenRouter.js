const express = require('express');
const router = express.Router();
const Comment = require('../models/commentSchema'); 
const { isAuthenticated } = require('../middlewares/authMiddleware'); // Ensure this is correctly defined and imported

// Create a new comment
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { recipeId, content } = req.body;
    if (!recipeId || !content) {
      return res.status(400).json({ error: "Recipe ID and content are required" });
    }

    const comment = new Comment({
      recipe: recipeId,
      content,
      user: req.user.id, // Ensure `req.user` is set by `isAuthenticated`
    });

    await comment.save();
    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Fetch all comments for a specific recipe
router.get('/:recipeId', async (req, res) => {
  try {
    const comments = await Comment.find({ recipe: req.params.recipeId }).populate('user', 'username');
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

module.exports = router;

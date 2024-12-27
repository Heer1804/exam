const express = require('express');
const router = express.Router();
const Comment = require('../models/commentSchema'); 
const { isAuthenticated } = require('../middlewares/authMiddleware'); 

// Create a new comment
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { recipeId, content } = req.body;
    const comment = new Comment({
      recipe: recipeId,
      content,
      user: req.user.id,
    });
    await comment.save();
    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

router.get('/:recipeId', async (req, res) => {
  try {
    const comments = await Comment.find({ recipe: req.params.recipeId }).populate('user', 'username');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

module.exports = router;

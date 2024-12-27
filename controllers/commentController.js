const Comment = require('../models/Comment');
const Recipe = require('../models/Recipe');

module.exports.addComment = async (req, res) => {
  const { content } = req.body;
  const recipeId = req.params.recipeId;

  try {
    const comment = new Comment({
      content,
      author: req.user.id,
      recipe: recipeId,
    });

    await comment.save();

    await Recipe.findByIdAndUpdate(recipeId, { $push: { comments: comment._id } });

    res.redirect(`/recipes/${recipeId}`);
  } catch (error) {
    res.status(500).json({ error: "Failed to add comment", details: error.message });
  }
};

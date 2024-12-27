const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });
  
  module.exports = mongoose.model('Comment', commentSchema);
  
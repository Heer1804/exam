const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

// Check if the model already exists
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;

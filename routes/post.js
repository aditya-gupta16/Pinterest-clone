const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/pinterest1")

// Schema banate hain
const postSchema = new mongoose.Schema({
  imageText: {
    type: String,
    
  },

  Image:{
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now  // Automatically current date and time set karega
  },
  likes: {
    type: Array,
    default: []  // Default like count 0
  }
});

// Model create karte hain

module.exports = mongoose.model('Post', postSchema);
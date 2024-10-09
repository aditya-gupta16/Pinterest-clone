const mongoose = require('mongoose');

const plm = require('passport-local-mongoose')


mongoose.connect("mongodb://localhost:27017/pinterest1")

// Schema banate hain
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    length: 3,
  },


  fullname: {
    type: String,
    required: true,
  },

  db:{
    db: String
  },

  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
   
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }]
});

userSchema.plugin(plm);

// Model create karte hain
module.exports = mongoose.model('User', userSchema);



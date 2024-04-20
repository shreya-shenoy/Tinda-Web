const mongoose = require("mongoose");

// Define the schema for the Comment model
const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  recipeId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Comment model
const CommentModel = mongoose.model("Comment", commentSchema);

module.exports = CommentModel;

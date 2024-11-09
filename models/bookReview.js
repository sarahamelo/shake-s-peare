const mongoose = require("mongoose");
const mongodb = require("mongodb");

const commentSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  bookId: {
    type: mongodb.ObjectId,
    required: true,
  },
});

const BookReview = mongoose.model("bookReviews", commentSchema);

module.exports = BookReview;

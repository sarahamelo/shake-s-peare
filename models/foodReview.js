const mongoose = require("mongoose");
const mongodb = require("mongodb");

const commentSchema = new mongoose.Schema(
  {
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
    comidinhaId: {
      type: mongodb.ObjectId,
      required: true,
    },
  },
  { collection: "comidinhasReview" }
);

const FoodReview = mongoose.model("comidinhasReviews", commentSchema, "comidinhasReview");

module.exports = FoodReview;

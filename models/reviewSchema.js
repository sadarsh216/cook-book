const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "recipe",
    required: true,
  },
  like: {
    type: Boolean,
  },
  comment: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = mongoose.model("review", reviewSchema);

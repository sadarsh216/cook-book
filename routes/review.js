const { verifyUser } = require("../middleware/verify");
const reviewSchema = require("../models/reviewSchema");
const recipe = require("../models/recipeSchema");

const router = require("express").Router();

router.post("/add", verifyUser, (req, res) => {
  const newReview = req.body;
  newReview.user = req.user._id;
  reviewSchema.find(
    { recipe: req.body.recipe, user: req.user._id },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (data.length === 0) {
          // Add reviews
          reviewSchema.create(newReview, (err, data) => {
            if (err) {
              res.status(500).send(err);
            } else {
              recipe.findByIdAndUpdate(
                req.body.recipe,
                { $inc: { likecount: 1, commentcount: 1 } },
                (err, data) => {
                  if (err) {
                    res.status(500).send(err);
                  } else {
                    res.status(200).send(data);
                  }
                }
              );
            }
          });
        } else {
          reviewSchema.findOneAndUpdate(
            { recipe: req.body.recipe, user: req.user._id },
            { $push: { comment: req.body.comment } },
            (err, data) => {
              if (err) {
                res.status(500).send(err);
              } else {
                res.status(200).send(data);
              }
            }
          );
        }
      }
    }
  );
});
module.exports = router;

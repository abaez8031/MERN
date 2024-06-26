const express = require("express");
const Review = require("../../models/Review");
const router = express.Router();
const { ValidateReviewInput, ValidateUpdateReviewInput } = require("../../validations/Review");

router.get('/', async (req,res, next) => {
  try {
    const reviews = await Review.find({}).populate("userId", "username");
    res.json(reviews)
  } catch(err) {
    next(err)
  }
})

router.post('/', ValidateReviewInput, async(req,res,next) => {
  const { userId, rating, text } = req.body;
  const review = new Review({
    userId,
    rating,
    text
  })
  try {
    const savedReview = await review.save()
    const populatedReview = await savedReview.populate("userId", "username")
    res.status(201).json(populatedReview)
  } catch (err) {
    res.status(400).json({message: err.message})
  }
});

router.delete("/:id", async (req,res,next) => {
  const { id } = req.params;
  try {
    const deletedReview = await Review.findByIdAndDelete(id);
    res.json(deletedReview)
  } catch(err) {
    next(err)
  }
})

router.patch('/:id', ValidateUpdateReviewInput, async (req,res,next) => {
  const { id } = req.params;
  const { rating, text } = req.body;
  try {
    const updatedReview = await Review.findByIdAndUpdate(id, { $set: {rating, text} }, { new: true, runValidators: true })
    if (!updatedReview) {
      const err = new Error("Review not found");
      err.statusCode = 404;
      return next(err)
    }
    const populatedReview = await updatedReview.populate("userId")
    res.json(updatedReview);
  } catch(err) {
    next(err)
  }
})

module.exports = router;
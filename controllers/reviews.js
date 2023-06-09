const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Review = require('../models/Review');
const Bootcamp = require('../models/Bootcamp');
const { Error } = require('mongoose');

// @desc    Get all reviews
// @route   GET /api/v1/review
// @route   GET /api/v1/bootcamps/:bootcampId/reviews
// @access  Public

exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });
    return res
      .status(200)
      .json({ success: true, count: reviews.length, data: reviews });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc    Get single review
// @route   GET /api/v1/reviews/:id
// @access  Public

exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  if (!review) {
    return next(
      new ErrorResponse(`No review found with the id of ${req.params.id}`, 404)
    );
  }
  return res.status(200).json({ success: true, data: review });
});

// @desc    Add Single review
// @route   POST /api/v1/bootcamps/:bootcampId/reviews
// we re-route in bootcamps routes to reviews when :bootcampId/reviews is hit
// @access  Private

exports.addReview = asyncHandler(async (req, res, next) => {
  const bootcampId = req.params.bootcampId;
  const userId = req.user.id;


  const bootcamp = await Bootcamp.findById(bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId}`),
      404
    );
  }

  //Prevent user from submitting more than one review per bootcamp
  // Check if the user has already submitted a review for this bootcamp
  const existingReview = await Review.findOne({ bootcamp: bootcampId, user: userId });

  if (existingReview && req.user.role !=='admin') {
    return next(
      new ErrorResponse('You have already submitted a review for this bootcamp', 400)
    );
  }

  req.body.bootcamp = bootcampId;
  req.body.user = userId;//logged in user
  const review = await Review.create(req.body);

  res.status(200).json({
    success: true,
    data: review,
  });
});



// @desc    Update  review
// @route   POST /api/v1/reviews/:id
// @access  Private

exports.updateReview = asyncHandler(async (req, res, next) => {
  const reviewId = req.params.id;
  const userId = req.user.id;

  const  review = await Review.findById(reviewId);

  if (!review) {
    return next(
      new ErrorResponse(`Review not found with id of ${reviewId}`, 404)
    );
  }

  //make sure user is review owner or admin
  if (review.user.toString() !== userId && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${userId} is not authorized to update a course  ${course._id}`,
        401
      )
    );
  }

  await review.updateOne( req.body, {
    new: true,
    runValidators: true,
  })

  const  UpdatedReview = await Review.findById(reviewId);
  res.status(200).json({ success: true, data: UpdatedReview });
});






// @desc    Delete a review
// @route   DELETE /api/v1/reviews/:id
// @access  Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(
      new ErrorResponse(`Review not found with id of ${req.params.id}`, 404)
    );
  }

  //make sure user is course owner or admin
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete a review  ${review._id}`,
        401
      )
    );
  }

  await review.deleteOne();

  res.status(200).json({ success: true, data: {} });
});

const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp');
const Course = require('../models/Course');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public

exports.getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId });
    return res
      .status(200)
      .json({ success: true, count: courses.length, data: courses });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc    Get  course
// @route   GET /api/v1/courses/:id
// @access  Public

exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc    Add Single course
// @route   POST /api/v1/bootcamps/:bootcampId/courses
// we re-route in bootcamps routes to courses
// @access  Private

exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;

  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.bootcampId}`),
      404
    );
  }


  //make sure user is bootcamp owner or admin to be able to add a course
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a course to  bootcamp ${bootcamp._id}`,
        401
      ) 
    );
  }
  const course = await Course.create(req.body);
  res.status(200).json({
    success: true,
    data: course,
  });
});





// @desc    Update a course
// @route   PUT /api/v1/courses/:id
// @access  Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
    );
  }

   //make sure user is course owner or admin
   if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update a course  ${course._id}`,
        401
      ) 
    );
  }

  await course.updateOne(req.body, {
    new: true,
    runValidators: true,
  });

  const updatedCourse = await Course.findById(course._id);


  res.status(200).json({ success: true, data: updatedCourse });
});

// @desc    Delete a course
// @route   DELETE /api/v1/courses/:id
// @access  Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
    );
  }

  //make sure user is course owner or admin
  if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete a course  ${course._id}`,
        401
      )
    );
  }

  await course.deleteOne();

  res.status(200).json({ success: true, data: {} });
});

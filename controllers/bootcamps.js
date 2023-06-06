const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const Bootcamp = require('../models/Bootcamp');

const FILE_UPLOAD_PATH = './public/uploads';
const MAX_FILE_UPLOAD = 1000000;

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  //make sure to return this line to get 400 if bootcamp doesn't exist on the provided id otherwise we get 200 and data:null even if formated id provided
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc    create a new bootcamp
// @route   POST /api/v1/bootcamps/:id
// @access  Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({ success: true, data: bootcamp });
});

// @desc    Update a bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).exec();

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: bootcamp });
});

// @desc    Delete a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  //deleteOne method will trigger the Cascade delete courses via middleware when a deleteBootcamp is called
  bootcamp.deleteOne();

  res.status(200).json({ success: true, data: {} });
});

// @desc    Get a bootcamp within a radius
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access  Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  //Get lat/lng from geocode
  const [loc] = await geocoder.geocode(zipcode);
  const { latitude: lat, longitude: lng } = loc;

  //Calc radius using radians
  //Divide dist by radius of Earth
  //Earth radius =3963mi or 6378km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    //mongoDB operator query
    //Defines a circle for a geospatial query that uses spherical geometry. The query returns documents that are within the bounds of the circle.
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

// @desc    Upload photo for a bootcamp
// @route   PUT /api/v1/bootcamps/:id/photo
// @access  Private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a photo`, 400));
  }
  // console.log(req.files);

  const file = req.files.file;

  // Make sure the file is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image type`, 400));
  }

  //Check file size
  if (file.size > MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  //Create custom filename
  //path module core node.js module for dealing with files path
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
  // console.log(file.name)

  //upload the file
  file.mv(`${FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(
        new ErrorResponse(
          `problem with file upload`,
          500 //server error
        )
      );
    }
    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});

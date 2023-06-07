const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  //Create Token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password:entredPassword } = req.body;

  //Validate email and password
  if (![email, entredPassword].every(Boolean)) {
    return next(
      new ErrorResponse('Please provide an email an a password', 400)
    );
  }

  //Check user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  //Check passwords matches
  const isMatch = await user.matchPassword(entredPassword);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }
  
  //Create Token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});
